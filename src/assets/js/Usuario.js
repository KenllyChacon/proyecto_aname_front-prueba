import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`

export const registrarUsuarioFachada = async (body) => {
    return await registrarUsuario(body);
}

export const inscribirUsuarioFachada=async (body)=>{
    return await inscribirUsuario(body);
}


export const buscarAsociacionUsuarioFachada=async (email)=>{
    return await buscarAsociacionUsuario(email);
}

export const buscarUsuariosPorAsociacionFachada=async (idAsociacion)=>{
    return await buscarUsuariosPorAsociacion(idAsociacion);
}

export const aprobarRegistroUsuarioFachada=async (email)=>{
    return await aprobarRegistroUsuario(email);
}

export const negarRegistroUsuarioFachada=async (email)=>{
    return await negarRegistroUsuario(email);
}

export const negarUsuarioAsociadoFachada=async (email)=>{
    return await negarUsuarioAsociado(email);
}
export const aprobarUsuarioAsociadoFachada=async (email)=>{
    return await aprobarUsuarioAsociado(email);
}
export const buscarCostoAsociacionFachada=async (idAsociacion)=>{
    return await buscarCostoAsociacion(idAsociacion);
}

export const registroPagoAsociacionFachada=async (body)=>{
    return await registroPagoAsociacion(body);
}

//*********************************************************** */

const registrarUsuario= async (body) => {
    return axios.post(url + `/usuario`, body).then(r => r.data)
}


const inscribirUsuario=async (body)=> {
    return axios.post(url+`/usuario`, body).then(r => r.data)
}

const buscarAsociacionUsuario=async (email)=> {
    return axios.get(url+`/usuario/${email}/idAsociacion`).then(r => r.data)
}


const buscarUsuariosPorAsociacion=async (idAsociacion)=> {
    try {
        const response= await axios.get(url+`/usuario/asociacion/${idAsociacion}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const aprobarRegistroUsuario=async (email)=> {
    try {
        const response= await axios.put(url+`/usuario/aprobarRegistroUsuario/${email}`, {},{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const negarRegistroUsuario=async (email)=> {
    try {
        const response= await axios.put(url+`/usuario/negarRegistroUsuario/${email}`, {},{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const buscarCostoAsociacion=async (idAsociacion)=> {
    try {
        const response= await axios.get(url+`/usuario/costo/asociacion/${idAsociacion}`,{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const registroPagoAsociacion=async (body)=> {
    try {
        const response= await axios.post(url+`/usuario/registroPagoAsociacion`,body, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const aprobarUsuarioAsociado=async (email)=> {
    try {
        const response= await axios.put(url+`/usuario/aprobarUsuarioAsociado/${email}`, {},{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const negarUsuarioAsociado=async (email)=> {
    try {
        const response= await axios.put(url+`/usuario/negarUsuarioAsociado/${email}`, {},{ headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};