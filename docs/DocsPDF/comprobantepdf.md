# comprobante.vue

Este código genera el comprobante de pago para el atleta que se preinscribe a un campeonato.

## Estructura HTML

### Encabezado

Encabezado del documento, que contiene el logo de ANAME.

```html
<header>
  <img
    src="@/assets/img/logofin.png"
    alt=""
    width="40"
    height="40"
    align="left"
  />
  <h1 align="left">FACTURA</h1>
</header>
```

### Contenido

Se indican los datos del usuario: nombre y correo electrónico.

```html
<section id="datos-cliente">
  <h5 align="left" color="#1a1c1c">CLIENTE</h5>

  <div class="table-responsive">
    <table
      class="table-responsive table-borderless align-middle"
      id="tablaDatosCliente"
    >
      <tr>
        <th>Nombres:</th>
        <td><label>{{ nombreCompetidor }}</label></td>
      </tr>
      <tr>
        <th>E-mail:</th>
        <td><label>{{ emailCompetidor }}</label></td>
      </tr>
    </table>
  </div>
</section>
```

Tabla que detalla los precios de las pruebas seleccionadas.

```html
<section id="items" vertical-align="middle">
  <h5 align="left" color="#1a1c1c">DETALLE</h5>
  <div class="table-responsive">
    <table
      class="table table-responsive table-borderless align-middle"
      id="tablaDetalle"
    >
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
            <p v-if="index < 3">
              {{ (costoNoSocio / pruebas3.length).toFixed(2) }}
            </p>
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
```

Se indica el total a pagar.

```html
<section id="totales">
  <div class="container" id="contenedorTotales">
    <label>TOTAL A PAGAR: ${{ total }}</label>
  </div>
</section>
```

Se proporcionan los datos para que el usuario realice el pago.

```html
<section id="informacion-pago" vertical-align="middle">
  <label><b>Información para el pago</b></label>
  <br />
  <label for="banco">Institución financiera: {{ institucionFinanciera }}</label
  ><br />
  <label for="titular-cuenta">Nombre del titular: {{ titularCuenta }}</label
  ><br />
  <label for="numero-cuenta">Número de cuenta: {{ cuentaBancaria }}</label
  ><br />
</section>
```

### Botones

Botón para descargar el comprobante.

```html
<!--Botón de descarga-->
<div class="container" vertical-align="middle">
  <button class="btn btn-primary rounded" id="btn-descarga" @click="printDiv()">
    Descargar
  </button>
</div>
```

Botón para regresar a la página anterior.

```html
<!--Botón de regresar-->
<div class="container" vertical-align="middle">
  <a href="/ficha"
    ><button class="btn btn-primary rounded" id="btn-regresar">
      Regresar
    </button></a
  >
</div>
```

## Funcionalidad JS

Se importan los archivos necesarios para obtener los precios de las pruebas a través de la API, el router y el script para generar archivos PDF.

```javascript
import jsPDF from "jspdf";
import {
  obtenerCompetidorPorUseryCampFachada,
  obtenerPreciosPorCampFachada,
} from "@/assets/js/Competidor";
import "@/router/index.js";
```

Se consumen los datos requeridos y se implementan los métodos necesarios para realizar el cálculo del valor a pagar y para generar el archivo PDF.

```javascript
export default {
  data() {
    return {
      //se utilizan las variables siguientes para almacenar los datos requeridos
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

  //Define la propiedad idCampeonato, de tipo número y es requerida para que siempre sea proporcionada y se garantice la integridad de datos y consistencia en la comunicación entre componentes.
  props: {
    idCampeonato: {
      type: Number,
      required: true,
    },
  },

  //Utiliza métodos de la API para asignar los precios correspondientes a las pruebas seleccionadas.
  async mounted() {
    this.obtenerPreciosCamp();
    this.asignarValores();
  },

  methods: {
    //Genera el archivo PDF del comprobante en formato A4.
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

    //Permite la impresión del comprobante PDF.
    printDiv() {
      console.log("Alo");

      // Se obtiene el div a imprimir.
      const printDiv = document.getElementById("divToPrint");

      // Guarda el contenido original de la página.
      const originalContent = document.body.innerHTML;

      // Reemplaza el cuerpo de la página con el contenido del div que se necesita imprimir.
      document.body.innerHTML = printDiv.innerHTML;

      // Abre el cuadro de diálogo de impresión.
      window.print();

      // Restaura el contenido original de la página.
      document.body.innerHTML = originalContent;
    },

    //Obtención de precios de las pruebas según el tipo de membresía, así como los datos necesarios para realizar el pago.
    async obtenerPreciosCamp() {
      const {
        costoSocio,
        costoNoSocio,
        costoPruebaAdicional,
        cuentaBancaria,
        titularCuenta,
        institucionFinanciera,
      } = await obtenerPreciosPorCampFachada(this.idCampeonato);

      this.costoNoSocio = costoNoSocio;
      this.costoPruebaAdicional = costoPruebaAdicional;
      this.costoSocio = costoSocio;
      this.cuentaBancaria = cuentaBancaria;
      this.titularCuenta = titularCuenta;
      this.institucionFinanciera = institucionFinanciera;
    },

    //Asigna los datos del usuario y las pruebas seleccionadas.
    async asignarValores() {
      console.log(this.idCampeonato);
      const { nombres, apellidos, pruebas } =
        await obtenerCompetidorPorUseryCampFachada(
          this.idCampeonato,
          sessionStorage.getItem("email")
        );

      console.log("competidor: " + pruebas);
      this.nombreCompetidor = nombres + " " + apellidos;
      this.listaPruebas = pruebas;
      console.log("Lista de pruebas asignada:", this.listaPruebas);

      console.log(this.listaPruebas);
      this.random();
      console.log("Lista 3: " + this.pruebas3.length);
    },

    //Cierra el cuadro de impresión.
    cerrar() {
      window.close();
    },

    //Garantiza la diferenciación de tarifas en caso de elegirse más de tres pruebas.
    random() {
      // Se asegura de que pruebas3 esté definido incluso si listaPruebas tiene menos de 3 elementos.
      this.pruebas3 = this.listaPruebas.slice(0, 3);
      // Si hay más de 3 elementos, se asigna el resto a pruebasRes.
      if (this.listaPruebas.length > 3) {
        this.pruebasRes = this.listaPruebas.slice(3);
      } else {
        // Si listaPruebas tiene 3 o menos elementos, se asegura de que pruebasRes esté vacío.
        this.pruebasRes = [];
      }
      if (!this.pruebasRes.length >= 1) {
        this.total = this.costoNoSocio;
      } else {
        this.total =
          this.costoNoSocio +
          this.pruebasRes.length * this.costoPruebaAdicional;
      }
    },
  },
};
```

## Diseño CSS

Se establecen las configuraciones de diseño.

```css
.btn-primary.active {
  /* Color de fondo del botón activo */
  background-color: #1a1c1c;
  /*Color de borde del botón activo*/
  border-color: #2a2b2e;
}

.btn-primary:not(.active) {
  /* Color de fondo del botón inactivo */
  background-color: #003153;
  /* Color de borde del botón inactivo */
  border-color: #003153;
  /*Color de borde del botón inactivo*/
  color: #edf3f5;
}

.factura {
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
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
```

Se inhabilita la impresión de los botones.

```css
@media print {
  #btn-descarga {
    display: none;
  }

  #btn-regresar {
    display: none;
  }
}
```
