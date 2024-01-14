<template>
    <BarraNav />
    <br>
    <h1>Crear Campeonato</h1>
    <br>

    <form action="">
        <table>
            <tr>
                <td><label for="">Nombre: </label></td>
                <td><input v-model="nombre" required type="text"></td>
            </tr>
            <tr>
                <td><label for="">Federacion que Organiza: </label></td>
                <td><input v-model="organizador" required type="text"></td>
            </tr>
            <tr>
                <td><label for="">Sede: </label></td>
                <td><input v-model="sede" required type="text"></td>
            </tr>
            <tr>
                <td><label for="">Fecha de inicio: </label></td>
                <td><input v-model="fInicio" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha de finalizacion</label></td>
                <td><input v-model="fFin" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha inicio de Inscripcion: </label></td>
                <td><input v-model="finicioI" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Fecha fin de Inscripcion</label></td>
                <td><input v-model="fFinI" required type="datetime-local"></td>
            </tr>
            <tr>
                <td><label for="">Pruebas: </label></td>
                <td>
                    <select name="" id="" multiple>
                        <option value="">dsd</option>
                        <option value="">dsd2</option>
                        <option value="">dsd3</option>
                        
                    </select>

                </td>
            </tr>
        </table>
        <table>

        </table>
    </form>
    <br>
        <table>
            <tr>
                <td><button @click="insertar()">Crear Campeonato</button></td>
            </tr>
        </table>
    <br>



    <PiePagina />

</template>
<script>
import BarraNav from "@/components/BarraNav.vue";
import PiePagina from "@/components/PiePagina.vue";
import {CrearCampeonatoP} from "@/assets/js/campeonato.js"
import { listarPruebasFachada } from '@/assets/js/Prueba';


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
            fFinI:null
        }
    },

methods: {
    
    async insertar(){
        console.log(localStorage.getItem('token'));
        const campeonato={
            nombre: this.nombre,
            organizador: this.organizador,
            sede: this.sede,
            fechaInicio: this.fInicio,
            fechaFin: this.fFin,
            inscripcionInicio: this.finicioI,
            inscripcionFin: this.fFinI,
            pruebas:[ 5, 4, 6 ]
        }

        await CrearCampeonatoP(campeonato)

    }


},

}


</script>
<style>
table{
    margin: 0 auto;
}

</style>