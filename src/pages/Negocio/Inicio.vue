<template>
  <!--Carrusel-->
  <div class="container">
    <div id="carousel1" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/img-slide-01.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-caption d-none d-md-block">
          <h3 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">ASOCIACIÓN NACIONAL DE
            ATLETISMO MÁSTER</h3>
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/img-slide-02.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/img-slide-03.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/img-slide-04.jpg" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/img-slide-05.jpg" class="d-block w-100" alt="">
        </div>
      </div>
      <!--botón anterior-->
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <!--botón siguiente-->
      <button class="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>

  <!--Barra navegacion-->
  <BarraNav />

  <div>
    <!-- Contenido -->
    <main>
      <div class="container" id="contenido">
        <div class="col" id="banner">
          <img class="img-fluid mx-auto d-block" alt="Banner Principal" src="@/assets/img/bannerprincipal.png">
        </div>
        
        <div class="card mb-2" id="cardPersonalizada">
          <div class="row g-4">
            <div class="col-md-6">
              <img src="@/assets/img/card_a.png" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="card-body">
                <h5 class="card-title fs-2 fw-bold text-center" id="textCard1">ANAME como parte del Sistema Deportivo
                  Nacional
                </h5>
                <p class="card-text" id="textCard1">El atletismo master acoge a deportistas desde los 30 años en adelante,
                  divididos en modalidades de acuerdo a las edades de los participantes.
                  En Ecuador la organización promotora de estas competencias es la Asociación Nacional de Atletas Master
                  del
                  Ecuador (ANAME).</p>
                <p class="card-text" id="textCard2"><small>La ANAME fue fundada el 18 de septiembre de 2011.</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid" id="infoRelacionada">
          <div>
            <h2 class="text-center text-uppercase" id="textTitleInfo">Información Relacionada</h2>
          </div>
          <div class="row">
            <div class="col" style="border-right: 4px solid #d62828;">
              <a href="https://asudama.org/"><img src="@/assets/img/logo-asudama.png" class="imgAsudama"></a>
            </div>
            <div class="col" style="padding-top: 10px;">
              <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="card-body">
                  <h5 class="card-title fw-bold">2024 SOUTH AMERICAN COMBINED EVENTS CHAMPIONSHIPS</h5>
                  <p class="card-text">Location: Mar de Plata, Argentina</p>
                  <a href="https://asudama.org/" class="card-link" style="color: #d62828;">Más información</a>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col" style="border-right: 4px solid #d62828;">
              <a href="https://world-masters-athletics.org/championships/2024-european-championships-indoor/"><img
                  src="@/assets/img/ema-logo.png" class="imgWma"></a>
            </div>
            <div class="col" style="padding-top: 10px;">
              <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="card-body">
                  <h5 class="card-title fw-bold">2024 EUROPEAN CHAMPIONSHIPS INDOOR</h5>
                  <p class="card-text">Location: Torún, Poland</p>
                  <a href="https://world-masters-athletics.org/championships/2024-european-championships-indoor/"
                    class="card-link" style="color: #d62828;">Más información</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Pie de página -->
    <PiePagina />
  </div>
</template>

<script>
import PiePagina from '@/components/PiePagina.vue'
import BarraNav from '@/components/BarraNav.vue'

export default {
  name: 'Inicio',
  components: {
    PiePagina,
    BarraNav
  },
  mounted() {
    console.log("listo 6");
  },
}

</script>

<style scoped>
.carousel-item {
  max-height: 348px;
  /* Ajusta la altura */
}

.carousel-item img {
  width: auto;
  height: auto;
}

#banner {
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 4px solid #d62828;
}

#cardPersonalizada {
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #3083dc;
}

#textCard1 {
  color: black;
}

#textCard2 {
  color: #efca08;
}

#textTitleInfo {
  margin-top: 50px;
}

.imgWma {
  width: 170px;
  height: auto;
  margin-top: 30px;
}

.imgAsudama {
  height: 150px;
}

#infoRelacionada {
  padding-bottom: 15px;
}

#contenido {
  background-color: #fff2f1;
  padding-bottom: 30px;
  padding-top: 30px;
  padding-left: 120px;
  padding-right: 120px;
}

@media (min-width: 320px) {
  #contenido {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
