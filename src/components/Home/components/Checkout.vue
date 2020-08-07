<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" text>
                    Checkout
                </v-btn>
            </template>
            <v-card v-if="paypal_data.loader == false">
                <v-card-title>
                    <span class="headline">Order Summary <v-icon>mdi-basket</v-icon></span>
                </v-card-title>
                <v-card-text v-for="(item, k) in cartItem" :key="k">
                        <b>Product Name:</b> {{ item.product_name}} <br>
                        <b>Product Price:</b> ₱ {{ item.product_price}} <br>
                        <b>Quantity Ordered:</b> {{ item.quantity }} <br>
                        <b>Total Price:</b> <strong>₱ {{ item.quantity * item.product_price}}</strong>
                        <hr />
                </v-card-text>
                <v-card-text>
                    <h3>Total: ₱ {{ total_price }}.00 </h3><br> 
                    <v-select v-model="select" :items="mop" item-text="text" item-value="value" label="Mode of Payment"></v-select>
                </v-card-text>
                <v-card-actions v-if="loading == false">
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="close">Close</v-btn>
                    <v-btn v-if="select" color="green darken-1" text @click="checkout()">Checkout</v-btn>
                    <v-btn v-else disabled color="green darken-1" text>Checkout</v-btn>
                </v-card-actions>
                <v-card-actions v-else >
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" disabled>
                        <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                        Processing ... 
                    </v-btn>
                </v-card-actions>   
                <v-card-text>
                    or pay via paypal
                    <div mt-5 ref="paypal"></div>
                </v-card-text>                  
            </v-card>
            <v-card v-else>
                <v-card-title>
                    <span class="headline">Order Summary <v-icon>mdi-basket</v-icon></span>
                </v-card-title>
                <v-card-text>
                    <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                    Processing your payment ..
                </v-card-text>
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
            loading: false,
            data: {},
            paypal_data: {
                loaded: false,
                paidFor: false,   
                client_id: 'AcEbBjLDuc0jEk7d6Y4bRzYB8bC9LYfIfyL3gTS0AWaMiGcSfhqurkx3j7h5AV2-fWTB8DCr0LKhkjFs',
                loader: false,
            },         
            mop: [
                { text: 'Cash on Delivery', value: 'COD' },
            ],
        }
    },

    async mounted() {
        await this.getCart()
        await this.getAuth()
        await this.paypal()
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
            this.loading = true
            this.data.item = JSON.stringify(this.cartItem)
            this.data.total = this.total_price
            this.data.user_id = this.auth_user.id
            this.data.mop = this.select

            let res = await this.addOrder(this.data)

            if (res.status == 200)
            {
                await this.$store.dispatch('cart/getCart')
                await this.$store.dispatch('order/getAllOrders')
                this.loading = false
                this.$swal('Your order is succesfully processed. Expect 2-3 days for the item to be delivered');
                this.dialog = false
            }
        },

        async checkoutViaPaypal(order)
        {
            if (order.status == 'COMPLETED')
            {
                console.log(order, 1111)

                this.data.item = JSON.stringify(this.cartItem)
                this.data.total = this.total_price
                this.data.user_id = this.auth_user.id
                this.data.mop = 'paypal'

                let res = await this.addOrder(this.data)

                if (res.status == 200)
                {
                    console.log('success')
                    await this.$store.dispatch('cart/getCart')
                    await this.$store.dispatch('order/getAllOrders')
                    this.dialog = false
                    this.paypal_data.loader = false
                    this.$swal('Your order is succesfully processed. Expect 2-3 days for the item to be delivered');
                }
            }
        },

        paypal()
        {
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?currency=PHP&client-id=" + this.paypal_data.client_id;
            script.addEventListener("load", this.paypalPayment);
            document.body.appendChild(script);
        },

        paypalPayment() {
            this.paypal_data.loaded = true;
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'sample description',
                            amount: {
                                currency_code: "PHP",
                                value: this.total_price
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.paypal_data.loader = true
                    this.paypal_data.paidFor = true
                    this.checkoutViaPaypal(order)
                },
                onError: err => {
                    console.log(err);
                }
            }).render(this.$refs.paypal);
        }
    }
}
</script>