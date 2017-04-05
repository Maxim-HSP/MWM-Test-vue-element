require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Studio -- 影院
	{
		name: "string",	 	//影院名称
		address: "string",	 	//影院地址
		theaters: [] 			//所属放映厅
	}
*/

var StudioSchema = new Schema({
	name: {
		type: String
	},
	address: {
		type: String
	},
	theaters: [{
		type: Schema.Types.ObjectId, //外键, 指向 Theater
		ref: 'Theater'
	}],
});

mongoose.model("studios", StudioSchema, "studios");