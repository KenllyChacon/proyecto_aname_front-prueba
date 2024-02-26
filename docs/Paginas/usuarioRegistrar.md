# UsuarioRegistrar.vue

Este código representa la página del formulario de registro de usuario.

## Estructura HTML

### Contenido

El formulario contiene campos para información personal, datos de inicio de sesión, fecha de nacimiento (con un limitante para que solo se puedan inscribir personas mayores a 30 años), género, federación, y opciones para cargar archivos como son la foto de perfil y el documento de identidad. Además, posee dos botones: uno para enviar el formulario y otro para cancelar el registro y volver a la página de inicio.

```html

  <div id="cont">
    <h2 class="fw-bold">Registrar Usuario</h2>

    <form @submit.prevent="registrarUsuario()">

      <div class="form-group">
        <label for="">Nombres:</label>
        <input type="text" class="form-control bordeCaja" id="" v-model="nombres" required>
      </div>

      <div class="form-group">
        <label for="">Apellidos:</label>
        <input type="text" class="form-control bordeCaja" id="" v-model="apellidos" required>
      </div>

      <div class="form-group">
        <label for="">Dirección:</label>
        <input type="text" class="form-control bordeCaja" id="" v-model="direccion" required>
      </div>

      <div class="form-group">
        <label for="">Ciudad:</label>
        <input type="text" class="form-control bordeCaja" id="" v-model="ciudad" required>
      </div>

      <hr class="mb-4">
      <div class="card-body">
        <div class="mb-3">
          <label for="email">Email:</label>
          <input type="email" class="form-control bordeCaja" id="email" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control bordeCaja" id="password" name="password" v-model="password">
        </div>
        <div class="mb-3">
          <label for="passwordConfirm" class="form-label">Confirmar contraseña</label>
          <input type="password" class="form-control bordeCaja" id="passwordConfirm" name="passwordConfirm"
            v-model="passwordConfirm">
        </div>
      </div>

      <hr class="mb-4">

      <div class="row">
        <label for="categoria">Fecha de nacimiento:</label>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label for="year">Edad permitida: a partir de 30 años</label>
          <input v-model="fechaNacimiento" type="date" class="form-control bordeCaja" max="1993-12-31" id="year"
            name="year" required>
        </div>
      </div>
      <div class="form-group">


        <label for="gender">Género</label>
        <select v-model="genero" class="form-control bordeCaja" id="gender" name="gender" required>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <hr class="mb-4">

      <div>
        <label for="" id="labelSup">Federación: </label>
        <select class="form-select bordeCaja" aria-label="Seleccionar federacion" style="color: #000000;"
          v-model="idfederacion">
          <option v-for="f in federaciones" :key="f.id" :value="f.id">{{
            f.nombre
          }}
          </option>
        </select>
      </div>

      <br>
      <div v-if="email" class="row">
        <div class="form-group">
          <label for="imageUpload" class="colorTexto fw-bold"> Seleccionar foto de perfil:</label>
          <input type="file" @change="fotoPerfil" accept="image/png, image/jpeg" class="form-control-file"
            id="imageUpload">
        </div>
      </div>
      <br>
      <div v-if="email" class="row">
        <div class="form-group">
          <label for="imageUpload" class="colorTexto fw-bold">Seleccionar documento de identidad:</label>
          <input type="file" @change="fotoDocumento" accept="application/pdf" class="form-control-file" id="imageUpload"
            required>
        </div>
      </div>
      <button type="submit" class="btn btn-danger">Registrar</button>

    </form>
    <!--Regresar a la página de inicio-->
    <div class="container" vertical-align="middle">
      <a href="/"><button class="btn btn-primary rounded" id="btn-cancelar">Cancelar</button></a>
    </div>

  </div>

```

## Funcionalidad JS

Se importan los componentes necesarios desde los diferentes archivos.

