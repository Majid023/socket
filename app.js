var app = require("http").createServer(handle);
var io = require("socket.io").listen(app);
var fs = require("fs");

app.listen(80);

function handle(req, res) {
 console.log("controller is entered app listen");
fs.readFile(__dirname+'/index.html',

 	function(err, data) {
		if(err){
			console.log("controller is entered err ");
			res.writeHead(500);
			return res.end("error loading index.html");
		}
		res.writeHead(200);
		res.end(data);
  	});
}

io.sockets.on("connection",function(socket) {
	console.log("The actual socket.id is: ",socket.id);

	socket.emit('news','Welcome to chart!');

	socket.on("send message", function(data){
		console.log(data+'send message');
		io.sockets.emit('new message', data);
	});
	socket.on('subscribe', function( data) {
		socket.join(data.room);
		console.log('ther are the rooms: ',io.sockets.adapter.rooms);

	});
















});