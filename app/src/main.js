import Vue from "vue";
// import 'bootstrap/dist/css/bootstrap.css';
import App from "@/App.vue";
import router from "@/router";
import store from '@/store';
// 注册TypeNav全局组件
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);
//注册Carousel全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);

// 注册分页器Pagination全局组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination);
// 引入mockServe.js
import "@/mock/mockServe";

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入api请求接口
import * as API from "@/api"

// 按需引入element-ui
import {
	MessageBox,
	Button,
	Message
} from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.use(Button.name, Button)

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 使用懒加载插件
const loadimage = require('@/assets/images/loading.gif')
Vue.use(VueLazyload, {
  loading: loadimage
})

// 引入vee-validate组件
import "@/plugins/validate"

Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	store,
	beforeMount() {
		Vue.prototype.$bus = this;
		// 将api请求接口放在vue原型上，全局可用
		Vue.prototype.$API = API;
	}
}).$mount("#app")