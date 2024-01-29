<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>

    <div class="container">
        <h2 class="fw-bold">Campeonatos</h2>
        <div class="table-responsive-sm">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" id="encabezadoCamp">Campeonato</th>
                        <th scope="col" id="encabezadoCamp">Comprobante de pago</th>
                        <th scope="col" id="encabezadoCamp">Ficha de inscripción</th>
                        <th scope="col" id="encabezadoCamp">Pago realizado</th>
                        <th scope="col" id="encabezadoCamp">Ficha de inscripción firmada</th>
                        <th scope="col" id="encabezadoCamp">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><a href="" download>Descargar comprobante</a></td>
                        <td><a href="" download>Descargar ficha de inscripción</a></td>
                        <td>
                            <form enctype="multipart/form-data">
                                <div>
                                    <label class="fw-bold" for="comprobantePago">Subir comprobante</label>
                                    <input type="file" id="comprobantePago">
                                </div>
                                <br>
                                <button type="submit" class="btn btn-primary">Enviar</button>
                                <!-- <input type="submit" value="Enviar" /> -->
                            </form>
                        </td>
                        <td>
                            <form enctype="multipart/form-data">
                                <div>
                                    <label class="fw-bold" for="fichaInscripcion">Subir ficha</label>
                                    <input type="file" id="fichaInscripcion">
                                </div>
                                <br>
                                <button type="submit" class="btn btn-primary">Enviar</button>
                                <!-- <input type="submit" value="Enviar" /> -->
                            </form>
                        </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pie de página -->
    <PiePagina />
</template>
  
<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import BarraNavPro from "@/components/BarraNavPro.vue";


export default {
    name: "CampeonatoCompetidor",
    components: {
      BarraNavPro,
        PiePagina,
        BarraNav,
    },
}
</script>

<style>
/* Estilos de Campeonatos competidor */
#encabezadoCamp {
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
</style>