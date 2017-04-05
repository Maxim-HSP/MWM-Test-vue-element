require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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