var mongoose = require("mongoose");

module.exports.addActor = function(actor, callback) {
	var ActorModel = mongoose.model("actors");
	ActorModel.create(actor, (err, data) => {
		callback(data);
	})
}