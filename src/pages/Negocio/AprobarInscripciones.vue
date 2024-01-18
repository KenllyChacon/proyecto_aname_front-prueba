<template>
    <!--Barra navegacion-->
    <BarraNav />
    
    <h2 class="fw-bold">Aprobar Inscripciones</h2>
    
    <div class="container" id="contAprobarInsc">
      <table class="table-responsive table-bordered bordeCaja" id="tabAprobar">
        <label for="" id="labelSup">Seleccione campeonato</label>
        <select class="bordeCaja" required>
        </select>
        <tr>
          <th id="tablaInsc">Competidor</th>
          <th id="tablaInsc">Estado</th>
          <th id="tablaInsc">Documento Pago</th>
          <th id="tablaInsc">Documento Inscripción</th>
          <th id="tablaInsc">Aprobar Pago</th>
          <th id="tablaInsc">Aprobar Inscripción</th>
        </tr>
    </table>
    </div>

    <br>
  
    <!-- Pie de página -->
    <PiePagina />
  </template>
  
  <script>
  import PiePagina from "@/components/PiePagina.vue";
  import BarraNav from "@/components/BarraNav.vue";  
  
  
  export default {
    name: "VerificarInscripcion",
  
    data() {
      return {
        categoria: null,
      };
    },
    methods: {},
    components: {
      PiePagina,
      BarraNav,
    },
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