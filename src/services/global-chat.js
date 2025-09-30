// Servicio para todas las funciones del chat global.
import { supabase } from "./supabase";


/**
 * Traer los ultimos mensajes de la tabla del chat, ordenados de forma cronologica y con un limite
 * 
 * @async
 * @function getLastChatMessages
 * @returns {Promise<Object[]>} Lista de mensajes con datos del user
 * @throws {Error} errores desde supabase
 */
export async function getLastChatMessages() {
    const { data, error } = await supabase
        .from('chat_messages')
        .select(`
      id,
      message,
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
        console.error('[global-chat.js getLastMessages] Error al traer los mensajes: ', error);
        throw error;
    }

    console.log("[global-chat.js getLastMessages] Lista de los mensajes: ", data);
    return data;
}

/**
 * Metodo para suscribirse a la tabla del chat en tiempo real usando la api realtime
 * Al detectar un mensaje nuevo, se obtiene el mensaje, el usuario y se pasa al callback.
 *
 * @async
 * @function subscribeToGlobalChatNewMessages
 * @param {(message: Object) => void} callback funcion que se ejecuta con el mensaje nuevo
 * @returns {void}
 */
export async function subscribeToChatNewMessages(callback) {
    const chatChannel = supabase.channel('global_chat');

    chatChannel.on(
        'postgres_changes',
        {
            schema: 'public',
            table: 'chat_messages',
            event: 'INSERT',
        },
        async (data) => {
            console.log("¡Nuevo mensaje insertado! ID:", data.new.id);

            const { data: fullMessage, error } = await supabase
                .from('chat_messages')
                .select(`
          id,
          message,
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
                console.error('[global-chat.js] Error al obtener mensaje con perfil:', error);
                return;
            }

            callback(fullMessage);
        }
    );

    chatChannel.subscribe();
}

export async function sendChatMessage({ message, user_id }) {
  
    if (!user_id) throw new Error("El user_id es obligatorio.");

  // Obtener el profile
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', user_id)
    .single();

  if (profileError || !profile) {
    console.error("[sendChatMessage] No se encontró el perfil:", profileError);
    throw new Error("No se pudo obtener el perfil del usuario.");
  }

  // Guardar mensaje
  const { error: insertMsgError } = await supabase
    .from('chat_messages')
    .insert({
      message,
      user_profile_id: profile.id
    });

  if (insertMsgError) {
    console.error("[sendChatMessage] Error al guardar el mensaje:", insertMsgError);
    throw new Error(insertMsgError.message);
  }
}
