var ActorDAO = require("../dao/ActorDAO.js");

module.exports.addActor = function(actor, callback) {
	ActorDAO.addActor(actor, (data) => {
		callback(data);
	})
}