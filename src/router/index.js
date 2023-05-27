import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

//rutas de elementos del sidebar
const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/iniciarSesion.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ('../views/dashboard'),
        children: [
            {
                name: 'DashboardWelcome',
                path: '/dashboard/welcome',
                component: () =>
                    import ('../views/welcome.vue'),
            },
            {
                name: 'regional',
                path: '/dashboard/regional',
                component: () =>
                    import ('../views/RegionaView.vue'),
            },
            {
                name: 'sede',
                path: '/dashboard/sede',
                component: () =>
                    import ('../views/SedeView.vue'),
            },
            {
                name: 'centro',
                path: '/dashboard/centro',
                component: () =>
                    import ('../views/CentroView.vue'),
            },
            {
                name:'ambiente',
                path: '/dashboard/ambiente',
                component: () =>
                    import ('../views/AmbienteView.vue')
            },
            {
                name:'bloque',
                path: '/dashboard/bloque',
                component: () =>
                    import ('../views/BloqueView.vue')
            }
          
        ],
    },
    
    
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router