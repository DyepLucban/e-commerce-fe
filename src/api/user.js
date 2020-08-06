import endpoints from './endpoint'
import Api from './base';

export default {

    async getAllUsers() {
        try {
            return await Api().get( endpoints.ecommerce.user.resource )
        } catch (error) {
            return error.response
        }
    },
    
    async createUser(params) {
        try {
            return await Api().post( endpoints.ecommerce.user.resource, params )
        } catch (error) {
            return error.response
        }
    },

}