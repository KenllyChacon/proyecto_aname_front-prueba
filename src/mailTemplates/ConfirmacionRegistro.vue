<template>
  <div>
    <div class="container" id="encabezadoCR">
      <img src="@/assets/img/logofin.png" alt="" width="50" height="50" align="left">
      <h3><b>¡Bienvenido a ANAME!</b></h3>
  </div>
  <br>
  <div class="container" id="contenidoCR">
      <p align="left">Su usuario <label>xx</label> ha sido registrado exitosamente.</p>
      <p align="left">Para iniciar sesión, haga clic <a href="">AQUÍ</a>.</p>
  </div>

  <div class="container-fluid position-relative" id="piePag">
    <div class="position-absolute">
      <a href="https://www.facebook.com/p/ANAME-Asociaci%C3%B3n-Nacional-de-Atletismo-Master-del-Ecuador-100064841912450/?paipv=0&eav=AfaSv9pzpI9ergJbpLVMMNEX0dEx9-1RJWBzc4GFil1sb49W38fNLM9QEMSUzDbZtN0&_rdr"
            style="color: #eeb902; align:center;">Página Oficial de ANAME en Facebook</a>
    </div>
    </div>
  </div>
</template>

<style>
#encabezadoCR {
  background-color: #52bad1;
  color: #edf3f5;
  padding-top: 15px;
  padding-bottom: 25px;
}

@media (max-width: 768px){
  #contenidoCR{
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }
  #piePag {
    width: 100%;
  }
}

@media (min-width: 320px) and (max-width: 767px){
  #contenidoCR{
    padding-left: 0px;
    padding-right: 0px;
    width: 40%;
  }
  #piePag {
    padding-left: 20px;
    width: 100%;
  }
}

#piePag {
  background-color: #003153;
  align-content: center;
  padding-top: 25px;
  padding-bottom: 25px;
  width: auto;
}
</style> 
