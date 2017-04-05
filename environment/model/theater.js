require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Theater -- 放映厅
	{
		name: "string",	 	//放映厅名称名称
		studioID: studio,
		seats: [seats]
	}
*/

var TheaterSchema = new Schema({
	name: {
		type: String
	},
	studioID: {
		type: Schema.Types.ObjectId, //外键, 指向 studios
		ref: 'studios'
	},
	seatIds: [{
		type: Schema.Types.ObjectId, //外键, 指向 seats
		ref: 'seats'
	}]
});

mongoose.model("theaters", TheaterSchema, "theaters");

/*
	seats -- 座位
	{
		rowNo: String,
		colNo: String,
		displayName: String,
		theaterId: ObjectID
	}
*/

var SeatSchema = new Schema({
	rowNo: {
		type: String
	},
	colNo: {
		type: String
	},
	displayName: {
		type: String
	},
	theaterId: {
		type: Schema.Types.ObjectId, //外键, 指向 theaters
		ref: 'theaters'
	},
});

mongoose.model("seats", SeatSchema, "seats");