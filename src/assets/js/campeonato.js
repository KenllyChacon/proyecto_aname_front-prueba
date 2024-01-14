import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const CrearCampeonatoP = async(body) =>{
    return await CrearCampeonato(body)
}


const CrearCampeonato = async(body) =>{
    return axios.post(url + `/campeonato`,body,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(r =>r.data)
}