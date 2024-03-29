# CrearCampeonato.vue
Archivo que implementa la página que permite al administrador crear campeonatos.

## Estructura HTML

### Elementos de la página Crear Campeonato

Fragmento de código que utiliza directivas condicionales de Vue.js (v-if y v-else) para alternar entre dos componentes de barra de navegación basados en el valor de la variable mostrarBarra.

```html
  <!--Barra de navegación-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>
```

El siguiente código HTML implementa un formulario que permite al usuario ingresar información para crear un nuevo campeonato, incluidos detalles como nombre, fechas, costos y pruebas asociadas.

```html
    <h2>Crear Campeonato</h2>
    <!-- <br> -->

    <div class="page-content">
        <form @submit.prevent="insertar()">
            <table class="table">
                <tr>
                    <td><label for="" id="labelSup">Nombre: </label></td>
                    <td><input class="form-control" v-model="nombre" required type="text"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Federación que organiza: </label></td>
                    <td> <select class="form-select" aria-label="Seleccionar federación"
                            style="background-color: #edf3f5; color: #000000;" v-model="asociacion">
                            <option v-for="a in asociaciones" v-bind:key="a.id" :value="a.id">
                                {{ a.nombre }}
                            </option>
                        </select></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Sede: </label></td>
                    <td><select class="form-select" aria-label="Seleccionar sede"
                            style="background-color: #edf3f5; color: #000000;" v-model="sede">
                            <option>Ambato</option>
                            <option>Azogues</option>
                            <option>Cuenca</option>
                            <option>Guayaquil</option>
                            <option>Ibarra</option>
                            <option>La Maná</option>
                            <option>Machala</option>
                            <option>Quito</option>
                            <option>Tulcán</option>
                        </select></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Organizador: </label></td>
                    <td><input class="form-control" v-model="organizador" required type="text"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Fecha de inicio: </label></td>
                    <td><input class="form-control" v-model="fInicio" required type="date"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Fecha de finalización</label></td>
                    <td><input class="form-control" v-model="fFin" required type="date"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Fecha inicio de inscripción: </label></td>
                    <td><input class="form-control" v-model="finicioI" required type="date"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Fecha fin de inscripción</label></td>
                    <td><input class="form-control" v-model="fFinI" required type="date"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Costo socios</label></td>
                    <td><input class="form-control" v-model="costoSoc" required type="number" step="0.01"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Costo no socios</label></td>
                    <td><input class="form-control" v-model="costNoSoc" required type="number" step="0.01"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Costo prueba adicional</label></td>
                    <td><input class="form-control" v-model="costPAdic" required type="number" step="0.01"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Cuenta bancaria</label></td>
                    <td><input class="form-control" v-model="cuentaBancaria" required type="text"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Institución financiera</label></td>
                    <td><input class="form-control" v-model="institucionF" required type="text"></td>
                </tr>
                <tr>
                    <td><label for="" id="labelSup">Titular de cuenta bancaria</label></td>
                    <td><input class="form-control" v-model="titularCuenta" required type="text"></td>
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
                                <label>{{ opcion.nombre }}</label>
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
    </div>
```

Se inserta el componente "PiePagina" en el pie de página de la página actual.

```html
  <!-- Pie de página -->
  <PiePagina />
```

## Funcionalidad JS

Código que importa varios componentes relacionadas con la creación de campeonatos.

```javascript
import BarraNav from "@/components/BarraNav.vue";
import PiePagina from "@/components/PiePagina.vue";
import { CrearCampeonatoP, listaAsociacionesFachada } from "@/assets/js/campeonato.js"
import { listarPruebasFachada } from '@/assets/js/Prueba';
import router from '@/router';
import BarraNavPro from "@/components/BarraNavPro.vue";
```
Fragmento de código que define un componente que se encarga de recopilar la información necesaria para crear un nuevo campeonato, enviarla al backend y realizar las acciones necesarias después de la creación del campeonato, como limpiar el formulario. Además, muestra la barra de navegación correspondiente según el rol del usuario.

```javascript
export default {
    components: {
        BarraNavPro,
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
            asociaciones: [],
            costoSoc: null,
            costNoSoc: null,
            costPAdic: null,
            asociacion: null,
            cuentaBancaria: null,
            institucionF: null,
            titularCuenta: null,
            mostrarBarra: true
        }
    },

    mounted() {
        console.log("Mounted*********")
        this.listarAsociaciones();
        this.listarPruebas();
        if (sessionStorage.getItem("rol") == "ADM" || sessionStorage.getItem("rol") == "JUN" || sessionStorage.getItem("rol") == "ORG") {
            console.log("id: " + sessionStorage.getItem("id"))
            this.mostrarBarra = false;
        }
    },
    methods: {

        async listarAsociaciones() {
            console.log("Lista asociaciones----------------------------------------------------")
            this.asociaciones = await listaAsociacionesFachada()
            console.log("Asociaciones: " + this.asociaciones)
                ;
        },

        async insertar() {
            console.log(this.titularCuenta + " " + this.institucionF);
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
                costoNoSocio: this.costNoSoc,
                costoPruebaAdicional: this.costPAdic,
                cuentaBancaria: this.cuentaBancaria,
                institucionFinanciera: this.institucionF,
                titularCuenta: this.titularCuenta,
                idAsociacion: this.asociacion,
            }

            console.log(campeonato)

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
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la página "CrearCampeonato.vue".

```css
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

.page-content {
    padding-bottom: 50%;
}
```
