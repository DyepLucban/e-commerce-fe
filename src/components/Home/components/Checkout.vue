<template>
<v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" text>
                Checkout
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Order Summary <v-icon>mdi-basket</v-icon></span>
            </v-card-title>
            <v-card-text v-for="(item, k) in cartItem" :key="k">
                    <b>Product Name:</b> {{ item.product.product_name}} <br>
                    <b>Product Price:</b> ₱ {{ item.product.product_price}} <br>
                    <b>Quantity Ordered:</b> {{ item.quantity }} <br>
                    <b>Total Price:</b> <strong>₱ {{ item.quantity * item.product.product_price}}</strong>
                    <hr />
            </v-card-text>
            <v-card-text>
                <h3>Total: ₱ {{ total_price }}.00 </h3><br> 
                <v-select v-model="select" :items="mop" item-text="text" item-value="value" label="Mode of Payment"></v-select>
            </v-card-text>
            <v-card-actions >
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close">Close</v-btn>
                <v-btn v-if="select" color="green darken-1" text @click="checkout()">Checkout</v-btn>
                <v-btn v-else disabled color="green darken-1" text>Checkout</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Checkout',

    props: {
        cartItem: {
            type: Array
        }
    },

    data() {
        return {
            dialog: false,
            select: null,
            data: {},
            mop: [
                { text: 'Cash on Delivery', value: 'COD' }
            ],
        }
    },

    async mounted() {
        await this.getCart()
        await this.getAuth()
    },

    computed: {
        ...mapGetters('cart', ['total_price']),
        ...mapGetters('auth', ['auth_user'])
    },

    methods: {
        ...mapActions('cart', ['getCart']),
        ...mapActions('order', ['addOrder']),
        ...mapActions('auth', ['getAuth']),
        close()
        {
            this.select = null
            this.dialog = false
        },
        async checkout()
        {
            this.data.item = JSON.stringify(this.cartItem)
            this.data.total = this.total_price
            this.data.user_id = this.auth_user.id
            this.data.mop = this.select

            let res = await this.addOrder(this.data)

            if (res.status == 200)
            {
                await this.$store.dispatch('cart/getCart')
                this.dialog = false
            }
        }
    }
}
</script>