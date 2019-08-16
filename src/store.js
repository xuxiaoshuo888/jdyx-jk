import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isResize: false
    },
    mutations: {
        commitResize(state, bool) {
            state.isResize = bool;
        }
    },
    actions: {}
})
