var SeatDAO = require("../dao/SeatDAO.js");

module.exports.getSeatsByTheaterID = (seat, callback) => {
	SeatDAO.getSeatsByTheaterID(seat, (data) => {
		callback(data);
	})
};