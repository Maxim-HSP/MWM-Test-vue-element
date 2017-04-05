require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Imgs: 图片
	var img = {
		url: "string",  	//图片路径
		type: "string", 	//图片类型
		itemId: "string", //图片所属
		status: "string" 	//图片状态 0, 停用, 1, 启用
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
		type: String,
		default: "1"
	}
});

mongoose.model("imgs", ImgSchema, "imgs");