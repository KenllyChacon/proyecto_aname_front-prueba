
<template>
    <div class="factura">
      <header>
        <h1>FACTURA</h1>
      </header>
      <main>
        <section class="datos-cliente">
          <h3>Cliente</h3>
          <ul>
            <li>Nombre: {{nombreCompetidor}}</li>
            <li>Email: {{ sessionStorage.getItem('email') }}</li>
          </ul>
        </section>
        <section class="items">
          <table>
            <thead>
            <tr>
              <th>PRUEBAS</th>
              <th>PRECIO</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="l in pruebas3" :key="l">
                <td>{{l.nombre }}</td>
                <td><p>$5</p></td>
            </tr>
            <tr v-for="li in pruebasRes" :key="li">
                <td>{{ li.nombre }}</td>
                <td><p>$10</p></td>
            </tr>
            </tbody>
          </table>
        </section>
        <section class="totales">
          <ul>
            <li>TOTAL: {{total}}</li>
          </ul>
        </section>
        <section class="informacion-pago">
          <h3>Información para el pago</h3>
          <ul>
            <li>
              <label for="banco">Institución financiera: Banco Pichicnah</label>
            </li>
            <li>
              <label for="titular-cuenta">Nombre del titular: Cristhian Cedeño</label>
            </li>
            <li>
              <label for="numero-cuenta">Número de cuenta: 2204446646</label>
            </li>
          </ul>
        </section>
      </main>
    </div>

</template>

<script>
import jsPDF from 'jspdf'
import { campIncritosUsersP } from '@/assets/js/campeonato'

export default{

    data(){

        return{
            nombreCompetidor: null,
            pruebas3:[],
            pruebasRes:[],
            total:null,
            listaCompetidor: null



        }

    },
    props:['listaPruebas'],
    methods:{
        descargar(){
            this.asignarValores()
            var doc = new jsPDF('p', 'pt', 'A4')
            var margins = 0;
            var scale = (doc.internal.pageSize.width - margins * 2) / document.body.scrollWidth;
            doc.html(this.$refs.content, {
                x: margins,
                y: margins,
                html2canvas: {
                    scale: scale,
                },
                callback: function (doc) {
                    doc.output('dataurlnewwindow', { filename: 'fichero-pdf.pdf' })
                }
            })

            doc.fromHTML(this.$refs.content, this.margins.left, this.margins.top, {
                'width': this.margins.width
            });
            doc.save('Comprobante.pdf')

        },
        async asignarValores(){
            this.listaCompetidor = await campIncritosUsersP(sessionStorage.getItem('email'))
            this.nombreCompetidor = this.listaCompetidor[0].nombres
        },
        cerrar(){
            window.close()
        },
        random(){
            if(this.listaPruebas.length === 3){
                this.pruebas3 = this.listaPruebas.slice(0,3)
            }else{
                this.pruebas3 = this.listaPruebas.slice(0,3)
                this.pruebasRes = this.listaPruebas.slice(3)
            }
        }
    },
    async mounted() {
        //setTimeout(this.cerrar, 1560)
        //this.descargar()
        this.asignarValores()
        this.random()
    },
}



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