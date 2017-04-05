var mongoose = require("mongoose");
var Promise = require("bluebird");
var ObjectId = mongoose.Types.ObjectId;

module.exports.addMovie = (movie, callback) => {
	var movies = mongoose.model("movies");
	movies.create(movie, (err, data) => {
		callback(data);
	})
};

module.exports.update = ({
	_id,
	cName, //中文名称
	eName, //英文名称
	type, //影片类型
	country, //制片国家/地区
	duration, //片长, 单位 分钟
	release, //上映时间 格式: 2016-08-23
	synopsis, //剧情简介
}, callback) => {
	var movieModel = mongoose.model("movies");
	movieModel.update({
		_id
	}, {
		$set: {
			cName, //中文名称
			eName, //英文名称
			type, //影片类型
			country, //制片国家/地区
			duration, //片长, 单位 分钟
			release, //上映时间 格式: 2016-08-23
			synopsis, //剧情简介
		}
	}, (err, data) => {
		if (data.ok === 1) {
			callback("true")
		}
	})
};

module.exports.getMoviesByPage = (page, callback) => {
	var movieModel = mongoose.model("movies");
	new Promise((resolve, reject) => {
			movieModel.count({
				state: {
					$ne: "0"
				}
			}, (err, data) => {
				resolve(data)
			})
		})
		.then((data) => {
			page.total = data;
			page.maxPage = Math.ceil(page.total / page.eachPage);
			movieModel
				.find({
					state: {
						$ne: "0"
					}
				})
				.sort({
					_id: -1
				})
				.skip(page.eachPage * (page.curPage - 1))
				.limit(~~page.eachPage)
				.exec((err, data) => {
					page.rows = data;
					callback(page);
				})
		})
}

module.exports.getMovieByMovieID = ({
	_id
}, callback) => {
	var movieModel = mongoose.model("movies");
	movieModel.findOne({
		_id
	}, (err, data) => {
		callback(data);
	})
}

module.exports.delete = ({
	_id
}, callback) => {
	var movieModel = mongoose.model("movies");
	movieModel.update({
		_id
	}, {
		$set: {
			state: "0"
		}
	}, (err, data) => {
		if (err) console.log(err)
		else callback("true");
	})
}


module.exports.getMovieDetailsByMovieID = ({
	_id
}, callback) => {
	var movieModel = mongoose.model("movies");
	movieModel.findOne({
			_id
		}).populate({
			path: "imgs",
		})
		.exec(function(err, data) {
			callback(data)
		})
}