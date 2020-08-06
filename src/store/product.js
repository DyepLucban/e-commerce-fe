import Api from '../api/product'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    products: [],
}

const getters = {
    getField,
    products: (state) => state.products,
}

const actions = {

    async getAllProducts({commit}) {
        let response = await Api.getAllProducts()
        commit('onOkProducts', response.data)
    },

    async createProduct({}, params) {
        return await Api.createProduct(params)
    },

    async updateProduct({}, params) {
        return await Api.updateProduct(params)
    },

    async deleteProduct({}, params) {
        return await Api.deleteProduct(params)
    },
}

const mutations = {
    updateField,
    onOkProducts(state, data) {
        state.products = data
    },
}

export const product = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}