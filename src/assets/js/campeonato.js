import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const CrearCampeonatoP = async(body) =>{
    return await CrearCampeonato(body)
}

export const InscribirseCampeonatoP = async(body) =>{
    return await InscribirseCampeonato(body)
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

const InscribirseCampeonato = async(body) =>{
    try {
        const response = await axios.post(url + `/campeonato`, body, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        console.log(body);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }

}
