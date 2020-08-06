import Api from '../api/order'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    order: [],
}

const getters = {
    getField,
    order: (state) => state.order,
}

const actions = {

    async getAllOrders({commit}) {
        let response = await Api.getAllOrders()
        commit('onOkOrder', response.data)
    },

    async addOrder({}, params) {
        return await Api.addOrder(params)
    },

}

const mutations = {
    updateField,
    onOkOrder(state, data) {
        state.order = data
    },
}

export const order = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}