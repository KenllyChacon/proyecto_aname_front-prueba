<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav/>
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>
  <div class="page-content">
    <!--Pestañas-->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: selectedTab === 'tab1' }" @click="selectedTab = 'tab1'">
          Ficha de Inscripción
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: selectedTab === 'tab2' }" @click="selectedTab = 'tab2'">
          Confirmación de Inscripción
        </a>
      </li>
    </ul>

    <!--Ficha de inscripción-->
    <div v-if="selectedTab === 'tab1'">
      <br>
      <div class="container" id="ficha1">
        <div class="container" id="encabezado1">
          <h2 align="center" style="color: #fff2f1">Ficha de Inscripción</h2>
        </div>
        <div class="container">

          <br>

          <form @submit.prevent="inscribirse()">

            <br>
            <!--Selección de campeonato-->
            <div class="container" id="encabezado2">
              <h5><b>Campeonato</b></h5>
            </div>
            <br>
            <div>
              <select class="form-select" aria-label="Seleccionar campeonato"
                      style="background-color: #edf3f5; color: #000000;" v-model="idCampeonato"
                      @change="listarPruebasDelCampeonato">
                <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}
                </option>
              </select>
            </div>
            <br>

            <br>
            <!--Selección de pruebas-->
            <div class="container" id="encabezado2">
              <h5><b>Pruebas</b></h5>
            </div>
            <br>
            <table id="tablaPruebas">
              <tr>
                <!-- <td><label id="prueba" for="">Pruebas: </label></td> -->
                <td>
                  <div class="opciones-container">
                    <div v-for="prueba in pruebasDelCampeonato" :key="prueba" class="opcion-item">
                      <input type="checkbox" :value="prueba.id" v-model="selectedPruebas">
                      <label :for="prueba">{{ prueba.nombre }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <br>
            </table>

            <br>
            <!--<p align="justify">El valor de la inscripción hasta por 3 pruebas individuales es de $15 para socios
              y de $25 para no socios. Cada prueba individual adicional tendrá un costo de 10 doláres.
              El Pentatlon no se considera como una prueba individual y tendrá un costo de 10 dólares.
              Las postas no tendrán costo adicional, pero deben ser enviadas dentro del formato de inscripción,
              especificando integrantes y categorías. No se permitirá equipos conformados por atletas de varias
              provincias.
            </p>-->
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>

    <!--Subir documentos de Inscripciones-->
    <div v-else-if="selectedTab === 'tab2'">

      <div class="container" id="ficha2">
        <h2 class="fw-bold">Documentos</h2>
        <div class="table-responsive-sm" id="tabla3">
          <table class="table table-bordered table-responsive">
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
            <tr v-for="c in listaCampInscritosUserEmail" :key="c">
              <td>{{ c.nombreCampeonato }}</td>
              <td><a @click="imprimirComprobante(c.idCampeonato)">Descargar comprobante</a></td>
              <td><a @click="descargarFicha(c.id)">Descargar Ficha de Inscripción</a></td>
              <td>
                <form enctype="multipart/form-data"  @submit.prevent="enviarPago(c.id)">
                  <div class="form-group">
                    <label class="colorTexto fw-bold"> Subir comprobante de pago:</label>
                    <input type="file" @change="pagoComprobante" accept="application/pdf" class="form-control-file">
                  </div>
                  <br>
                  <button type="submit" class="btn btn-primary" :disabled="cargando">Enviar</button>
                  <div class="loader" v-if="cargando"></div>
                </form>
              </td>
              <td>
<!--                                           <form @submit.prevent="inscribirse()">-->
                <form enctype="multipart/form-data" @submit.prevent="enviarFicha(c.id)">
                  <div class="form-group">
                    <label class="colorTexto fw-bold"> Subir ficha de inscripción firmada:</label>
                    <input type="file" @change="fichaI" accept="application/pdf" class="form-control-file">
                  </div>
                  <br>
                  <button type="submit" class="btn btn-primary" :disabled="cargando">Enviar</button>
                  <div class="loader" v-if="cargando"></div>
                  <!-- <input type="submit" value="Enviar" /> -->
                </form>
              </td>
              <td>
                <div>
                  <label class="fw-bold" for="estado">{{ c.estadoParticipacion }}</label>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br>
  </div>

  <!-- Pie de página -->
  <PiePagina/>
</template>

<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import {
  listarCampeonatosDisponiblesFachada,
  InscribirseCampeonatoP,
  campIncritosUsersP,
  campIncritosUserEmailP
} from "@/assets/js/campeonato";
import {listarPruebasPorCampFachada} from "@/assets/js/Prueba";
import {listaAsociacionesCompetidorFachada, registrarPagoFachada, registrarFichaFachada} from "@/assets/js/Competidor"
import {cargaArchivosFachada} from "@/assets/js/Archivo"
import BarraNavPro from "@/components/BarraNavPro.vue";

export default {
  data() {
    return {
      selectedTab: 'tab1', // Pestaña seleccionada por defecto
      idCampeonato: null,
      listaCampeonatos: [],
      listaPruebas: [],
      pruebasDelCampeonato: [],
      selectedPruebas: [],
      listaCampInscritosUser: [],
      listaCampInscritosUserEmail: [],
      comprobantePago: null,
      comprobantePagoRes: null,
      fichaInscripcion: null,
      fichaInscripcionRes: null,
      mostrarBarra: true,
      cargando: false,
    };
  },
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },
  mounted() {
    this.listarCampeonatos(),
        this.listarCampInscritosUserEmail(),
        console.log("ROL INICIO" + sessionStorage.getItem("rol"))
    if (sessionStorage.getItem("rol") == "ADM" || sessionStorage.getItem("rol") == "JUN" || sessionStorage.getItem("rol") == "ORG") {
      console.log("id: " + sessionStorage.getItem("id"))
      this.mostrarBarra = false;
    }
  },

  methods: {
    pagoComprobante(event) {
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
          this.comprobantePagoRes = await cargaArchivosFachada(this.comprobantePago, "comprobante-pago", sessionStorage.getItem("email"));
          console.log(this.comprobantePagoRes)
        } catch (error) {
          console.error("Error al cargar el archivo de pago:", error);
          alert("Error al cargar el comprobante de pago");
        } finally {
          this.cargando = false; // Oculta el cargador después de que termine la carga (incluso si hay un error)
        }
      },


    fichaI(event) {

      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es un pdf
      if (file.type === 'application/pdf') {
        console.log('Archivo PDF seleccionado:', file);

        // Realiza las operaciones que necesites con el archivo
        this.fichaInscripcion = file;

      } else {
        console.log('El archivo seleccionado no es un PDF');
      }

      this.cargarFicha();
    },

    async cargarFicha() {

      this.cargando = true; // Muestra el cargador antes de que inicie la carga
      try {
        this.fichaInscripcionRes = await cargaArchivosFachada(this.fichaInscripcion, "ficha-inscripcion", sessionStorage.getItem("email"));
        console.log(this.fichaInscripcionRes)
      } catch (error) {
        console.error("Error loading registration file:", error);
        alert("Error cargando la ficha de inscripción");
      } finally {
        this.cargando = false; // Oculta el cargador después de que termine la carga (incluso si hay un error)
      }
    },

    async enviarPago(idComp) {

      if (this.comprobantePagoRes) {
        const pago = {
          idCompetidor: idComp,
          nombre: this.comprobantePagoRes.nombre,
          link: this.comprobantePagoRes.link,
          extension: this.comprobantePagoRes.extension
        };

        console.log(pago)

        try {
          await registrarPagoFachada(pago);
          alert('Pago enviado con éxito');
        } catch (error) {
          alert('No se pudo enviar el pago');
        }


        this.comprobantePago = null
        this.comprobantePagoRes = null
        this.fichaInscripcion = null
        this.fichaInscripcionRes = null
        this.listarCampInscritosUserEmail()
      } else {
        alert('Ningún documento cargado');
      }

    },

    async enviarFicha(idComp) {

      if (this.fichaInscripcionRes) {
        const ficha = {
          idCompetidor: idComp,
          nombre: this.fichaInscripcionRes.nombre,
          link: this.fichaInscripcionRes.link,
          extension: this.fichaInscripcionRes.extension
        };

        try {
          await registrarFichaFachada(ficha);
          alert('Ficha de inscripcion enviada con éxito');
        } catch (error) {
          alert('No se pudo enviar la ficha de inscripción');
        }

        this.comprobantePago = null
        this.comprobantePagoRes = null
        this.fichaInscripcion = null
        this.fichaInscripcionRes = null
        this.listarCampInscritosUserEmail()
      } else {
        alert('Ningún documento cargado');

      }

    },


    async listarCampeonatos() {
      this.listaCampeonatos = await listarCampeonatosDisponiblesFachada();
    },
    async listarPruebasDelCampeonato() {
      console.log(this.idCampeonato)
      this.pruebasDelCampeonato = await listarPruebasPorCampFachada(this.idCampeonato);
      this.selectedPruebas = [];
    },

    async listarCampInscritosUserEmail() {
      this.listaCampInscritosUserEmail = await campIncritosUserEmailP(sessionStorage.getItem("email"))
      console.log(this.listaCampInscritosUserEmail)
    },

    async inscribirse() {

      console.log(this.idCampeonato)
      console.log(this.federacion)
      console.log("Pruebas: " + this.selectedPruebas)
      const ficha = {
        email: sessionStorage.getItem("email"),
        idCampeonato: this.idCampeonato,
        idAsociacionDeportiva: this.federacion,
        pruebas: this.selectedPruebas
      }

      await InscribirseCampeonatoP(ficha);
      alert("Se ha inscrito correctamente")
      alert("En Confirmación de Inscripción observará su proceso y comprobante de pago")
      this.listarCampInscritosUserEmail()
      this.selectedTab = "tab2"


    },

    imprimirComprobante(idCampeonatos) {
      //let route = 
      this.$router.push({name: 'comprobanteImprimir', params: {idCampeonato: idCampeonatos}})
      //window.open(route.href, "ventana1","width= 1340, height = 780, scrollbars = NO")
    },
    descargarFicha(id) {
      //let route = 
      this.$router.push({name: 'fichaInscripcion', params: {idCompetidor: id}})
      //window.open(route.href, "ventana1","width= 1340, height = 780, scrollbars = NO")
    }
  },


};
</script>

