import Api from '../api/auth'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    auth_user: [],
}

const getters = {
    getField,
    auth_user: (state) => state.auth_user,
}

const actions = {

    async getAuth({commit}) {
        let response = await Api.getAuth()
        commit('onOkAuthUser', response.data)
    },

    async authLogin({}, params) {
        return await Api.login(params)
    },

    async authLogout({commit}, ) {
        let res = await Api.logout()
        commit('onOkAuthUser', '')
        return res
    },

    async addNewUser({}, params) {
        return await Api.createNewUser(params)
    },


}

const mutations = {
    updateField,
    onOkAuthUser(state, data) {
        state.auth_user = data
    },
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}