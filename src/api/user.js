import endpoints from './endpoint'
import Api from './base';

export default {

    async createUser(params) {
        try {
            return await Api().post( endpoints.ecommerce.user.resource, params )
        } catch (error) {
            return error.response
        }
    },

}