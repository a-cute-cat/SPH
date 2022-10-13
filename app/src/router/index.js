import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"

Vue.use(VueRouter)

// 重写push方法，解决重复点击的问题
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		originPush.call(this, location, resolve, reject);
	} else {
		originPush.call(this, location, () => {}, () => {})
	}
}
// 配置路由
let myRouter = new VueRouter({
	routes: [{
			name: "home",
			path: "/home",
			component: () => import ("@/views/Home")
		},
		{
			name: "login",
			path: "/login",
			component: () => import ("@/views/Login")
		},
		{
			name: "register",
			path: "/register",
			component: () => import ("@/views/Register")
		},
		{
			name: "search",
			path: "/search/:keyword?",
			component: () => import ("@/views/Search")
		},
		{
			name: "detail",
			path: "/detail/:skuid",
			component: () => import ("@/views/Detail")
		},
		{
			name: "addCartSuccess",
			path: "/addCartSuccess",
			component: () => import ("@/views/AddCartSuccess")
		},
		{
			name: "shopCart",
			path: "/shopCart",
			component: () => import ("@/views/ShopCart")
		},
		{
			name: "trade",
			path: "/trade",
			component: () => import ("@/views/Trade"),
			// 路由独享守卫，只有shopCart页面才可以进入trade页面
			beforeEnter(to, from, next) {
				if (from.path === "/shopCart") {
					next()
				} else {
					next(false)
				}
			}
		},
		{
			name: "pay",
			path: "/pay",
			component: () => import ("@/views/Pay"),
			// 路由独享守卫，只有trade页面才可以进入pay页面
			beforeEnter(to, from, next) {
				if (from.path === "/trade") {
					next()
				} else {
					next(false)
				}
			}
		},
		{
			name: "paySuccess",
			path: "/paySuccess",
			component: () => import ("@/views/PaySuccess")
		},
		{
			name: "center",
			path: "/center",
			component: () => import ("@/views/Center"),
			redirect: "/center/myOrder",
			children: [{
					name: "myOrder",
					path: "/center/myOrder",
					component: () => import ("@/views/Center/myOrder")
				},
				{
					name: "teamOrder",
					path: "/center/teamOrder",
					component: () => import ("@/views/Center/teamOrder")
				}
			]
		},
		{
			path: "/",
			component: () => import ("@/views/Home")
		}
	],
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return {
			y: 0
		}
	},
})
// 路由守卫
myRouter.beforeEach(async (to, from, next) => {
	// 已登录
	if (store.state.user.token) {
		//不能去登录和注册页面
		if (to.path === "/login" || to.path === "/register") {
			next("/")
		} else {
			// 可以去其他页面
			// 用户信息存在时，放行
			if (store.state.user.userInfo.name) {
				next()
			} else {
				// 用户信息不存在，重新请求用户信息
				try {
					await store.dispatch('userInfo');
					next()
					// 重新请求用户信息失败，说明token失效，放行至登录页面，需要重新登陆
				} catch (error) {
					await store.dispatch("userLogout")
					next("/login")
				}
			}
		}
		// 未登录
	} else {
		// 不能去订单和支付相关的页面
		if (to.path.indexOf('/center') != -1 || to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1) {
			// 重定向，登录后直接调转到此页面
			next(`/login?redirect=${to.path}`)
		} else {
			next()
		}
	}
})
export default myRouter