<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>

  <!--Contenido-->
  <div class="page-content">
    <br>
    <h2><b>Admitir Atletas</b></h2>

    <!-- <select>Filtrar por asociación</select> -->
    <!-- <div>
      <label for="" id="labelSup">Federación: </label>
      <select class="form-select bordeCaja" aria-label="Seleccionar federacion" style="color: #000000;"
        v-model="idfederacion">
        <option v-for="f in federaciones" :key="f.id" :value="f.id">{{
          f.nombre
        }}
        </option>
      </select>
    </div>
    <br> -->
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

  <!-- Pie de página -->
  <PiePagina />
</template>

<script>
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
</script>

<style>
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
</style>