```javascript
import "@/router/index.js"
import { registrarUsuarioFachada } from '@/assets/js/Usuario'
import { enviarHTMLFachada } from '@/assets/js/Email'
import { cargaArchivosFachada } from '@/assets/js/Archivo'
import { listaAsociacionesCompetidorFachada } from "@/assets/js/Competidor";
import NotificacionRegistroInicial from "@/mailTemplates/NotificacionRegistroInicial.vue";

```

Se definen cada uno de los componentes.
- data(): Define el estado inicial de cada componente. Cada uno almacenan información relacionada con el registro de usuarios.

```javascript
export default {
  data() {
    return {
      nombres: null,
      apellidos: null,
      direccion: null,
      ciudad: null,
      email: null,
      password: null,
      perfil: null,
      id: null,
      estado: null,
      genero: null,
      fechaNacimiento: null,
      foto: null,
      documento: null,
      fotoResponse: null,
      documentoResponse: null,
      passwordConfirm: null,
      federaciones: [],
      idfederacion: null,
    }
  },
```
- El mounted llama a la función "listarFederaciones" cuando el componente es montado. Esta función se encarga de obtener y asignar las federaciones disponibles a la propiedad "federaciones".

```javascript
  mounted() {
    this.listarFederaciones();
  },

  methods: {
  async listarFederaciones() {
    this.federaciones = await listaAsociacionesCompetidorFachada();
    console.log(this.federaciones)
  },

```
- Los métodos "fotoPerfil" y "fotoDocumento" se utilizan para manejar la selección de archivos, como la foto de perfil y el documento de identidad. Se verifican los tipos de archivo y se realizan acciones correspondientes.

```javascript
    fotoPerfil(event) {
      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es una imagen png o jpg
      if (file.type === 'image/png' || file.type === 'image/jpeg') {

        // Realiza las operaciones que necesites con el archivo
        this.foto = file;

        this.cargaFoto();

      } else {
        console.log('El archivo seleccionado no es una imagen png o jpg');
      }
    },
    fotoDocumento(event) {
      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es un pdf
      if (file.type === 'application/pdf') {
        console.log('Archivo PDF seleccionado:', file);

        // Realiza las operaciones que necesites con el archivo
        this.documento = file;

      } else {
        console.log('El archivo seleccionado no es un PDF');
      }

```
- Los métodos "cargarArchivos" y "cargaFoto" utilizan la función "cargaArchivosFachada" para cargar archivos seleccionados, como el documento de identidad y la foto de perfil. Los resultados de estas operaciones se almacenan en las propiedades "documentoResponse" y "fotoResponse".

```javascript
      this.cargarArchivos();
    },
    async cargarArchivos() {
      this.documentoResponse = await cargaArchivosFachada(this.documento, "doc-identidad", this.email);
    },
    async cargaFoto() {
      this.fotoResponse = await cargaArchivosFachada(this.foto, "fotografia", this.email);
    },
```
- El método "calcularEdad" toma la fecha de nacimiento y calcula la edad en base a la fecha actual.

```javascript
    calcularEdad(fechaNacimiento) {
      const hoy = new Date();
      const cumpleanos = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - cumpleanos.getFullYear();
      const mes = hoy.getMonth() - cumpleanos.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }

      return edad;
    },
```

- El método "registrarUsuario" realiza la validación del formulario y, si la validación es exitosa, crea un objeto "usuario" con los datos proporcionados. También verifica si el usuario es mayor de 30 años y se verifica si la contraseña y su confirmación coinciden. Por último, utiliza "registrarUsuarioFachada" para enviar la información del usuario al servidor y registrar al nuevo usuario. Además, se envía un correo de notificación al usuario.

