var ImgDAO = require("../dao/ImgDAO.js");

module.exports.movieImgIsUpload = (img, callback) => {
	ImgDAO.movieImgIsUpload(img, (data) => {
		callback({
			count: data
		});
	})
};

module.exports.addImg = (img, callback) => {
	ImgDAO.addImg(img, (data) => {
		callback(data);
	})
};

module.exports.getMovieImgByMovieId = (movie, callback) => {
	ImgDAO.getMovieImgByMovieId(movie, (data) => {
		callback(data);
	})
};

module.exports.delete = (img, callback) => {
	ImgDAO.delete(img, (data) => {
		callback(data);
	})
};