var express = require('express');
var SeatService = require("../service/SeatService.js");
var router = express.Router();

//获取座位列表
router.get("/getSeatsByTheaterID", function(req, res, next) {
	SeatService.getSeatsByTheaterID(req.query, (data) => {
		res.send(data);
	})
});

module.exports = router;