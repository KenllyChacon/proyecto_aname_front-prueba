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
    <h2><b>Admitir Atletas</b></h2>

    <select>Filtrar por asociación</select>

    <div class="table-responsive">
        <table class="table table-responsive table-bordered">
            <thead>
                <tr>
                    <th id="encTablaAdm">Usuario</th>
                    <th id="encTablaAdm">Documento de identidad</th>
                    <th id="encTablaAdm">Verificar edad</th>
                    <th id="encTablaAdm">Comprobante de pago</th>
                    <th id="encTablaAdm">Admitir atleta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre usuario</td>
                    <td>Descargar documento de identidad</td>
                    <td>
                      <button class="btn btn-primary">Edad corresponde</button>
                      <button class="btn btn-primary">Edad no corresponde</button>
                    </td>
                    <td>Descargar comprobante de pago</td>
                    <td>
                      <button class="btn btn-primary">Admitir atleta</button>
                      <button class="btn btn-primary">Rechazar atleta</button>
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