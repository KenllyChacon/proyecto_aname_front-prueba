import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const CrearCampeonatoP = async(body) =>{
    return await CrearCampeonato(body)
}

export const VerCampeonatosP = async() =>{
    return await VerCampeonatos()
}


export const InscribirseCampeonatoP = async(body) =>{
    return await InscribirseCampeonato(body)
}

export const verSedesP = async() =>{
    return await verSedes()
}

export const campIncritosUsersP = async(email) =>{
    return await campIncritosUsers(email)
}



const CrearCampeonato = async(body) =>{
    try {
        const response = await axios.post(url + `/campeonato`, body, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        console.log(body);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const VerCampeonatos = async() =>{
    try {
        const response = await axios.get(url + `/campeonato`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const InscribirseCampeonato = async(body) =>{
    try {
        const response = await axios.post(url + `/competidor/inscripcionInicial`, body, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        console.log(body);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }

};

const verSedes = async() => {

    try {
        const response = await axios.get(url + `/campeonato/sedes`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};


const campIncritosUsers = async(email) => {

    try {
        const response = await axios.get(url + `/competidor/inscritos/${email}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
}
