<template>
    <div>
        <Topnav />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Topnav from './TopBar'

export default {
    name: 'Dashboard',

    components: {
        Topnav,
    },   

}
</script>