
<template>
  <div class="factura" id="divToPrint">
    <header>
      <img src="@/assets/img/logofin.png" alt="" width="40" height="40" align="left">
      <h1 align="left">FACTURA</h1>
    </header>
    <br>

    <main>
      <section id="datos-cliente">
        <h5 align="left" color="#1a1c1c">CLIENTE</h5>

        <div class="table-responsive">
          <table class="table-responsive table-borderless align-middle" id="tablaDatosCliente">
            <tr>
              <th>Nombres: </th>
              <td><label>{{ nombreCompetidor }}</label></td>
            </tr>
            <tr>
              <th>E-mail: </th>
              <td><label>{{ emailCompetidor }}</label></td>
            </tr>
          </table>
        </div>
      </section>


      <section id="items" vertical-align="middle">
        <h5 align="left" color="#1a1c1c">DETALLE</h5>
        <div class="table-responsive">
          <table class="table table-responsive table-borderless align-middle" id="tablaDetalle">
            <thead>
              <tr>
                <th>PRUEBAS</th>
                <th>PRECIO</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="(l, index) in pruebas3" :key="l">
                <td>{{ l.nombre }}</td>
                <td >
                  <p v-if="index === 1" rowspan="3">{{ costoNoSocio }}</p>
                  <p v-else>{{ l.precio }}</p>
                </td>
              </tr> -->
              <tr v-for="(l, index) in pruebas3" :key="l">
                <td>{{ l.nombre }}</td>
                <td>
                  <!-- Contenido de la segunda columna -->
                  <p v-if="index < 3">{{ (costoNoSocio / pruebas3.length).toFixed(2) }}</p>
                  <!-- <tr v-if="index < 3">{{ costoNoSocio/pruebas3.length }}</tr> -->
                </td>
              </tr>

              <tr v-for="li in pruebasRes" :key="li">
                <td>{{ li.nombre }}</td>
                <td>
                  <!-- Contenido de la segunda columna para pruebas adicionales -->
                  <p>{{ costoPruebaAdicional }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>



      <section id="totales">
        <div class="container" id="contenedorTotales">
          <label>TOTAL A PAGAR: ${{ total }}</label>
        </div>
      </section>
      <br>

      <section id="informacion-pago" vertical-align="middle">
        <label><b>Información para el pago</b></label>
        <br>
        <label for="banco">Institución financiera: {{ institucionFinanciera }}</label><br>
        <label for="titular-cuenta">Nombre del titular: {{ titularCuenta }}</label><br>
        <label for="numero-cuenta">Número de cuenta: {{ cuentaBancaria }}</label><br>
      </section>
      <br>

      <!--Botón de descarga-->
      <div class="container" vertical-align="middle">
        <button class="btn btn-primary rounded" id="btn-descarga" @click="printDiv()">Descargar</button>
      </div>
      <br>

      <!--Botón de regresar-->
      <div class="container" vertical-align="middle">
        <a href="/ficha"><button class="btn btn-primary rounded" id="btn-regresar">Regresar</button></a>
      </div>
    </main>
  </div>
</template>

<script>
import jsPDF from "jspdf";

import { obtenerCompetidorPorUseryCampFachada, obtenerPreciosPorCampFachada } from "@/assets/js/Competidor"
import "@/router/index.js"
export default {
  data() {

    return {
      nombreCompetidor: null,
      emailCompetidor: sessionStorage.getItem("email"),
      pruebas3: [],
      pruebasRes: [],
      total: null,
      listaCampInscritosUserEmail: [],
      listaPruebas: [],
      compEncontrado: null,
      costoSocio: null,
      costoNoSocio: null,
      costoPruebaAdicional: null,
      cuentaBancaria: null,
      titularCuenta: null,
      institucionFinanciera: null,
    };
  },
  props: {
    idCampeonato: {
      type: Number,
      required: true,
    },
  },

  async mounted() {

    this.obtenerPreciosCamp();
    this.asignarValores();
  },


  methods: {
    descargar() {
      var doc = new jsPDF("p", "pt", "A4");
      var margins = 0;
      var scale =
        (doc.internal.pageSize.width - margins * 2) / document.body.scrollWidth;
      doc.html(this.$refs.content, {
        x: margins,
        y: margins,
        html2canvas: {
          scale: scale,
        },
        callback: function (doc) {
          doc.output("dataurlnewwindow", { filename: "fichero-pdf.pdf" });
        },
      });

      // Usa 'margins' en lugar de 'this.margins'
      doc.fromHTML(this.$refs.content, margins, margins, {
        width: margins,
      });
      doc.save("Comprobante.pdf");
    },
    /*
        goBack() {
          window.history.pushState({}, '', document.referrer);
        },*/

    printDiv() {

      console.log("Alo");

      // Obtén el div que quieres imprimir
      const printDiv = document.getElementById('divToPrint');

      // Guarda el contenido original de la página
      const originalContent = document.body.innerHTML;

      // Reemplaza el cuerpo de la página con el contenido del div que quieres imprimir
      document.body.innerHTML = printDiv.innerHTML;

      // Abre el cuadro de diálogo de impresión
      window.print();

      // Restaura el contenido original de la página
      document.body.innerHTML = originalContent;
    },

    async obtenerPreciosCamp() {
      const { costoSocio,
        costoNoSocio,
        costoPruebaAdicional,
        cuentaBancaria,
        titularCuenta,
        institucionFinanciera } = await obtenerPreciosPorCampFachada(this.idCampeonato)

      this.costoNoSocio = costoNoSocio
      this.costoPruebaAdicional = costoPruebaAdicional
      this.costoSocio = costoSocio
      this.cuentaBancaria = cuentaBancaria
      this.titularCuenta = titularCuenta
      this.institucionFinanciera = institucionFinanciera
    },


    async asignarValores() {

      //this.idCampeonato = Number(this.idCampeonato)
      console.log(this.idCampeonato)
      const { nombres, apellidos, pruebas } = await obtenerCompetidorPorUseryCampFachada(this.idCampeonato, sessionStorage.getItem("email"))

      console.log("competidor: " + pruebas)
      this.nombreCompetidor = nombres + " " + apellidos;
      this.listaPruebas = pruebas;
      console.log("Lista de pruebas asignada:", this.listaPruebas);

      console.log(this.listaPruebas);
      this.random();
      console.log("Lista 3: " + this.pruebas3.length);


    },
    cerrar() {
      window.close();
    },
    random() {
      // Asegurarse de que pruebas3 esté definido incluso si listaPruebas tiene menos de 3 elementos
      this.pruebas3 = this.listaPruebas.slice(0, 3);
      // Si hay más de 3 elementos, asignar el resto a pruebasRes
      if (this.listaPruebas.length > 3) {
        this.pruebasRes = this.listaPruebas.slice(3);
      } else {
        // Si listaPruebas tiene 3 o menos elementos, asegurarse de que pruebasRes esté vacío
        this.pruebasRes = [];
      }
      if (!this.pruebasRes.length >= 1) {
        this.total = this.costoNoSocio
      } else {
        this.total = this.costoNoSocio + (this.pruebasRes.length * this.costoPruebaAdicional)
      }
    },
  },


};
</script>


<style scoped>
@media print {
  #btn-descarga {
    display: none;
  }

  #btn-regresar {
    display: none;
  }
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
  color: #edf3f5;
}

.factura {
  width: 800px;
  margin: 0 auto;
  /*border: 1px solid #1a1a1c;*/
  padding: 20px;
}

header {
  display: flex;
  /*justify-content: space-between;*/
  padding: 20px;
  background-color: #52bad1;
}

h1 {
  font-size: 2em;
}

#datos-cliente {
  margin-bottom: 20px;
}

#items {
  margin-bottom: 20px;
}

#tablaDatosCliente {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(102, 153, 153, 0.5);

  th,
  td {
    padding: 10px;
  }

}

#tablaDetalle {
  border-collapse: collapse;


  th {
    background-color: rgba(102, 153, 153, 0.5);
  }

  th,
  td {
    padding: 10px;
  }
}


#totales {
  background-color: #eeb902;
  margin-bottom: 20px;
}

#informacion-pago {
  background-color: #edf3f5;
  padding: 2%;
}

#contenedorTotales {
  padding: 2%;
}
</style>
