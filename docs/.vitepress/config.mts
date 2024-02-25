import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Frontend ANAME",
  description: "Documentación del Frontend del sitio web de ANAME",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Documentación Frontend ANAME", link: "/" },
      //{ text: "Archivos JS", link: "/Js/archivo" },
      //{ text: "Plantillas de Correo", link: "/Mt/ConfirmacionRegistro" },
    ],

    sidebar: [
      {
        text: "Iniciar Sesión",
        items: [{ text: "Login", link: "/login" }],
      },

      {
        text: "Conexión con Backend",
        items: [
          { text: "Carga de archivos", link: "/Js/archivo" },
          { text: "Consumir datos de campeonatos", link: "/Js/campeonato" },
          { text: "Consumir datos de competidores", link: "/Js/competidor" },
          { text: "Envío de correos electrónicos", link: "/Js/email" },
          { text: "Consumir datos de pruebas", link: "/Js/prueba" },
          { text: "Consumir datos de usuarios", link: "/Js/usuario" },
        ],
      },

      {
        text: "Documentos PDF",
        items: [
          { text: "Comprobante de pago", link: "/DocsPDF/comprobantepdf" },
          { text: "Ficha de inscripción", link: "/DocsPDF/fichapdf" },
        ],
      },

      {
        text: "Plantillas de Correo",
        items: [
          { text: "Confirmación de registro", link: "Mt/ConfirmacionRegistro" },
          {
            text: "Recepción de ficha de inscripción",
            link: "Mt/FichaInscripcionCampeonato",
          },
          {
            text: "Confirmación de inscripción en campeonato",
            link: "Mt/InscripcionCampAceptada",
          },
          {
            text: "Notificación de rechazo de inscripción en campeonato",
            link: "Mt/InscripcionCampNegada",
          },
          {
            text: "Notificación de pago de asociación",
            link: "Mt/NotificacionPagoAsociacion",
          },
          {
            text: "Notificación de membresía aceptada",
            link: "Mt/PagoAsociacionAceptado",
          },
          {
            text: "Notificación de membresía denegada",
            link: "Mt/PagoAsociacionNegado",
          },
          {
            text: "Notificación de pago de inscripción a campeonato aceptado",
            link: "Mt/PagoInscripcionAceptado",
          },
          {
            text: "Notificación de recepción de pago de inscripción a campeonato",
            link: "Mt/PagoInscripcionCampeonato",
          },
          {
            text: "Notificación de pago de inscripción a campeonato denegado",
            link: "Mt/PagoInscripcionNegado",
          },
          {
            text: "Notificación de registro denegado",
            link: "Mt/RegistroNegado",
          },
          {
            text: "Requisitos de preinscripción a campeonato",
            link: "Mt/RequisitosPreinscripcion",
          },
        ],
      },

      {
        text: "Componentes",
        items: [
          {
            text: "Barra de navegación de usuarios atletas",
            link: "/Componentes/barraNav",
          },
          {
            text: "Barra de navegación de administradores",
            link: "/Componentes/barraNavPro",
          },
          {
            text: "Componente cerrar sesión",
            link: "/Componentes/logOutComp",
          },
        ],
      },

    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
