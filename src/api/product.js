import endpoints from './endpoint'
import Api from './base';

export default {

    async getAllProducts() {
        try {
            return await Api().get( endpoints.ecommerce.product.resource )
        } catch (error) {
            return error.response
        }
    },

    async createProduct(params) {
        try {
            return await Api().post( endpoints.ecommerce.product.resource, params )
        } catch (error) {
            return error.response
        }
    },

    async updateProduct(params) {
        try {
            return await Api().put( endpoints.ecommerce.product.resource + '/' + params.id , params )
        } catch (error) {
            return error.response
        }
    },

    async deleteProduct(params) {
        try {
            return await Api().delete( endpoints.ecommerce.product.resource + '/' + params.id )
        } catch (error) {
            return error.response
        }
    }, 

}