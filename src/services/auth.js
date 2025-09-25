import { supabase } from "./supabase";

let user = {
    id: null,
    email: null,
}
let observers = [];

loadCurrentUserAuthState();

async function loadCurrentUserAuthState() {
    const { data, error } = await supabase.auth.getUser();

    if(error) {
        console.warn('No hay usuario logueado');
        return;
    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });
}

/**
 * 
 * @param {String} email 
 * @param {String} password 
 */
export async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if(error) {
        console.error('[auth.js register] Error al registrar el usuario.', error);
        throw new Error(error.message);
    }

    setUser({
        id: data.user.id,
        email: data.user.email,
    });
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

    if(error) {
        console.error('[auth.js login] Error al iniciar sesión.', error);
        throw new Error(error.message);
    }
    
    setUser({
        id: data.user.id,
        email: data.user.email,
    });
}

export async function logout() {
    supabase.auth.signOut();

    setUser({
        id: null,
        email: null,
    });
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