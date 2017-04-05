var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Promise = require("bluebird");

module.exports.addTheater = ({
	studioID,
	row,
	col,
	name
}, callback) => {
	var theaterModel = mongoose.model("theaters");
	var studioModel = mongoose.model("studios");
	var seatModel = mongoose.model("seats");

	//新增放映厅时, 需要操作影院表和座位表
	var theaterID = new ObjectId;
	new Promise((resolve, reject) => {
			// 1. 更新影院表
			studioModel.update({
				_id: studioID
			}, {
				$push: {
					theaters: theaterID
				}
			}, (err, data) => {
				if (err) console.log(err)
				else resolve()
			})
		})
		.then(() => {
			// 2. 新增放映厅
			return new Promise((resolve, reject) => {
				theaterModel.create({
					_id: theaterID,
					name,
					studioID
				}, (err, data) => {
					if (err) console.log(err);
					else resolve(data)
				})
			})
		})
		.then((theater) => {
			var seats = [];
			for (let i = 1; i <= row; i++) {
				for (let j = 1; j <= col; j++) {
					var seatID = new ObjectId;
					theater.seatIds.push(seatID);
					seats.push({
						_id: seatID,
						rowNo: i,
						colNo: j,
						displayName: `${i}排${j}列`,
						theaterId: theaterID
					})
				}
			}

			//3. 放映厅添加座位
			theater.save((err, data) => {
				if (err) console.log(err)
					//4. 添加座位
				else seatModel.create(seats, (err, data) => {
					callback("true")
				})
			})
		})
};

module.exports.getTheatersByStudioID = ({
	studioID,
	page,
	rows
}, callback) => {
	var theaterModel = mongoose.model("theaters");
	var theaters = {};
	new Promise((resolve, reject) => {
			theaterModel.count({
				studioID
			}, (err, data) => {
				theaters.total = data;
				resolve(theaters)
			})
		})
		.then(() => {
			theaterModel.find({
					studioID
				}, {
					seatIds: 0
				})
				.populate({
					path: "studioID",
					select: {
						name: 1,
						_id: 0
					}
				})
				.skip((page - 1) * rows)
				.limit(~~rows)
				.sort({
					_id: 1
				})
				.exec((err, data) => {
					theaters.rows = data || [];
					callback(theaters)
				})
		})
};

module.exports.updateByStudioID = ({
	_id,
	name
}, callback) => {
	var theaterModel = mongoose.model("theaters");
	theaterModel.update({
		_id
	}, {
		$set: {
			name
		}
	}, (err, data) => {
		if (err) console.log(err)
		else callback("true")
	})
};

module.exports.deleteByStudioID = ({
	_id,
}, callback) => {
	var theaterModel = mongoose.model("theaters");
	var seatModel = mongoose.model("seats");
	new Promise((resolve, reject) => {
			theaterModel.remove({
				_id
			}, (err, data) => {
				if (err) console.log(err)
				else resolve()
			})
		})
		.then(() => {
			seatModel.remove({
				theaterId: _id
			}, (err, data) => {
				if (err) console.log(err)
				else callback("true")
			})
		})
};