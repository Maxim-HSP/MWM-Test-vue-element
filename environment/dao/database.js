var mongoose = require('mongoose');

//打开 mongodb 连接
var dbURI = 'mongodb://localhost/maoyanApp';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});