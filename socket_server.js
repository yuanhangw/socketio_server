var io = require('socket.io').listen(parseInt(process.env.PORT||5000));
var i = 0;
var usernames = {};

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {

	socket.on('add_user', function(user_name){
		console.log('add user');
		socket.name = user_name;
		usernames[user_name] = user_name; 
		io.sockets.emit('updateusers', usernames);
	});

		socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
	
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  // 	socket.emit('news', i);
  //   console.log(data);
  //   i++;
  // });
});