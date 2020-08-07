import endpoints from './endpoint'
import Api from './base';

export default {

    async getCart() {
        try {
            return await Api().get( endpoints.ecommerce.cart.resource )
        } catch (error) {
            return error.response
        }
    },

    async addToCart(params) {
        try {
            return await Api().post( endpoints.ecommerce.cart.resource, params )
        } catch (error) {
            return error.response
        }
    },

    async removeCartItem(params) {
        try {
            return await Api().delete( endpoints.ecommerce.cart.resource +'/'+ params.cart_id )
        } catch (error) {
            return error.response
        }
    },

}