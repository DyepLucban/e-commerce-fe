<template>
    <v-app>
        <v-app-bar app dark color="blue lighten-1">
            <v-spacer></v-spacer>

            <v-menu offset-y class="pa-2">
                <template v-slot:activator="{ attrs, on }">
                    <v-btn text class="white--text ma-8" @click="logout">
                        <v-icon class="mr-3">mdi-logout</v-icon>
                        Logout
                    </v-btn>
                </template>
            </v-menu>

        </v-app-bar>

        <Sidebar />

        <v-main>
            <v-container>
                <v-row class="fill-height">
                    <v-col>
                        <v-container>
                            <transition name="fade" mode="out-in">
                                <router-view />
                            </transition>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer>
            ...
        </v-footer>        
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Sidebar from './SideBar'

export default {
    name: 'Topnav',

    components: {
        Sidebar,
    },

    data () {
        return {
            items: [
                { title: 'Logout', icon: 'mdi-logout',},
            ],
        }
    },

    async mounted() {
        // await this.getSetting()
    },

    computed: {
        // ...mapGetters('setting', ['settings']),
    },

    methods: {
        ...mapActions('auth', ['authLogout']),

        async logout() {

            let res = await this.authLogout()

            if (res.status == 200)
            {
                localStorage.removeItem('token')
                this.$router.push({name: 'Admin'})                
            }
        
        }
    },
}
</script>


<style scoped>
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateX(2em);
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease;
    }
</style>