//载入必要依赖
import Vue from "vue"
import Router from "vue-router"
//载入各模块(组件)
import Login from "../components/ims/login.vue"
import LoginSwitch from "../components/ims/loginSwitch.vue"
import Info from "../components/ims/info.vue"

//排片
import AddSchedule from "../components/ims/schedule/addSchedule.vue"
import ScheduleList from"../components/ims/schedule/scheduleList.vue"
//电影、图片
import AddMovie from "../components/ims/movie/addMovie.vue"
import GetMovie from "../components/ims/movie/getMovie.vue"
import MovieImg from "../components/ims/movie/movieImg.vue"
//影院、放映厅
import addStudio from "../components/ims/studio/addStudio.vue"
import StudioList from "../components/ims/studio/studioList.vue"
import Theater from "../components/ims/theater/addTheater.vue"
//用户
import AddUser from "../components/ims/users/addUser.vue"
import UserList from "../components/ims/users/userList.vue"

//启动router
Vue.use(Router)

//路由主逻辑（暴露）(使用Router构造函数构建的对象)
export default new Router({
    //path为路径，component为相应的模块
	routes: [{
		path:"/",
		component:Login
	},{
		path:"/login",
		component:Login
	},{
		path:"/loginSwitch",
		component:LoginSwitch
	},{
		path:"/info",
		component:Info,
		//跳转info模块时进行判断，state中isLogin为false时跳转到loginFailed页面，防止通过地址栏url不登陆跳转到info模块
		beforeEnter:(to,from,next)=>{
			if(this.a.app.$store == undefined || this.a.app.$store.state.isLogin == false ){
				next("/LoginSwitch")
			}else{
				next()
			}
		},
		redirect:"/info/addMovie",
		children:[{
			path:"addSchedule",
			component:AddSchedule
		},{
			path:"scheduleList",
			component:ScheduleList
		},{
			path:"addMovie",
			component:AddMovie
		},{
			path:"movieImg/:movieId",
			component:MovieImg
		},{
			path:"getMovie",
			component:GetMovie
		},{
			path:"addStudio",
			component:addStudio
		},{
			path:"addStudio/:studioId/theater",
			component:Theater
		},{
			path:"studioList",
			component:StudioList
		},{
			path:"addUser",
			component:AddUser            
		},{
			path:"userList",
			component:UserList
		}]
	}]
})

//{
//        path:"/*",
//        redirect:"/login"
//    }