<template>
  <!--Barra navegacion-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary w-100 ">
    <div class="container-fluid">
      <img src="@/assets/img/logofin.png" alt="Logo" width="75" height="75">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/campeonato/crear" class="nav-link">Crear Campeonato</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admitirAtletas" class="nav-link">Admitir Atletas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/aprobarInscripciones" class="nav-link">Aprobar Inscripciones</router-link>
          </li>
        </ul>
        <div v-if="!mostrar" class="float-end">
          <router-link to="/login" class="btn btn-danger">Iniciar Sesión</router-link>
          <router-link to="/registro" class="btn btn-danger ms-3">Registrarse</router-link>
        </div>
        <div v-else class="float-end">
          <label for="" style="color: #edf3f5">{{email}}</label>
          <LogOutComp/>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

import LogOutComp from "@/components/LogOutComp.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {LogOutComp},
  data() {
    return {
      mostrar: null,
      email: null,
    }
  },
  mounted() {
    this.mostrar = sessionStorage.getItem("mostrar");
    console.log("aaaaaaaaaaaaaaaaaaa" + this.mostrar)
    this.email = sessionStorage.getItem("email");

    console.log("aaaaaaaaaaaaaaaaaaa" + this.email)
  }
})

</script>

<style scoped>
.navbar{
  background: #2660a4;
}

.btn{
  background-color: #52bad1;
  color: #edf3f5;
  border-color: #003153;
}

.nav-link.active {
  color: #eeb902;
}

.nav-link {
  color: #edf3f5;
}
</style>
