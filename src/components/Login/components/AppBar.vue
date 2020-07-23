<template>
    <v-app-bar app color="primary" dark >
        <div class="d-flex align-center">
            <v-icon>mdi-cart</v-icon>
            <h2 class="ml-3" color="black">Sample E-Commerce Site</h2>
        </div>

        <v-spacer></v-spacer>
        
        <Register />
        <Login />
    </v-app-bar>
</template>

<script>
import Login from './LoginModal'
import Register from './RegisterModal'

export default {
    name: 'AppBar',

    components: {
        Login,
        Register,
    },

    data() {
        return {}
    }
}
</script>