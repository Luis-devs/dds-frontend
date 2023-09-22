import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario : null,
          },
    mutations: {
        setusuario (state, data) {
            state.usuario = data
          }
    },

     getters: {
        usuario (state) {
            return state.usuario
          },

         
    },
    
    actions: {

    },
    modules: {},
 
})