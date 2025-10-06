import { supabase } from "./supabase";
import Swal from "sweetalert2";

/**
 * Creacion del perfil de usuario con datos adicionales
 * 
 * @param {{id: string, email: string, full_name: string, biography?: string|null, career?: string|null}} data 
 */
export async function addUserProfile(data) {
    const { error } = await supabase
        .from('user_profiles')
        .insert(data);

    if (error) {
        console.error('[user-profile.js addUserProfile] No se pudo crear el perfil: ', error);

        throw new Error('No se pudo crear el perfil:' + error);
    }
}

/**
 * Actualizar el perfil de un usuario segun sui id
 * 
 * @param {string} id 
 * @param {{career?: string|null, biography?: string|null, full_name: string}} data 
 */
export async function updateUserProfileByPK(id, data) {
    const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', id);

    if (!data.full_name) {
        console.error('[user-profile.js updateUserProfileByPK] No se pudo editar el perfil: Datos insuficientes.');
        
        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error al editar el perfil. Introduzca los datos requeridos.',
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        throw new Error('Error al editar el perfil. Datos insuficientes.');
    }
        
    if (error) {
        console.error('[user-profile.js updateUserProfileByPK] No se pudo editar el perfil: ', error);

        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Ocurrio un error al editar el perfil: ' + error.message,
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        throw new Error('No se pudo editar el perfil:' + error);
    }
}

/**
 * Obtener el perfil de un usuario por su UUID
 * 
 * @param {string} id El UUID del usuario del que se quiere pedir.
 * @returns {Promise<{id: string, email: string, full_name: string, biography?: string|null, career?: string|null}>}
 */
export async function getUserProfileByPK(id) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

    if (error) {
        console.error('[user-profile.js getUserProfileByPK] No se pudo traer el perfil:', error);

        throw new Error(error.message);
    }

    return data;
}

/**
 * trae todas las publicaciones de un usuario especifico y su nombre ordenado de forma descendente por fecha
 * 
 * @param {string} userProfileId
 * @returns {Promise<{id: string, content: string, created_at: string, user_profile_id: string, full_name: string}>}}
 */
export async function getPostsByUser(userProfileId) {
    const { data, error } = await supabase
        .from("posts")
        .select(
            `
      *,
      user_profiles (
        id,
        full_name
      )
    `
        )
        .eq("user_profile_id", userProfileId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(
            "[user-profile.js getPostsByUser] Error al traer publicaciones:",
            error
        );
        throw new Error(error.message);
    }

    return data;
}