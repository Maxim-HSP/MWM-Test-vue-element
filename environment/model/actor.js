require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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