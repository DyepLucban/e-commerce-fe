<template>
    <div>
        <v-data-table :headers="headers" :items="products" :search="search" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Product List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field class="mr-5" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>                    
                    <AddModal />
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <UpdateModal :product-data="item"/>
                <DeleteModal :product-data="item"/>
            </template>
        </v-data-table>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import DeleteModal from './DeleteModal'

export default {
    name: 'ProductDatatable',

    components: {
        AddModal,
        UpdateModal,
        DeleteModal,
    },

    data() {
        return {
            search: '',
            headers: [
                {text: 'Product Name', value: 'product_name'},
                {text: 'Product Price', value: 'product_price'},
                {text: 'Description', value: 'product_desc'},
                {text: 'Action', value: 'actions'},
            ],         
        }
    },

    async mounted() {
        await this.getAllProducts()
    },

    computed: {
        ...mapGetters('product', ['products'])
    },
    
    methods: {
        ...mapActions('product', ['getAllProducts'])
    }
}
</script>