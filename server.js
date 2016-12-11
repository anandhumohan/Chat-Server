var express = require("express");
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

//maining two arrays for users and connections

user = [];
connections = [];
server.listen(process.env.port || 3000);
console.log("server runnning");
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});