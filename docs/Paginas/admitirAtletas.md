# AdmitirAtletas.vue

Archivo que implementa la página que permite al administrador de alguna asociación deportiva admitir atletas. Para esto verifica primero el documento de identidad y puede aprobar o negar el usuario, si lo aprueba el usuario podrá iniciar sesión y adjuntar el pago de membresía.

Posterior a este proceso, el administrador podrá descargar el comprobante de pago de membresía y aprobar o denegar el pago realizado por el usuario. Si lo aprueba el usuario pasa a ser socio quedando admitido como atleta.  

## Estructura HTML

### Elementos de la página Admitir Atletas

Fragmento de código que utiliza directivas condicionales de Vue.js (v-if y v-else) para alternar entre dos componentes de barra de navegación basados en el valor de la variable mostrarBarra.

```html
  <!--Barra de navegación-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>
```

El siguiente código HTML crea una tabla que muestra información detallada sobre cada atleta, incluyendo su correo electrónico, nombre completo, fecha de nacimiento, estado, asociación, enlaces para descargar documentos de identidad y comprobantes de pago. También se incluyen botones para que el administrador pueda aprobar o denegar usuarios y pagos de membresía.  

```html
  <!--Contenido-->
  <div class="page-content">
    <br>
    <h2><b>Admitir Atletas</b></h2>
    <br>
    <div class="table-responsive">
      <table class="table table-responsive table-bordered">
        <thead>
          <tr>
            <th id="encTablaAdm">Usuario</th>
            <th id="encTablaAdm">Nombres</th>
            <th id="encTablaAdm">Fecha de nacimiento</th>
            <th id="encTablaAdm">Estado</th>
            <th id="encTablaAdm">¿Está asociado?</th>
            <th id="encTablaAdm">Documento de identidad</th>
            <th id="encTablaAdm">Aprobar usuario</th>
            <th id="encTablaAdm">Comprobante de pago</th>
            <th id="encTablaAdm">Aprobar pago de membresía</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in listaUsuarios" :key="u">
            <td>{{ u.email }}</td>
            <td>{{ u.nombres + " " + u.apellidos }}</td>
            <td>{{ new Date(u.fechaNacimiento).toLocaleDateString() }}</td>

            <td>{{ u.estado ? 'Activado' : 'Desactivado' }}</td>
            <td>{{ u.socio ? 'Socio' : 'No socio' }}</td>

            <td><a :href="u.documentoIdentidad" download>Descargar documento de identidad</a></td>

            <td>
              <button class="btn btn-primary" @click="aprobarRegistroUsuario(u.email)">Aprobar usuario</button>
              <button class="btn btn-primary" @click="negarRegistroUsuario(u.email)">Denegar usuario</button>
            </td>
            <td><a :href="u.pagoAsociacion" download>Descargar comprobante de pago</a></td>
            <td>
              <button class="btn btn-primary" @click="aprobarUsuarioAsociado(u.email, u.pagoAsociacion)">Aprobar pago</button>
              <button class="btn btn-primary" @click="negarUsuarioAsociado(u.email, u.pagoAsociacion)">Denegar pago</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
```
Se inserta el componente "PiePagina" en el pie de página de la página actual.

```html
  <!-- Pie de página -->
  <PiePagina />
```

## Funcionalidad JS

Bloque de código que importa varios componentes y funciones relacionadas con la gestión de usuarios para que sean admitidos como atletas.

```javascript
import BarraNav from "@/components/BarraNav.vue";
import BarraNavPro from "@/components/BarraNavPro.vue";
import PiePagina from "@/components/PiePagina.vue";
// import { listaAsociacionesCompetidorFachada } from "@/assets/js/Competidor";
import {
  buscarAsociacionUsuarioFachada,
  buscarUsuariosPorAsociacionFachada,
  aprobarRegistroUsuarioFachada,
  negarRegistroUsuarioFachada,
  aprobarUsuarioAsociadoFachada,
  negarUsuarioAsociadoFachada
} from "@/assets/js/Usuario"

import { enviarHTMLFachada } from '@/assets/js/Email'
import ConfirmacionRegistro from "@/mailTemplates/ConfirmacionRegistro.vue";
import RegistroNegado from "@/mailTemplates/RegistroNegado.vue";
import PagoAsociacionAceptado from "@/mailTemplates/PagoAsociacionAceptado.vue";
import PagoAsociacionNegado from "@/mailTemplates/PagoAsociacionNegado.vue";
```

Fragmento de código que maneja la lógica relacionada con la aprobación y denegación de registros de usuarios y pagos de membresía, así como el envío de correos electrónicos de confirmación y notificación. Además, se encarga de obtener la lista de usuarios asociados a una asociación deportiva y actualizarla según sea necesario.

```javascript
export default {
  data() {
    return {
      listaUsuarios: [],
      idAsociacion: null,
    };
  },


  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },

  async mounted() {
    this.idAsociacion = await buscarAsociacionUsuarioFachada(sessionStorage.getItem("email"))
    this.buscarUsuarios()
  },

  methods: {
    async buscarUsuarios() {
      this.listaUsuarios = await buscarUsuariosPorAsociacionFachada(this.idAsociacion)
    },

    async aprobarRegistroUsuario(email) {
      try {
        await aprobarRegistroUsuarioFachada(email);

        localStorage.setItem("emailConf", email)
        const Vue = require('vue');
        const app = Vue.createApp(ConfirmacionRegistro);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Registro aprobado de Usuario",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Registro de usuario aprobado")
      } catch (error) {
        alert("Error al aprobar el registro")
      }
      await this.buscarUsuarios()

      localStorage.removeItem("emailConf")

    },

    async negarRegistroUsuario(email) {
      try {
        await negarRegistroUsuarioFachada(email);
        localStorage.setItem("emailNeg", email)
        const Vue = require('vue');
        const app = Vue.createApp(RegistroNegado);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Registro de Usuario denegado!!!!!",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Registro de usuario denegado")
      } catch (error) {
        alert("Error al denegar el registro")
      }
      await this.buscarUsuarios()
      localStorage.removeItem("emailNeg")

    },

    async aprobarUsuarioAsociado(email, pago) {
      try {
        await aprobarUsuarioAsociadoFachada(email);
        localStorage.setItem("pagoAcept", pago)
        const Vue = require('vue');
        const app = Vue.createApp(PagoAsociacionAceptado);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Confirmación de asociación",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Pago aprobado")
      } catch (error) {
        alert("Error al aprobar el pago")
      }
      await this.buscarUsuarios()
      localStorage.removeItem("pagoAcept")

    },

    async negarUsuarioAsociado(email, pago) {
      try {
        await negarUsuarioAsociadoFachada(email);
        localStorage.setItem("pagoNeg", pago)
        const Vue = require('vue');
        const app = Vue.createApp(PagoAsociacionNegado);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Asociación negada, pago no aceptado",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Pago denegado")
      } catch (error) {
        alert("Error al denegar el pago")
      }
      await this.buscarUsuarios()
      localStorage.removeItem("pagoNeg")

    },
  },
};
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la página "AdmitirAtletas.vue".

```css
.h2 {
  color: #003153;
}

#encTablaAdm {
  background-color: #52bad1;
}

.btn-primary.active {
  background-color: #1a1c1c;
  /* Color de fondo del botón activo */
  border-color: #2a2b2e;
  /*Color de borde del botón activo*/
}

.btn-primary:not(.active) {
  background-color: #003153;
  /* Color de fondo del botón inactivo */
  border-color: #003153;
  /*Color de borde del botón inactivo*/
}

.page-content {
  padding-bottom: 50%;
}
```
