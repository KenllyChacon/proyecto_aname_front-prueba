import axios from "axios";

var url = `https://aname-a05m.onrender.com/API/Aname/V1`;


export const listarPruebasFachada = async () => {
  return await listarPruebas();
};

export const listarPruebasPorCampFachada = async (id) => {
  return await listarPruebasPorCamp(id);
};

const listarPruebas = async () => {
  return axios.get(url + `/campeonato/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data);
};

const listarPruebasPorCamp = async (id) => {
  return axios.get(url + `/campeonato/${id}/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data);
};