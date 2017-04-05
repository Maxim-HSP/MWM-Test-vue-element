var MovieDAO = require("../dao/MovieDAO.js");

module.exports.addMovie = (movie, callback) => {
	MovieDAO.addMovie(movie, (data) => {
		callback(data);
	})
}

module.exports.update = (movie, callback) => {
	MovieDAO.update(movie, (data) => {
		callback(data);
	})
}

module.exports.getMoviesByPage = (page, callback) => {
	MovieDAO.getMoviesByPage(page, (data) => {
		callback(data);
	})
}

module.exports.getMovieByMovieID = (movie, callback) => {
	MovieDAO.getMovieByMovieID(movie, (data) => {
		callback(data);
	})
}

module.exports.delete = (movie, callback) => {
	MovieDAO.delete(movie, (data) => {
		callback(data);
	})
}

module.exports.getMovieDetailsByMovieID = (movie, callback) => {
	MovieDAO.getMovieDetailsByMovieID(movie, (data) => {
		callback(data);
	})
}