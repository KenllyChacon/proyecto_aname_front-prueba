# ConfirmacionRegistro.vue

Este código implementa una plantilla de correo electrónico para informar al usuario que su registro ha sido aprobado por un administrador.

## Estructura HTML

### Encabezado

El encabezado del correo electrónico contiene el logo de ANAME y un mensaje de bienvenida.

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
  <h3><b>¡Bienvenido a ANAME!</b></h3>
</div>
```

### Contenido

Contiene el mensaje de confirmación de registro y un enlace que direcciona al usuario hacia la página de Iniciar Sesión.

```html
<!--Contenido del mail-->
<div class="container" id="cuerpoMail">
  <p align="left">Su usuario {{ usuario }} ha sido revisado y aprobado.</p>
  <p align="left">
    Para iniciar sesión, haga clic
    <a href="https://oficial-aname.netlify.app/login">AQUÍ</a>.
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

Se importa el archivo de router para redireccionar a la página de Iniciar Sesión.

```javascript
import "@/router/index.js";
```

A través de la variable `usuario` se almacena el mail del usuario.

```javascript
export default {
  data() {
    return {
      usuario: localStorage.getItem("emailConf"),
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
