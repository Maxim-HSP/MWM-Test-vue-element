var express = require('express');
var UserService = require("../service/UserService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//登录服务
router.get('/login', function(req, res, next) {
	UserService.login({
		username: req.query.username,
		password: req.query.password,
		status: req.query.status
	}, (data) => {
		res.send(data);
	})
});

//注册服务
router.get("/reg", function(req, res, next) {
	UserService.reg({
		username: req.query.username,
		password: req.query.password,
		status: req.query.status
	}, (data) => {
		res.send(data);
	})
});

//判断用户名是否存在
router.get("/isUse", function(req, res, next) {
	UserService.isUse({
		username: req.query.username,
		status: req.query.status
	}, (data) => {
		res.send(data);
	})
});


//获取用户列表
router.get("/getUsers", function(req, res, next) {
	UserService.getUsers(req.query, (data) => {
		res.send(data);
	})
});

//删除用户
router.get("/del", function(req, res, next) {
	UserService.del({
		_id: req.query._id
	}, (data) => {
		res.send(data);
	})
});

//更新用户
router.get("/update", function(req, res, next) {
	UserService.update(req.query, (data) => {
		res.send(data);
	})
});

module.exports = router;