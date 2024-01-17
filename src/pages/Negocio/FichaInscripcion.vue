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
    <div v-if="selectedTab ==='tab1'">
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
            <table class="table-responsive table-striped" >
              <tr>
                  <td><label for="" id="labelSup">Nombres: </label></td>
                  <td><input class="form-control" v-model="nombres"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Apellidos: </label></td>
                  <td><input class="form-control" v-model="apellidos"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Federación: </label></td>
                  <td><input class="form-control" v-model="federacion"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Dirección: </label></td>
                  <td><input class="form-control" v-model="direccion"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Ciudad: </label></td>
                  <td><input class="form-control" v-model="ciudad"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Contacto: </label></td>
                  <td><input class="form-control" v-model="contacto"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">E-mail: </label></td>
                  <td><input class="form-control" v-model="email"></td>
              </tr>
              <tr>
                  <td><label for="" id="labelSup">Categoría: </label></td>
                  <td><input class="form-control" v-model="categoria"></td>
              </tr>
          </table> 
            </div>   
                    
        <br>
        <!--Selección de campeonato-->
        <select class="form-select" aria-label="Seleccionar campeonato" id="campeonatos1" style="background-color: #fff2f1; color: #000000;">
            <option selected>Seleccione un campeonato</option>
            <option value="1">Enero 2024</option>
            <option value="2">Febrero 2024</option>
            <option value="3">Marzo 2024</option>
          </select>
        
        <br>
        
        <br>
        <!--Selección de pruebas-->
        <div class="container" id="encabezado2">
          <h5><b>Pruebas</b></h5>
        </div>
        <br>
        <div class="container" id="tabla2">
          <table class="table-responsive table-hover table-bordered">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="text-dark">Prueba</th>
                <th scope="col" class="text-dark">Costo</th>
                <th scope="col" class="text-dark">Seleccionar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td scope="row">100 metros planos</td>
                <td>$10</td>
                <input class="form-check-input" type="checkbox" role="switch">
              </tr>
            </tbody>
          </table>
        </div>
          <br>
          <label>Total a pagar: </label><input class="form-control">
          <br>
          <p align="justify">El valor de la inscripción hasta por 3 pruebas individuales es de $15 para socios
            y de $25 para no socios. Cada prueba individual adicional tendrá un costo de 10 doláres.
            El Pentatlon no se considera como una prueba individual y tendrá un costo de 10 dólares.
            Las postas no tendrán costo adicional, pero deben ser enviadas dentro del formato de inscripción,
            especificando integrantes y categorías. No se permitirá equipos conformados por atletas de varias provincias.																								
          </p>
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
        </div>
      </div>
    </div>

    <div v-else-if="selectedTab==='tab2'">
      <div class="container" id="ficha2">
        <h2 class="fw-bold">Verificar Inscripciones</h2>
    
      <table class="table bordeCaja table-responsive">
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
    </div>
  </div>

   <!-- Pie de página -->
   <PiePagina />
</template>

<script>
  import PiePagina from "@/components/PiePagina.vue";
  import BarraNav from "@/components/BarraNav.vue";
export default {
  data() {
    return {
      selectedTab: 'tab1', // Pestaña seleccionada por defecto
      nombres: '',
      apellidos: '',
      federacion: '',
      direccion: '',
      ciudad: '',
      contacto: '',
      email: '',
      categoria: '',
    };
  },
  components: {
      PiePagina,
      BarraNav,
    },
};
</script>

<style>
#encabezado1 {
  background-color: #3083dc;
  padding: 10px;
}

#encabezado2{
  background-color: #efca08;
  padding: 5px;
}
.nav-tabs .nav-link {
  background-color: #6caef5; /* Color de fondo de las pestañas inactivas */
  color: #2a2b2e; /* Color de texto de las pestañas inactivas */
}

.nav-tabs .nav-link.active {
  background-color: #3083dc; /* Color de fondo de la pestaña activa */
  color: #ffffff; /* Color de texto de la pestaña activa */
}

.btn-primary.active {
  background-color: #5e7185; /* Color de fondo del botón activo */
  border-color: #2a2b2e; /*Color de borde del botón activo*/
}

.btn-primary:not(.active) {
  background-color: #3083dc; /* Color de fondo del botón inactivo */
  border-color: #003153; /*Color de borde del botón inactivo*/
}

#labelSup {
  padding-right: 15px;
  font-weight: bold;
}

.form-control{
  width: 100%;
}

#tablaInsc {
  background-color: #efca08;
}

.form-control {
  border: 2px solid #efca08;
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
border: 2px solid #efca08;
}

@media (min-width: 768px){
  #ficha1 {
    width: 75%
  }
}

@media (max-width: 767px){
  #ficha1 {
    width: 100%;
  }
}

@media (min-width: 768px){
  #ficha2 {
    width: 75%
  }
}

@media (max-width: 767px){
  #ficha2 {
    width: 100%;
  }
}


</style>