<template>
    <div class="container">
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-card v-for="(product, k) in products" :key="k" class="mx-auto my-12" max-width="374">
                        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                        <v-card-title>{{ product.product_name }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">
                                <v-rating
                                    :value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                                ></v-rating>

                                <div class="grey--text ml-4">4.5</div>
                            </v-row>

                            <div class="my-4 subtitle-1">
                            $ {{ product.product_price }}
                            </div>
                
                            <div>{{ product.product_desc }}</div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-actions>
                            <v-btn color="deep-purple lighten-2" text @click="addProduct(product)" >
                                Add to Cart
                            </v-btn>
                        </v-card-actions>
                    </v-card>                     
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Products',

    components: {},

    data()
    {
        return{
            data: {
                user_id: null,
                product_id: null,
                product: {},
                qty: 1,
            },
        }
    },
    async mounted() {
        await this.getAllProducts()
        await this.getAuth()
    },

    computed: {
        ...mapGetters('product', ['products']),
        ...mapGetters('auth', ['auth_user'])
    },

    methods: {
        ...mapActions('auth', ['getAuth']),
        ...mapActions('product', ['getAllProducts']),
        ...mapActions('cart', ['addToCart']),

        async addProduct(product)
        {
            this.data.user_id = this.auth_user.id;
            this.data.product_id = product.id
            this.data.product = product

            let res = await this.addToCart(this.data)

            if (res.status == 200)
            {
                await this.$store.dispatch('cart/getCart')
            }
        }
    }
}
</script>}