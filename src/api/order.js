import endpoints from './endpoint'
import Api from './base';

export default {

    async getAllOrders()
    {
        try {
            return await Api().get( endpoints.ecommerce.order.resource )
        } catch (error) {
            return error.response
        }
    },

    async addOrder(params) {
        try {
            return await Api().post( endpoints.ecommerce.order.resource, params )
        } catch (error) {
            return error.response
        }
    },

}