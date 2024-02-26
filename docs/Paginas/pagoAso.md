# PagoAsociacion.vue

Este código representa la página de pago de membresía que los atletas deben realizar a la asociación en la que se hayan registrado.

## Estructura HTML

### Barra de Navegación

El primer elemento de la página es la barra de navegación perteneciente a los usuarios.


```html
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>
```

### Contenido

Contiene los datos de pago de la asociación y una función para subir un archivo correspondiente al comprobante de pago.

```html
  <!--Contenido-->
  <div class="page-content">
    <br>
    <h2><b>Pago de Membresía</b></h2>

    <h2><b>{{ nombreAsociacion }}</b></h2>

    <div class="table-responsive">
      <table class="table table-responsive table-bordered">
        <thead>
          <tr>
            <th id="encTablaAdm">Número de cuenta</th>
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
```
### Pie de página

Contiene información de la asociación junto con enlaces que redirigen al usuario a la página oficial de ASUDAMA, a la página oficial de la Universidad Central del Ecuador y a la página oficial de ANAME en Facebook.

```html
    <PiePagina />
```

## Funcionalidad JS

Se importan los componentes necesarios desde los diferentes archivos.

```javascript
import BarraNav from "@/components/BarraNav.vue";
import BarraNavPro from "@/components/BarraNavPro.vue";
import PiePagina from "@/components/PiePagina.vue";
import { cargaArchivosFachada } from "@/assets/js/Archivo"
import NotificacionPagoAsociacion from "@/mailTemplates/NotificacionPagoAsociacion.vue"
import { enviarHTMLFachada } from '@/assets/js/Email'

import { buscarCostoAsociacionFachada, buscarAsociacionUsuarioFachada, registroPagoAsociacionFachada } from "@/assets/js/Usuario"

```

Se definen cada uno de los componentes.
- data(): Define el estado inicial de cada componente.

```javascript
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
```
- components: Declara los componentes que se utilizan dentro de este componente.

```javascript
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },

```
- mounted(): Se ejecuta después de que el componente ha sido montado. Obtiene el ID de la asociación asociada al usuario a través de la función "buscarAsociacionUsuarioFachada" y luego se utiliza ese ID para obtener la información de costos de la asociación mediante "buscarCostoAsociacionFachada".

```javascript
  async mounted() {
    this.idAsociacion = await buscarAsociacionUsuarioFachada(sessionStorage.getItem("email"))
    this.obtenerPrecioAsociacion()

  },

```
- El método "obtenerPrecioAsociacion" se utiliza para obtener y asignar los detalles de la asociación a las propiedades de datos.

```javascript
  methods: {
    async obtenerPrecioAsociacion() {
      const { nombre, costo, numeroCuenta, institucionFinanciera, titular } = await buscarCostoAsociacionFachada(this.idAsociacion)

      this.nombreAsociacion = nombre
      this.costo = costo
      this.numeroCuenta = numeroCuenta
      this.institucionFinanciera = institucionFinanciera
      this.titular = titular
    },

```
- El método "pago(event)" se activa cuando se selecciona un archivo para el comprobante de pago. Verifica si el archivo es un PDF y, si es así, almacena el archivo en la propiedad "comprobantePago".

```javascript
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
```
- El método "cargarPago" se encarga de cargar el comprobante de pago al servidor utilizando "cargaArchivosFachada".

```javascript
    async cargarPago() {
      this.cargando = true; // Muestra el cargador antes de que inicie la carga

      try {
        this.comprobantePagoRes = await cargaArchivosFachada(this.comprobantePago, "pago-asociacion", sessionStorage.getItem("email"));
      } catch (error) {
        console.error("Error loading registration file:", error);
        alert("Error cargando el comprobante de pago");
      } finally {
        this.cargando = false; // Oculta el cargador después de que termine la carga (incluso si hay un error)
      }
    },
```

- El método "enviarPago" se llama cuando se desea enviar el comprobante de pago. Si hay un comprobante de pago cargado, se registra el pago a través de "registroPagoAsociacionFachada", y se envía una notificación por correo electrónico al usuario y a los administradores utilizando "enviarHTMLFachada". 

```javascript

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

          alert('Comprobante de pago enviado con éxito, un administrador verificará su pago y activará su membresía');
          localStorage.setItem("emailConf", sessionStorage.getItem("email"))
          localStorage.setItem("asociacion", this.nombreAsociacion)
          localStorage.setItem("pagoAso", this.comprobantePagoRes.link)

          const Vue = require('vue');
          const app = Vue.createApp(NotificacionPagoAsociacion);

          const tempDiv = document.createElement('div');
          document.body.appendChild(tempDiv);
          const instance = app.mount(tempDiv);

          const htmlContent = instance.$el.outerHTML;
          const body = {
            toUser: sessionStorage.getItem("email"),
            subject: "ANAME: Pago de asociación registrado con éxito",
            htmlContent: htmlContent

          }
          enviarHTMLFachada(body);
          document.body.removeChild(tempDiv);


        } catch (error) {
          alert('No se pudo enviar el pago');
        }

        this.comprobantePago = null
        this.comprobantePagoRes = null
        this.obtenerPrecioAsociacion()

        localStorage.removeItem("emailConf")
        localStorage.removeItem("asociacion")
        localStorage.removeItem("pagoAso")
      } else {
        alert('Ningún documento cargado');
      }
    },
  },
};
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la página.

```css
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
```
    padding-left: 15px;
    padding-right: 15px;
  }
}

.page-content {
  padding-bottom: 20%;
}
```
