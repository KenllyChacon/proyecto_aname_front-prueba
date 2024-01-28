
<template>
  <div class="factura" id="divToPrint">
    <header>
      <h1>FACTURA</h1>
    </header>
    <main>
      <section class="datos-cliente">
        <h3>Cliente</h3>
        <ul>
          <li>Nombre: {{ nombreCompetidor }}</li>
          <li>Email: {{ emailCompetidor }}</li>
        </ul>
      </section>
      <section class="items">
        <table>
          <thead>
            <tr>
              <th>PRUEBAS</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, index) in pruebas3" :key="l">
              <td>{{ l.nombre }}</td>
              <td>
                <!-- Contenido de la segunda columna -->
                <p v-if="index === 1" rowspan="3">{{ costoNoSocio }}</p>
                <p v-else>{{ l.precio }}</p>
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
      </section>
      <section class="totales">
        <ul>
          <li>TOTAL: {{ total }}</li>
        </ul>
      </section>
      <section class="informacion-pago">
        <h3>Información para el pago</h3>
        <ul>
          <li>
            <label for="banco">Institución financiera: {{ institucionFinanciera }}</label>
          </li>
          <li>
            <label for="titular-cuenta">Nombre del titular: {{ titularCuenta }}</label>
          </li>
          <li>
            <label for="numero-cuenta">Número de cuenta: {{ cuentaBancaria }}</label>
          </li>
        </ul>
      </section>
      <table>
        <tr>
          <td>
            <button type="" class="btn-descarga" @click="printDiv()">Descargar</button>
          </td>
        </tr>
      </table>
    </main>
  </div>
</template>

<script>
import jsPDF from "jspdf";

import { obtenerCompetidorPorUseryCampFachada, obtenerPreciosPorCampFachada } from "@/assets/js/Competidor"
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
      console.log("entrada sexy");
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
  .btn-descarga {
    display: none;
  }
}

.factura {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

.datos-cliente {
  margin-bottom: 20px;
}

.items {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

.totales {
  margin-bottom: 20px;
}
</style>