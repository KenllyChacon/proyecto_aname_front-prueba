<template>
  <!--Barra navegacion-->
  <BarraNav />
  <div>
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
      <div id="tituloFicha">
        <img src="@/assets/img/logofin.png" alt="" width="40" height="40" align="left">
        <h3><b>Ficha de Inscripción de Atletas</b></h3>
      </div>

      <form @submit.prevent="inscribirse" class="needs-validation" novalidate id="formFicha">
        <!--Selección de campeonato-->
        <br>
        <div>
          <div>
            <select class="form-select" aria-label="Seleccionar campeonato"
              style="background-color: #edf3f5; color: #000000;" v-model="idCampeonato"
              @change="listarPruebasDelCampeonato">
              <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
            </select>
          </div>
          <div>
            <h6><b>Lugar y fechas</b></h6>
          </div>
        </div>

        <br>
        <!--Datos del competidor-->
        <div class="table-responsive">
          <table class="table-responsive table-bordered" id="datosComp">
            <tr>
              <th>Nombres: </th>
              <td><label>nombresCompetidor</label></td>
            </tr>
            <tr>
              <th>Apellidos: </th>
              <td>apellidosCompetidor</td>
            </tr>
            <tr>
              <th><label for="" id="labelSup">Asociación: </label></th>
              <td>
                <select class="form-select" aria-label="Seleccionar asociación"
                  style="background-color: #edf3f5; color: #000000;" v-model="federacion">
                  <option v-for="opcion3 in listaAsociaciones" :key="opcion3.id" :value="opcion3.id">{{ opcion3.nombre }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Dirección: </th>
              <td><label>direccionCompetidor</label></td>
            </tr>
            <tr>
              <th>Ciudad: </th>
              <td><label>ciudadCompetidor</label></td>
            </tr>
            <tr>
              <th>Email: </th>
              <td><label>emailCompetidor</label></td>
            </tr>
            <tr>
              <th>Sexo: </th>
              <td><label>sexoCompetidor</label></td>
            </tr>
            <tr>
              <th>Fecha de Nacimiento: </th>
              <td><label>fechaNacimientoCompetidor</label></td>
            </tr>
            <tr>
              <th>Categoría Actual: </th>
              <td><label>categoriaCompetidor</label></td>
            </tr>
          </table>
        </div>

        <br>
        <!--Selección de pruebas-->
        <div class="container">
          <h6 align="left"><b>Seleccione las pruebas en las que se inscribe</b></h6>
        </div>
        <br>
        <table class="table-responsive table-bordered" id="tablaPruebas">
          <tr>
            <td>
              <div class="opciones-container">
                <div v-for="prueba in pruebasDelCampeonato" :key="prueba" class="opcion-item">
                  <input type="checkbox" :value="prueba.id" v-model="selectedPruebas">
                  <label :for="prueba">{{ prueba.nombre }}</label>
                </div>
              </div>
            </td>
          </tr>

        </table>
        <br>

        <!--Descargo de responsabilidad-->
        <div class="form-check" id="descargoResp">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
          <label class="form-check-label" for="invalidCheck">
            Acepto voluntariamente participar en este campeonato en fecha en sede xx, bajo
            las reglas WA, WMA y ASUDAMA. Eximo de toda responsabilidad a los organizadores
            y dirigentes por lesiones, pérdidas y daños a mi persona o bienes de mi propiedad
            que ocurran durante el desarrollo del evento, y declaro estar en buenas condiciones
            de salud y que no presento enfermedad alguna que ponga en riesgo mi vida.
          </label>
          <div class="invalid-feedback">
            Debe aceptar el descargo de responsabilidad para proseguir con la inscripción.
          </div>
        </div>

        <br>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>

      <!--Líneas de firma-->
      <div class="row g-3" id="firmas">
        <div class="col-sm">
          <br><br>
          <hr>
          <label>Firma del atleta</label>
        </div>
        <div class="col-sm">
          <label> </label>
          <label> </label>
        </div>
        <div class="col-sm">
          <br><br>
          <hr>
          <label>Firma del administrador</label>
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

    <button type="submit" class="btn btn-primary">Enviar</button>
  </div>

  <!-- Pie de página -->
  <PiePagina />
</template>

<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import { listarCampeonatosDisponiblesFachada, InscribirseCampeonatoP, campIncritosUsersP, campIncritosUserEmailP } from "@/assets/js/campeonato";
import { listarPruebasPorCampFachada } from "@/assets/js/Prueba";
import { listaAsociacionesCompetidorFachada } from "@/assets/js/Competidor"

export default {
  data() {
    return {
      selectedTab: 'tab1', // Pestaña seleccionada por defecto
      federacion: null,
      idCampeonato: null,
      listaCampeonatos: [],
      listaPruebas: [],
      listaAsociaciones: [],
      pruebasDelCampeonato: [],
      selectedPruebas: [],
      listaCampInscritosUser: [],
      listaCampInscritosUserEmail: [],
    };
  },
  components: {
    PiePagina,
    BarraNav,
  },
  mounted() {
    this.listarCampeonatos(),
      //this.listarPruebas(),
      this.listarAsociaciones(),
      // this.listarCampInscritosUser(),
      this.listarCampInscritosUserEmail()
  },

  methods: {
    async listarCampeonatos() {
      this.listaCampeonatos = await listarCampeonatosDisponiblesFachada();
    },
    async listarPruebasDelCampeonato() {
      console.log(this.idCampeonato)
      this.pruebasDelCampeonato = await listarPruebasPorCampFachada(this.idCampeonato);
      this.selectedPruebas = [];
    },
    async listarAsociaciones() {
      this.listaAsociaciones = await listaAsociacionesCompetidorFachada()
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
      this.$router.push({ name: 'comprobanteImprimir', params: { idCampeonato: idCampeonatos } })
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
  background-color: #eeb902;
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
  #formFicha {
    width: 75%
  }
}

@media (min-width: 320px) and (max-width: 767px) {
  #formFicha {
    width: 100%;
  }
}

@media (min-width: 768px) {
  #ficha2 {
    width: 75%
  }
}

@media (min-width: 320px) and (max-width: 767px) {
  #ficha2 {
    width: 100%;
  }
}

@media (min-width: 768px) {
  #firmas {
    width: 75%
  }
}

@media (min-width: 320px) and (max-width: 767px) {
  #firmas {
    width: 100%;
  }
}

@media print {
  .btn-primary {
    display: none;
  }
}

/* Estilos de Subir documentos */
#encabezadoCamp {
  background-color: #52bad1;
}

/*Título Ficha*/
#tituloFicha {
  background-color: #52bad1;
  padding-top: 10px;
  padding-bottom: 10px;
}

#formFicha {
  padding-left: 2.5%;
  padding-right: 2.5%;
}

#descargoResp {
  background-color: rgba(38, 96, 164, 0.5);
  /*color #2660a4 en hex, opacidad 50%*/
  padding: 2.5%;
}

#firmas {
  margin-left: 5%;
  margin-right: 5%;
}

#datosComp {
  border-collapse: collapse;
  th, td {
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
}

</style>