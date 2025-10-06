import { supabase } from "./supabase";
import { getUserProfileByPK, addUserProfile, updateUserProfileByPK } from "./user-profile";
import Swal from "sweetalert2";

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
 * Funcion para cargar el usuario actual autenticado
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
 * crea un nuevo usuario y su perfil en la base de datos
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

    if (!email || !password || !profileData.full_name) {
        console.error('[auth.js register] Error al registrar el usuario. Datos insuficientes.');

        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error al registrar el usuario. Introduzca los datos requeridos.',
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        throw new Error('Error al registrar el usuario. Datos insuficientes.');
    }

    if (password.length < 6) {
        console.error('[auth.js register] Error al registrar el usuario. La contraseña debe tener al menos 6 caracteres.');
    
        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error al registrar el usuario. La contraseña debe tener al menos 6 caracteres.',
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        throw new Error('Error al registrar el usuario. La contraseña debe tener al menos 6 caracteres.');
    }

    if (error) {
        console.error('[auth.js register] Error al registrar el usuario.', error);

        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: "Ocurrio un error al registrarse",
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

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

    if (!email || !password) {
        console.error('[auth.js login] Error al iniciar sesion. Datos insuficientes.');
    
        //alerta
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error al iniciar sesion. Introduzca los datos requeridos.',
            showConfirmButton: true,
            confirmButtonColor: '#348534',
        });

        throw new Error('Error al iniciar sesion. Datos insuficientes.');
    }

    if (error) {
        //verificar si el error es por credenciales incorrectas u otro
        if (error.status === 400 && error.message.includes('Invalid login credentials')) {
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Email o contraseña incorrectos.',
                showConfirmButton: true,
                confirmButtonColor: '#348534',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Ocurrió un error al iniciar sesión.',
                showConfirmButton: true,
                confirmButtonColor: '#348534',
            });
        }

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