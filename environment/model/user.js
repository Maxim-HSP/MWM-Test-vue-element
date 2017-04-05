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