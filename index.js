var express = require('express');
var pg = require('pg');
var dotenv = require('dotenv');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	dotenv.load();
	var events = [];
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {

		var handleError = function(err) {
			if(!err) return false;
			done(client);
			next(err);
			return true;
		};

		client.query('SELECT * FROM events', function(err, result) {
			events = result.rows;
			done();
			if(err) return console.error(err);
			response.render('pages/index',{t:events,events_view:events});
		});
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});




