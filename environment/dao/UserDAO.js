var mongoose = require("mongoose");

module.exports.login = function(user, callback) {
	var UserModel = mongoose.model("users");
	user.status = ~~(user.status)
	UserModel.find(user, (err, data) => {
		callback(data);
	})
};

module.exports.reg = function(user, callback) {
	var UserModel = mongoose.model("users");
	user.status = ~~(user.status)
	user.flag = 0;
	UserModel.create(user, (err, data) => {
		callback(data);
	})
};

module.exports.isUse = function(user, callback) {
	var UserModel = mongoose.model("users");
	UserModel.find(user, (err, data) => {
		callback(data);
	})
};

module.exports.getUsers = function(user, callback) {
	var UserModel = mongoose.model("users");
	UserModel.find(user, (err, data) => {
		callback(data);
	})
};

module.exports.del = function(user, callback) {
	var UserModel = mongoose.model("users");
	UserModel.update(user, {
		$set: {
			flag: 1
		}
	}, (err, data) => {
		if(err) {
			console.log(err)
		} else {
			callback(true)
		}
	})
};

module.exports.update = function({_id, username, password} = {}, callback) {
	var UserModel = mongoose.model("users");
	UserModel.update({
		_id
	}, {
		$set: {
			username,
			password
		}
	}, (err, data) => {
		if(err) {
			console.log(err)
		} else {
			callback(true)
		}
	})
};

