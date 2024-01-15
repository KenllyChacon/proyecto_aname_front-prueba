<template>
    <BarraNav />
    <br>
    <h1>Crear Campeonato</h1>
    <br>

  <form @submit.prevent="insertar()">
        <table>
            <tr>
                <td><label for="">Nombre: </label></td>
                <td><input class="form-control" v-model="nombre" required type="text"></td>
            </tr>
            <tr>
                <td><label for="">Federacion que Organiza: </label></td>
                <td><input class="form-control" v-model="organizador" required type="text"></td>
            </tr>
            <tr>
                <td><label for="">Sede: </label></td>
                <td><input class="form-control" v-model="sede"  type="text" required></td>
            </tr>
            <tr>
                <td><label for="">Fecha de inicio: </label></td>
                <td><input class="form-control" v-model="fInicio" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha de finalizacion</label></td>
                <td><input class="form-control" v-model="fFin" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha inicio de Inscripcion: </label></td>
                <td><input class="form-control" v-model="finicioI" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha fin de Inscripcion</label></td>
                <td><input class="form-control" v-model="fFinI" required type="datetime-local"></td>
            </tr>
        </table>
        <table>            
            <tr>
                <td><label id="prueba" for="">Pruebas: </label></td>
                <td>
                <div class="opciones-container">
                    <div v-for="opcion in listaPruebas" :key="opcion" class="opcion-item">
                        <input type="checkbox" :id="opcion" :value="opcion.id" v-model="seleccionadas">
                        <label :for="opcion">{{ opcion.nombre }}</label>
                    </div>
                </div>
                </td>
            </tr>
          <br>
          <table>
            <tr>
              <td><button type="submit">Crear Campeonato</button></td>
            </tr>
          </table>
          <br>
        </table>
    </form>
    <PiePagina />
</template>
<script>
import BarraNav from "@/components/BarraNav.vue";
import PiePagina from "@/components/PiePagina.vue";
import {CrearCampeonatoP} from "@/assets/js/campeonato.js"
import { listarPruebasFachada } from '@/assets/js/Prueba';
import router from '@/router';


export default {
    components:{
        BarraNav,
        PiePagina
    },
    data() {
        return {
            nombre:null,
            organizador:null,
            sede:null,
            fInicio:null,
            fFin:null,
            finicioI:null,
            fFinI:null,
            listaPruebas:[],
            seleccionadas: []

        }
    },

methods: {
    
    async insertar(){
        console.log(this.seleccionadas);
        console.log(sessionStorage.getItem('token'));
        const campeonato={
            nombre: this.nombre,
            organizador: this.organizador,
            sede: this.sede,
            fechaInicio: this.fInicio,
            fechaFin: this.fFin,
            inscripcionInicio: this.finicioI,
            inscripcionFin: this.fFinI,
            pruebas:this.seleccionadas
        }

        await CrearCampeonatoP(campeonato);
        this.nombre = null,
        this.organizador = null,
        this.sede = null,
        this.fInicio = null,
        this.fFin = null,
        this.finicioI = null,
        this.fFinI = null,
        this.seleccionadas = null

        alert("Se ha ingresado correctamente")
        router.push('/')
    },
    async lista(){
        this.listaPruebas = await listarPruebasFachada()
    },




},
mounted() {
    this.lista()
},

}


</script>
<style>
table{
    margin: 0 auto;
}

.opciones-container {
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
  }
  
  .opcion-item {
    flex-basis: calc(23.33% - 10px); /* Ajusta el tamaño de cada columna según tus necesidades */
    margin: 5px;
    box-sizing: border-box;
  }

#prueba{

    padding-left: 20px;
}
</style>