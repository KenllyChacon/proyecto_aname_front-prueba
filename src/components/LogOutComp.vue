<template>
  <button @click="logout" class="btn btn-danger">Cerrar sesión</button>
</template>

<script>
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
</script>
<style>

.btn{
  margin-right: 2%;
  margin-bottom: 0.6%;
}

</style>