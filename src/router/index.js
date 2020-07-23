import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Index.vue'
import Home from '../components/Home/Index.vue'

Vue.use(VueRouter)

	const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		meta: { notAuth: true },
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: { authOnly: true },
    },
	{
		path: '/checkout/:id',
		name: 'Checkout',
		component: Home,
		meta: { authOnly: true },
	},    
]

function isLoggedIn()
{
    return localStorage.getItem('token')
}

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.notAuth)) {
        if (isLoggedIn()) {
            next({
                path: '/home',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
