import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const listarPruebasFachada = async () => {
  return await listarPruebas();
};


const listarPruebas = async () => {
  return axios.get(url + `/campeonato/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data);
};
