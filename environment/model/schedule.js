require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Schedule -- 排片信息
	{
		movieID: String,  //电影ID
		showTime: Date,	//放映时间
		studioID: String, //影院ID
		theaterID: String //放映厅
	}
*/

var SchedulesSchema = new Schema({
	movieID: {
		type: Schema.Types.ObjectId,
		ref: "movies"
	},
	studioID: {
		type: Schema.Types.ObjectId,
		ref: "studios"
	},
	theaterID: {
		type: Schema.Types.ObjectId,
		ref: "theaters"
	},
	showTime: {
		type: Date
	},
	price: {
		type: String
	}
});

mongoose.model("schedules", SchedulesSchema, "schedules");

/*
	Seating -- 座次表
	{
		scheduleID: String //场次ID
		seatID: String //座位ID
		state: String  座位状态, 0 未售出, 1 售出
	}
*/

var SeatingSchema = new Schema({
	scheduleID: {
		type: Schema.Types.ObjectId,
		ref: "schedules"
	},
	seatID: {
		type: Schema.Types.ObjectId,
		ref: "seats"
	},
	state: {
		type: String,
		default: 0
	}
});

mongoose.model("seatings", SeatingSchema, "seatings");