```javascript
    async registrarUsuario() {
      if (this.password !== this.passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const fechaNacimiento = new Date(this.fechaNacimiento);
      const edad = this.calcularEdad(fechaNacimiento);

      // Verifica si el usuario es menor de 30 años
      if (edad < 30) {
        alert('Lo sentimos, solo se permiten registros para usuarios mayores de 30 años.');
        return;
      }

      if (this.fotoResponse) {
        var usuario = {
          id: 0,
          nombres: this.nombres,
          apellidos: this.apellidos,
          email: this.email,
          password: this.password,
          rol: "ATL",
          estado: true,
          direccion: this.direccion,
          sexo: this.genero,
          fechaNacimiento: this.transformarFecha(this.fechaNacimiento),
          ciudad: this.ciudad,
          documentoIdentidad: this.documentoResponse,
          fotografia: this.fotoResponse,
          idAsociacion: this.idfederacion
        };
      } else {
        var usuario = {
          id: 0,
          nombres: this.nombres,
          apellidos: this.apellidos,
          email: this.email,
          password: this.password,
          rol: "ATL",
          estado: true,
          direccion: this.direccion,
          sexo: this.genero,
          fechaNacimiento: this.transformarFecha(this.fechaNacimiento),
          ciudad: this.ciudad,
          documentoIdentidad: this.documentoResponse,
          fotografia: null,
          idAsociacion: this.idfederacion
        };
      }

      localStorage.setItem("emailReg", this.email)

      await registrarUsuarioFachada(usuario)
        .then(async (response) => {
          try {
            console.log(response.status);
            if (response.status === 410) {
              alert("Ya existe un usuario con el email:" + this.email)
            } else {
              // Crear una instancia del componente Vue
              const Vue = require('vue');
              const app = Vue.createApp(NotificacionRegistroInicial);

              const tempDiv = document.createElement('div');
              document.body.appendChild(tempDiv);
              const instance = app.mount(tempDiv);

              const htmlContent = instance.$el.outerHTML;
              const body = {
                toUser: this.email,
                subject: "ANAME: Registro Inicial de Usuario",
                htmlContent: htmlContent

              }
              enviarHTMLFachada(body);
              document.body.removeChild(tempDiv);
         ;


              alert("Usuario registrado con éxito, un administrador revisará la solicitud para asociarse a la federación seleccionada.")
              this.id = null;
              this.nombres = null;
              this.apellidos = null;
              this.email = null;
              this.password = null;
              this.perfil = null;
              this.estado = null;
              this.direccion = null;
              this.genero = null;
              this.fechaNacimiento = null;
              this.ciudad = null;
              this.foto = null;
              this.documento = null;
              this.fotoResponse = null;
              this.documentoResponse = null;
              this.idfederacion = null;
              this.passwordConfirm = null;
              this.federaciones = await this.listarFederaciones()
              

            }
          } catch (error) {
            alert("Ha ocurrido un error al procesar la respuesta del servidor")
            console.log(error);
          }
        })
        .catch((error) => {
          alert("Ha ocurrido un error al guardar, pruebe a cambiar el nombre de usuario")
          console.log(error);
        });
        localStorage.removeItem("emailReg")
    },
```

- El método "transformarFecha" toma la fecha en el formato 'YYYY-MM-DD' del input date y le agrega la hora y minutos necesarios para formar un LocalDateTime.

```javascript
    transformarFecha(fecha) {
      // La fecha viene en el formato 'YYYY-MM-DD' desde el input date
      // Agrega la hora y minutos necesarios para formar un LocalDateTime
      return `${fecha}T00:00:00`;
    },
  },
}

```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la página.

```css
#cont {
  width: auto;
  margin: 30px auto;
  background-color: #edf3f5;
  border: 5px solid #003153;
  border-radius: 12px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
}

@media (min-width: 768px) {
  #cont {
    width: 40%;
  }
}

@media (max-width: 767px) {
  #cont {
    width: 95%;
  }
}

h2 {
  text-align: center;
  color: #003153;
}


.bordeCaja {
  border: 2px solid #2660a4;
}

.colorTexto {
  color: #000000;
}

.btn {
  margin: 10px 40%;
  border-color: #1a1c1c;
}
```
