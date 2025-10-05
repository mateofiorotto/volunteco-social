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
        full_name
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
    const postsChannel = supabase.channel('posts_channel');

    postsChannel.on(
        'postgres_changes',
        {
            schema: 'public',
            table: 'posts',
            event: 'INSERT',
        },
        payload => {
            callback(payload.new);
        }
      );

    postsChannel.subscribe();

    return() => {
        postsChannel.unsubscribe();
    }
}

/**
 * Se suscribe a los posts de un user por id para mostrarlos en su perfil
 * 
 * @param {*} userId 
 * @param {*} callback 
 * @returns 
 */
export function subscribeToNewPostsByUser(userId, callback) {
    const postsChannel = supabase.channel(`posts_channel_user_${userId}`);

    postsChannel.on(
        'postgres_changes',
        {
            schema: 'public',
            table: 'posts',
            event: 'INSERT',
            filter: `user_profile_id=eq.${userId}`, //filtro por ID
        },
        payload => {
            callback(payload.new);
        }
    );

    postsChannel.subscribe();

    return () => {
        postsChannel.unsubscribe();
    };
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

    const { error: errorMsg } = await supabase
        .from('posts')
        .insert({
            content,
            user_profile_id: user_id
        })

    if (errorMsg) {
        console.error("[sendChatMessage] Error al guardar el post:", errorMsg);
        throw new Error(errorMsg.message);
    }
}