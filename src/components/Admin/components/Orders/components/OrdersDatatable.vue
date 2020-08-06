<template>
    <div>
        <v-data-table :headers="headers" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Orders</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-text-field class="mr-5" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>                     -->
                    <!-- <AddModal /> -->
                </v-toolbar>
            </template>
            <!-- <template v-slot:item.actions="{ item }">
                <UpdateModal :user-data="item"/>
                <DeleteModal :user-data="item"/>
            </template> -->
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
                {text: 'First Name', value: 'first_name'},
                {text: 'Last Name', value: 'last_name'},
                {text: 'Email', value: 'email'},
                {text: 'Role', value: 'role.role_name'},
                {text: 'Created At', value: 'created_at'},
                {text: 'Updated At', value: 'updated_at'},
                {text: 'Action', value: 'actions'},
            ],         
        }
    },

    async mounted() {
        await this.getAllUsers()
    },

    computed: {
        ...mapGetters('user', ['users'])
    },
    
    methods: {
        ...mapActions('user', ['getAllUsers'])
    }
}
</script>