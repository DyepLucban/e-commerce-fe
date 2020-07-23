import Api from '../api/cart'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    cart: [],
}

const getters = {
    getField,
    cart: (state) => state.cart,
    total_price: (state) => {
        let total = 0;

        state.cart.forEach(element => {
            total += parseInt(element.product.product_price) * element.quantity
        });

        return total
    },
}

const actions = {

    async getCart({commit}) {
        let response = await Api.getCart()
        commit('onOkCart', response.data)

    },

    async addToCart({commit}, params) {
        commit('onOkAddToCart', params)
        return await Api.addToCart(params)
    },

    async removeCartItem({commit}, params) {
        commit('onOkRemoveItem', params)
        return await Api.removeCartItem(params)
    }
}

const mutations = {
    updateField,
    onOkCart(state, data) {
        state.cart = data
    },
    onOkAddToCart(state, data) {
        let productInCart = state.cart.find(item => {
            return item.product_id === data.product_id
        })

        if(productInCart) {
            productInCart.quantity += data.qty
            return
        }

        state.cart.push(data)
    },
    onOkRemoveItem(state, data) {
        state.cart = state.cart.filter(item => {
            return item.id !== data.id
        })
    },   
}

export const cart = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}