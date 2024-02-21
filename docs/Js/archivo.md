# Archivo.js

Este código utiliza la librería `axios` para realizar una petición POST a una API para cargar archivos a un contenedor específico.

## Variables

* `url`: Almacena la URL de la API, en este caso `https://aname-a05m.onrender.com/API/Aname/V1`.
* `cargaArchivosFachada`: Función exportadora que llama a la función `cargaArchivos` y retorna su resultado.
* `cargaArchivos`: Función principal que se encarga de subir los archivos.

## Parámetros

* `file`: El archivo que se desea subir (objeto de tipo File).
* `contenedor`: Nombre del contenedor donde se almacenará el archivo.
* `email`: Email del usuario que sube el archivo.

## Funcionamiento

1. Se crea un objeto `FormData` para almacenar los datos del archivo, el contenedor y el email.
2. Se utiliza `axios.post` para realizar una petición POST a la URL de la API concatenando el endpoint `/files`.
3. Se envían los datos del formulario utilizando el tipo de contenido `multipart/form-data`.
4. La función `cargaArchivos` retorna la respuesta de la API en formato JSON.

## Ejemplo de Uso

```javascript
const file = document.getElementById('fileInput').files[0];
const contenedor = 'documentos';
const email = '[email address removed]';

cargaArchivosFachada(file, contenedor, email)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });