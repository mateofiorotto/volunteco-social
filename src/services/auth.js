import { supabase } from "./supabase";
import { getUserProfileByPK, addUserProfile, updateUserProfileByPK } from "./user-profile";

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

//obtener user desde el principio para que no se rediriga al login al recargar en una ruta protegida
if(localStorage.getItem('user-data')){
    user = JSON.parse(localStorage.getItem('user-data'));
    console.log(user)
}

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

    loadUserExtendedProfile();
}

/**
 * Carga el perfil extendido del usuario autenticado
 */
async function loadUserExtendedProfile() {
    setUser(await getUserProfileByPK(user.id));
}

/**
 * Crea un nuevo usuario y su perfil en la base de datos
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {{full_name: String, biography?: String|null, career?: String|null}} profileData
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
 * Inicia la sesion del usuario
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

    loadUserExtendedProfile();
}

/**
 * Cierra la sesion del usuario
 */
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
export async function updateAuthenticatedUser(data) {
    try {
        await updateUserProfileByPK(user.id, data);
        
        setUser(data);
    } catch (error) {
        console.error('[auth.js updateAuthenticatedProfile] Error al actualizar el perfil del usuario: ', error);
        throw new Error(error.message);
    }
}


/**
 * Implementa el observer del estado de auth
 * 
 * @param {(userState: {id: String, email: String}) => void} callback observer a adjuntar
 */
export function subscribeToAuthStateChanges(callback) {
    observers.push(callback);

    notify(callback);

    //cancelar la suscripcion
    return () => {
        observers = observers.filter(observer => callback !== observer);
    }
}

/**
 * notifica todos los observers registrados
 * @param {(userState: {id: String, email: String}) => void} callback 
 */
function notify(callback) {
    callback({
        ...user
    });
}

/**
 * Notifica a los observers del cambio del estado de auth
 * Se llama cada vez que cambiamos la var user
 * Guarda el user en el localStorage
 */
function notifyAll() {
    observers.forEach(notify);
}

/**
 * Setea una copia de la info del usuario y lo guarda en el localStorage
 * Llama al metodo para notificar a los observers
 * 
 * @param {*} data 
 */
function setUser(data) {
    user = {
        ...user,
        ...data,
    }

    //guardar en el localStorage
    if(user.id){
        localStorage.setItem('user-data', JSON.stringify(user));
    } else {
        localStorage.removeItem('user-data');
    }

    notifyAll();
}