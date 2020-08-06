<template>
    <div>
        <Breadcrumbs />
        <OrdersDatatable />        
    </div>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs.vue'
import OrdersDatatable from './components/OrdersDatatable.vue'

export default {
    name: 'Orders',

    components: {
        Breadcrumbs,
        OrdersDatatable,
    },

    data() {
        return {}
    },
}
</script>