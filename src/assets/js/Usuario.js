import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`

export const registrarUsuarioFachada = async (body) => {
    return await registrarUsuario(body);
}

export const inscribirUsuarioFachada=async (body)=>{
    return await inscribirUsuario(body);
}

const registrarUsuario= async (body) => {
    return axios.post(url + `/usuario`, body).then(r => r.data)
}


const inscribirUsuario=async (body)=> {
    return axios.post(url+`/usuario`, body).then(r => r.data)
}