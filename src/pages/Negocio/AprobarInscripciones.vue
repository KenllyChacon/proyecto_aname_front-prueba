<template>
  <!--Barra navegacion-->
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro/>
  </div>

  <h2 class="fw-bold">Aprobar Inscripciones</h2>

  <br>
  <label for="" id="labelSup">Seleccione campeonato</label>
  <select class="bordeCaja" required v-model="idCampeonato" @change="listarCampIsnscritos">
    <option v-for="opcion in listaCampeonatos" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
  </select>
  <br>


  <div class="table-responsive" id="contAprobarInsc">
    <table class="table-responsive table-bordered bordeCaja" id="tabAprobar">
      <table>
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
            <td>{{ c.nombres + " " +c.apellidos }}</td>
            <td>{{ c.estadoParticipacion }}</td>
            <td><a :href="buscarComprobantePago(c.documentos)" download>Descargar Pago</a></td>
            <td><a :href="buscarFichaInscripcion(c.documentos)" download>Descargar Ficha</a></td>
            <td>
              <button @click="aprobarPago(c.id)">Aprobar Pago</button>
              <button @click="denegarPago(c.id)">Denegar Pago</button>

            </td>
            <td>
              <form enctype="multipart/form-data">
                <div class="form-group">
                  <label class="colorTexto fw-bold"> Subir ficha de inscripción firmada:</label>
                  <input type="file" @change="fichaI" accept="application/pdf" class="form-control-file">
                </div>
                <br>
                <button type="submit" class="btn btn-primary" @click="enviarFicha(c.id)">Enviar Ficha firmada</button>

              </form>
            </td>

            <td>
              <button @click="confirmarInscripcion(c.id)">Aprobar Inscripción</button>
              <button @click="negarInscripcion(c.id)">Denegar Inscripción</button>

            </td>
          </tr>


        </tbody>
      </table>
    </table>
  </div>

  <br>

  <!-- Pie de página -->
  <PiePagina />
</template>
  
<script>
import PiePagina from "@/components/PiePagina.vue";
import BarraNav from "@/components/BarraNav.vue";
import { campIncritosP, VerCampeonatosP } from "@/assets/js/campeonato";
import { confirmarPagoFachada, negarPagoFachada, aprobarInscripcionFachada, confirmarInscripcionFachada, negarInscripcionFachada } from "@/assets/js/Competidor"
import { cargaArchivosFachada } from "@/assets/js/Archivo"
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
    };
  },
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },
  mounted() {
    this.listarCampeonatos()

  },
  methods: {

    async listarCampIsnscritos() {
      this.listaCampInscritos = await campIncritosP(this.idCampeonato)
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
      this.fichaFirmadaRes = await cargaArchivosFachada(this.fichaFirmada, "inscripcion-firmada", sessionStorage.getItem("email"));
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

.bordeCaja {
  border: 2px solid #edf3f5;
}


@media (min-width: 768px) {
  #contAprobarInsc {
    width: 75%
  }
}

@media (max-width: 767px) {
  #contAprobarInsc {
    width: 100%;
  }
}
</style>