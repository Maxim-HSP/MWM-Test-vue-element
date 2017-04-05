require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Users -- 用户信息
	{
		username: "string", //用户名
		password: "string", //密码
		status: "number" 		//用户状态, 0 为前端用户, 1 为后台用户
		flag: "string" 			//启用状态, 0 为激活用户, 1 为注销用户
	}
*/
var UserSchema = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	status: {
		type: Number
	},
	flag: {
		type: String
	}
});

//用户模型
mongoose.model("users", UserSchema, "users");

/*
	Movies -- 电影
	{
		cName: "string",	 	//中文名称
		eName: "string",	 	//英文名称
		type: "string",    	//影片类型
		country: "string", 	//制片国家/地区
		duration: "string", //片长, 单位 分钟
		release: "string",  //上映时间 格式: 2016-08-23
		synopsis: "string", //剧情简介
		director: [], //导演 
		actors: [], 				//演员
		imgs: [],						//电影图片
		state: "string"			//电影状态 0: 下映, 1: 上映, 2: 热映
	}
*/

var MovieSchema = new Schema({
	cName: {
		type: String
	},
	eName: {
		type: String
	},
	type: {
		type: String
	},
	country: {
		type: String
	},
	duration: {
		type: String
	},
	release: {
		type: String
	},
	synopsis: {
		type: String
	},
	director: [{
		type: Schema.Types.ObjectId, //外键, 指向 actors
		ref: 'Actors'
	}],
	actors: [{
		type: Schema.Types.ObjectId, //外键, 指向 actors
		ref: 'Actors'
	}],
	imgs: [{
		type: Schema.Types.ObjectId,
		ref: "imgs"
	}],
	state: {
		type: String,
		default: "1"
	}
});

mongoose.model("movies", MovieSchema, "movies");


/*
	Actors -- 演员
	{
		cName: "string",      		//中文姓名
		eName: "string",					//英文姓名
		alias: "string",					//别名
		title: "string",					//头衔
		birth: "string",					//出生年月
		height: "string",					//身高
		country: "string",				//国籍 
		birthplace: "string",			//出身地
		constellation: "string", 	//星座
		university: "string",			//毕业院校
		gender: "string",					//性别
		status: "string",					//用户状态, 0 表示未启用, 1 表示启用
		imgs: []   					//演员图片
	}
*/
var ActorSchema = new Schema({
	cName: {
		type: String
	},
	eName: {
		type: String
	},
	alias: {
		type: String
	},
	title: {
		type: String
	},
	birth: {
		type: String
	},
	height: {
		type: String
	},
	country: {
		type: String
	},
	birthplace: {
		type: String
	},
	constellation: {
		type: String
	},
	university: {
		type: String
	},
	gender: {
		type: String
	},
	status: {
		type: String
	},
	imgs: [{
		type: Schema.Types.ObjectId,
		ref: 'imgs'
	}]
});

mongoose.model("actors", ActorSchema, "actors");


/*
	Imgs: 图片
	var img = {
		url: "string",  	//图片路径
		type: "string", 	//图片类型
		itemId: "string", //图片所属
		status: "string" 	//图片状态 0, 启用, 1, 未启用
	}
*/
var ImgSchema = new Schema({
	actorId: {
		type: Schema.Types.ObjectId,
		ref: 'actors'
	},
	movieId: {
		type: Schema.Types.ObjectId,
		ref: 'movies'
	},
	url: {
		type: String
	},
	type: {
		type: String
	},
	name: {
		type: String
	},
	status: {
		type: String
	}
});

mongoose.model("imgs", ImgSchema, "imgs");

/*
	Studios:
	var Studios = {
		studiosName: "string", //影院名称
		address: "string", 		 //影院地址

	}

*/