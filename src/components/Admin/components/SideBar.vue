<template>
    <v-navigation-drawer app color="blue darken-1">
        <v-list nav>
            <v-list-item two-line >
                <v-list-item-content>
                    <v-list-item-title>
                        <h3>E-Commerce Dashboard</h3>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item two-line >
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title></v-list-item-title>
                    <!-- <v-list-item-subtitle v-if="auth_user.role_id == 1">
                        Admin
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-else>
                        Student
                    </v-list-item-subtitle>                             -->
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
                <v-list-item v-for="item in modules" :key="item.title" link :to="item.url">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
        </v-list>
    </v-navigation-drawer>        
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Sidebar',

    module: {

    },

    data () {
        return {
            modules: [
                { title: 'Users', icon: 'mdi-account-group', url:'/users'},
                { title: 'Products', icon: 'mdi-bookshelf', url: '/products'},
                { title: 'Orders', icon: 'mdi-basket', url: '/orders'},
            ],
        }
    },

    async mounted() {
        // await this.getAuth()
        // await this.getSetting()
    },

    computed: {
        // ...mapGetters('auth', ['auth_user']),
        // ...mapGetters('setting', ['settings']),
    },

    methods: {
        // ...mapActions('auth', ['getAuth']),
        // ...mapActions('setting', ['getSetting']),
    }

}
</script>