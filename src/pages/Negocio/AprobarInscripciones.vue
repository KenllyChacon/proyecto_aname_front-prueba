<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>
  <div class="page-content">
    <h2 class="fw-bold">Aprobar Inscripciones</h2>
    <div>
      <label for="" id="labelSup">Seleccione campeonato:</label>
      <select required v-model="idCampeonato" @change="listarCampIsnscritos">
        <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
      </select>
    </div>
    <br>
    <div class="table-responsive-sm" id="contAprobarInsc">
      <table class="table table-bordered table-responsive" id="tabAprobar">
        <thead>
          <tr>
            <th id="tablaInsc">Competidor</th>
            <th id="tablaInsc">Estado</th>
            <th id="tablaInsc">Documento Pago</th>
            <th id="tablaInsc">Documento Inscripción</th>
            <th id="tablaInsc">Aprobar Pago</th>
            <th id="tablaInsc">Aprobar Ficha Inscripción</th>
            <th id="tablaInsc">Aprobar Competidor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in listaCampInscritos" :key="c">
            <td>{{ c.nombres + " " + c.apellidos }}</td>
            <td>{{ c.estadoParticipacion }}</td>
            <td><a :href="buscarComprobantePago(c.documentos)" download>Descargar Pago</a></td>
            <td><a :href="buscarFichaInscripcion(c.documentos)" download>Descargar Ficha</a></td>
            <td>
              <button class="btn btn-primary" @click="aprobarPago(c.id)">Aprobar Pago</button><br>
              <button class="btn btn-primary" @click="denegarPago(c.id)">Denegar Pago</button>
            </td>
            <td>
              <form enctype="multipart/form-data" @submit.prevent="enviarFicha(c.id)">
                <div class="form-group">
                  <label class="fw-bold"> Subir ficha de inscripción firmada:</label>
                  <input type="file" @change="fichaI" accept="application/pdf" class="form-control-file">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" :disabled="cargando">Enviar Ficha firmada</button>
                <div class="loader" v-if="cargando"></div>

              </form>
            </td>

            <td>
              <button class="btn btn-primary" @click="confirmarInscripcion(c.id)">Aprobar Inscripción</button><br>
              <button class="btn btn-primary" @click="negarInscripcion(c.id)">Denegar Inscripción</button>
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
import { confirmarPagoFachada, 
  negarPagoFachada, 
  aprobarInscripcionFachada, 
  confirmarInscripcionFachada, 
  negarInscripcionFachada,
 } from "@/assets/js/Competidor"
import { cargaArchivosFachada } from "@/assets/js/Archivo"
import {buscarAsociacionUsuarioFachada}from "@/assets/js/Usuario"
import BarraNavPro from "@/components/BarraNavPro.vue";


export default {
  name: "VerificarInscripcion",

  data() {
    return {
      categoria: null,
      idCampeonato: null,
      listaCampInscritos: [],
      listaCampeonatos: [],
      fichaFirmadaRes: null,
      fichaFirmada: null,
      mostrarBarra: true,
      cargando: false,
      idAsociacion:null,
    };
  },
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },
  async mounted() {
    this.listarCampeonatos()
    if(sessionStorage.getItem("rol") == "ADM" || sessionStorage.getItem("rol") == "JUN" || sessionStorage.getItem("rol") == "ORG") {
      console.log("id: " + sessionStorage.getItem("id"))
      this.mostrarBarra = false;
    }

    this.idAsociacion= await buscarAsociacionUsuarioFachada(sessionStorage.getItem("email"))
    console.log(this.idAsociacion)
  },
  methods: {

    async listarCampIsnscritos() {
      this.listaCampInscritos = await campIncritosP(this.idCampeonato, this.idAsociacion)
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

    async aprobarPago(id) {
      try {
        await confirmarPagoFachada(id);
        alert("Pago aprobado")
      } catch (error) {
        alert("Error al aprobar el pago")
      }
      await this.listarCampIsnscritos()
    },
    async denegarPago(id) {
      try {
        await negarPagoFachada(id);
        alert("Pago denegado")
      } catch (error) {
        alert("Error al denegar el pago")
      }
      await this.listarCampIsnscritos()
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
          alert('Ficha de inscripcion firmada enviada con éxito');
        } catch (error) {
          alert('No se pudo enviar la ficha firmada de inscripcion');
        }


        this.fichaFirmadaRes = null
        this.fichaFirmada = null
      } else {
        alert('Ningún documento cargado');

      }

    },

    async confirmarInscripcion(id) {
      try {
        await confirmarInscripcionFachada(id);
        alert("Competidor confirmado")
      } catch (error) {
        alert("El competidor NO cumple con los requisitos para confirmar su inscripción")
      }
      await this.listarCampIsnscritos()
    },
    async negarInscripcion(id) {
      try {
        await negarInscripcionFachada(id);
        alert("Competidor Negado")
      } catch (error) {
        alert("Error al negar inscripcion")
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
  -webkit-mask: linear-gradient(90deg,#000 70%,#0000 0) left/20% 100%;
  background:
      linear-gradient(#000 0 0) left -25% top 0 /20% 100% no-repeat
      #ddd;
  animation: l7 1s infinite steps(6);
}
@keyframes l7 {
  100% {background-position: right -25% top 0}
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