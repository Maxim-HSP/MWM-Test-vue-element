var mongoose = require("mongoose");
var Promise = require("bluebird");
var ObjectId = mongoose.Types.ObjectId;
var moment = require("moment")

module.exports.addSchedule = function(schedule, callback) {
	var ScheduleModel = mongoose.model("schedules");
	var SeatingModel = mongoose.model("seatings");
	var seatModel = mongoose.model("seats");
	schedule.showTime = moment(new Date(schedule.showTime)).format('YYYY-MM-DD HH:mm:ss')
	var scheduleID = new ObjectId;
	schedule._id = scheduleID;
	new Promise((resolve, reject) => {
			ScheduleModel.create(schedule, (err, data) => {
				if (err) console.log(err);
				else resolve()
			})
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				seatModel.find({
					theaterId: schedule.theaterID
				}, {
					_id: 1
				}, (err, data) => {
					if (err) console.log(err)
					else resolve(data)
				})
			})
		})
		.then((data) => {
			var arr = data.map((item, index) => {
				return {
					scheduleID: scheduleID, //场次ID
					seatID: item._id //座位ID
				}
			});
			SeatingModel.create(arr, (err, data) => {
				if (err) console.log(err)
				else callback("true")
			})
		})
}

module.exports.deleteByScheduleID = function({
	_id
}, callback) {
	var ScheduleModel = mongoose.model("schedules");
	ScheduleModel
		.remove({
			_id
		}, (err, data) => {
			console.log(data)
			if (err) console.log(err)
			else callback("true")
		})
}

module.exports.getSchedulesByMST = function({
	movieID,
	studioID,
	theaterID,
	page,
	rows
}, callback) {
	var ScheduleModel = mongoose.model("schedules");
	var SeatingModel = mongoose.model("seatings");
	var seatModel = mongoose.model("seats");
	new Promise((resolve, reject) => {
			ScheduleModel.count({
				movieID,
				studioID,
				theaterID
			}, (err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
		})
		.then((total) => {
			var list = {
				total
			};
			ScheduleModel.find({
					movieID,
					studioID,
					theaterID
				})
				.populate({
					path: "movieID",
					select: {
						_id: 1,
						cName: 1
					}
				})
				.populate({
					path: "studioID",
					select: {
						_id: 1,
						name: 1
					}
				})
				.populate({
					path: "theaterID",
					select: {
						_id: 1,
						name: 1
					}
				})
				.sort({
					showTime: 1
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.exec((err, data) => {
					if (err) {
						console.log(err)
					} else {
						list.rows = data.map(({
							_id,
							movieID,
							studioID,
							theaterID,
							price,
							showTime
						}) => {
							return {
								_id,
								movieID,
								studioID,
								theaterID,
								price,
								showTime: moment(showTime).format('YYYY-MM-DD HH:mm:ss')
							}
						});
						callback(list)
					}
				})
		})
}

module.exports.getSeatingsByScheduleID = function({
	scheduleID,
	page,
	rows
}, callback) {
	var ScheduleModel = mongoose.model("schedules");
	var SeatingModel = mongoose.model("seatings");
	var seatModel = mongoose.model("seats");
	var list = {};
	new Promise((resolve, reject) => {
			SeatingModel.count({
				scheduleID
			}, (err, data) => {
				if (err) console.log(err)
				else resolve(data)
			})
		})
		.then((total) => {
			console.log(total)
			list.total = total;
			SeatingModel
				.find({
					scheduleID
				})
				.populate({
					path: "seatID",
				})
				.populate({
					path: "scheduleID",
					populate: {
						path: "movieID",
						select: {
							cName: 1
						}
					}
				})
				.sort({
					seatID: 1
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.exec((err, data) => {
					list.rows = data;
					callback(data)
				})
		})
}

module.exports.getStudiosByMovieID = function({
	movieID,
	page,
	rows,
	time
}, callback) {
	var ScheduleModel = mongoose.model("schedules");
	var StudioModel = mongoose.model("studios");
	new Promise((resolve, reject) => {
			ScheduleModel
				.aggregate()
				.match({
					movieID: ObjectId(movieID),
					$and: [{
						showTime: {
							$gt: new Date(moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss"))
						}
					}, {
						showTime: {
							$lt: new Date(moment(new Date(time)).add(1, "days").format("YYYY-MM-DD"))
						}
					}]
				})
				.group({
					_id: "$studioID"
				})
				.exec((err, data) => {
					if (err) console.log(err)
					else resolve(data)
				})
		})
		.then((studios) => {
			var list = {
				total: studios.length
			};
			StudioModel
				.find({
					_id: {
						$in: studios.map((item) => {
							return item._id
						})
					}
				}, {
					theaters: 0
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.exec((err, data) => {
					list.rows = data;
					callback(list)
				})
		})
}

module.exports.getScheduleListByMoiveIDAndStudioIDAndTime = function({
	movieID,
	studioID,
	time,
	page,
	rows
}, callback) {
	var ScheduleModel = mongoose.model("schedules");
	new Promise((resolve, reject) => {
			ScheduleModel
				.count({
					movieID,
					studioID,
					$and: [{
						showTime: {
							$gt: new Date(moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss"))
						}
					}, {
						showTime: {
							$lt: new Date(moment(new Date(time)).add(1, "days").format("YYYY-MM-DD"))
						}
					}]
				}, (err, data) => {
					if (err) console.log(err)
					else resolve(data)
				})
		})
		.then((total) => {
			let list = {
				total
			};
			ScheduleModel.find({
					movieID,
					studioID,
					$and: [{
						showTime: {
							$gt: new Date(moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss"))
						}
					}, {
						showTime: {
							$lt: new Date(moment(new Date(time)).add(1, "days").format("YYYY-MM-DD"))
						}
					}]
				})
				.populate({
					path: "theaterID",
					select: {
						_id: 1,
						name: 1
					}
				})
				.populate({
					path: "movieID",
					select: {
						cName: 1,
						type: 1,
						duration: 1,
						imgs: 1
					}
				})
				.populate({
					path: "studioID",
					select: {
						theaters: 0
					}
				})
				.sort({
					showTime: 1
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.exec((err, data) => {
					if (err) {
						console.log(err)
					} else {
						list.rows = data.map(({
							_id,
							movieID,
							price,
							showTime,
							studioID,
							theaterID
						}) => {
							return {
								_id,
								movieID,
								price,
								showTime: moment(showTime).format('YYYY-MM-DD HH:mm:ss'),
								studioID,
								theaterID
							}
						})
						callback(list)
					}
				})
		})
}