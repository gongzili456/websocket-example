/**
 * Created by liuguili on 7/9/15.
 */

var str = 'abc';

var buf = new Buffer(str);
console.log('buf: ', buf, buf.length);

console.log(buf.toString('utf8'));


var arr_buf = new Buffer([1, 2, 3]);

console.log(arr_buf, arr_buf.toString('utf8'));


var fin = 1 << 7;

var rsv1 = 0x0 << 6,
  rsv2 = 0x0 << 5,
  rsv3 = 0x0 << 4;

var opcode = 0x1;

var payload = [];

payload.push(129);

console.log(new Buffer(payload)[0]);
console.log('fin: ', fin);
console.log('opcode: ', opcode);