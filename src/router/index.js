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
        children: [{
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
                name: 'ambiente',
                path: '/dashboard/ambiente',
                component: () =>
                    import ('../views/AmbienteView.vue')
            },
            {
                name: 'bloque',
                path: '/dashboard/bloque',
                component: () =>
                    import ('../views/BloqueView.vue')
            },
            {
                name: 'tipoambiente',
                path: '/dashboard/tipoAmbiente',
                component: () =>
                    import ('../views/TipoAmbienteView.vue')
            },
            {
                name: 'crearprograma',
                path: '/dashboard/crearprograma',
                component: () =>
                    import ('../views/programa/CrearPrograma.vue')
            },
            {
                name: 'crearcompetencia',
                path: '/dashboard/crearcompetencia',
                component: () =>
                    import ('../views/Competencia/CrearCompetencia.vue')
            },
            {
                name: 'crearresultadoaprendizaje',
                path: '/dashboard/crearresultadoaprendizaje',
                component: () =>
                    import ('../views/ResultadosAprendizaje/CrearResultadosAprendizaje.vue')
            },
            {
                name: 'crearinstructor',
                path: '/dashboard/crearinstructor',
                component: () =>
                    import ('../views/Instructor/CrearInstructor.vue')
            },
            {
                name: 'crearficha',
                path: '/dashboard/crearficha',
                component: () =>
                    import ('../views/Ficha/CrearFicha.vue')
            },
            {
                name: 'crearevento',
                path: '/dashboard/crearevento',
                component: () =>
                    import ('../views/EventoView.vue')
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