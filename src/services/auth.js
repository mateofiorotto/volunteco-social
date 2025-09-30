import { supabase } from "./supabase";
import { getUserProfileByPK, updateUserProfile, addUserProfile } from "./user-profile";

//objeto user
let user = {
    id: null,
    email: null,
    full_name: null,
    biography: null,
    careerr: null
}

//definicion de array observers
let observers = [];

//carga el usuario actual
loadCurrentUserAuthState();

/**
 * Funcion para cargar el usuario actual
 * 
 * @async
 * @returns {void} 
 */
async function loadCurrentUserAuthState() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.warn('No hay usuario logueado');
        return;
    }

    if (!data.user) {
        return null
    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });

    loadCurrentUserProfile();
}

/**
 * Carga el perfil extendido del usuario autenticado.
 */
async function loadCurrentUserProfile() {
    try {
        const profile = await getUserProfileByPK(user.id);

        setUser({
            ...profile,
        });
    } catch (error) {
        console.error('[auth.js loadCurrentUserProfile] Error al obtener el perfil del usuario: ', error);
        throw error;
    }
}

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {{full_name: String, biography: String|null, career: String|null}} profileData
 */
export async function register(email, password, profileData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
        
    });

    if (error) {
        console.error('[auth.js register] Error al registrar el usuario.', error);
        throw new Error(error.message);
    }

    //crear perfil de usuario
    try {
        await addUserProfile({
            //pasar id al perfil del user con la id que se acaba de crear
            id: data.user.id,
            email,
            full_name: profileData.full_name,
            biography: profileData.biography,
            career: profileData.career
        });
    } catch (error) {
        console.error('[auth.js register] Error al crear el perfil del usuario: ', error);

    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });

    return data.user;
}

/**
 * 
 * @param {String} email 
 * @param {String} password 
 */
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('[auth.js login] Error al iniciar sesión.', error);
        throw new Error(error.message);
    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });

    loadCurrentUserProfile();

    return data.user;
}

export async function logout() {
    supabase.auth.signOut();

    setUser({
        id: null,
        email: null,
    });
}

/**
 * Actualiza el perfil del usuario autenticado.
 * 
 * @param {{biography: string|null, career: string|null, full_name: string|null}} data 
 */
export async function updateAuthProfile(data) {
    try {
        await updateUserProfile(user.id, { ...data });
        setUser(data);
    } catch (error) {
        console.error('[auth.js updateAuthProfile] Error al actualizar el perfil del usuario autenticado: ', error);
        throw error;
    }
}


/**
 * 
 * @param {(userState: {id: null|String, email: null|String}) => void} callback observer a adjuntar
 */
export function subscribeToAuthStateChanges(callback) {
    observers.push(callback);

    notify(callback);
}

/**
 * 
 * @param {(userState: {id: null|String, email: null|String}) => void} callback 
 */
function notify(callback) {
    callback({
        ...user
    });
}

/**
 * Notifica a los observers del cambio del estado de auth
 * Se llama cada vez que cambiamos la var user
 */
function notifyAll() {
    observers.forEach(notify);
}

function setUser(data) {
    user = {
        ...user,
        ...data,
    }
    notifyAll();
}