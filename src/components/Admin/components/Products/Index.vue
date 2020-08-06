<template>
    <div>
        <Breadcrumbs />
        <ProductsDatatable />        
    </div>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs.vue'
import ProductsDatatable from './components/ProductsDatatable.vue'

export default {
    name: 'Users',

    components: {
        Breadcrumbs,
        ProductsDatatable,
    },

    data() {
        return {}
    },
}
</script>