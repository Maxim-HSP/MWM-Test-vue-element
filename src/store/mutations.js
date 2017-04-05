export const mutations = {
	//登录
	setIsLogin(state,payload){
		state.isLogin = payload.isLogin
		state.loginUser = payload.username
	},
	//用户
	setIsRegSuc(state,payload){
		state.isRegSuc = payload
	},
	setIsUsernameUse(state,payload){
		state.isUsernameUse = payload
	},
	setUserList(state,payload){
		state.userList = payload;
	},
	setDelUserSuc(state,payload){
		state.delUserSuc = payload
	},
	setUpUserSuc(state,payload){
		state.upUserSuc = payload
	},
	
	//电影
	setMovieList(state,payload){
		state.movieList = payload
		state.movieList.total=payload.total
	},
	setAddMovieSuc(state,payload){
		state.addMovieSuc = payload.addMovieSuc
		state.addMovieID = payload.addMovieID
		state.addMovieName = payload.addMovieName
	},
	setDelMovieSuc(state,payload){
		state.delMovieSuc=payload
	},
	setUpMovieSuc(state,payload){
		state.upMovieSuc=payload
	},
	setMovieListPage(state,page){
		state.movieList.page=page
	},
	setCurMovie(state,payload){
		state.curMovie = payload
	},
	
	//影院
	setStudioList(state,payload){
		state.studioList = payload
	},
	setAddStudioSuc(state,payload){
		state.addStudioSuc = payload.addStudioSuc
		state.addStudioId = payload._id
		state.addStudioName = payload.name
	},
	setDelStudioSuc(state,payload){
		state.delStudioSuc = payload
	},
	setUpStudioSuc(state,payload){
		state.upStudioSuc = payload
	},
	
	//放映厅
	setCurStudio(state,payload){
		state.curStudio = payload
	},
	setTheaterId(state,theaterId){
		state.theaterId = theaterId;
	},
	setTheaterListByPage(state,payload){
		state.theaterListData.rows = payload.theaterListData;
		state.theaterListData.total = payload.total;
		state.theaterListData.page = payload.page;
	},
	setSeatListData(state,payload){
		state.seatListData.rows = payload.seatData;
		state.seatListData.total = payload.total;
		state.seatListData.page = payload.page;
	},
	
	//排片
	setAddScheduleSuc(state,payload){
		state.addScheduleSuc = payload
	},
	setScheduleList(state,payload){
		state.scheduleList = payload
	},
	setDelScheduleSuc(state,payload){
		state.delScheduleSuc = payload
	},
	//排片单独接口-放映厅
	setTheaterList(state,payload){
		state.theaterList = payload
	},
}