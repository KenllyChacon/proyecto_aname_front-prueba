<template>
    <!--Barra navegacion-->
    <BarraNav />
    
    <h2 class="fw-bold">Aprobar Inscripciones</h2>

    <br>
    <label for="" id="labelSup">Seleccione campeonato</label>
    <select class="bordeCaja" required v-model="idCampeonato" @change="listarCampIsnscritos">
      <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
    </select>
    <br>

    
    <div class="table-responsive" id="contAprobarInsc">
      <table class="table-responsive table-bordered bordeCaja" id="tabAprobar">
        <table>
          <thead>
        <tr>
          <th id="tablaInsc">Competidor</th>
          <th id="tablaInsc">Estado</th>
          <th id="tablaInsc">Documento Pago</th>
          <th id="tablaInsc">Documento Inscripción</th>
          <th id="tablaInsc">Aprobar Pago</th>
          <th id="tablaInsc">Aprobar Inscripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in listaCampInscritos" :key="c">
          <td>{{ c.nombres }}</td>
          <td></td>
          <td><a href="" download>Descargar Pago</a></td>
          <td><a href="" download>Descargar Ficha</a></td>
          <td><button>Aprobar Pago</button></td>
          <td><button>Aprobar Inscripcion</button></td>

        </tr>


      </tbody>
      </table>
    </table>
    </div>

    <br>
  
    <!-- Pie de página -->
    <PiePagina />
  </template>
  
  <script>
  import PiePagina from "@/components/PiePagina.vue";
  import BarraNav from "@/components/BarraNav.vue";  
  import { campIncritosP , VerCampeonatosP} from "@/assets/js/campeonato";
  
  
  export default {
    name: "VerificarInscripcion",
  
    data() {
      return {
        categoria: null,
        idCampeonato: null,
        listaCampInscritos: [],
        listaCampeonatos: []
      };
    },
    methods: {

      async listarCampIsnscritos(){
        this.listaCampInscritos = await campIncritosP(this.idCampeonato)
      },
      async listarCampeonatos(){
      this.listaCampeonatos = await VerCampeonatosP();
      },

      cambiarTabla(id){
        this.listarCampIsnscritos(id);        
      }


    },
    components: {
      PiePagina,
      BarraNav,
    },
    mounted(){
      this.listarCampeonatos()

    }
  };
  </script>

  <style>
  #labelSup {
      font-weight: bold;
  }
  
  
  #tablaInsc {
      background-color: #52bad1;
  }
  
  
  
  .form-control {
      border: 2px solid #2660a4;
  }
  
  h2 {
      color: #003153;
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 15px;
  }
  
  h4 {
      color: #003153;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 20px;
  }
  
  table {
      margin: 0 auto;
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

  .bordeCaja {
  border: 2px solid #edf3f5;
    }
  

    @media (min-width: 768px) {
      #contAprobarInsc {
        width: 75%
      }
    }
    
    @media (max-width: 767px) {
      #contAprobarInsc {
        width: 100%;
      }
    }
  </style>