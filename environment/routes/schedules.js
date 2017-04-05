var express = require('express');
var ScheduleService = require("../service/ScheduleService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//新增排片信息
router.get('/addSchedule', function(req, res, next) {
	ScheduleService.addSchedule(req.query, (data) => {
		res.send(data);
	});
});

//获取排片列表
router.get('/getSchedulesByMST', function(req, res, next) {
	ScheduleService.getSchedulesByMST(req.query, (data) => {
		res.send(data);
	});
});

//新增排片信息
router.get('/getSchedulesByMST', function(req, res, next) {
	ScheduleService.getSchedulesByMST(req.query, (data) => {
		res.send(data);
	});
});

//删除排片信息
router.get('/deleteByScheduleID', function(req, res, next) {
	ScheduleService.deleteByScheduleID(req.query, (data) => {
		res.send(data);
	});
});


//获取所排片座位信息
router.get('/getSeatingsByScheduleID', function(req, res, next) {
	ScheduleService.getSeatingsByScheduleID(req.query, (data) => {
		res.send(data);
	});
});

//根据电影ID获取影院信息
router.get('/getStudiosByMovieID', function(req, res, next) {
	ScheduleService.getStudiosByMovieID(req.query, (data) => {
		res.send(data);
	});
});

//根据电影ID, 影院ID和时间获取场次信息
router.get('/getScheduleListByMoiveIDAndStudioIDAndTime', function(req, res, next) {
	ScheduleService.getScheduleListByMoiveIDAndStudioIDAndTime(req.query, (data) => {
		res.send(data);
	});
});

module.exports = router;