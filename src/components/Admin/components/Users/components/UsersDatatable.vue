<template>
    <div>
        <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Users List</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field class="mr-5" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>                    
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

export default {
    name: 'UserDatatable',

    components: {

    },

    data() {
        return {
            search: '',
            headers: [
                {text: 'Full Name', value: 'name'},
                {text: 'Address', value: 'address'},
                {text: 'Email', value: 'email'},
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