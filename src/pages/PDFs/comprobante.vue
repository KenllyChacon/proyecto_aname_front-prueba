
<template>
    <div class="factura">
      <header>
        <h1>FACTURA #12345</h1>
        <h2>1 de diciembre de 2028</h2>
      </header>
      <main>
        <section class="datos-cliente">
          <h3>Cliente</h3>
          <ul>
            <li>Nombre: INDUSTRIAS ARCOÍRIS</li>
            <li>Teléfono: (312) 123-4567</li>
            <li>Dirección: Calle Madero 123, Centro, Colima, Colima 28000</li>
          </ul>
        </section>
        <section class="items">
          <table>
            <thead>
            <tr>
              <th>ITEM</th>
              <th>CANTIDAD/HORAS</th>
              <th>PRECIO UNITARIO</th>
              <th>TOTAL</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>$123</td>
              <td>$123</td>
              <td>$123</td>
            </tr>
            <tr>
              <td>Service 2</td>
              <td>Description</td>
              <td>$123</td>
              <td>$246</td>
            </tr>
            <tr>
              <td>Service 3</td>
              <td>Description</td>
              <td>$123</td>
              <td>$123</td>
            </tr>
            </tbody>
          </table>
        </section>
        <section class="totales">
          <ul>
            <li>Subtotal: $492</li>
            <li>Impuestos (16 %): $79</li>
            <li>TOTAL: $571</li>
          </ul>
        </section>
        <section class="informacion-pago">
          <h3>Información para el pago</h3>
          <ul>
            <li>
              <label for="banco">Institución financiera:</label>
              <input type="text" id="banco" />
            </li>
            <li>
              <label for="titular-cuenta">Nombre del titular:</label>
              <input type="text" id="titular-cuenta" />
            </li>
            <li>
              <label for="numero-cuenta">Número de cuenta:</label>
              <input type="text" id="numero-cuenta" />
            </li>
          </ul>
        </section>
      </main>
    </div>

</template>

<script setup>



</script>


<style scoped>
.factura {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

.datos-cliente {
  margin-bottom: 20px;
}

.items {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

.totales {
  margin-bottom: 20px;
}
</style>