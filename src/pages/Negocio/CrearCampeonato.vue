<template>
    <BarraNav />
    <!-- <br> -->
    <h2>Crear Campeonato</h2>
    <!-- <br> -->

    <form @submit.prevent="insertar()">
        <table class="table">
            <tr>
                <td><label for="" id="labelSup">Nombre: </label></td>
                <td><input class="form-control" v-model="nombre" required type="text"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Federación que Organiza: </label></td>
                <td> <select class="form-select" aria-label="Seleccionar federación" style="background-color: #edf3f5; color: #000000;" 
                    v-model="asociacion"> <option v-for="a in asociaciones" v-bind:key="a.id" :value="a.id">
                        {{ a.nombre }}
                    </option>
                </select></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Sede: </label></td>
                <td><input class="form-control" v-model="sede" type="text" required></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Organizador: </label></td>
                <td><input class="form-control" v-model="organizador" required type="text"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Fecha de inicio: </label></td>
                <td><input class="form-control" v-model="fInicio" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Fecha de finalización</label></td>
                <td><input class="form-control" v-model="fFin" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Fecha inicio de inscripción: </label></td>
                <td><input class="form-control" v-model="finicioI" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Fecha fin de inscripción</label></td>
                <td><input class="form-control" v-model="fFinI" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Costo Socios</label></td>
                <td><input class="form-control" v-model="costoSoc" required type="number" step="0.01"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Costo No Socios</label></td>
                <td><input class="form-control" v-model="costNoSoc" required type="number" step="0.01"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Costo Prueba Adicional</label></td>
                <td><input class="form-control" v-model="costPAdic" required type="number" step="0.01"></td>
            </tr>
            <tr>
                <td><label for="" id="labelSup">Cuenta Bancaria</label></td>
                <td><input class="form-control" v-model="cuentaBancaria" required type="text" placeholder="XXXXXX-BANCO-TIPOCUENTA"></td>
            </tr>
        </table>

        <h4>Pruebas</h4>

        <table id="tablaPruebas">
            <tr>
                <!-- <td><label id="prueba" for="">Pruebas: </label></td> -->
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
                    <td><button type="submit" class="btn btn-danger">Crear Campeonato</button></td>
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
import { CrearCampeonatoP, listaAsociacionesFachada } from "@/assets/js/campeonato.js"
import { listarPruebasFachada } from '@/assets/js/Prueba';
import router from '@/router';


export default {
    components: {
        BarraNav,
        PiePagina
    },
    data() {
        return {
            nombre: null,
            organizador: null,
            sede: null,
            fInicio: null,
            fFin: null,
            finicioI: null,
            fFinI: null,
            listaPruebas: [],
            seleccionadas: [],
            asociaciones:[],
            costoSoc: null,
            costNoSoc: null,
            costPAdic: null,
            asociacion:null,
            cuentaBancaria:null

        }
    },

    mounted()
        {
            console.log("Mounted*********")
            this.listarAsociaciones();
            this.listarPruebas();
        } ,
   methods: {

        async listarAsociaciones(){
            console.log("Lista asociaciones----------------------------------------------------")
            this.asociaciones = await listaAsociacionesFachada()
            console.log("Asociaciones: " + this.asociaciones)
;        },

        async insertar() {
            console.log(this.seleccionadas);
            console.log(sessionStorage.getItem('token'));
            const campeonato = {
                nombre: this.nombre,
                organizador: this.organizador,
                sede: this.sede,
                fechaInicio: this.fInicio,
                fechaFin: this.fFin,
                inscripcionInicio: this.finicioI,
                inscripcionFin: this.fFinI,
                pruebas: this.seleccionadas,
                costoSocio: this.costoSoc,
                costoNoSocio:this.costoNoSocio,
                costoPruebaAdicional: this.costPAdic,
                cuentaBancaria:this.cuentaBancaria,
                idAsociacion: this.asociacion
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
                this.asociaciones = null

            alert("Se ha ingresado correctamente")
            router.push('/')
        },
        async listarPruebas() {
            this.listaPruebas = await listarPruebasFachada()
        },




    },

}


</script>

<style>
#labelSup {
    font-weight: bold;
}


#tablaPruebas {
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

/* #prueba{

    padding-left: 20px;
} */
</style>