# PiePagina.vue

Este código implementa el componente que muestra los datos del Pie de Página de la aplicación web.

## Estructura HTML

### Elementos del componente

Código que muestra información en el Pie de Página distribuida en tres secciones: Contacto, Información y Redes Sociales. Esta información está relacionada con la ANAME (Asociación Nacional de Atletas Máster del Ecuador).

```html
<template>
    <!-- Pie de página -->
    <footer class="text-center fixed-bottom" style="background-color: #003153; color: #edf3f5; display: flex; justify-content: space-around; padding-top: 20px;">
        <div>
            <h6>Contacto</h6>
            <p style="align: left">098 765 4321</p>
            <p style="align: left">correo@aname.org</p>
        </div>

        <div>
            <h6>Información</h6>
            <a href="https://asudama.org/" style="color: #eeb902; align: left;">asudama.org</a>
            <p></p> 
            <a href="https://www.uce.edu.ec/">
              <img src="@/assets/img/Escudo_de_la_Universidad_Central_del_Ecuador.png" class="imgUce"></a>
            <p></p> 
            
        </div>

        <div>
            <h6>Redes Sociales</h6>
            <a href="https://www.facebook.com/p/ANAME-Asociaci%C3%B3n-Nacional-de-Atletismo-Master-del-Ecuador-100064841912450/?paipv=0&eav=AfaSv9pzpI9ergJbpLVMMNEX0dEx9-1RJWBzc4GFil1sb49W38fNLM9QEMSUzDbZtN0&_rdr"
                style="color: #eeb902; align:left;">Facebook</a>
        </div>
    </footer>
</template>
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas al componente PiePagina.vue.

```css
.imgUce {
  width: 50px;
  height: 50px;
  margin-top: 3px;
}
```
Se ajusta la disposición de elementos según el ancho del dispositivo (responsividad).

```css
@media (min-width: 768px) {
    footer {
      width: 100%;
    }
  }
  
  @media (min-width) and (max-width: 767px){
    footer {
      width: 40%;
    }
  }
```