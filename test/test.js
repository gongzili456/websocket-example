/**
 * Created by liuguili on 7/9/15.
 */

var gen = require('../lib/generateData');
var par = require('../lib/parseDataFrame');

var d = gen('Hello');

var res = par(d);

console.log('res :\n', res);