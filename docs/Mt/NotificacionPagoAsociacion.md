# NotificacionPagoAsociacion.vue

Este código implementa una plantilla de correo electrónico para informar al usuario que se ha negado su inscripción a un campeonato.

## Estructura HTML

### Encabezado

El encabezado del correo electrónico contiene el logo de ANAME y sus siglas.

```html
<div class="container" id="encabezadoMail">
  <!--Logo de ANAME-->
  <img
    src="@/assets/img/logofin.png"
    alt=""
    width="50"
    height="50"
    align="left"
  />
  <h3><b>ANAME</b></h3>
</div>
```

### Contenido

Contiene el mensaje destinado al atleta, indicando su usuario, la federación a la que se inscribió y el comprobante de pago.

```html
<!--Contenido del mail-->
<div class="container" id="cuerpoMail">
  <p align="left">
    Se informa que usted {{usuario}} ha registrado el pago para asociarse a la
    federación: {{ federacion}}.
  </p>
  <p align="left">
    Su asociación está sujeta a verificación por parte de un administrador, se
    le notificará a la brevedad posible.
  </p>
  <p align="left">
    Información de pago: <a :href="pago">COMPROBANTE DE PAGO</a>
  </p>
</div>
```

### Pie de página

Dirige al usuario a la página oficial de ANAME en Facebook.

```html
<!--Pie de página del mail con información sobre ANAME-->
<div class="container-fluid fixed-bottom" id="piePag">
  <div class="position-absolute">
    <a
      href="https://www.facebook.com/p/ANAME-Asociaci%C3%B3n-Nacional-de-Atletismo-Master-del-Ecuador-100064841912450/?paipv=0&eav=AfaSv9pzpI9ergJbpLVMMNEX0dEx9-1RJWBzc4GFil1sb49W38fNLM9QEMSUzDbZtN0&_rdr"
      style="color: #eeb902; align:center;"
      >Página Oficial de ANAME en Facebook</a
    >
  </div>
</div>
```

## Funcionalidad JS

Se importa el archivo de router.

```javascript
import "@/router/index.js";
```

Se usan las variables `usuario`, `federacion` y `pago` para almacenar los datos requeridos.

```javascript
export default {
  data() {
    return {
      usuario: localStorage.getItem("emailConf"),
      federacion: localStorage.getItem("asociacion"),
      pago:
        localStorage.getItem("pagoAso") +
        "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-03-29T22:19:13Z&st=2024-01-29T14:19:13Z&spr=https,http&sig=5n44N%2BrVDmWYMuwzu0fJDpNDg9knKZErKMN6uetY2gE%3D",
    };
  },
};
```

## Diseño CSS

Se establecen las configuraciones de diseño del encabezado y el pie de página.

```css
#encabezadoMail {
  background-color: #52bad1;
  color: #edf3f5;
  padding-top: 15px;
  padding-bottom: 25px;
}

#piePag {
  background-color: #003153;
  align-content: center;
  padding-top: 25px;
  padding-bottom: 25px;
  width: auto;
}
```

Se ajusta la disposición de elementos según el ancho del dispositivo (responsividad).

```css
@media (max-width: 768px) {
  #cuerpoMail {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }

  #piePag {
    width: 100%;
  }
}

@media (min-width: 320px) and (max-width: 767px) {
  #cuerpoMail {
    padding-left: 0px;
    padding-right: 0px;
    width: 40%;
  }

  #piePag {
    padding-left: 20px;
    width: 100%;
  }
}
```
