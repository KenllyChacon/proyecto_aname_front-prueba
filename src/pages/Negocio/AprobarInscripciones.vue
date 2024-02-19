<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>
  <div class="page-content">
    <h2 class="fw-bold">Aprobar Inscripciones</h2>
    <div>
      <label for="" id="labelSup">Seleccione campeonato:</label>
      <select required v-model="campeonato" @change="listarCampIsnscritos">
        <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion">{{ opcion.nombre }}</option>
      </select>
    </div>
    <br>
    <div class="table-responsive-sm" id="contAprobarInsc">
      <table class="table table-bordered table-responsive" id="tabAprobar">
        <thead>
          <tr>
            <th id="tablaInsc">Competidor</th>
            <th id="tablaInsc">Estado</th>
            <th id="tablaInsc">Documento pago</th>
            <th id="tablaInsc">Documento inscripción</th>
            <th id="tablaInsc">Aprobar pago</th>
            <th id="tablaInsc">Aprobar ficha inscripción</th>
            <th id="tablaInsc">Aprobar competidor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in listaCampInscritos" :key="c">
            <td>{{ c.nombres + " " + c.apellidos }}</td>
            <td>{{ c.estadoParticipacion }}</td>
            <td><a :href="buscarComprobantePago(c.documentos)" download>Descargar pago</a></td>
            <td><a :href="buscarFichaInscripcion(c.documentos)" download>Descargar ficha</a></td>
            <td>
              <button class="btn btn-primary"
                @click="aprobarPago(c.id, buscarComprobantePago(c.documentos), c.email)">Aprobar
                pago</button><br>
              <button class="btn btn-primary"
                @click="denegarPago(c.id, buscarComprobantePago(c.documentos), c.email)">Denegar
                pago</button>
            </td>
            <td>
              <form enctype="multipart/form-data" @submit.prevent="enviarFicha(c.id)">
                <div class="form-group">
                  <label class="fw-bold"> Subir ficha de inscripción firmada:</label>
                  <input type="file" @change="fichaI" accept="application/pdf" class="form-control-file">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" :disabled="cargando">Enviar ficha firmada</button>
                <div class="loader" v-if="cargando"></div>

              </form>
            </td>

            <td>
              <button class="btn btn-primary" @click="confirmarInscripcion(c.id, c.email)">Aprobar
                inscripción</button><br>
              <button class="btn btn-primary"
                @click="negarInscripcion(c.id, c.email, buscarFichaInscripcion(c.documentos))">Denegar
                inscripción</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <br>
  </div>

  <!-- Pie de página -->
  <PiePagina />
</template>
  
<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import { campIncritosP, VerCampeonatosP } from "@/assets/js/campeonato";
import {
  confirmarPagoFachada,
  negarPagoFachada,
  aprobarInscripcionFachada,
  confirmarInscripcionFachada,
  negarInscripcionFachada,
} from "@/assets/js/Competidor"
import { cargaArchivosFachada } from "@/assets/js/Archivo"
import { buscarAsociacionUsuarioFachada } from "@/assets/js/Usuario"
import BarraNavPro from "@/components/BarraNavPro.vue";
import PagoInscripcionAceptadoVue from "@/mailTemplates/PagoInscripcionAceptado.vue";
import PagoInscripcionNegado from "@/mailTemplates/PagoInscripcionNegado.vue";
import { enviarHTMLFachada } from '@/assets/js/Email'
import InscripcionCampNegada from '@/mailTemplates/InscripcionCampNegada.vue';
import InscripcionCampAceptada from '@/mailTemplates/InscripcionCampAceptada.vue';


