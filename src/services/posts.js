import { supabase } from './supabase';


/**
 * Traer los ultimos mensajes de la tabla de los posts cronologicamente y por limite
 * 
 * @async
 * @function getLastChatMessages
 * @returns {Promise<Object[]>} Lista de mensajes con datos del user
 * @throws {Error} errores desde supabase
 */
export async function getLastPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select(`
      id,
      content,
      created_at,
      user_profile_id,
      user_profiles (
        id,
        full_name,
        email,
        biography,
        career
      )
    `)
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('[global-chat.js getLastMessages] Error al traer los posts: ', error);
        throw error;
    }

    console.log("[global-chat.js getLastMessages] Lista de los posts: ", data);
    return data;
}

/**
 * escucha nuevos posts en tiempo real y ejecuta el callback.
 * @param {(post: object) => void} callback
 */
export function subscribeToNewPosts(callback) {
    const postsChannel = supabase.channel('posts_table');

    postsChannel.on(
        'postgres_changes',
        {
            schema: 'public',
            table: 'posts',
            event: 'INSERT',
        },
        async (data) => {
            console.log("¡Nuevo post insertado! ID:", data.new.id);

            const { data: fullPost, error } = await supabase
                .from('posts')
                .select(`
          id,
          content,
          created_at,
          user_profile_id,
          user_profiles (
            id,
            full_name,
            email,
            biography,
            career
          )
        `)
                .eq('id', data.new.id)
                .single();

            if (error) {
                console.error('[global-chat.js] Error ', error);
                return;
            }

            callback(fullPost);
        }
    );

    postsChannel.subscribe();
}

/**
 * crea una nueva publicacion y trae la publicacion recien creada incluyendo los comentarios y perfiles de usuario
 * @param {string} content
 * @param {string} userId
 * @returns {void}
 */
export async function createPost(content, user_id) {

    if (!user_id) throw new Error("El user id es obligatorio.");

    if (!content) return;

    const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user_id)
        .single();

    if (profileError || !profile) {
        console.error("[sendChatMessage] No se encontró el perfil:", profileError);
        throw new Error("No se pudo obtener el perfil del usuario.");
    }

    const { error: errorMsg } = await supabase
        .from('posts')
        .insert({
            content,
            user_profile_id: profile.id
        })

    if (errorMsg) {
        console.error("[sendChatMessage] Error al guardar el post:", errorMsg);
        throw new Error(errorMsg.message);
    }
}