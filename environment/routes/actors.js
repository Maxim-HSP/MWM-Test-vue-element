var express = require('express');
var ActorService = require("../service/ActorService.js");
var router = express.Router();

/* GET home page. */
router.post('/addActor', function(req, res, next) {
	console.log(req.body)
	ActorService.addActor(req.body, (data) => {
		res.send(data);
	})
});

module.exports = router;