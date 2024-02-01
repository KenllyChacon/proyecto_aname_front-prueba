<template>
    <div id="divToPrint">

        <br>
        <div id="tituloFicha" style="background-color: #52bad1">
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
        <div class="table-responsive">
            <table class="table-responsive table-bordered align-middle" id="tablaDatosComp">
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
        </div>

        <br>
        <!--Selección de pruebas-->

        <br>
        <div class="table-responsive">
            <table class="table-responsive table-bordered align-middle caption-top" id="tablaPruebas">
                <caption><b>PRUEBAS A LAS QUE SE INSCRIBE</b></caption>
                <tr v-for="prueba in pruebas" :key="prueba.id">
                    <td>
                        <div>

                            <label :for="prueba.nombre">{{ prueba.nombre }}</label>
                        </div>
                    </td>
                </tr>
            </table>

        </div>
        <br>

        <!--Descargo de responsabilidad-->
        <div class="form-check" id="descargoResp">
            <input class="form-check-input" type="checkbox" value="" id="descargoCheck" required>
            <label class="form-check-label" for="invalidCheck" align="justify">
                Al firmar acepto voluntariamente participar en este campeonato, bajo
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
        <br>

        <!--Botón de descarga-->
        <div class="container" vertical-align="middle">
            <button class="btn btn-primary rounded" id="btn-descarga" @click="printDiv()">Descargar</button>
        </div>
        <br>

        <!--Botón de regresar-->
        <div class="container" vertical-align="middle">
            <a href="/ficha"><button class="btn btn-primary rounded" id="btn-regresar">Regresar</button></a>
        </div>

    </div>
</template>

<script>
import { obtenerFichaInscripcionFachada } from "@/assets/js/Competidor"
import "@/router/index.js"
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

            // Verificar si el checkbox está seleccionado
            const checkbox = document.getElementById('descargoCheck');
            if (!checkbox.checked) {
                console.log("Debes seleccionar el checkbox antes de imprimir.");
                alert("Debe aceptar el descargo de responsabilidad para imprimir")
                return;
            }

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
    #btn-descarga {
        display: none;
    }

    #btn-regresar {
        display: none;
    }
}

@media print {
    #descargoCheck {
        display: none;
    }
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

#divToPrint {
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-left: 5%;
    margin-right: 5%;
}

#tituloFicha {
    background-color: #52bad1;
    padding: 1%;
}

@media (min-width: 320px) and (max-width: 767px) {
    #tablaDatosComp {
        width: 100%;
    }

    #tablaPruebas {
        width: 100%;
    }

    #firmas {
        width: 100%;
    }
}

@media (min-width: 768px) {
    #tablaDatosComp {
        width: 80%;
        vertical-align: middle;
    }

    #tablaPruebas {
        width: 80%;
        vertical-align: middle;
    }

    #firmas {
        width: 80%;
        vertical-align: middle;
    }
}

#tablaDatosComp {
    border-collapse: collapse;

    th,
    td {
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
}

#tablaPruebas {
    border-collapse: collapse;

    th,
    td {
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
}

#descargoResp {
    background-color: rgba(102, 153, 153, 0.5);
    padding: 2.5%;
}

#descargoCheck {
    margin-right: 5px;
}
</style>