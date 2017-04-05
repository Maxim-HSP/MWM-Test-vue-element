var express = require('express');
var ImgService = require("../service/ImgService.js");
var router = express.Router();

router.get("/movieImgIsUpload", function(req, res, next) {
	ImgService.movieImgIsUpload(req.query, (data) => {
		res.send(data);
	})
});

router.get("/getMovieImgByMovieId", function(req, res, next) {
	ImgService.getMovieImgByMovieId(req.query, (data) => {
		res.send(data);
	})
});





router.get("/delete", function(req, res, next) {
	ImgService.delete(req.query, (data) => {
		res.send(data);
	})
});

module.exports = router;