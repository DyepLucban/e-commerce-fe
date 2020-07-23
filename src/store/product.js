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

    // async authLogin({}, params) {
    //     return await Api.login(params)
    // },

    // async authLogout({commit}, ) {
    //     let res = await Api.logout()
    //     commit('onOkProducts', '')
    //     return res
    // },

    // async addNewUser({}, params) {
    //     return await Api.createNewUser(params)
    // },


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