bin = require '../lib/packed'
assert = require 'assert'

domain_string = {
  unpack: (buffer) ->
    o = @byte_offset
    str = (while (len = buffer.readUInt8(o)) isnt 0
      buffer.slice(o + 1, o += 1 + len).toString('ascii')
    ).join('.')
    [str, o + 1]
  pack: (buffer, value) ->
    o = @byte_offset
    for v in value.split('.')
      buffer.writeUInt8(v.length, o++)
      new Buffer(v, 'ascii').copy(buffer, o)
      o += v.length
    buffer.writeUInt8(0, o)
    [o + 1]
}

request_struct = bin
  qid: bin.uint16
  flags:
    qr: bin.bits(1)
    opcode: bin.bits(4)
    aa: bin.bits(1)
    tc: bin.bits(1)
    rd: bin.bits(1)
    ra: bin.bits(1)
    z: bin.bits(3)
    rcode: bin.bits(4)
  qcount: bin.uint16
  acount: bin.uint16
  auth_count: bin.uint16
  addl_count: bin.uint16
  domain: domain_string
  qtype: bin.uint16
  qclass: bin.uint16

buffer = new Buffer([148,153,1,0,0,1,0,0,0,0,0,0,4,115,121,110,99,9,112,97,103,101,108,101,118,101,114,3,100,101,118,0,0,1,0,1])

data = request_struct.unpack(buffer)
console.log data
new_buffer = request_struct.pack(data)
console.log buffer
console.log new_buffer
assert.deepEqual(buffer, new_buffer)
console.log request_struct.unpack(new_buffer)
