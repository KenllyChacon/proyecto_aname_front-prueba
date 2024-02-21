# API de Campeonatos

Este documento describe las funciones de la API de campeonatos que se utilizan para interactuar con un servidor remoto.

## Variables

- `url`: La URL base del servidor API.

## Funciones Exportadas

### CrearCampeonatoP

Crea un nuevo campeonato.

- **Parámetros:**
    - `body` (objeto): El cuerpo de la solicitud con los datos del campeonato.
- **Retorna:** La respuesta del servidor con los datos del campeonato creado.

### VerCampeonatosP

Obtiene una lista de campeonatos.

- **Retorna:** La respuesta del servidor con la lista de campeonatos.

### listarCampeonatosDisponiblesFachada

Obtiene una lista de campeonatos disponibles.

- **Retorna:** La respuesta del servidor con la lista de campeonatos disponibles.

### InscribirseCampeonatoP

Inscribe a un competidor en un campeonato.

- **Parámetros:**
    - `body` (objeto): El cuerpo de la solicitud con los datos del competidor y el campeonato.
- **Retorna:** La respuesta del servidor con los datos de la inscripción.

### verSedesP

Obtiene una lista de sedes de campeonatos.

- **Retorna:** La respuesta del servidor con la lista de sedes.

### listaAsociacionesFachada

Obtiene una lista de asociaciones.

- **Retorna:** La respuesta del servidor con la lista de asociaciones.

### campIncritosUsersP

Obtiene una lista de campeonatos en los que un usuario está inscrito.

- **Parámetros:**
    - `email` (string): El correo electrónico del usuario.
- **Retorna:** La respuesta del servidor con la lista de campeonatos en los que el usuario está inscrito.

### campIncritosP

Obtiene una lista de competidores inscritos en un campeonato.

- **Parámetros:**
    - `idCampeonato` (string): El ID del campeonato.
    - `idAsociacion` (string): El ID de la asociación.
- **Retorna:** La respuesta del servidor con la lista de competidores inscritos.

### campIncritosUserEmailP

Obtiene una lista de campeonatos en los que un usuario está inscrito por correo electrónico.

- **Parámetros:**
    - `email` (string): El correo electrónico del usuario.
- **Retorna:** La respuesta del servidor con la lista de campeonatos en los que el usuario está inscrito.

## Funciones Internas

Las siguientes funciones son internas y se utilizan para realizar las solicitudes HTTP a la API.

### CrearCampeonato

Crea un nuevo campeonato.

- **Parámetros:**
    - `body` (objeto): El cuerpo de la solicitud con los datos del campeonato.
- **Retorna:** La respuesta del servidor con los datos del campeonato creado.

### VerCampeonatos

Obtiene una lista de campeonatos.

- **Retorna:** La respuesta del servidor con la lista de campeonatos.

### listarCampeonatosDisponibles

Obtiene una lista de campeonatos disponibles.

- **Retorna:** La respuesta del servidor con la lista de campeonatos disponibles.

### InscribirseCampeonato

Inscribe a un competidor en un campeonato.

- **Parámetros:**
    - `body` (objeto): El cuerpo de la solicitud con los datos del competidor y el campeonato.
- **Retorna:** La respuesta del servidor con los datos de la inscripción.

### verSedes

Obtiene una lista de sedes de campeonatos.

- **Retorna:** La respuesta del servidor con la lista de sedes.

### listaAsociaciones

Obtiene una lista de asociaciones.

- **Retorna:** La respuesta del servidor con la lista de asociaciones.

### campIncritosUsers

Obtiene una lista de campeonatos en los que un usuario está inscrito.

- **Parámetros:**
    - `email` (string): El correo electrónico del usuario.
- **Retorna:** La respuesta del servidor con la lista de campeonatos en los que el usuario está inscrito.

### campIncritos

Obtiene una lista de competidores inscritos en un campeonato.

- **Parámetros:**
    - `idCampeonato` (string): El ID del campeonato.
    - `idAsociacion` (string): El ID de la asociación.
- **Retorna:** La respuesta del servidor con la lista de competidores inscritos.

### campIncritosUserEmail

Obtiene una lista de campeonatos en los que un usuario está inscrito por correo electrónico.

- **Parámetros:**
    - `email` (string): El correo electrónico del usuario.
- **Retorna:** La respuesta del servidor con la lista de campeonatos en los que el usuario está inscrito.
