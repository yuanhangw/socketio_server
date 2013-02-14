// Include http module.
var http = require("http");
var url = require("url");
// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {
   // Attach listener on end event.
   // This event is called when client sent all data and is waiting for response.
   request.on("end", function () {
      // Write headers to the response.
      // 200 is HTTP status code (this one means success)
      // Second parameter holds header fields in object
      // We are sending plain text, so Content-Type should be text/plain
      var _get = url.parse(request.url, true).query;
      response.writeHead(200, {
         'Content-Type': 'text/plain'
      });
      response.sendfile(__dirname + '/socket.html');      
      // Send data and end response.
      response.end('Hello HTTP!');
   });

 

// Listen on the 8080 port.
}).listen(8081);