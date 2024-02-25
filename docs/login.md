# Login.vue

Este código implementa un formulario que permite al usuario iniciar sesión en su cuenta.

## Estructura HTML

### Encabezado

El encabezado contiene el logo de ANAME y el nombre de la página.

```html
<img src="@/assets/img/logofin.png" id="logo" />
<h2 class="fw-bold">Iniciar sesión</h2>
```

### Contenido

Formulario para ingresar las credenciales de acceso a la cuenta del usuario.

```html
<form @submit.prevent="login">
  <!--Ingreso de mail-->
  <label for="username" class="form-label"> Ingrese su email: </label>
  <input
    id="username"
    placeholder="Ingrese su email"
    class="form-control"
    type="text"
    v-model="email"
    required
  />

  <!--Ingreso de contraseña-->
  <label for="password" class="form-label"> Contraseña:</label>
  <div class="input-group mb-3">
    <input
      id="password"
      placeholder="Ingrese la contraseña"
      class="form-control"
      type="password"
      v-model="password"
      required
    />
  </div>

  <!--Botón para enviar formulario-->
  <button type="submit" class="btn btn-dark">Iniciar sesión</button>
  <div class="loader" v-if="loading"></div>
</form>
```

Botón para regresar a la página de Inicio.

```html
<!--Regresar a la página de inicio-->
      <div class="container" vertical-align="middle">
        <a href="/"><button class="btn btn-primary rounded" id="btn-cancelar">Cancelar</button></a>
      </div>
    </div>
```

## Funcionalidad JS

Se importa axios y el archivo de router.

```javascript
import axios from "axios";
import "@/router/index.js";
```

Se usan las variables necesarias para almacenar los datos requeridos y se carga el método necesario para la autenticación de credenciales.

```javascript
export default {
  data() {
    return {
      //Variables para el almacenamiento de datos requeridos.
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    //Método para autenticar las credenciales del usuario.
    login() {
      this.loading = true;
      axios
        .post("https://aname-a05m.onrender.com/API/Aname/V1/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          const token = response.data.Usuario.token;
          const rol = response.data.Usuario.rol;
          //Se agrega el estado.
          const estado = response.data.Usuario.estado;
          const id = response.data.Usuario.id;
          const idAsociacion = response.data.Usuario.idAsociacion;
          const socio = response.data.Usuario.socio;
          console.log(
            "*******************ESTADO**********************" + estado
          );
          console.log("ROLES" + rol);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("rol", rol);
          sessionStorage.setItem("email", this.email);
          sessionStorage.setItem("estado", estado);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("socio", socio);
          // Se guarda el estado.
          if (estado) {
            //Se verifica si el estado es true.
            sessionStorage.setItem("mostrar", true);
            //Se redirecciona a la página principal.
            this.$router.push("/");
          } else {
            //Se muestra un mensaje de error en caso de que el estado sea false.
            alert(
              "La cuenta está desactivada temporalmente, un administrador autorizará su ingreso"
            );
          }
        })

        //Manejo de errores, en caso de que las credenciales no coincidan con las almacenadas.
        .catch((error) => {
          this.loading = false;
          console.error(error);
          alert("Credenciales incorrectas");
        });
    },
  },
};
```

## Diseño CSS

Se establecen las configuraciones de diseño.

```css
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
  margin-bottom: 20px;
  text-align: center;
  color: #003153;
}

.btn {
  background-color: #003153;
  margin: 10px 40%;
  border-color: #1a1c1c;
  color: #edf3f5;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}
```

Se ajusta la disposición de elementos según el ancho del dispositivo (responsividad).

```css
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

@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
```
