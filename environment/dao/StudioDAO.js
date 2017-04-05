var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Promise = require("bluebird");

module.exports.addStudio = (studio, callback) => {
	var studioModel = mongoose.model("studios");
	studioModel.create(studio, (err, data) => {
		callback(data)
	})
};

module.exports.updateByID = ({
	_id,
	name,
	address
}, callback) => {
	var studioModel = mongoose.model("studios");
	studioModel.update({
		_id
	}, {
		$set: {
			name,
			address
		}
	}, (err, data) => {
		if (err) console.log(err);
		else callback("true");
	})
};

module.exports.deleteByID = ({
	_id
}, callback) => {
	var studioModel = mongoose.model("studios");
	new Promise((resolve, reject) => {
			studioModel
				.remove({
					_id
				}, (err, data) => {
					if (err) console.log(err)
					else resolve(data);
				})
		})
		.then((data) => {
			callback("true")
		})
};

module.exports.getStudios = (callback) => {
	var studioModel = mongoose.model("studios");
	studioModel.find((err, data) => {
		callback(data)
	})
};

module.exports.getStudioByID = ({
	_id
}, callback) => {
	var studioModel = mongoose.model("studios");
	studioModel
		.findOne({
			_id
		}, {
			name: 1,
			address: 1
		}, (err, data) => {
			callback(data);
		})
};