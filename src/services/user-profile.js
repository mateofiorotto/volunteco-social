import { supabase } from "./supabase";

/**
 * Creacion del perfil de usuario con datos adicionales
 * 
 * @param {{id: string, email: string|null, full_name: string|null, biography: string|null, career: string|null}} data 
 */
export async function addUserProfile(data) {
    const { error } = await supabase
        .from('user_profiles')
        .insert({
            ...data
        });
    
    if(error) {
        console.error('[user-profile.js addUserProfile] No se pudo crear el perfi: ', error);
        
        throw new Error('No se pudo crear el perfil:' + error);
    }
}

/**
 * Actualizar el perfil de un usuario
 * 
 * @param {string} id 
 * @param {{career: string|null, bio: string|null, full_name: string|null}} data 
 */
export async function updateUserProfile(id, data) {
    const { error } = await supabase
        .from('user_profiles')
        .update({...data})
        .eq('id', id);
    
    if(error) {
        console.error('[user-profile.js updateUserProfile] No se pudo editar el perfil: ', error);
        
        throw new Error('No se pudo editar el perfil:' + error);
    }
}

/**
 * Obtener el perfil de un usuario por su UUID
 * 
 * @param {string} id El UUID del usuario del que se quiere pedir.
 * @returns {Promise<{id: string|null, email: string|null}>}
 */
export async function getUserProfileByPK(id) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', id);

    if(error) {
        console.error('[user-profile.js getUserProfileByPK] No se pudo traer el perfil, ya que hay uno o más errores en el valor recibido.', error);
        
        throw new Error('No se pudo traer el perfil, ya que hay uno o más errores en el valor recibido.' + error);
    }

    return data[0];
}