var express = require('express');
var TheaterService = require("../service/TheaterService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/addTheater', function(req, res, next) {
	TheaterService.addTheater(req.query, (data) => {
		res.send(data)
	})
});

router.get('/getTheatersByStudioID', function(req, res, next) {
	TheaterService.getTheatersByStudioID(req.query, (data) => {
		res.send(data)
	})
});

router.get('/updateByStudioID', function(req, res, next) {
	TheaterService.updateByStudioID(req.query, (data) => {
		res.send(data)
	})
});

router.get('/deleteByStudioID', function(req, res, next) {
	TheaterService.deleteByStudioID(req.query, (data) => {
		res.send(data)
	})
});

module.exports = router;