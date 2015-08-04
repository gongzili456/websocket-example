/**
 * Created by liuguili on 7/8/15.
 */
const crypto = require('crypto');

module.exports = function(data) {

  return parseHeader(data);

};


function parseHeader(data) {
  var headers = data.toString('binary').split('\r\n');
  console.log('request: \n', headers.join('\r\n'));

  var hs = {};
  headers.forEach(function(header) {
    var kv = header.split(':');

    if(kv.length > 1) {
      hs[kv[0].toLowerCase().trim()] = kv[1].trim();
    }

  });

  var response = [];

  if ('sec-websocket-key' in hs) {
    var ws_key = hs['sec-websocket-key'];
    var encode_key = encodingKey(ws_key);

    response.push('HTTP/1.1 101 Switching Protocols');
    response.push('Sec-WebSocket-Accept: ' + encode_key);
    response.push('Upgrade: websocket');
    response.push('Connection: Upgrade');
    response.push('\r\n');
  }
  return response.join('\r\n');
}

function encodingKey(key) {
  var salt = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  var sha1 = crypto.createHash('sha1');
  var magic = key.trim() + salt;
  var encoded = sha1.update(magic).digest('base64');

  return encoded;
}