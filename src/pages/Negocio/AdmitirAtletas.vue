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
            <td>{{ u.socio ? 'Socio' : 'Asociado' }}</td>

            <td><a :href="u.documentoIdentidad" download>Descargar Documento de Identidad</a></td>

            <td>
              <button class="btn btn-primary" @click="aprobarRegistroUsuario(u.email)">Aprobar usuario</button>
              <button class="btn btn-primary" @click="negarRegistroUsuario(u.email)">Denegar usuario</button>
            </td>
            <td><a :href="u.pagoAsociacion" download>Descargar comprobante de pago</a></td>
            <td>
              <button class="btn btn-primary" @click="aprobarUsuarioAsociado(u.email)">Aprobar pago</button>
              <button class="btn btn-primary" @click="negarUsuarioAsociado(u.email)">Denegar pago</button>
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
        alert("Registro de usuario aprobado")
      } catch (error) {
        alert("Error al aprobar el registro")
      }
      await this.buscarUsuarios()
    },

    async negarRegistroUsuario(email) {
      try {
        await negarRegistroUsuarioFachada(email);
        alert("Registro de usuario denegado")
      } catch (error) {
        alert("Error al denegar el registro")
      }
      await this.buscarUsuarios()
    },

    async aprobarUsuarioAsociado(email) {
      try {
        await aprobarUsuarioAsociadoFachada(email);
        alert("Pago aprobado")
      } catch (error) {
        alert("Error al aprobar el pago")
      }
      await this.buscarUsuarios()
    },

    async negarUsuarioAsociado(email) {
      try {
        await negarUsuarioAsociadoFachada(email);
        alert("Pago denegado")
      } catch (error) {
        alert("Error al denegar el pago")
      }
      await this.buscarUsuarios()
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