<template>
  <div class="container-fluid" id="fondoPag">
    <div id="login">
      <img src="@/assets/img/logofin.png" id="logo">
      <h2 class="fw-bold">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <label for="username" class="form-label"> Ingrese su email: </label>
        <input id="username" placeholder="Ingrese su email" class="form-control" type="text" v-model="email" required>

        <label for="password" class="form-label"> Contraseña:</label>
        <div class="input-group mb-3">
          <input id="password" placeholder="Ingrese la contraseña" class="form-control" type="password" v-model="password"
            required>
          <!--    <button class="btn btn-outline-secondary" type="button" id="btnMostrar">
          <i class="bi bi-eye-fill"></i>
        </button>-->
        </div>

        <button type="submit" class="btn btn-dark">Iniciar sesión</button>
        <div class="loader" v-if="loading"></div>
      </form>

      <!--Regresar a la página de inicio-->
      <div class="container" vertical-align="middle">
        <a href="/"><button class="btn btn-primary rounded" id="btn-cancelar">Cancelar</button></a>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import "@/router/index.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true;
      axios.post('https://aname-a05m.onrender.com/API/Aname/V1/login', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.loading = false;
          //console.log("**********EMAIL*************" +this.email)
          const token = response.data.Usuario.token
          const rol = response.data.Usuario.rol
          const estado = response.data.Usuario.estado // Agregamos el estado
          const id = response.data.Usuario.id
          const idAsociacion = response.data.Usuario.idAsociacion
          const socio = response.data.Usuario.socio
          console.log("*******************ESTADO**********************" + estado)
          // console.log("**********************TOKEN*******************" + token)
          console.log("ROLES" + rol)
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('rol', rol)
          sessionStorage.setItem('email', this.email)
          sessionStorage.setItem('estado', estado)
          sessionStorage.setItem('id', id)
          sessionStorage.setItem('socio', socio)
          // Guardamos el estado
          if (estado) {
            sessionStorage.setItem('mostrar', true)// Verificamos si el estado es true
            this.$router.push('/')// redirigir a la página principal
          } else {
            alert('La cuenta está desactivada temporalmente, un administrador autorizará su ingreso') // Mostramos un mensaje de error si el estado es false
          }
        })
        .catch(error => {
          this.loading = false;
          console.error(error)
          alert('Credenciales incorrectas')
        })
    }



  }



}
/*
  created() {
    this.showNavbar = false
  },
  methods: {
    login() {
      axios.post('http://localhost:8081/API/MarkWeb/V1/usuario/login', {
        email: this.email,
        password: this.password
      })
          .then(response => {
            const token = response.data.token
            const roles = response.data.roles
            const estado = response.data.estado // Agregamos el estado
            localStorage.setItem('token', token)
            localStorage.setItem('roles', JSON.stringify(roles))
            localStorage.setItem('username', this.email)
            localStorage.setItem('estado', estado) // Guardamos el estado
            if (estado) { // Verificamos si el estado es true
              this.$router.push('/') // redirigir a la página principal
            } else {
              alert('Tu cuenta está desactivada') // Mostramos un mensaje de error si el estado es false
            }
          })
          .catch(error => {
            console.error(error)
            alert('Credenciales incorrectas')
          })
    }

  },
  mounted() {
    var btnMostrar = document.getElementById("btnMostrar");
    var password = document.getElementById("password");

    btnMostrar.addEventListener("click", function () {
      if (password.type === "password") {
        password.type = "text";
        btnMostrar.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
      } else {
        password.type = "password";
        btnMostrar.innerHTML = '<i class="bi bi-eye-fill"></i>';
      }
    });
  }
}*/
</script>

<style scoped>
#fondoPag {
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #edf3f5;
  height: 100vh;
}

#logo {
  height: 70px;
  margin-bottom: 20px;
}

#login {
  width: auto;
  margin: auto;
  background-color: white;
  /* margin: 70px auto; */
  /* background-color: #efca08; */
  border: 7px solid #003153;
  border-radius: 12px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  padding-top: 30px;
}

input {
  margin-bottom: 10px;
  height: 40px;
  border: 2px solid #2660a4;
}

h2 {
  /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
  margin-bottom: 20px;
  text-align: center;
  color: #003153;
}

@media (min-width: 768px) {
  #fondoPag {
    width: 40%;
  }
}

@media (max-width: 767px) {
  #fondoPag {
    width: 100%;
  }
}

.btn {
  background-color: #003153;
  margin: 10px 40%;
  border-color: #1a1c1c;
  color: #edf3f5;
}

/* button {
  align-content: center;
  text-align: center;
  margin: 10px 35%;
  //padding: auto;
} */

/* #password {
  width: 285px;
} */

/* #btnMostrar {
  margin-top: 0px;
  height: 40px;
  margin-right: 0px;
} */

/* .mb-3 {
  width: 500px;
} */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}

@keyframes l13 {
  100% {
    transform: rotate(1turn)
  }
}
</style>
