<template>
    <v-dialog max-width="700" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-icon @click="dialog=true" color="green" md class="mr-2"> mdi-pencil </v-icon>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Update Product</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="12">
                            <v-text-field :error="error.product_name.status" :error-messages="error.product_name.message" v-model="productData.product_name" label="Product Name" autocomplete="off"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                            <v-text-field :error="error.product_price.status" :error-messages="error.product_price.message" v-model="productData.product_price" label="Product Price" autocomplete="off"></v-text-field>
                        </v-col>                        
                        <v-col cols="12" sm="6" md="12">
                            <v-text-field :error="error.description.status" :error-messages="error.description.message" v-model="productData.product_desc" label="Description" autocomplete="off"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions v-if="loading == false">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="update">Save</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-spacer>
                </v-spacer>
                <v-btn color="blue darken-1" text disabled>
                    <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                    Updating ... 
                </v-btn>
            </v-card-actions>             
        </v-card>
    </v-dialog>       
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'UpdateModal',

    props: {
        productData: {
            type: Object
        }
    },

    data() {
        return {
            dialog: false,
            loading: false,
            error: {
                product_name: {
                    status: false,
                    message: '',
                },
                product_price: {
                    status: false,
                    message: '',
                },                
                description: {
                    status: false,
                    message: '',
                },
            },
        }
    },

    mounted() {

    },

    methods: {
        ...mapActions('product', ['updateProduct']),

        async update()
        {
            this.loading = true;
            let res = await this.updateProduct(this.productData)

            if (res.status == 200)
            {
                await this.$store.dispatch('product/getAllProducts')
                this.dialog = false
                this.loading = false
            }

            if (res.status == 422)
            {
                this.error.product_name.status = (res.data.message.product_name) ? true : false
                this.error.product_name.message = (res.data.message.product_name) ? res.data.message.product_name.toString() : ''
                this.error.product_price.status = (res.data.message.product_price) ? true : false
                this.error.product_price.message = (res.data.message.product_price) ? res.data.message.product_price.toString() : ''
                this.error.description.status = (res.data.message.description) ? true : false
                this.error.description.message = (res.data.message.description) ? res.data.message.description.toString() : ''
                this.loading = false
            }
        },

        async close()
        {
            await this.$store.dispatch('product/getAllProducts')
            this.dialog = false
            this.loading = false
            this.error.product_name.status = false
            this.error.product_name.message = ''
            this.error.product_price.status = false
            this.error.product_price.message = ''
            this.error.description.status = false
            this.error.description.message = ''  
        }
    }
}
</script>