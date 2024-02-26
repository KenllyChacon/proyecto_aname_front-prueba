# Inicio.vue

Este código representa la página de inicio de ANAME (ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER).

## Estructura HTML

### Carrusel

El primer elemento de la página es un carrusel que muestra varias imágenes con el nombre de la asociación en capas superpuestas. También cuenta con dos botones a los extremos que permiten cambiar cambiar a la anterior o siguiente imagen.


```html
<!--Carrusel-->
<div id="carousel1" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/img/img-slide-01.jpg" class="d-block w-100" alt="">
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">
          ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER</h1>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/img-slide-02.jpg" class="d-block w-100" alt="">
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">
          ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER</h1>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/img-slide-03.jpg" class="d-block w-100" alt="">
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">
          ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER</h1>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/img-slide-04.jpg" class="d-block w-100" alt="">
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">
          ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER</h1>
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/img-slide-05.jpg" class="d-block w-100" alt="">
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #ffffff; text-align:left; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">
          ASOCIACIÓN NACIONAL DE ATLETISMO MÁSTER</h1>
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
```

### Barra de Navegación

El el siguiente elemento de la página es la barra de navegación, que mostrará una barra de navegación de usuarios o de atletas dependiendo de la condición "mostrarBarra".


```html
  <div v-if="mostrarBarra">
    <BarraNav />
  </div>
  <div v-else>
    <BarraNavPro />
  </div>
```

### Contenido

Contiene el contenido principal de la página el cual incluye una imagen de banner principal y una tarjeta con información sobre la Asociación Nacional de Atletismo Máster (ANAME).

```html
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
                <p class="card-text" id="textCard1">El atletismo máster acoge a deportistas desde los 30 años en adelante,
                  divididos en modalidades de acuerdo a las edades de los participantes.
                  En Ecuador la organización promotora de estas competencias es la Asociación Nacional de Atletas Master
                  del Ecuador (ANAME).</p>
                <p class="card-text" id="textCard2"><small>La ANAME fue fundada el 18 de septiembre de 2011.</small></p>
              </div>
            </div>
          </div>
        </div>
```
Esta sección muestra información relacionada con enlaces a sitios externos, cada uno representado por una imagen y detalles asociados. Además de un mensaje final con los créditos de quienes formaron parte del proyecto de desarrollo de la página.

```html
        <div class="container-fluid" id="infoRelacionada">
          <div>
            <h2 class="text-center text-uppercase" id="textTitleInfo">Información Relacionada</h2>
          </div>
          <div class="row">
            <div class="col" style="border-right: 4px solid #52bad1;">
              <a href="https://asudama.org/"><img src="@/assets/img/logo-asudama.png" class="imgAsudama"></a>
            </div>
            <div class="col" style="padding-top: 10px;">
              <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="card-body">
                  <h5 class="card-title fw-bold">2024 SOUTH AMERICAN COMBINED EVENTS CHAMPIONSHIPS</h5>
                  <p class="card-text">Sede: Mar de Plata, Argentina</p>
                  <a href="https://asudama.org/" class="card-link" style="color: #2660a4;">Más información</a>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col" style="border-right: 4px solid #52bad1;">
              <a href="https://world-masters-athletics.org/championships/2024-european-championships-indoor/"><img
                  src="@/assets/img/ema-logo.png" class="imgWma"></a>
            </div>
            <div class="col" style="padding-top: 10px;">
              <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="card-body">
                  <h5 class="card-title fw-bold">2024 EUROPEAN CHAMPIONSHIPS INDOOR</h5>
                  <p class="card-text">Sede: Torún, Polonia</p>
                  <a href="https://world-masters-athletics.org/championships/2024-european-championships-indoor/"
                    class="card-link" style="color: #2660a4;">Más información</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <p class="textFoot">Este proyecto fue desarrollado para poner en práctica los conocimientos
        adquiridos en la materia de Computación Grid y Cloud, por los estudiantes de las carreras de Ingeniería en
        Computación e Ingeniería en Computación Gráfica de la Universidad Central del Ecuador.</p>
    </main>
```
### Pie de página

Contiene información de la asociación junto con enlaces que redirigen al usuario a la página oficial de ASUDAMA, a la página oficial de la Universidad Central del Ecuador y a la página oficial de ANAME en Facebook.

```html
    <PiePagina />
```

## Funcionalidad JS

Se importan los componentes necesarios desde los diferentes archivos.

```javascript
import PiePagina from '@/components/PiePagina.vue'
import BarraNav from '@/components/BarraNav.vue'
import BarraNavPro from "@/components/BarraNavPro.vue";
```

Se importan los componentes adicionales (barras de navegación y pie de página). Se verifica el rol del usuario almacenado en "sessionStorage" para determinar si se debe mostrar la barra de navegación de usuario o administrador. Y se define la variable mostrarBarra en data() para gestionar la condición de visibilidad de la barra de navegación.

```javascript
export default {
  name: 'Inicio',
  components: {
    BarraNavPro,
    PiePagina,
    BarraNav,
  },
  mounted() {
    console.log("listo NicoMachin sisisisisisis");
    console.log("ROL INICIO" + sessionStorage.getItem("rol"))
    if (sessionStorage.getItem("rol") == "ADM" || sessionStorage.getItem("rol") == "JUN" || sessionStorage.getItem("rol") == "ORG") {
      console.log("id: " + sessionStorage.getItem("id"))
      this.mostrarBarra = false;
    }
  },
  data() {
    return {
      mostrarBarra: true
    }
  }
}
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas a la página.

```css
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
  border-bottom: 4px solid #52bad1;
}

#cardPersonalizada {
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #52bad1;
}

#textCard1 {
  color: black;
}

#textCard2 {
  color: #edf3f5;
}

#textTitleInfo {
  margin-top: 50px;
}

.textFoot {
  margin-top: 20px;
  margin-left: 8%;
  margin-right: 8%;
  margin-bottom: 20%;
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
  background-color: #edf3f5;
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

.page-content {
  padding-bottom: 20%;
}
```
