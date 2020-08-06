<template>
    <div>
        <Breadcrumbs />
        <UsersDatatable />        
    </div>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs.vue'
import UsersDatatable from './components/UsersDatatable.vue'

export default {
    name: 'Users',

    components: {
        Breadcrumbs,
        UsersDatatable,
    },

    data() {
        return {}
    },
}
</script>