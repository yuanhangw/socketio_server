var io = require('socket.io').listen(parseInt(process.env.PORT||5000));
var i = 0;
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  	socket.emit('news', i);
    console.log(data);
    i++;
  });
});