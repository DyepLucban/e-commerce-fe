import Api from '../api/order'
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

    async addOrder({}, params) {
        return await Api.addOrder(params)
    },

}

const mutations = {
    updateField,
    // onOkCart(state, data) {
    //     state.cart = data
    // },
}

export const order = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}