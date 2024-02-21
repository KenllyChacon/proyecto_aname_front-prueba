# Email.js 

El archivo `Email.js` contiene varias funciones que se utilizan para enviar correos electrónicos a través de una API. Aquí está la explicación de cada función:

1. `enviarSimpleFachada(body)`: Esta función es una fachada para la función `enviarSimple(body)`. Recibe un objeto `body` como parámetro y lo pasa a la función `enviarSimple(body)`. Luego, devuelve el resultado de la función `enviarSimple(body)`.

```javascript
export const enviarSimpleFachada = async (body) => {
    console.log(body)
    return await enviarSimple(body);
}
```

2. `enviarSimple(body)`: Esta función realiza una solicitud POST a la API para enviar un correo electrónico simple. Recibe un objeto `body` como parámetro que contiene los detalles del correo electrónico a enviar. Luego, devuelve la respuesta de la API.

```javascript
const enviarSimple = async (body) => {
    return axios.post(url + `/usuario/email/enviarSimple`, body).then(r => r.data)
}
```

3. `enviarArchivoFachada(body)`: Similar a `enviarSimpleFachada(body)`, esta función es una fachada para la función `enviarArchivo(body)`. Recibe un objeto `body` como parámetro y lo pasa a la función `enviarArchivo(body)`. Luego, devuelve el resultado de la función `enviarArchivo(body)`.

```javascript
export const enviarArchivoFachada = async (body) => {
    return await enviarArchivo(body);
}
```

4. `enviarArchivo(body)`: Esta función realiza una solicitud POST a la API para enviar un correo electrónico con un archivo adjunto. Recibe un objeto `body` como parámetro que contiene los detalles del correo electrónico y el archivo a enviar. Luego, devuelve la respuesta de la API.

```javascript
const enviarArchivo = async (body) => {
    return axios.post(url + `/usuario/email/enviarArchivo`, body).then(r => r.data)
}
```

5. `enviarHTMLFachada(body)`: Esta función es una fachada para la función `enviarHTML(body)`. Recibe un objeto `body` como parámetro y lo pasa a la función `enviarHTML(body)`. Luego, devuelve el resultado de la función `enviarHTML(body)`.

```javascript
export const enviarHTMLFachada = async (body) => {
    return await enviarHTML(body);
}
```

6. `enviarHTML(body)`: Esta función realiza una solicitud POST a la API para enviar un correo electrónico con contenido HTML. Recibe un objeto `body` como parámetro que contiene los detalles del correo electrónico y el contenido HTML a enviar. Luego, devuelve la respuesta de la API.

```javascript
const enviarHTML = async (body) => {
    return axios.post(url + `/usuario/email/enviarHTML`, body).then(r => r.data)
}
```

En resumen, este archivo contiene funciones para enviar diferentes tipos de correos electrónicos (simple, con archivo adjunto, con contenido HTML) a través de una API.