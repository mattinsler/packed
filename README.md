# packed

Binary Buffer parsing and packing that feels a little like C structs

## Installation
```
npm install packed
```

## Usage

```javascript
var packed = require('packed');

// Create structure - from http://en.wikipedia.org/wiki/Transmission_Control_Protocol
var TcpHeaderStruct = packed({
  source_port: packed.uint16n,
  dest_port: packed.uint16n,
  sequence_number: packed.uint32n,
  ack_number: packed.uint32n,
  data_offset: packed.bits(4),
  reserved: packed.bits(3),
  control: {
    NS: packed.bits(1),
    CWR: packed.bits(1),
    ECE: packed.bits(1),
    URG: packed.bits(1),
    ACK: packed.bits(1),
    PSH: packed.bits(1),
    RST: packed.bits(1),
    SYN: packed.bits(1),
    FIN: packed.bits(1)
  },
  window_size: packed.uint16n,
  checksum: packed.uint16n,
  urgent_pointer: packed.uint16n
});

var original = {
  source_port: 13076,
  dest_port: 44112,
  sequence_number: 3322114,
  ack_number: 3322113,
  data_offset: 0x7,
  // reserved: -- auto-filled with zeros
  control: {
    NS: 0,
    CWR: 1,
    ECE: 0,
    URG: 0,
    ACK: 1,
    PSH: 0,
    RST: 0,
    SYN: 1,
    FIN: 0
  },
  window_size: 4096,
  checksum: 33412,
  urgent_pointer: 0
};

// Pack data into a buffer that you can send ... anywhere
var buffer = TcpHeaderStruct.pack(original);
// Unpack the buffer back into an object
var data = TcpHeaderStruct.unpack(buffer);

assert.deepEqual(data, original);
```

## Methods

#### packed(structure_object)
Create a packed instance

## Properties

#### packed.default_byte_order (defaults as 'BE')
Default byte order for field helpers without a suffix. Either 'BE', 'LE', or 'N' for big-endian, little-endian, or network.

## Instance Methods

#### struct.pack(object)
Pack an object into a Buffer

#### struct.unpack(buffer)
Unpack a buffer into the struct

## Structure Field Helpers

### Signed Integers

#### packed.int8
8-bit integer (default byte order)
#### packed.int16
16-bit integer (default byte order)
#### packed.int16be
16-bit integer big-endian
#### packed.int16le
16-bit integer little-endian
#### packed.int16n
16-bit integer network order
#### packed.int32
32-bit integer (default byte order)
#### packed.int32be
32-bit integer big-endian
#### packed.int32le
32-bit integer little-endian
#### packed.int32n
32-bit integer network order
#### packed.int64
64-bit integer (default byte order)
#### packed.int64be
64-bit integer big-endian
#### packed.int64le
64-bit integer little-endian
#### packed.int64n
64-bit integer network order

### Unsigned Integers

#### packed.uint8
8-bit unsigned integer (default byte order)
#### packed.uint16
16-bit unsigned integer (default byte order)
#### packed.uint16be
16-bit unsigned integer big-endian
#### packed.uint16le
16-bit unsigned integer little-endian
#### packed.uint16n
16-bit unsigned integer network order
#### packed.uint32
32-bit unsigned integer (default byte order)
#### packed.uint32be
32-bit unsigned integer big-endian
#### packed.uint32le
32-bit unsigned integer little-endian
#### packed.uint32n
32-bit unsigned integer network order
#### packed.uint64
64-bit unsigned integer (default byte order)
#### packed.uint64be
64-bit unsigned integer big-endian
#### packed.uint64le
64-bit unsigned integer little-endian
#### packed.uint64n
64-bit unsigned integer network order

### Other

#### packed.string
Zero terminated String
#### packed.bits(number_of_bits)
Unsigned bits of variable length

## License
Copyright (c) 2013 Matt Insler  
Licensed under the MIT license.
