<template>
    <div>
        <v-app-bar app color="primary" dark >
            <div class="d-flex align-center">
                <v-icon>mdi-cart</v-icon>
                <h2 class="ml-3" color="black">Sample E-Commerce Site</h2>
            </div>

            <v-spacer></v-spacer>

            <Cart />

            <Orders />

            <v-btn text @click="logout">
                <span class="mr-2">Logout</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn>

        </v-app-bar>
        <br><br>
        <Products />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Cart from './Cart'
import Orders from './Orders'
import Products from './Products'

export default {
    name: 'AppBar',

    components: {
        Cart,
        Products,
        Orders,
    },

    data() {
        return {}
    },

    methods: {
        ...mapActions ('auth', ['authLogout']),

        async logout()
        {
            let res = await this.authLogout()

            if (res.status == 200)
            {
                localStorage.removeItem('token')
                this.$router.push({name: 'Login'})                
            }
        }
    },
}
</script>