<template>
    <v-dialog max-width="500" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-icon @click="dialog=true" color="red" md class="mr-2"> mdi-delete </v-icon>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Delete Product</span>
            </v-card-title>

            <v-card-text>
                <h3>Are you sure you want to DELETE this product?</h3>
            </v-card-text>

            <v-card-actions v-if="loading == false">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="productDelete">Delete</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-spacer>
                </v-spacer>
                <v-btn color="blue darken-1" text disabled>
                    <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                    Deleting ... 
                </v-btn>
            </v-card-actions>            
        </v-card>
    </v-dialog>          
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'DeleteModal',

    props: {
        productData: {
            type: Object
        }
    },

    components: {
        
    },

    data() {
        return {
            dialog: false,
            loading: false,
        }
    },

    methods: {
        ...mapActions('product', ['deleteProduct']),

        async productDelete() {
            this.loading = true
            let res = await this.deleteProduct(this.productData);

            if(res.status == 200)
            {
                await this.$store.dispatch('product/getAllProducts')
                this.dialog = false
                this.loading = false
            }
        }
    },
}
</script>