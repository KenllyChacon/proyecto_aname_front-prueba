import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


//Fachadas
export const listaAsociacionesCompetidorFachada = async() =>{
    return await listaAsociacionesCompetidores()
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