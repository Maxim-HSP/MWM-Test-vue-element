var express = require('express');
var multiparty = require('multiparty');
var fs = require('fs');
var ImgService = require("../service/ImgService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post("/upload", function(req, res) {
	var form = new multiparty.Form({
		uploadDir: './public/tmp/'
	});

	// form.parse(req, function(err, fields, files) {
	// 	var filesTmp = JSON.stringify(files, null, 2);
	// 	var imgData = JSON.parse(fields.imgData[0])
	// 	console.log(imgData.movieId, imgData.type)
	// 	if (err) {
	// 		console.log('parse error: ' + err);
	// 	} else {
	// 		var inputFile = files["files[]"][0];
	// 		var uploadedPath = inputFile.path;
	// 		var dstPath = './public/tmp/' + inputFile.originalFilename;
	// 		//重命名为真实文件名
	// 		fs.rename(uploadedPath, dstPath, function(err) {
	// 			if (err) {
	// 				console.log('rename error: ' + err);
	// 			} else {
	// 				imgData.url = "/tmp/" + inputFile.originalFilename;
	// 				imgData.name = inputFile.originalFilename;
	// 				ImgService.addImg(imgData, function(data) {
	// 					res.send(data);
	// 				});
	// 			}
	// 		});
	// 	}
	// });
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		var imgData = {
			movieId: fields.movieId[0],
			type: fields.type[0]
		}
		if (err) {
			console.log('parse error: ' + err);
		} else {
			var inputFile = files.file[0];
			var uploadedPath = inputFile.path;
			var dstPath = './public/tmp/' + inputFile.originalFilename;
			// //重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					imgData.url = "/tmp/" + inputFile.originalFilename;
					imgData.name = inputFile.originalFilename;
					ImgService.addImg(imgData, function(data) {
						res.send(data);
					});
				}
			});
		}
	});
});



router.post("/del", function(req, res) {
	var filepath = "./public/images/" + req.body.name;
	fs.unlink(filepath, function(err) {
		if (err) {
			throw err;
		}
		res.send({
			state: "ok"
		});
	})
});

module.exports = router;