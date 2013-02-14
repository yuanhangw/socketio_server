var io = require('socket.io').listen(parseInt(process.env.PORT||5000));

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});