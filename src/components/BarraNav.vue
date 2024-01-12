<template>
    <!--Barra navegacion-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary w-100 ">
        <div class="container-fluid">
            <img src="@/assets/img/logofin.png" alt="Logo" width="75" height="75">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/inscripcion" class="nav-link">Inscripción</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Campeonato</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Administración</a>
                    </li>
                </ul>
                <div class="float-end">
                    <router-link to="/login" class="btn btn-danger">Iniciar Sesión</router-link>
                    <router-link to="/registro" class="btn btn-danger ms-3">Registrarse</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>