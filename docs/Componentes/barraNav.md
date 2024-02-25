# BarraNav.vue

Este código implementa un componente que permite al usuario atleta navegar entre las páginas Inicio, Inscripción y Pago de Membresía. Además, puede cerrar sesión cuando está logueado y en caso de no estarlo podrá iniciar sesión o registrarse .

## Estructura HTML

### Elementos de la barra de navegación de un usuario atleta

El primer elemento de la barra de navegación es el logo de aname que tiene un tamaño de 75x75 píxeles y se ubica en la parte izquierda de la barra.

```html
<img src="@/assets/img/logofin.png" alt="Logo" width="75" height="75">
```
El siguiente bloque permite seleccionar entre cualquiera de las tres páginas: Inicio, Inscripción y Pago de Membresía que se ubican en el orden descrito a continuación del logo. También en la parte derecha, al final de la barra de navegación podemos iniciar sesión o registrarnos, y en caso de estar logueados podemos cerrar sesión.  

```html
<!--Botón que permite seleccionar entre cualquiera de las páginas-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!--Lista de páginas entre las que podemos navegar-->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ficha" class="nav-link">Inscripción</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pagoAso" class="nav-link">Pago de Membresía</router-link>
          </li>

        </ul>
        <!--Directiva v-if para hacer que ciertos elementos se muestren o no, dependiendo del valor de la variable "mostrar".-->
        <div v-if="!mostrar" class="float-end">
          <router-link to="/login" class="btn btn-dark">Iniciar Sesión</router-link>
          <router-link to="/registro" class="btn btn-dark ms-3">Registrarse</router-link>
        </div>
        <div v-else class="float-end">
          <label for="" style="color: #edf3f5">{{email}}</label>
          <!--Uso de un componente personalizado, cuya función es cerrar sesión-->
          <LogOutComp/>
       
        </div>
      </div>
```
## Funcionalidad JS

Se importa el componente LogOutComp.vue y la función "defineComponent" para definir un nuevo componente.

```javascript
import LogOutComp from "@/components/LogOutComp.vue";
import {defineComponent} from "vue";
```

Este código define un componente Vue que incluye la definición de componentes secundarios (LogOutComp), la inicialización de propiedades de datos (mostrar y email), y la lógica para recuperar datos del sessionStorage durante la fase de montaje del componente.

```javascript
export default defineComponent({
  //Declara el componente LogOutComp como un componente secundario del componente actual. Así, el componente LogOutComp puede ser utilizado dentro del componente actual.
  components: {LogOutComp},
  data() {
    return {
      mostrar: null,
      email: null,
    }
  },
  mounted() {
    this.mostrar = sessionStorage.getItem("mostrar");
    console.log("aaaaaaaaaaaaaaaaaaa" + this.mostrar)
    this.email = sessionStorage.getItem("email");

    console.log("aaaaaaaaaaaaaaaaaaa" + this.email)
  }
})
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la barra de navegación.

```css
.navbar{
  background: #2660a4;
}

.btn{
  background-color: #52bad1;
  color: #edf3f5;
  border-color: #003153;
}

.nav-link.active {
  color: #eeb902;
}

.nav-link {
  color: #edf3f5;
}
```
