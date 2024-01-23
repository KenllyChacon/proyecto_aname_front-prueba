<template>
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
        <label for="passwordConfirm" class="form-label">Confirmar Contraseña</label>
        <input type="password" class="form-control bordeCaja" id="passwordConfirm" name="passwordConfirm" v-model="passwordConfirm">
        </div>
      </div>
      
      <hr class="mb-4">

      <div class="row">
        <label for="categoria">Fecha de nacimiento:</label>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label for="year">Año</label>
          <input v-model="fechaNacimiento" type="datetime-local" class="form-control bordeCaja" id="year" name="year"
            required>
        </div>
      </div>
      <div class="form-group">


        <label for="gender">Género</label>
        <select v-model="genero" class="form-control bordeCaja" id="gender" name="gender" required>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <br>
      <div v-if="email" class="row">
        <div class="form-group">
          <label for="imageUpload" class="colorTexto fw-bold"> Seleccionar foto de perfil:</label>
          <input type="file" @change="fotoPerfil" accept="image/png, image/jpeg" class="form-control-file" id="imageUpload">
        </div>
      </div>
      <br>
      <div v-if="email" class="row">
        <div class="form-group">
          <label for="imageUpload" class="colorTexto fw-bold">Seleccionar imagen del documento:</label>
          <input type="file" @change="fotoDocumento" accept="application/pdf" class="form-control-file" id="imageUpload">
        </div>
      </div>
      <button type="submit" class="btn btn-danger">Registrar</button>

    </form>

  </div>
</template>

<script>
import { registrarUsuarioFachada } from '@/assets/js/Usuario'
import { enviarSimpleFachada } from '@/assets/js/Email'
import { cargaArchivosFachada } from '@/assets/js/Archivo'
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
    }
  },
  methods: {
    fotoPerfil(event) {
      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es una imagen png o jpg
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
      
        // Realiza las operaciones que necesites con el archivo
        this.foto = file;

        this.cargaFoto();

        } else {
         alert('El archivo seleccionado no es una iamgen jpg o png');
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
        alert('El archivo seleccionado no es un PDF');
        }

      this.cargarArchivos();
    },
    async cargarArchivos() {
      this.documentoResponse = await cargaArchivosFachada(this.documento, "doc-identidad", this.email);
    },
    async cargaFoto() {
      this.fotoResponse = await cargaArchivosFachada(this.foto, "fotografia", this.email);
    },
    registrarUsuario() {
      if (this.password !== this.passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const usuario = {
        id: 0,
        nombres: this.nombres,
        apellidos: this.apellidos,
        email: this.email,
        password: this.password,
        rol: "ATL",
        estado: true,
        direccion: this.direccion,
        sexo: this.genero,
        fechaNacimiento: this.fechaNacimiento,
        ciudad: this.ciudad,
        documentoIdentidad: this.documentoResponse,
        fotografia: this.fotoResponse
      };

      registrarUsuarioFachada(usuario)
        .then((response) => {
          try {
            console.log(response.status);
            if (response.status === 410) {
              alert("Ya existe un usuario con el email:" + this.email)
            } else {
            
              const body = {
                toUser: this.email,
                subject: "Registro Usuario",
                message: "Usuario registrado con éxito"
              }
              enviarSimpleFachada(body);
              alert("Usuario registrado con éxito")
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
            }
          } catch (error) {
            alert("Ha ocurrido un error al procesar la respuesta del servidor")
            console.log(error);
          }
        })
        .catch((error) => {
          alert("Ha ocurrido un error al guardar, prueba a cambiar el nombre de usuario")
          console.log(error);
        });
    }
  },
}
</script>
<style scoped>
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

@media (max-width:767px) {
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

</style>