<style>
#encabezado1 {
  background-color: #2660a4;
  padding: 10px;
}

#encabezado2 {
  background-color: #52bad1;
  padding: 5px;
}

.nav-tabs .nav-link {
  background-color: #6caef5;
  /* Color de fondo de las pestañas inactivas */
  color: #2a2b2e;
  /* Color de texto de las pestañas inactivas */
}

.nav-tabs .nav-link.active {
  background-color: #003153;
  /* Color de fondo de la pestaña activa */
  color: #ffffff;
  /* Color de texto de la pestaña activa */
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

.form-control {
  width: 100%;
  border: 2px solid #2660a4;
}

h2 {
  color: #003153;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
}

#encabezadoPruebas {
  background-color: #52bad1;
}

#tablaPruebas {
  border-color: #edf3f5;
}

.opciones-container {
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
}

.opcion-item {
  flex-basis: calc(23.33% - 10px);
  /* Ajusta el tamaño de cada columna según tus necesidades */
  margin: 5px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  #ficha1 {
    width: 75%
  }
}

@media (max-width: 767px) {
  #ficha1 {
    width: 100%;
  }
}




/* Estilos de Subir documentos */
#encabezadoCamp {
  background-color: #52bad1;
}

.loader {
  width: 120px;
  height: 20px;
  -webkit-mask: linear-gradient(90deg,#000 70%,#0000 0) left/20% 100%;
  background:
      linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat
      #ddd;
  animation: l7 1s infinite steps(6);
}
@keyframes l7 {
  100% {background-position: right -25% top 0}
}

.page-content {
  padding-bottom: 50%;
}

</style>