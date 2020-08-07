<template>
    <div>
        <v-data-table :headers="headers" :items="order" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Orders</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-text-field class="mr-5" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>                     -->
                    <!-- <AddModal /> -->
                </v-toolbar>
            </template>
            <template v-slot:item.ordered_item="{ item }">
                <div class="my-2" v-for="(data, k) in JSON.parse(item.ordered_item)" :key="k">
                    Name: {{ data.product_name }} <br>
                    Price: {{ data.product_price }} <br>
                    Quantity Ordered: {{ data.quantity }} <br>
                </div>
            </template>
            <template v-slot:item.total="{ item }">
                ₱ {{ item.total }}
            </template>            
        </v-data-table>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import AddModal from './AddModal'
// import UpdateModal from './UpdateModal'
// import DeleteModal from './DeleteModal'

export default {
    name: 'OrderDatatable',

    components: {
        // AddModal,
        // UpdateModal,
        // DeleteModal,
    },

    data() {
        return {
            search: '',
            headers: [
                {text: 'User', value: 'user_id'},
                {text: 'Order', value: 'ordered_item'},
                {text: 'total', value: 'total'},
                {text: 'Mode of Payment', value: 'mop'},
                {text: 'Created At', value: 'created_at'},
                {text: 'Updated At', value: 'updated_at'},
                {text: 'Action', value: 'actions'},
            ],         
        }
    },

    async mounted() {
        await this.getAllOrders()
    },

    computed: {
        ...mapGetters('order', ['order'])
    },
    
    methods: {
        ...mapActions('order', ['getAllOrders'])
    }
}
</script>