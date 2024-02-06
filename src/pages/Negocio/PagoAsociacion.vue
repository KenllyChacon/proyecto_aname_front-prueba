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
    <h2><b>Información de Pago</b></h2>

    <h2><b>{{ nombreAsociacion }}</b></h2>

    <div class="table-responsive">
      <table class="table table-responsive table-bordered">
        <thead>
          <tr>
            <th id="encTablaAdm">Cuenta Nro</th>
            <th id="encTablaAdm">Titular de la cuenta</th>
            <th id="encTablaAdm">Institución financiera</th>
            <th id="encTablaAdm">Costo</th>
            <th id="encTablaAdm">Comprobante de pago</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ numeroCuenta }}</td>
            <td>{{ titular }}</td>
            <td>{{ institucionFinanciera }}</td>
            <td>{{ costo }}</td>
            <td>
              <form enctype="multipart/form-data" @submit.prevent="enviarPago()">
                <div class="form-group">
                  <label class="colorTexto fw-bold"> Subir comprobante de pago:</label>
                  <input type="file" @change="pago" accept="application/pdf" class="form-control-file">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" :disabled="cargando">Enviar</button>
                <div class="loader" v-if="cargando"></div>
              </form>
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
import { cargaArchivosFachada } from "@/assets/js/Archivo"

import { buscarCostoAsociacionFachada, buscarAsociacionUsuarioFachada, registroPagoAsociacionFachada } from "@/assets/js/Usuario"
export default {
  data() {
    return {
      mostrarBarra: true,
      cargando: false,
      nombreAsociacion: null,
      institucionFinanciera: null,
      titular: null,
      costo: null,
      numeroCuenta: null,
      idAsociacion: null,
      comprobantePago: null,
      comprobantePagoRes: null,
    };
  },

  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },

  async mounted() {
    this.idAsociacion = await buscarAsociacionUsuarioFachada(sessionStorage.getItem("email"))
    this.obtenerPrecioAsociacion()

  },

  methods: {
    async obtenerPrecioAsociacion() {
      const { nombre, costo, numeroCuenta, institucionFinanciera, titular } = await buscarCostoAsociacionFachada(this.idAsociacion)

      this.nombreAsociacion = nombre
      this.costo = costo
      this.numeroCuenta = numeroCuenta
      this.institucionFinanciera = institucionFinanciera
      this.titular = titular
    },

    pago(event) {

      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es un pdf
      if (file.type === 'application/pdf') {
        console.log('Archivo PDF seleccionado:', file);

        // Realiza las operaciones que necesites con el archivo
        this.comprobantePago = file;

      } else {
        console.log('El archivo seleccionado no es un PDF');
      }

      this.cargarPago();
    },

    async cargarPago() {
      this.cargando = true; // Muestra el cargador antes de que inicie la carga

      try {
        this.comprobantePagoRes = await cargaArchivosFachada(this.comprobantePago, "pago-asociacion", sessionStorage.getItem("email"));
      } catch (error) {
        console.error("Error loading registration file:", error);
        alert("Error cargando el comprobante de pado");
      } finally {
        this.cargando = false; // Oculta el cargador después de que termine la carga (incluso si hay un error)
      }
    },

    async enviarPago() {

      if (this.comprobantePagoRes) {
        const pago = {
          nombre: this.comprobantePagoRes.nombre,
          username: sessionStorage.getItem("email"),
          link: this.comprobantePagoRes.link,
          extension: this.comprobantePagoRes.extension
        };

        console.log(pago)

        try {
          await registroPagoAsociacionFachada(pago);
          alert('Pago enviado con éxito');
        } catch (error) {
          alert('No se pudo enviar el pago');
        }


        this.comprobantePago = null
        this.comprobantePagoRes = null
        this.obtenerPrecioAsociacion()
      } else {
        alert('Ningún documento cargado');
      }

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

.page-content {
  padding-bottom: 50%;
}

.loader {
  width: 120px;
  height: 20px;
  -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) left/20% 100%;
  background:
    linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat #ddd;
  animation: l7 1s infinite steps(6);
}
</style>
