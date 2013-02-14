var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , i = 0


io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 100);
});

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("socket server up and running");
});


function handler (req, res) {
  fs.readFile(__dirname + '/socket.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading socket.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	console.log(">>>>>> client connected through socket");
  socket.emit('news', '>>>>>>server say hello to client');
  socket.on('my other event', function (data) {
  	socket.emit('news', i);
  	i++;
  	console.log(data);
    console.log(i);
  });
});