<template>
    <div>
        <v-menu bottom offset-y max-width="600" class="mx-auto">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-2" v-bind="attrs" v-on="on" text >
                    <div v-if="cart.length == 0">
                        <v-badge color="orange" content="0" class="mr-4">
                            <v-icon>mdi-cart</v-icon>
                        </v-badge>
                        Cart
                    </div>
                    <div v-else>
                        <v-badge color="orange" :content="cart.length" class="mr-4">
                            <v-icon>mdi-cart</v-icon>
                        </v-badge>
                        Cart
                    </div>
                </v-btn>
            </template>
            <v-card>
                <v-list>
                    <v-list-item v-for="(item, k) in cart" :key="k">
                        <v-list-item-content>
                        <v-list-item-title>{{ item.product_name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.quantity }} x ₱ {{ item.product_price }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn text @click="removeItem(item)">Remove</v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>Total: ₱ {{ total_price }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div v-if="cart.length !== 0">
                        <Checkout :cart-item="cart"/>
                    </div>
                    <div v-else>
                        <v-btn disabled color="primary">Checkout</v-btn>
                    </div>
                </v-card-actions>                             
            </v-card>            
        </v-menu>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Checkout from './Checkout'

export default {
    name: 'Cart',

    components: {
        Checkout,
    },

    data()
    {
        return {}
    },

    async mounted() {
        await this.getCart()
    },

    computed: {
        ...mapGetters('cart', ['cart', 'total_price']),
    },

    methods: {
        ...mapActions('cart', ['getCart', 'removeCartItem']),

        async removeItem(item)
        {
            let res = await this.removeCartItem(item)

            if (res.status == 200)
            {
                await this.$store.dispatch('cart/getCart')
            }
        },
    }

}
</script>