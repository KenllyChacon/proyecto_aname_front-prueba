import { createRouter, createWebHistory } from 'vue-router'
 //import HomeView from '../pages/Negocio/Inicio.vue'

const routes = [
   {
     path: '/',
     name: 'home',
     component: () => import(/* webpackChunkName: "Inicio" */ '@/pages/Negocio/Inicio.vue')
   },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "AboutView" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import(/* webpackChunkName: "UsuarioRegistrar" */ '@/pages/Negocio/UsuarioRegistrar.vue'),
    meta: {
      requiresAuth: false,
      // roles: ['ADMIN']
    }
  },
  {
    path: '/campeonato/crear',
    name: 'crearCampeonato',
    component: () => import(/* webpackChunkName: "crearCampeonato" */ '@/pages/Negocio/CrearCampeonato.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ADM', 'JUN', 'ORG']
    }
  },
  {
    path: '/ficha',
    name: 'ficha',
    component: () => import(/* webpackChunkName: "FichaInscripcion" */ '@/pages/Negocio/FichaInscripcion.vue'),
    meta: {
      requiresAuth: false,
      // roles: ['ADMIN']
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token')
  const requiredAuth = to.matched.some(record => record.meta.requiresAuth)
  const rolesRequired = to.meta.roles
  const estado = sessionStorage.getItem('estado')

  console.log(rolesRequired)

  if (to.path === '/' && !isAuthenticated) {
    next()
    console.log("aaaaaaaaaaaaaaaaaaaaaa")
  } else if (requiredAuth && !isAuthenticated) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    next('/login')
  } else if (to.path === '/login') {
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    next()
  } else if (isAuthenticated && rolesRequired && !rolesRequired.includes(sessionStorage.getItem("rol").toUpperCase())) {
    console.log("oooooooooooooooooooooooooooooooooooo")
    next('/')
  } else if (!estado) {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    next('/login')
  } else {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    next()
  }
})


function getRoles() {
  return JSON.parse(sessionStorage.getItem('roles'))
}

export default router
