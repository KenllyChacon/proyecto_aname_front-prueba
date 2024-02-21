# Prueba.js

El archivo `Prueba.js` es un módulo de JavaScript que utiliza la biblioteca `axios` para realizar solicitudes HTTP a una API. Aquí está la explicación detallada de cada parte del código junto con el código correspondiente:

1. `import axios from "axios";`
   Este es un comando de importación que trae la biblioteca `axios` al archivo. `axios` es una biblioteca de JavaScript muy popular para realizar solicitudes HTTP.
   ```javascript
   import axios from "axios";
   ```

2. `var url = `https://aname-a05m.onrender.com/API/Aname/V1`;`
   Aquí se define la URL base de la API a la que se realizarán las solicitudes.
   ```javascript
   var url = `https://aname-a05m.onrender.com/API/Aname/V1`;
   ```

3. `export const listarPruebasFachada = async () => { return await listarPruebas(); };`
   Esta es una función asíncrona que se exporta para que pueda ser utilizada en otros archivos. Esta función llama a la función `listarPruebas` y devuelve su resultado.
   ```javascript
   export const listarPruebasFachada = async () => {
     return await listarPruebas();
   };
   ```

4. `export const listarPruebasPorCampFachada = async (id) => { return await listarPruebasPorCamp(id); };`
   Similar a la función anterior, esta función también se exporta para su uso en otros archivos. Esta función toma un parámetro `id` y llama a la función `listarPruebasPorCamp` con ese `id` como argumento.
   ```javascript
   export const listarPruebasPorCampFachada = async (id) => {
     return await listarPruebasPorCamp(id);
   };
   ```

5. `const listarPruebas = async () => { return axios.get(url + `/campeonato/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data); };`
   Esta es una función asíncrona que realiza una solicitud GET a la API utilizando `axios`. La URL de la solicitud se construye concatenando la URL base con la cadena `/campeonato/pruebas`. También se incluye un encabezado de autorización en la solicitud, que se obtiene del almacenamiento de la sesión del navegador.
   ```javascript
   const listarPruebas = async () => {
     return axios.get(url + `/campeonato/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data);
   };
   ```

6. `const listarPruebasPorCamp = async (id) => { return axios.get(url + `/campeonato/${id}/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data); };`
   Esta función es similar a la anterior, pero incluye un `id` en la URL de la solicitud. Este `id` se pasa como argumento a la función.
   ```javascript
   const listarPruebasPorCamp = async (id) => {
     return axios.get(url + `/campeonato/${id}/pruebas`,{headers:{'Authorization': `Bearer ${sessionStorage.getItem('token')}`}} ).then((r) => r.data);
   };
   ```

En resumen, este módulo proporciona dos funciones que pueden ser importadas en otros archivos para realizar solicitudes a una API y obtener datos.