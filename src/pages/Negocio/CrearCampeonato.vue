<template>
    <BarraNav />
    <br>
    <h1>Crear Campeonato</h1>
    <br>

    <form action="">
        <table>
            <tr>
                <td><label for="">Nombre: </label></td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td><label for="">Federacion que Organiza: </label></td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td><label for="">Sede: </label></td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td><label for="">Fecha de inicio: </label></td>
                <td><input type="datetime"></td>
            </tr>
            <tr>
                <td><label for="">Fecha de finalizacion</label></td>
                <td><input type="datetime"></td>
            </tr>
            <tr>
                <td><label for="">Fecha inicio de Inscripcion: </label></td>
                <td><input type="datetime"></td>
            </tr>
            <tr>
                <td><label for="">Fecha fin de Inscripcion</label></td>
                <td><input type="datetime"></td>
            </tr>
        </table>
    </form>
    <br>
        <table>
            <tr>
                <td><button>Siguiente</button></td>
            </tr>
        </table>
    <br>



    <PiePagina />

</template>
<script>
import BarraNav from "@/components/BarraNav.vue";
import PiePagina from "@/components/PiePagina.vue";

export default {


    components:{
        BarraNav,
        PiePagina
    }


}


</script>
<style>


</style>