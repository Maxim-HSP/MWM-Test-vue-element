var TheaterDAO = require("../dao/TheaterDAO.js");

module.exports.addTheater = (theater, callback) => {
	TheaterDAO.addTheater(theater, (data) => {
		callback(data);
	})
};

module.exports.getTheatersByStudioID = (theater, callback) => {
	TheaterDAO.getTheatersByStudioID(theater, (data) => {
		callback(data);
	})
};

module.exports.updateByStudioID = (theater, callback) => {
	TheaterDAO.updateByStudioID(theater, (data) => {
		callback(data);
	})
};

module.exports.deleteByStudioID = (theater, callback) => {
	TheaterDAO.deleteByStudioID(theater, (data) => {
		callback(data);
	})
};