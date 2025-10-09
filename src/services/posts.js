import { supabase } from './supabase';
import Swal from 'sweetalert2';

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
        console.error('[posts.js getLastMessages] Error al traer los posts: ', error);

        //alerta: mostramos alertas en el servicio para no repetir el codigo en los componentes (myprofile, posts, etc)
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error al traer los posts',
            showConfirmButton: true,
            confirmButtonColor: '#66800a',
        });

        throw error;
    }

    //console.log("[posts.js getLastMessages] Lista de los posts: ", data);
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

    return () => {
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
 * crea una nueva publicacion en la base de datos
 * @param {string} content
 * @param {string} userId
 * @returns {void}
 */
export async function createPost(content, user_id) {

    if (!user_id) {
        console.error("[sendChatMessage] No estas logueado/a");

        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'No estas logueado/a',
            showConfirmButton: true,
            confirmButtonColor: '#66800a',
        });

        throw new Error("No estas logueado/a");
    }


    if (!content) {
        console.error("[sendChatMessage] El post no puede estar vacio");

        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'El post no puede estar vacio',
            showConfirmButton: true,
            confirmButtonColor: '#66800a',
        });

        throw new Error("El post no puede estar vacio");
    }

    const { error: errorMsg } = await supabase
        .from('posts')
        .insert({
            content,
            user_profile_id: user_id
        })

    if (errorMsg) {
        console.error("[sendChatMessage] Error al guardar el post:", errorMsg);

        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Error al guardar el post",
            showConfirmButton: true,
            confirmButtonColor: '#66800a',
        });

        throw new Error(errorMsg.message);
    }
}