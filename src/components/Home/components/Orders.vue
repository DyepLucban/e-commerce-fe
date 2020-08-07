<template>
    <div>
        <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" v-bind="attrs" v-on="on" text >
                    <div v-if="order.length == 0">
                        <v-badge color="orange" content="0" class="mr-4">
                            <v-icon>mdi-basket</v-icon>
                        </v-badge>
                        Your Orders
                    </div>
                    <div v-else>
                        <v-badge color="orange" :content="order.length" class="mr-4">
                            <v-icon>mdi-basket</v-icon>
                        </v-badge>
                        Your Orders
                    </div>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Order Summary <v-icon>mdi-basket</v-icon></span>
                </v-card-title>
                <div v-if="order.length == 0">
                    <v-card-text>
                        <div>
                            <b>No Order yet</b>
                        </div>
                    </v-card-text>
                </div>
                <div v-else>
                    <v-card-text v-for="(item, k) in order" :key="k">
                        <div>
                            <b>Product Name: </b>{{ item.product_name }}
                        </div>
                        <div>
                            <b>Product Price: </b>{{ item.product_price }}
                        </div>
                        <div>
                            <b>Product Description: </b>{{ item.product_desc }}
                        </div>
                        <div>
                            <b>Quantity Ordered: </b>{{ item.quantity }}
                        </div>                                                
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Orders',
    
    data()
    {
        return {
            dialog: false,
            sample: {},
        }
    },

    async mounted() {
        await this.getAllOrders()
    },

    computed: {
        ...mapGetters('order', ['order']),
    },

    methods: {
        ...mapActions('order', ['getAllOrders']),
    }
}
</script>