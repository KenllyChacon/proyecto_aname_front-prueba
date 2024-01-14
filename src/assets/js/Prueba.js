import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const listarPruebasFachada = async () => {
  return await listarPruebas();
};


const listarPruebas = async () => {
  return axios.get(url + `/campeonatos/pruebas`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}} ).then((r) => r.data);
};
