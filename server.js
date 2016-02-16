var express = require('express');
var http = require('http');
var reload = require('reload');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

if(process.env.NODE_ENV === 'development') {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
}

var io = require('socket.io')(server)
io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	console.log('new user connected');
	socket.on('event', function(data){});
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

reload(server, app, 450);

server.listen(3000, function() {
	console.log('express on port 3000')
});