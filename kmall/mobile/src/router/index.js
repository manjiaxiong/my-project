//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import Home from 'pages/home'
import Me from 'pages/me'
import Cart from 'pages/cart'
import Login from 'pages/login'
import Detail from 'pages/detail'
//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/me",component:Me},
		{path:"/cart",component:Cart},
		{path:"/detail/:detailId",name:'detail'},
		{path:"/login",component:Login},
		{path:"/",redirect:"/home"},
	]
})