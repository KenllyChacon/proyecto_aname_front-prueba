<template>
    <div id="divToPrint">

        <br>
        <div id="tituloFicha">
            <img src="@/assets/img/logofin.png" alt="" width="40" height="40" align="left">
            <h3><b>Ficha de Inscripción de Atletas</b></h3>
        </div>

        <br>
        <div>
            <div>
                <h6><b>{{ nombreCampeonato }}</b></h6>
                <h6><b>{{ fechaCampeonato }}</b></h6>
            </div>
        </div>

        <br>
        <!--Datos del competidor-->
        <table class="table-responsive table-bordered">
            <tr>
                <th>Nombres: </th>
                <td><label>{{ nombres }}</label></td>
            </tr>
            <tr>
                <th>Apellidos: </th>
                <td>{{ apellidos }}</td>
            </tr>

            <tr>
                <th>Dirección: </th>
                <td><label>{{ direccion }}</label></td>
            </tr>
            <tr>
                <th>Ciudad: </th>
                <td><label>{{ ciudad }}</label></td>
            </tr>
            <tr>
                <th>Email: </th>
                <td><label>{{ email }}</label></td>
            </tr>
            <tr>
                <th>Sexo: </th>
                <td><label>{{ sexo }}</label></td>
            </tr>
            <tr>
                <th>Fecha de Nacimiento: </th>
                <td><label>{{ fechaNacimiento }}</label></td>
            </tr>
            <tr>
                <th>Categoría Actual: </th>
                <td><label>{{ categoria }}</label></td>
            </tr>
        </table>

        <br>
        <!--Selección de pruebas-->
        <div class="container">
            <h6 align="left"><b>Pruebas a las que se inscribe</b></h6>
        </div>
        <br>
        <table class="table-bordered" id="tablaPruebas">
            <tr v-for="prueba in pruebas" :key="prueba.id">
                <td>
                    <div>

                        <label :for="prueba.nombre">{{ prueba.nombre }}</label>
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
        <table>
            <tr>
                <td>
                    <button type="" class="btn-descarga" @click="printDiv()">Descargar</button>
                </td>
            </tr>
        </table>


    </div>
</template>
<script>
import { obtenerFichaInscripcionFachada } from "@/assets/js/Competidor"
export default {

    data() {
        return {
            nombreCampeonato: null,
            fechaCampeonato: null,
            asociacion: null,
            nombres: null,
            apellidos: null,
            direccion: null,
            ciudad: null,
            email: null,
            sexo: null,
            fechaNacimiento: null,
            categoria: null,
            pruebas: []
        }
    },

    props: {
        idCompetidor: {
            type: Number,
            required: true,
        },
    },

    mounted() {
        this.obtenerDatosFicha();
    },

    methods: {
        async obtenerDatosFicha() {

            const idC = Number(this.idCompetidor)
            const { nombreCampeonato,
                fechaCampeonato,
                asociacion,
                nombres,
                apellidos,
                direccion,
                ciudad,
                email,
                sexo,
                fechaNacimiento,
                categoria,
                pruebas } = await obtenerFichaInscripcionFachada(idC)

            this.nombreCampeonato = nombreCampeonato;
            this.fechaCampeonato = fechaCampeonato;
            this.asociacion = asociacion;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.direccion = direccion;
            this.ciudad = ciudad;
            this.email = email;
            this.sexo = sexo;
            this.fechaNacimiento = fechaNacimiento;
            this.categoria = categoria;
            this.pruebas = pruebas;

            console.log(nombreCampeonato)
        },

        printDiv() {

            console.log("Alo");

            // Obtén el div que quieres imprimir
            const printDiv = document.getElementById('divToPrint');

            // Guarda el contenido original de la página
            const originalContent = document.body.innerHTML;

            // Reemplaza el cuerpo de la página con el contenido del div que quieres imprimir
            document.body.innerHTML = printDiv.innerHTML;

            // Abre el cuadro de diálogo de impresión
            window.print();

            // Restaura el contenido original de la página
            document.body.innerHTML = originalContent;
        },
    },
}
</script>
<style>
@media print {
    .btn-descarga {
        display: none;
    }
}
</style>