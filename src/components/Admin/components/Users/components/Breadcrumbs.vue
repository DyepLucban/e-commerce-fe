<template>
    <div>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',

    components: {

    },

    data() {
        return {
            items: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Users',
                    disabled: true,
                    href: '/users',
                },
            ],
        }
    }
}
</script>