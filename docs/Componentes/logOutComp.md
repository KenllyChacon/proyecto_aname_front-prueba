# LogOutComp.vue

Este código implementa un componente que permite cerrar sesión a todos los usuarios atletas o administradores.

## Estructura HTML

### Elementos del componente

Este componente consta de un botón cuya función es cerrar sesión.

```html
<template>
  <button @click="logout" class="btn btn-dark">Cerrar Sesión</button>
</template>
```

## Funcionalidad JS

 Código que define un método logout() que se encarga de cerrar la sesión del usuario. Elimina ciertos elementos del sessionStorage, navega a la ruta raíz '/' y recarga la página actual. 

```javascript
export default {
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('roles')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('mostrar')
      console.log("aaaaaaaaaa" + sessionStorage.getItem("mostrar"))
      this.$router.push('/')

      location.reload()
    }
  }
}
```

## Diseño CSS

Se establecen las configuraciones de estilo aplicadas al componente LogOutComp.vue.

```css
.btn {
  margin-right: 2%;
  margin-bottom: 0.6%;
  background-color: #003153;
  border-color: #1a1c1c;
  color: #edf3f5;
}
```
