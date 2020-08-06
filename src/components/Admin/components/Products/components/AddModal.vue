<template>
    <div>
        <v-dialog max-width="700" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add Product</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field :error="error.prod_name.status" :error-messages="error.prod_name.message" v-model="form.prod_name" label="Product Name" autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field :error="error.prod_price.status" :error-messages="error.prod_price.message" v-model="form.prod_price" label="Product Price" autocomplete="off"></v-text-field>
                            </v-col>                            
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field :error="error.description.status" :error-messages="error.description.message" v-model="form.description" label="Description" autocomplete="off"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions v-if="loading == false">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="addProduct">Create</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="blue darken-1" text disabled>
                        <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                        Adding ... 
                    </v-btn>
                </v-card-actions>                
            </v-card>
        </v-dialog>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AddModal',

    components: {

    },

    data() {
        return {
            dialog: false,
            loading: false,
            form: {
                prod_name: '',
                prod_price: '',
                description: '',
            },
            error: {
                prod_name: {
                    status: false,
                    message: '',
                },
                prod_price: {
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

    methods: {
        ...mapActions('product', ['createProduct']),

        async addProduct()
        {
            this.loading = true;
            let res = await this.createProduct(this.form);
            
            if (res.status == 200)
            {
                await this.$store.dispatch('product/getAllProducts')
                this.dialog = false
                this.form = {}
                this.loading = false
            }

            if (res.status == 422)
            {
                this.error.prod_name.status = (res.data.message.prod_name) ? true : false
                this.error.prod_name.message = (res.data.message.prod_name) ? res.data.message.prod_name.toString() : ''
                this.error.prod_price.status = (res.data.message.prod_price) ? true : false
                this.error.prod_price.message = (res.data.message.prod_price) ? res.data.message.prod_price.toString() : ''
                this.error.description.status = (res.data.message.description) ? true : false
                this.error.description.message = (res.data.message.description) ? res.data.message.description.toString() : ''
                this.loading = false
            }            
        },  
        
        close()
        {
            this.dialog = false;
            this.loading = false;
            this.form = {};
            this.error.prod_name.status = false;
            this.error.prod_name.message = '';
            this.error.prod_price.status = false;
            this.error.prod_price.message = '';
            this.error.description.status = false;
            this.error.description.message = '';
        }
    },
}
</script>