var express = require("express");
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

//maining two arrays for users and connections

users = {};
connections = [];
server.listen(process.env.port || 3000);
console.log("server runnning");
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

//open a connection with socket.io
io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log("connection created");

	


	socket.on('send message',function(data){
		var msg = data.trim();
		if(msg.substr(0,1) === '@'){
			msg = msg.substr(1);
			var index = msg.indexOf(' ');
			if(index !== -1){
				var name = msg.substring(0,index); 
				var msg = msg.substring(index + 1);
				if(name in users){
					users[name].emit('new again',{msg:msg});
				}
			}
			else{
				callback("format error");
			}
		}
		else{
		io.sockets.emit('new message',{msg:msg});
		}
	});

	socket.on('new user',function(data, callback){
	//io.sockets.emit('new user',{msg:data});
	//callback(true);
	//socket.username = data;
	//users.push(socket.username);
	if(data in users){
		callback(false);
	}
	else{
		callback(true);
		socket.username = data;
		users[socket.username] = socket;
		updateUser();
	}
	 

	});
	function updateUser(){
		io.sockets.emit('get users',Object.keys(users));
	}

});