import Api from '../api/user'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    users: [],
}

const getters = {
    getField,
    users: (state) => state.users,
}

const actions = {

    async getAllUsers({commit}) {
        let response = await Api.getAllUsers()
        commit('onOkUser', response.data)
    },

    async createUser({}, params) {
        return await Api.createUser(params)
    },

}

const mutations = {
    updateField,
    onOkUser(state, data) {
        state.users = data
    },
}

export const user = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}