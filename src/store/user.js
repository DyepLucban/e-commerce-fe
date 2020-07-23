import Api from '../api/user'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    // cart: [],
}

const getters = {
    getField,
    // cart: (state) => state.cart,
}

const actions = {

    // async getCart({commit}) {
    //     let response = await Api.getCart()
    //     commit('onOkCart', response.data)
    // },

    async createUser({}, params) {
        return await Api.createUser(params)
    },

}

const mutations = {
    updateField,
    // onOkCart(state, data) {
    //     state.cart = data
    // },
}

export const user = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}