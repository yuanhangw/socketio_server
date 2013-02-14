var io = require('socket.io').listen(parseInt(process.env.PORT))
  , i = 0


io.configure(function () {
  io.set("origins", "*:*");
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});


io.sockets.on('connection', function (socket) {
	console.log(">>>>>>client connected through socket");
  socket.emit('news', '>>>>>>server say hello to client', i);
  console.log('>>>>>>server say hello to client' +'['+i+']')
  socket.on('my other event', function (data) {
  	socket.emit('news', i);
  	i++;
  	console.log(data +'['+i+']');
  });
});