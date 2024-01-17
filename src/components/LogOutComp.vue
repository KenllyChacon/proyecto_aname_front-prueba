<template>
  <button @click="logout" class="btn btn-dark">Cerrar sesión</button>
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
  background-color: #003153;
  border-color: #1a1c1c;
  color: #edf3f5;
}

</style>