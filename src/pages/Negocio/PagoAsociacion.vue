<template>
    <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav/>
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>

  <!--Contenido-->
  <div class="page-content">
    <h2><b>Información de Pago</b></h2>

    <div class="table-responsive">
        <table class="table table-responsive table-bordered">
            <thead>
                <tr>
                    <th id="encTablaAdm">Titular de la cuenta</th>
                    <th id="encTablaAdm">Institución financiera</th>
                    <th id="encTablaAdm">ID</th>
                    <th id="encTablaAdm">Asociación</th>
                    <th id="encTablaAdm">Comprobante de pago</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre usuario</td>
                    <td>Nombre Institución</td>
                    <td>ID</td>
                    <td>Nombre Asociación</td>
                    <td>Ingresar comprobante de pago</td>
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

export default {
  data () {
    return {

    };
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

.page-content {
  padding-bottom: 50%;
}

</style>