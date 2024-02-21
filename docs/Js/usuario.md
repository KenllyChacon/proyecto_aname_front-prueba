# Usuario.js

El archivo `Usuario.js` es un módulo de JavaScript que utiliza la biblioteca `axios` para realizar solicitudes HTTP a una API. Aquí está la explicación detallada de cada parte del código junto con el código correspondiente:

1. `import axios from "axios";`: Esta línea importa la biblioteca `axios`, que se utiliza para realizar solicitudes HTTP.

2. `var url = `https://aname-a05m.onrender.com/API/Aname/V1``: Esta línea define la URL base de la API a la que se realizarán las solicitudes.

3. `export const registrarUsuarioFachada = async (body) => { return await registrarUsuario(body); };`: Esta función es una fachada para la función `registrarUsuario(body)`. Recibe un objeto `body` como parámetro y lo pasa a la función `registrarUsuario(body)`. Luego, devuelve el resultado de la función `registrarUsuario(body)`.

```javascript
const registrarUsuario= async (body) => {
    return axios.post(url + `/usuario`, body).then(r => r.data)
}
```

4. `export const inscribirUsuarioFachada=async (body)=>{ return await inscribirUsuario(body); };`: Similar a `registrarUsuarioFachada(body)`, esta función es una fachada para la función `inscribirUsuario(body)`. Recibe un objeto `body` como parámetro y lo pasa a la función `inscribirUsuario(body)`. Luego, devuelve el resultado de la función `inscribirUsuario(body)`.

```javascript
const inscribirUsuario=async (body)=> {
    return axios.post(url+`/usuario`, body).then(r => r.data)
}
```

5. `export const buscarAsociacionUsuarioFachada=async (email)=>{ return await buscarAsociacionUsuario(email); };`: Esta función es una fachada para la función `buscarAsociacionUsuario(email)`. Recibe un `email` como parámetro y lo pasa a la función `buscarAsociacionUsuario(email)`. Luego, devuelve el resultado de la función `buscarAsociacionUsuario(email)`.

```javascript
const buscarAsociacionUsuario=async (email)=> {
    return axios.get(url+`/usuario/${email}/idAsociacion`).then(r => r.data)
}
```

6. `export const buscarUsuariosPorAsociacionFachada=async (idAsociacion)=>{ return await buscarUsuariosPorAsociacion(idAsociacion); };`: Esta función es una fachada para la función `buscarUsuariosPorAsociacion(idAsociacion)`. Recibe un `idAsociacion` como parámetro y lo pasa a la función `buscarUsuariosPorAsociacion(idAsociacion)`. Luego, devuelve el resultado de la función `buscarUsuariosPorAsociacion(idAsociacion)`.

```javascript
const buscarUsuariosPorAsociacion=async (idAsociacion)=> {
    try {
        const response= await axios.get(url+`/usuario/asociacion/${idAsociacion}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response || error.message);
        throw error; // Re-lanzar el error para que se maneje en el componente que llama a esta función
    }
};
```

Y así sucesivamente para el resto de las funciones en el archivo `Usuario.js`. Cada función es una fachada para una función correspondiente que realiza una solicitud HTTP a la API. Las funciones fachada reciben los mismos parámetros que sus funciones correspondientes y devuelven los resultados de esas funciones.