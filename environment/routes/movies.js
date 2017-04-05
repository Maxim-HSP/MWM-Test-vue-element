var express = require('express');
var MovieService = require("../service/MovieService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//增加电影
router.get("/addMovie", function(req, res, next) {
	console.log(req.query)
	MovieService.addMovie(req.query, (data) => {
		res.send(data);
	})
});

//根据电影_id, 修改电影基本信息
router.get("/update", function(req, res, next) {
	MovieService.update(JSON.parse(req.query.movie), (data) => {
		res.send(data);
	})
});

//获取电影列表, 分页
router.get("/getMoviesByPage", function(req, res, next) {
	MovieService.getMoviesByPage(req.query, (data) => {
		res.send(data);
	})
});

//根据电影_id, 获取电影详情
router.get("/getMovieByMovieID", function(req, res, next) {
	MovieService.getMovieByMovieID(req.query, (data) => {
		res.send(data);
	})
});

//根据电影_id, 删除电影(修改电影状态)
router.get("/delete", function(req, res, next) {
	MovieService.delete(req.query, (data) => {
		res.send(data);
	})
});

//根据电影_id, 删除电影(修改电影状态)
router.get("/getMovieDetailsByMovieID", function(req, res, next) {
	MovieService.getMovieDetailsByMovieID(req.query, (data) => {
		res.send(data);
	})
});

module.exports = router;