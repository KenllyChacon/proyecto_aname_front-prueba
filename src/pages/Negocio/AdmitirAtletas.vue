<template>
    <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>

  <!--Contenido-->
  <div class="page-content">
    <br>
    <h2><b>Admitir Atletas</b></h2>

    <!-- <select>Filtrar por asociación</select> -->
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

    <div class="table-responsive">
        <table class="table table-responsive table-bordered">
            <thead>
                <tr>
                    <th id="encTablaAdm">Usuario</th>
                    <th id="encTablaAdm">Documento de identidad</th>
                    <th id="encTablaAdm">Aprobar usuario</th>
                    <th id="encTablaAdm">Comprobante de pago</th>
                    <th id="encTablaAdm">Aprobar pago de asociación</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre usuario</td>
                    <td><a href="" download>Descargar documento de identidad</a></td>
                    <td>
                      <button class="btn btn-primary">Aprobar usuario</button>
                      <button class="btn btn-primary">Denegar usuario</button>
                    </td>
                    <td><a href="" download>Descargar comprobante de pago</a></td>
                    <td>
                      <button class="btn btn-primary">Aprobar pago</button>
                      <button class="btn btn-primary">Denegar pago</button>
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
import { listaAsociacionesCompetidorFachada } from "@/assets/js/Competidor";

export default {
  data () {
    return {
      federaciones: [],
      idfederacion: null,
    };
  },

  mounted() {
    this.listarFederaciones();
  },

  methods: {
    async listarFederaciones() {
      this.federaciones = await listaAsociacionesCompetidorFachada();
      console.log(this.federaciones)
    },
  },

  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
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