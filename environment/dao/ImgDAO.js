var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Promise = require("bluebird");

module.exports.movieImgIsUpload = (img, callback) => {
	var imgModel = mongoose.model("imgs");
	img.status = "1";
	imgModel.count(img, (err, data) => {
		callback(data)
	})
};

module.exports.addImg = (img, callback) => {
	var movieModel = mongoose.model("movies");
	var imgModel = mongoose.model("imgs");
	var _id = new ObjectId;
	new Promise(function(resolve, reject) {
			imgModel.create(img, function(err, data) {
				if (err) reject(err)
				else resolve(data)
			})
		}).then((data) => {
			movieModel.update({
				_id: img.movieId
			}, {
				$push: {
					imgs: data._id
				}
			}, (err, data) => {
				console.log(data);
			})
		})
		.then(function() {
			imgModel.find({
				movieId: img.movieId
			}, function(err, data) {
				if (err) console.log(err);
				else callback(data);
			})
		})
};

module.exports.getMovieImgByMovieId = (movie, callback) => {
	var movieModel = mongoose.model("imgs");
	new Promise(function(resolve, reject) {
		movieModel.count({
			movieId: movie.movieId,
			status: "1",
			type: movie.curImgType,
		}, (err, data) => {
			if (err) {
				reject(err)
			} else {
				movie.total = data;
				movie.pageNumer = Math.ceil(data / movie.rows);
				resolve(movie)
			}
		});
	}).then(function(page) {
		movieModel.find({
				movieId: page.movieId,
				status: "1",
				type: movie.curImgType,
			})
			.skip((page.page - 1) * page.rows)
			.limit(~~page.rows)
			.sort({
				_id: -1
			})
			.exec((err, data) => {
				page.rows = data;
				callback(page)
			})
	})
};

module.exports.delete = ({
	_id
}, callback) => {
	var movieModel = mongoose.model("imgs");
	movieModel.update({
		_id
	}, {
		$set: {
			status: 0
		}
	}, (err, data) => {
		if (err) console.log(err);
		else callback("true")
	})
};