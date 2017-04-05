import Vue from "vue"
import Vuex from "vuex"
//获取actions与mutations
import {actions} from "./actions.js"
import {mutations} from "./mutations.js"

Vue.use(Vuex)

export const store =  new Vuex.Store({
    actions,
    mutations,
    state:{
			//登录检测
			isLogin:false,
			loginUser:"",
			//用户
      userList: [],
			isUsernameUse:false,
			isRegSuc:false,
			delUserSuc:false,
			upUserSuc:false,
			
			//电影
			movieList:{
				maxPage:null,
				page:"1",
				rows:[],
				total:null
			},
			addMovieID:null,
			addMovieName:null,
			addMovieSuc:false,
			delMovieSuc:false,
			upMovieSuc:false,
			//电影图片-当前电影信息
			curMovie:{},
			
			//影院(无翻页，直接数组)
    	studioList:[],
			addStudioId:null,
			addStudioName:null,
			addStudioSuc:false,
			delStudioSuc:false,
			upStudioSuc:false,
			
			//放映厅
			curStudio:{
				_id:null,
				name:null,
				address:null
			},
			theaterId:"",
			theaterListData:{
				rows:[],
				total:null,
				page:1
			},
			seatListData:{
				rows:[],
				total:null,
				page:1
			},
			
			//排片
			scheduleList:[],
			addScheduleSuc:false,
			delScheduleSuc:false,
			theaterList:{
				rows:[],
				total:null
			},
		},
    getters:{
      
    }
})