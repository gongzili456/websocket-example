/**
 * Created by liuguili on 7/8/15.
 */


module.exports = function(data) {

  var offset = 0;

  /**
   * parse first byte, 8 bit
   * fin, rsv1-3, opcode
   */
  var first = data[offset++];

  const fin = first >> 7;

  const rsv1 = (first & 0x7F) >> 6;
  const rsv2 = (first & 0x3F) >> 5;
  const rsv3 = (first & 0x1F) >> 4;

  if (rsv1 !== 0 || rsv2 !== 0 || rsv3 !== 0) {
    console.log('RSV1-3: ', rsv1, rsv2, rsv3);
    return null;
  }

  const opcode = first & 0xF;

  /**
   * parse second byte, 8 bit
   * mask, payload length
   */
  const second = data[offset++];

  const mask = second >> 7;

  var payload_len = second & 0x7F;

  if (payload_len === 126) {
    payload_len = data.readUInt16BE(offset);
    offset += 2;
  } else if (payload_len === 127) {
    //read 64 bit to int
    payload_len = (data.readUInt32BE(offset) << 8) + data.readUInt32BE(offset + 4);
    offset += 8;
  }


  var mask_key = new Buffer(4);
  if (mask) {
    for (var i = 0; i < 4; i++) {
      mask_key.writeUInt8(data[offset++], i);
    }
  }

  var payload = new Buffer(payload_len);

  //TODO test 边界值
  for (var i = 0; i < payload_len; i++) {
    payload.writeUInt8(data[offset++] ^ mask_key[i % 4], i);
  }

  //console.log('payload: \n', payload.toString());

  var result = {
    fin: fin,
    opcode: opcode,
    mask: mask,
    mask_key: mask_key,
    payload_len: payload_len,
    payload: payload
  }

  console.log('data parse: \n', result);
  console.log('payload_str: ', payload.toString());

  return result;
}