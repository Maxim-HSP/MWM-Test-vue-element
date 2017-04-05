var express = require('express');
var StudioService = require("../service/StudioService.js");
var router = express.Router();

//查询影院
router.get("/getStudios", function(req, res, next) {
	StudioService.getStudios((data) => {
		res.send(data);
	});
});

//根据_id查询影院信息
router.get("/getStudioByID", function(req, res, next) {
	StudioService.getStudioByID(req.query, (data) => {
		res.send(data);
	});
});

//增加影院
router.get("/addStudio", function(req, res, next) {
	StudioService.addStudio(req.query, (data) => {
		res.send(data);
	});
});

//修改影院
router.get("/updateByID", function(req, res, next) {
	StudioService.updateByID(req.query, (data) => {
		res.send(data);
	});
});

//删除影院
router.get("/deleteByID", function(req, res, next) {
	StudioService.deleteByID(req.query, (data) => {
		res.send(data);
	});
});


module.exports = router;