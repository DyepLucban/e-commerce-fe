import endpoints from './endpoint'
import Api from './base';

export default {

    async addOrder(params) {
        try {
            return await Api().post( endpoints.ecommerce.order.resource, params )
        } catch (error) {
            return error.response
        }
    },

}