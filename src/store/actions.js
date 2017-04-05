//获取babel-polyfill(使用generator函数的必需支持)
import "babel-polyfill"
import axios from "axios"


export const actions = {
	//登录
	async asyncLogin(context,payload){
		let result = await axios.get('http://localhost:3000/users/login', {
			params: {
				username: payload.username,
				password: payload.password,
				status: 1,
				flag: 0
			}
		});
		if(result.data){
			context.commit("setIsLogin",{
				isLogin:true,
				username:result.data.username
			})
		}else{
			context.commit("setIsLogin",{
				isLogin:false
			})
		}
	},
	//排片管理
	async asyncGetMovies(context,payload){
		let result = await axios.get('http://localhost:3000/movies/getMoviesByPage');
		context.commit("setMovieList",result.data)
	},
	async asyncGetStudios(context,payload){
		let result = await axios.get('http://localhost:3000/studios/getStudios');
		context.commit("setStudioList",result.data)
	},
	async asyncGetTheatersByStudioID(context,payload){
		let result = await axios.get('http://localhost:3000/theaters/getTheatersByStudioID',{
			params: {
				studioID:payload.studioID
			}
		});
		context.commit("setTheaterList",result.data)
	},
	async asyncAddSchedule(context,payload){
		let result = await axios.get('http://localhost:3000/schedules/addSchedule', {
			params: {
				movieID: payload.movieID,
				showTime: payload.showTime,
				studioID: payload.studioID,
				theaterID: payload.theaterID,
				price: payload.price,
			}
		});
		context.commit("setAddScheduleSuc",result.data)
	},
	async asyncGetStudiosByMovieID(context,payload){
		let result = await axios.get('http://localhost:3000/schedules/getStudiosByMovieID', {
			params: {
				movieID: payload.movieID,
				time: payload.time
			}
		});
		context.commit("setStudioList",result.data.rows)
	},
	async asyncGetSchduleByMSTime(context,payload){
		let result = await axios.get('http://localhost:3000/schedules/getScheduleListByMoiveIDAndStudioIDAndTime', {
			params: {
				movieID: payload.movieID,
				studioID: payload.studioID,
				time: payload.showTime
			}
		});
		context.commit("setScheduleList",result.data.rows)
	},
	async asyncDeleteByScheduleID(context,payload){
		let result = await axios.get('http://localhost:3000/schedules/deleteByScheduleID', {
			params: {
				_id: payload,
			}
		});
		context.commit("setDelScheduleSuc",result.data)
	},

	//电影管理
	async asyncGetMoviesByPage(context,payload){
		let result = await axios.get('http://localhost:3000/movies/getMoviesByPage', {
			params: {
				curPage:context.state.movieList.page,
				eachPage:10
			}
		});
		context.commit("setMovieList",result.data)
	},
	async asyncAddMovie(context,payload){
		var result=await axios.get('http://localhost:3000/movies/addMovie', {
			params: payload
    });
		if(result.data!==null){
			context.commit("setAddMovieSuc",{
				addMovieSuc: true,
				addMovieID: result.data._id,
				addMovieName : result.data.cName
			})
		}else{
			context.commit("setAddMovieSuc",{
				addMovieSuc:false
			})
		}
	},
	async asyncdeleteMovie(context,_id){
		var result=await axios.get('http://localhost:3000/movies/delete', {
			params: {
				_id:_id
			}
	  });
		if(result.data){
			context.commit("setDelMovieSuc",result.data)
		}
	},
	async asyncupdateMovie(context,payload){
		var result=await axios.get('http://localhost:3000/movies/update', {
			params:{
				movie:payload
			}
	  });
		if(result.data){
			context.commit("setUpMovieSuc",result.data)
		}
	},
	async asyncGetMovieByMovieID(context,_id){
		let result = await axios.get('http://localhost:3000/movies/getMovieByMovieID', {
			params: {_id}
		});
		context.commit("setCurMovie",result.data)
	},
	
	//放映厅
	async asyncGetTheaterByPage(context,{page=1,rows=10}={}){
		var result = await axios.get('http://localhost:3000/theaters/getTheatersByStudioID', {
			params: {
				studioID:context.state.curStudio._id,
				page,
				rows
			}
		});
		context.commit({
			type:"setTheaterListByPage",
			theaterListData:result.data.rows,
			total:result.data.total,
			page
		});
   },
	async asyncAddTheater(context,payload){
		var result = await axios.get('http://localhost:3000/theaters/addTheater',{
			params: {
				studioID: payload.studioID,
				name:payload.name,
				row:payload.row,
				col:payload.col
			}
		});
		if(result.data){
			context.dispatch("asyncGetTheaterByPage",{
				page:context.state.theaterListData.page
			})
		}
	},
	async asyncRemoveTheater(context,_id){
		var result=await axios.get('http://localhost:3000/theaters/deleteByStudioID', {
			params: {_id}
		});
		if(result.data) context.dispatch("asyncGetTheaterByPage");
	},
	async asyncUpdateTheater(context,payload){
		var result=await axios.get('http://localhost:3000/theaters/updateByStudioID', {
			params: {
				name:payload.name,
				_id:payload._id
			}
		});
		if(result.data) context.dispatch("asyncGetTheaterByPage");
	},
	async asyncGetSeat(context,{page=1}={}){
		var result=await axios.get('http://localhost:3000/seats/getSeatsByTheaterID', {
			params: {
				theaterId:context.state.theaterId,
				page,
				rows:10
			}
		});
		context.commit({
			type:"setSeatListData",
			seatData:result.data.rows,
			total:result.data.total,
			page
		})
	},
	async asyncGetStudioByID(context,_id){
		let result = await axios.get('http://localhost:3000/studios/getStudioByID',{
			params:{_id}
		});
		context.commit("setCurStudio",result.data)
	},

	
	//影院管理
	async asyncAddStudio(context,payload){
		var result=await axios.get('http://localhost:3000/studios/addStudio', {
			params: {
				name: payload.name,
				address: payload.address
			}
    });
		if(result.data !== null){
			context.commit("setAddStudioSuc",{
				addStudioSuc:true,
				_id: result.data._id,
				name: result.data.name
			})
		}else{
			context.commit("setAddStudioSuc",{
				addStudioSuc:false
			})
		}
	},
	async asyncUpdateStudio(context,payload){
		var result=await axios.get('http://localhost:3000/studios/updateByID', {
			params:{
				_id: payload._id,
				name: payload.name,
				address: payload.address
			}
		});
		context.commit("setUpStudioSuc",result.data)
	},
	async asyncDeleteStudio(context,_id){
		var result=await axios.get('http://localhost:3000/studios/deleteByID', {
			params: {
				_id:_id
			}
	  })
		context.commit("setDelStudioSuc",result.data)
	},
    
	//用户管理
	async asyncReg(context,payload){
		var result=await axios.get('http://localhost:3000/users/reg', {
			params: {
				username: payload.username,
				password: payload.password,
				status: ~~(payload.status)
			}
    });
		context.commit("setIsRegSuc",result.data)
	},
	async asyncCheckUsername(context,payload){
		var result=await axios.get('http://localhost:3000/users/isUse', {
			params: {
				username: payload.username,
				status: ~~(payload.status)
			}
    });
		context.commit("setIsUsernameUse",result.data)
	},

  async asyncGetUsers(context,payload){
		//检测是否获取注销用户
		if(payload.flag == 1){
			payload = {flag:1}
		}else{
			//如无参数，默认获取管理账户，防止出错
			payload = {flag:0, status: payload.status || 1}
		}
		var result=await axios.get('http://localhost:3000/users/getUsers', {
			params: payload
		});
		context.commit("setUserList",result.data)
  },
	async asyncDeleteUser(context,_id){
		var result=await axios.get('http://localhost:3000/users/del', {
			params: {
				_id:_id
			},
		});
		context.commit("setDelUserSuc",result.data)
	}, 
	async asyncUpdateUser(context,payload){
		var result=await axios.get('http://localhost:3000/users/update', {
			params: {
				_id:payload._id,
				username:payload.username,
				password:payload.password
			},
		});
	context.commit("setUpUserSuc",result.data)
	}, 
}