import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


//Fachadas
export const listaAsociacionesCompetidorFachada = async() =>{
    return await listaAsociacionesCompetidores()
}

export const obtenerCompetidorPorUseryCampFachada = async(idCampeonato, email) =>{
    return await obtenerCompetidorPorUseryCamp(idCampeonato, email)
}

export const obtenerPreciosPorCampFachada = async(idCampeonato) =>{
    return await obtenerPreciosPorCamp(idCampeonato)
}



//conexiones api

const listaAsociacionesCompetidores = async() => {

    try {
        const response = await axios.get(url + `/competidor/asociaciones`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};


const obtenerCompetidorPorUseryCamp = async(idCampeonato, email) => {

    try {
        const response = await axios.get(url + `/competidor/campeonato/${idCampeonato}/usuario/${email}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};

const obtenerPreciosPorCamp = async(idCampeonato) => {

    try {
        const response = await axios.get(url + `/competidor/campeonato/${idCampeonato}/precios`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};