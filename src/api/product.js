import endpoints from './endpoint'
import Api from './base';

export default {

    // async login(params) {
    //     try {
    //         return await Api().post( endpoints.ecommerce.auth.login, params )
    //     } catch (error) {
    //         return error.response
    //     }        
    // },

    // async logout() {
    //     try {
    //         return await Api().post( endpoints.ecommerce.auth.logout )
    //     } catch (error) {
    //         return error.response
    //     }        
    // },

    async getAllProducts() {
        try {
            return await Api().get( endpoints.ecommerce.product.resource )
        } catch (error) {
            return error.response
        }
    },

    // async createNewUser(params) {
    //     try {
    //         return await Api().post( endpoints.library.auth.register, params )
    //     } catch (error) {
    //         return error.response
    //     }
    // },

}