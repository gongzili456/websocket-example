/**
 * Created by liuguili on 7/8/15.
 */
const net = require('net');
const handShaked = require('./lib/handShaked');
const parseDataFrame = require('./lib/parseDataFrame');
const generataData = require('./lib/generateData');

const PORT = 8080;

const server = net.createServer(function(socket) {

  var isHandShaked = false;

  socket.on('data', function(data) {

    if (!isHandShaked) {
      var response = handShaked(data);
      console.log('response: \n', response);

      isHandShaked = true;
      socket.write(response, 'binary');
    } else {
      parseDataFrame(data);
      socket.write(generataData('Hello'));
    }
  });

});

server.listen(PORT, function() {
  console.log('server listening on', PORT);
});