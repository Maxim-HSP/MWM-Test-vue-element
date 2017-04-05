var ScheduleDAO = require("../dao/ScheduleDAO.js");

module.exports.addSchedule = (schedule, callback) => {
	ScheduleDAO.addSchedule(schedule, (data) => {
		callback(data);
	})
}

module.exports.getSchedulesByMST = (schedule, callback) => {
	ScheduleDAO.getSchedulesByMST(schedule, (data) => {
		callback(data);
	})
}

module.exports.getSeatingsByScheduleID = (schedule, callback) => {
	ScheduleDAO.getSeatingsByScheduleID(schedule, (data) => {
		callback(data);
	})
}

module.exports.getStudiosByMovieID = (schedule, callback) => {
	ScheduleDAO.getStudiosByMovieID(schedule, (data) => {
		callback(data);
	})
}

module.exports.deleteByScheduleID = (schedule, callback) => {
	ScheduleDAO.deleteByScheduleID(schedule, (data) => {
		callback(data);
	})
}

module.exports.getScheduleListByMoiveIDAndStudioIDAndTime = (schedule, callback) => {
	ScheduleDAO.getScheduleListByMoiveIDAndStudioIDAndTime(schedule, (data) => {
		callback(data);
	})
}