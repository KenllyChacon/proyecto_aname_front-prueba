<template>
  <!--Barra navegacion-->
  <BarraNav />



  <label for="categoria">Pruebas en las que se inscribe:</label>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Seleccione</th>
      </tr>
    </thead>
  </table>

  <!-- Pie de página -->
  <PiePagina />
</template>

<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import router from "@/router/index";
import { listarPruebasFachada } from "@/assets/js/Prueba";


export default {
  name: "Inscripcion",

  data() {
    return {
      categoria: null,
    };
  },
  methods: {},
  components: {
    PiePagina,
    BarraNav,
  },
};
</script>
<style>

</style>