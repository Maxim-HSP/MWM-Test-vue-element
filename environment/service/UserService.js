var UserDAO = require("../dao/UserDAO.js");

module.exports.login = function(user, callback) {
	UserDAO.login(user, (data) => {
		if (data.length === 1) {
			callback({
				_id: data[0]._id,
				username: data[0].username
			});
		} else {
			callback(false);
		}
	})
}

module.exports.reg = function(user, callback) {
	UserDAO.reg(user, (data) => {
		if (data) {
			callback(true)
		} else {
			callback(false)
		}
	})
}

module.exports.isUse = function(user, callback) {
	UserDAO.isUse(user, (data) => {
		if (data.length === 0) {
			callback(false)
		} else {
			callback(true)
		}
	})
};

module.exports.getUsers = function(user, callback) {
	UserDAO.getUsers(user, (data) => {
		callback(data);
	})
};

module.exports.del = function(user, callback) {
	UserDAO.del(user, (data) => {
		callback(data);
	})
};

module.exports.update = function(user, callback) {
	UserDAO.update(user, (data) => {
		callback(data);
	})
};