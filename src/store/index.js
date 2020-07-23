import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { user } from './user'
import { auth } from './auth'
import { product } from './product'
import { cart } from './cart'
import { order } from './order'

Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        auth,
        product,
        cart,
        order,
        user,
    },
    state:{

    },
    getters: {
        getField,
    },
    actions: {

    },
    mutations: {
        updateField,
    }
})

export default store
