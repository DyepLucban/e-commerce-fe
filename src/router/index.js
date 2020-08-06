import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Index.vue'
import Home from '../components/Home/Index.vue'
import Admin from '../components/Admin/Index.vue'
import Dashboard from '../components/Admin/components/Dashboard'
import Users from '../components/Admin/components/Users/Index'
import Products from '../components/Admin/components/Products/Index'
import Orders from '../components/Admin/components/Orders/Index'


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
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		meta: { notAuth: true },
    },
	{
		path: '/admin-home',
		name: 'Dashboard',
		component: Dashboard,
		children: [
			{
				path: '/users',
				name: 'Users',
				component: Users,
			},
			{
				path: '/products',
				name: 'Products',
				component: Products,
			},
			{
				path: '/orders',
				name: 'Orders',
				component: Orders,
			},						
		],
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
