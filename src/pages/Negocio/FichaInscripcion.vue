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
      <div class="container" id="ficha1">
        <div class="container" id="encabezado1">
          <h2 align="center" style="color: #fff2f1">Ficha de Inscripción</h2>
        </div>
        <div class="container">

          <br>

          <form>
            <div class="container" id="tabla1">
              <!--Datos del competidor-->
              <table class="table-responsive table-striped">
                <tr>
                  <td><label for="" id="labelSup">Federación: </label></td>
                  <td><input class="form-control" v-model="federacion"></td>
                </tr>
              </table>
            </div>

            <br>
            <!--Selección de campeonato-->
            <div  >
            <select class="form-select" aria-label="Seleccionar campeonato" 
              style="background-color: #edf3f5; color: #000000;" v-model="idCampeonato" :id="opcion" :value="opcion.id">
              <option  v-for="opcion in listaCampeonatos" :key="opcion" >{{ opcion.nombre }}</option>
            </select>
          </div>
            <br>

            <br>
            <!--Selección de pruebas-->
            <div class="container" id="encabezado2">
              <h5><b>Pruebas</b></h5>
            </div>
            <br>


          <div>
            <ul>
              <li v-for="pruebaId in listaCampeonatos.pruebas" :key="pruebaId">
                {{ getNombrePrueba(pruebaId) }}
              </li>
            </ul>
          </div>

            <div class="container" id="tabla2">
              <table class="table-responsive table-hover table-bordered" id="tablaPruebas">
                <tr>
                  <!-- <td><label id="prueba" for="">Pruebas: </label></td> -->
                  <td>
                      <div class="">
                          <div v-for="opcion2 in listaCampeonatos.pruebas" :key="opcion2" class="opcion-item">
                              <input type="checkbox" :id="opcion2" :value="opcion2.id" v-model="pruebasSeleccionadas">
                              <label :for="opcion2">{{ getNombrePrueba(opcion2.id) }}</label>
                          </div>
                      </div>
                  </td>
              </tr>
              </table>
            </div>
            <br>
            <label>Total a pagar: </label><input class="form-control">
            <br>
            <p align="justify">El valor de la inscripción hasta por 3 pruebas individuales es de $15 para socios
              y de $25 para no socios. Cada prueba individual adicional tendrá un costo de 10 doláres.
              El Pentatlon no se considera como una prueba individual y tendrá un costo de 10 dólares.
              Las postas no tendrán costo adicional, pero deben ser enviadas dentro del formato de inscripción,
              especificando integrantes y categorías. No se permitirá equipos conformados por atletas de varias
              provincias.
            </p>
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
    </div>
    <br>
  </div>

  <!-- Pie de página -->
  <PiePagina />
</template>

<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import { VerCampeonatosP , InscribirseCampeonatoP} from "@/assets/js/campeonato";
import { listarPruebasFachada } from "@/assets/js/Prueba";

export default {
  data() {
    return {
      selectedTab: 'tab1', // Pestaña seleccionada por defecto
      federacion: '',
      idCampeonato: null,
      listaCampeonatos:[],
      listaPruebas:[],
      pruebasSeleccionadas:[]
    };
  },
  components: {
    PiePagina,
    BarraNav,
  },

  methods: {
    async listarCampeonatos(){
      this.listaCampeonatos = await VerCampeonatosP();
      console.log(listaCampeonatos.pruebas);
    },
    async listarPruebas(){
      this.listaPruebas = await listarPruebasFachada()
    },
    getNombrePrueba(pruebaID){
      const prueba = this.listaPruebas.find(prueba => prueba.id == pruebaID);
      console.log(prueba.nombre);
      return prueba ? prueba.nombre : 'Nombre no econtrado';
    }
  },

  mounted() {
    this.listarCampeonatos(),
    this.listarPruebas()
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

@media (min-width: 768px) {
  #ficha2 {
    width: 75%
  }
}

@media (max-width: 767px) {
  #ficha2 {
    width: 100%;
  }
}

/* Estilos de Subir documentos */
#encabezadoCamp {
  background-color: #52bad1;
}
</style>