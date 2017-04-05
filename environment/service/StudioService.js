var StudioDAO = require("../dao/StudioDAO.js");

module.exports.addStudio = (studio, callback) => {
	StudioDAO.addStudio(studio, (data) => {
		callback(data);
	})
};

module.exports.updateByID = (studio, callback) => {
	StudioDAO.updateByID(studio, (data) => {
		callback(data);
	})
};

module.exports.deleteByID = (studio, callback) => {
	StudioDAO.deleteByID(studio, (data) => {
		callback(data);
	})
};

module.exports.getStudios = (callback) => {
	StudioDAO.getStudios((data) => {
		callback(data);
	})
};

module.exports.getStudioByID = (studio, callback) => {
	StudioDAO.getStudioByID(studio, (data) => {
		callback(data);
	})
};