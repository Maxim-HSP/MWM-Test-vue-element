var mongoose = require("mongoose");
var Promise = require("bluebird");
var ObjectId = mongoose.Types.ObjectId;

module.exports.getSeatsByTheaterID = ({
	theaterId,
	page,
	rows
}, callback) => {
	var seatModel = mongoose.model("seats");
	var seatList = {};
	new Promise((resolve, reject) => {
			seatModel
				.count({
					theaterId
				}, (err, data) => {
					seatList.total = data;
					resolve();
				})
		})
		.then(() => {
			seatModel
				.find({
					theaterId
				})
				.populate({
					path: "theaterId",
					select: {
						name: 1,
						_id: 0
					}
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.sort({
					rowNo: 1,
					colNo: 1
				})
				.exec((err, data) => {
					seatList.rows = data || [];
					callback(seatList)
				})

		})
};