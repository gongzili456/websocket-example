/**
 * Created by liuguili on 7/9/15.
 */


/**
 * server send to client data don't need masking payload & mask key.
 * @param data
 * @returns {Buffer}
 */
module.exports = function(data) {

  console.log('generate data')
  /**
   * 暂时只支持String类型数据
   */
  if (typeof data !== 'string') {
    return new Buffer(0);
  }

  var fin = 1 << 7;

  var rsv1 = 0x0 << 6,
      rsv2 = 0x0 << 5,
      rsv3 = 0x0 << 4;

  var opcode = 0x1;

  var payload_buf = new Buffer(data);

  var payload_len = payload_buf.length;

  var mask = 0x0 << 7;


  var mask_key = new Buffer(4);

  /**
   * generate random number 0 - 254 for each byte in mask_key
   */
//  for (var i = 0; i < mask_key.length; i++) {
//    mask_key[i] = Math.floor(Math.random() * (254 - 0 + 1) + 0);
//  }
//
//console.log('mask key: ', mask_key);
//  var payload = new Buffer(payload_len);

  /**
   * masking payload
   */
  //for (var i = 0; i < payload_len; i++) {
  //  payload.writeUInt8(payload_buf[i] & mask_key[i % 4], i);
  //}

//console.log('payload: ', payload_buf)
  /**
   * load data
   * @type {Array}
   */
  var arr = []

  arr.push(fin + rsv1 + rsv2 + rsv3 + opcode);

  if (payload_len <= 255) {
    arr.push(mask + payload_len);
  } else if (payload_len > 255 && payload_len < 65535) {
    arr.push(mask + 126);
    arr.push(255);
    arr.push(255);
  } else if (payload_len > 65535) {
    for(var i = 0; i < 8; i++) {
      arr.push(255);
    }
  }

  //add mask key
  //for (var i = 0; i < mask_key.length; i++) {
  //  arr.push(mask_key[i]);
  //}

  //add payload
  for (var i = 0; i < payload_len; i++) {
    arr.push(payload_buf[i]);
  }

  //console.log(new Buffer(arr));

  return new Buffer(arr);

}