export default {
  name: "VerificarInscripcion",

  data() {
    return {
      categoria: null,
      campeonato: null,
      listaCampInscritos: [],
      listaCampeonatos: [],
      fichaFirmadaRes: null,
      fichaFirmada: null,
      mostrarBarra: true,
      cargando: false,
      idAsociacion: null,
    };
  },
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },
  async mounted() {
    this.listarCampeonatos()
    if (sessionStorage.getItem("rol") == "ADM" || sessionStorage.getItem("rol") == "JUN" || sessionStorage.getItem("rol") == "ORG") {
      console.log("id: " + sessionStorage.getItem("id"))
      this.mostrarBarra = false;
    }

    this.idAsociacion = await buscarAsociacionUsuarioFachada(sessionStorage.getItem("email"))
    console.log(this.idAsociacion)
  },
  methods: {

    async listarCampIsnscritos() {
      this.listaCampInscritos = await campIncritosP(this.campeonato.id, this.idAsociacion)
    },
    async listarCampeonatos() {
      this.listaCampeonatos = await VerCampeonatosP();
    },

    buscarComprobantePago(documentos) {

      if (documentos == null) {
        return "No encontrado"
      } else {
        for (const documento of documentos) {
          if (documento.nombre && documento.nombre.startsWith("comprobante-pago")) {
            return documento.link;
          }
        }

        // Si no se encuentra, puedes retornar null o cualquier valor que indique que no se encontró
        return "No encontrado";
      }
      // Utilizando un bucle for...of

    },

    buscarFichaInscripcion(documentos) {
      // Utilizando un bucle for...of
      if (documentos == null) {
        return null
      } else {
        for (const documento of documentos) {
          if (documento.nombre && documento.nombre.startsWith("ficha-inscripcion")) {
            return documento.link;
          }
        }

        // Si no se encuentra, puedes retornar null o cualquier valor que indique que no se encontró
        return "No encontrado";
      }
    },

    async aprobarPago(id, pago, email) {
      try {
        await confirmarPagoFachada(id);
        localStorage.setItem("pagoAcept", pago)
        localStorage.setItem("camp", this.campeonato.nombre)
        const Vue = require('vue');
        const app = Vue.createApp(PagoInscripcionAceptadoVue);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Registro de pago de inscripción exitoso",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Pago aprobado")
      } catch (error) {
        alert("Error al aprobar el pago")
      }
      await this.listarCampIsnscritos()
      localStorage.removeItem("pagoAcept")
      localStorage.removeItem("camp")
    },
    async denegarPago(id, pago, email) {
      try {
        await negarPagoFachada(id);
        localStorage.setItem("pagoNeg", pago)
        localStorage.setItem("camp", this.campeonato.nombre)
        const Vue = require('vue');
        const app = Vue.createApp(PagoInscripcionNegado);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Se rechaza su pago de inscripción",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Pago denegado")
      } catch (error) {
        alert("Error al denegar el pago")
      }
      await this.listarCampIsnscritos()
      localStorage.removeItem("pagoNeg")
      localStorage.removeItem("camp")
    },
    fichaI(event) {
      // Accede al archivo seleccionado
      const file = event.target.files[0];

      // Verifica si el archivo es un pdf
      if (file.type === 'application/pdf') {
        console.log('Archivo PDF seleccionado:', file);

        // Realiza las operaciones que necesites con el archivo
        this.fichaFirmada = file;

      } else {
        console.log('El archivo seleccionado no es un PDF');
      }

      this.cargarFicha();
    },

    async cargarFicha() {

      this.cargando = true;

      try {
        this.fichaFirmadaRes = await cargaArchivosFachada(this.fichaFirmada, "inscripcion-firmada", sessionStorage.getItem("email"));
        console.log(this.fichaFirmadaRes)
      } catch (error) {
        console.error("Error al cargar el archivo de pago:", error);
        alert("Error al cargar el comprobante de pago");
      } finally {
        this.cargando = false; // Oculta el cargador después de que termine la carga (incluso si hay un error)
      }


      console.log("Ficha: " + this.fichaFirmadaRes)
    },

    async enviarFicha(idComp) {
      if (this.fichaFirmadaRes) {
        const ficha = {
          idCompetidor: idComp,
          nombre: this.fichaFirmadaRes.nombre,
          link: this.fichaFirmadaRes.link,
          extension: this.fichaFirmadaRes.extension
        };

        try {
          await aprobarInscripcionFachada(ficha);
          alert('Ficha de inscripción firmada enviada con éxito');
        } catch (error) {
          alert('No se pudo enviar la ficha de inscripción firmada');
        }


        this.fichaFirmadaRes = null
        this.fichaFirmada = null
      } else {
        alert('Ningún documento cargado');

      }

    },

    async confirmarInscripcion(id, email) {
      try {
        await confirmarInscripcionFachada(id);
        localStorage.setItem("usuario", email)
        localStorage.setItem("camp", this.campeonato.nombre)
        const Vue = require('vue');
        const app = Vue.createApp(InscripcionCampAceptada);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Inscripción al campeonato " + this.campeonato.nombre + " ha sido aprobada",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Competidor confirmado")
      } catch (error) {
        alert("El competidor NO cumple con los requisitos para confirmar su inscripción")
      }
      await this.listarCampIsnscritos()
      localStorage.removeItem("usuario")
      localStorage.removeItem("camp")
    },
    async negarInscripcion(id, email, ficha) {
      try {
        await negarInscripcionFachada(id);
        localStorage.setItem("usuario", email)
        localStorage.setItem("camp", this.campeonato.nombre)
        localStorage.setItem("ficha", ficha)

        const Vue = require('vue');
        const app = Vue.createApp(InscripcionCampNegada);

        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);
        const instance = app.mount(tempDiv);

        const htmlContent = instance.$el.outerHTML;
        const body = {
          toUser: email,
          subject: "ANAME: Inscripción al campeonato " + this.campeonato.nombre + " ha sido denegada",
          htmlContent: htmlContent

        }
        enviarHTMLFachada(body);
        document.body.removeChild(tempDiv);
        alert("Competidor no aprobado")
      } catch (error) {
        alert("Error al negar inscripción")
      }

      await this.listarCampIsnscritos()
    }


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


/* 
.form-control {
  border: 2px solid #2660a4;
} */

h2 {
  color: #003153;
  /* font-weight: bold; */
  margin-top: 15px;
  margin-bottom: 15px;
}


/*table {
  margin: 0 auto;
}*/

/* 
.opciones-container {
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
} */

/* */
.opcion-item {
  flex-basis: calc(23.33% - 10px);
  /* Ajusta el tamaño de cada columna según tus necesidades */
  margin: 5px;
  box-sizing: border-box;
}

.loader {
  width: 120px;
  height: 20px;
  -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) left/20% 100%;
  background:
    linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat #ddd;
  animation: l7 1s infinite steps(6);
}

@keyframes l7 {
  100% {
    background-position: right -25% top 0
  }
}

/* .bordeCaja {
  border: 2px solid #edf3f5;
} */


/*el siguiente bloque los comento porque sino no se centra bien las tabla */
/* @media (min-width: 768px) {
  #contAprobarInsc {
    width: 75%
  }
} */

/*el siguiente bloque no afecta si esta activo o no, no hay cambio alguno */
/* @media (max-width: 767px) {
  #contAprobarInsc {
    width: 100%;
  }
} */

.page-content {
  padding-bottom: 50%;
}
</style>