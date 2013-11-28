class Binary
  @Int8: -> {
    unpack: (buffer) -> [buffer.readInt8(@byte_offset), @byte_offset + 1]
    pack: (buffer, value) -> buffer.writeInt8(value, @byte_offset) if value?; [@byte_offset + 1]
  }
  @Int16: -> {
    unpack: (buffer) -> [buffer['readInt16' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer['writeInt16' + @default_byte_order.toUpperCase()](value, @byte_offset)  if value?; [@byte_offset + 2]
  }
  @Int16BE: -> {
    unpack: (buffer) -> [buffer.readInt16BE(@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer.writeInt16BE(value, @byte_offset) if value?; [@byte_offset + 2]
  }
  @Int16LE: -> {
    unpack: (buffer) -> [buffer.readInt16LE(@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer.writeInt16LE(value, @byte_offset) if value?; [@byte_offset + 2]
  }
  @Int32: -> {
    unpack: (buffer) -> [buffer['readInt32' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer['writeInt32' + @default_byte_order.toUpperCase()](value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @Int32BE: -> {
    unpack: (buffer) -> [buffer.readInt32BE(@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer.writeInt32BE(value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @Int32LE: -> {
    unpack: (buffer) -> [buffer.readInt32LE(@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer.writeInt32LE(value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @Int64: -> {
    unpack: (buffer) -> [buffer['readDouble' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer['writeDouble' + @default_byte_order.toUpperCase()](value, @byte_offset) if value?; [@byte_offset + 8]
  }
  @Int64BE: -> {
    unpack: (buffer) -> [buffer.readDoubleBE(@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer.writeDoubleBE(value, @byte_offset) if value?; [@byte_offset + 8]
  }
  @Int64LE: -> {
    unpack: (buffer) -> [buffer.readDoubleLE(@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer.writeDoubleLE(value, @byte_offset) if value?; [@byte_offset + 8]
  }

  @UInt8: -> {
    unpack: (buffer) -> [buffer.readUInt8(@byte_offset), @byte_offset + 1]
    pack: (buffer, value) -> buffer.writeUInt8(value, @byte_offset) if value?; [@byte_offset + 1]
  }
  @UInt16: -> {
    unpack: (buffer) -> [buffer['readUInt16' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer['writeUInt16' + @default_byte_order.toUpperCase()](value, @byte_offset)  if value?; [@byte_offset + 2]
  }
  @UInt16BE: -> {
    unpack: (buffer) -> [buffer.readUInt16BE(@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer.writeUInt16BE(value, @byte_offset) if value?; [@byte_offset + 2]
  }
  @UInt16LE: -> {
    unpack: (buffer) -> [buffer.readUInt16LE(@byte_offset), @byte_offset + 2]
    pack: (buffer, value) -> buffer.writeUInt16LE(value, @byte_offset) if value?; [@byte_offset + 2]
  }
  @UInt32: -> {
    unpack: (buffer) -> [buffer['readUInt32' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer['writeUInt32' + @default_byte_order.toUpperCase()](value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @UInt32BE: -> {
    unpack: (buffer) -> [buffer.readUInt32BE(@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer.writeUInt32BE(value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @UInt32LE: -> {
    unpack: (buffer) -> [buffer.readUInt32LE(@byte_offset), @byte_offset + 4]
    pack: (buffer, value) -> buffer.writeUInt32LE(value, @byte_offset) if value?; [@byte_offset + 4]
  }
  @UInt64: -> {
    unpack: (buffer) -> [buffer['readDouble' + @default_byte_order.toUpperCase()](@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer['writeDouble' + @default_byte_order.toUpperCase()](value, @byte_offset) if value?; [@byte_offset + 8]
  }
  @UInt64BE: -> {
    unpack: (buffer) -> [buffer.readDoubleBE(@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer.writeDoubleBE(value, @byte_offset) if value?; [@byte_offset + 8]
  }
  @UInt64LE: -> {
    unpack: (buffer) -> [buffer.readDoubleLE(@byte_offset), @byte_offset + 8]
    pack: (buffer, value) -> buffer.writeDoubleLE(value, @byte_offset) if value?; [@byte_offset + 8]
  }

  @Bits: (num) -> {
    unpack: (buffer) ->
      byte = buffer.readUInt8(@byte_offset)
      s = 7 - (@bit_offset + num - 1)
      byte = byte >>> s
      [byte & ~(0xff << num), @byte_offset, @bit_offset + num]
    pack: (buffer, value) ->
      if value?
        byte = buffer.readUInt8(@byte_offset)
        byte = byte | (value << (7 - @bit_offset))
        buffer.writeUInt8(byte, @byte_offset)
      [@byte_offset, @bit_offset + num]
  }

  @String: (encoding = 'ascii') -> {
    unpack: (buffer) ->
      o = @byte_offset
      ++o while buffer[o] isnt 0
      [buffer.slice(@byte_offset, o).toString(encoding), o + 1]
    pack: (buffer, value) ->
      if value?
        b = new Buffer(value, encoding)
        b.copy(buffer, @byte_offset, 0, b.length)
        buffer.writeUInt8(0, @byte_offset + value.length)
      [@byte_offset + value.length + 1]
  }

  constructor: (@fields) ->
    @default_byte_order = 'BE'

  unpack: (buffer) ->
    new Unpacker(fields: @fields, default_byte_order: @default_byte_order).unpack(buffer)

  pack: (data, buffer) ->
    new Packer(fields: @fields, default_byte_order: @default_byte_order).pack(data, buffer) if data?

class Unpacker
  constructor: (b) ->
    @[k] = v for k, v of b
    @bit_offset = @byte_offset = 0

  unpack: (buffer) ->
    unpacked = {}

    offset = 0
    for name, field of @fields
      if field.unpack and typeof field.unpack is 'function'
        [unpacked[name], @byte_offset, bit_offset] = field.unpack.call(@, buffer)
        if bit_offset?
          @byte_offset += parseInt(bit_offset / 8)
          @bit_offset = bit_offset % 8
      else
        struct = new Binary(field)
        sub_unpacker = new Unpacker(fields: struct.fields, default_byte_order: struct.default_byte_order)
        sub_unpacker.bit_offset = @bit_offset
        sub_unpacker.byte_offset = @byte_offset
        sub_unpacker.default_byte_order = @default_byte_order
        unpacked[name] = sub_unpacker.unpack(buffer)
        @bit_offset = sub_unpacker.bit_offset
        @byte_offset = sub_unpacker.byte_offset

    unpacked


class Packer
  constructor: (b) ->
    @[k] = v for k, v of b
    @bit_offset = @byte_offset = 0

  pack: (data, use_this_buffer) ->
    buffer = use_this_buffer or new Buffer(1024)
    buffer.fill(0) unless use_this_buffer?

    for name, field of @fields
      if field.pack and typeof field.pack is 'function'
        [@byte_offset, bit_offset] = field.pack.call(@, buffer, data?[name])
        if bit_offset?
          @byte_offset += parseInt(bit_offset / 8) if bit_offset >= 8
          @bit_offset = bit_offset % 8
      else
        struct = new Binary(field)
        sub_packer = new Packer(fields: struct.fields, default_byte_order: struct.default_byte_order)
        sub_packer.bit_offset = @bit_offset
        sub_packer.byte_offset = @byte_offset
        sub_packer.default_byte_order = @default_byte_order
        sub_buffer = sub_packer.pack(data[name], buffer)
        @bit_offset = sub_packer.bit_offset
        @byte_offset = sub_packer.byte_offset

    return buffer.slice(0, @byte_offset) unless use_this_buffer?
    return @byte_offset

binary = (fields) ->
  new Binary(fields)

binary.__defineGetter__ 'int8', -> Binary.Int8()
binary.__defineGetter__ 'int16', -> Binary.Int16()
binary.__defineGetter__ 'int16be', -> Binary.Int16BE()
binary.__defineGetter__ 'int16le', -> Binary.Int16LE()
binary.__defineGetter__ 'int16n', -> Binary.Int16BE()
binary.__defineGetter__ 'int32', -> Binary.Int32()
binary.__defineGetter__ 'int32be', -> Binary.Int32BE()
binary.__defineGetter__ 'int32le', -> Binary.Int32LE()
binary.__defineGetter__ 'int32n', -> Binary.Int32BE()
binary.__defineGetter__ 'int64', -> Binary.Int64()
binary.__defineGetter__ 'int64be', -> Binary.Int64BE()
binary.__defineGetter__ 'int64le', -> Binary.Int64LE()
binary.__defineGetter__ 'int64n', -> Binary.Int64BE()

binary.__defineGetter__ 'uint8', -> Binary.UInt8()
binary.__defineGetter__ 'uint16', -> Binary.UInt16()
binary.__defineGetter__ 'uint16be', -> Binary.UInt16BE()
binary.__defineGetter__ 'uint16le', -> Binary.UInt16LE()
binary.__defineGetter__ 'uint16n', -> Binary.UInt16BE()
binary.__defineGetter__ 'uint32', -> Binary.UInt32()
binary.__defineGetter__ 'uint32be', -> Binary.UInt32BE()
binary.__defineGetter__ 'uint32le', -> Binary.UInt32LE()
binary.__defineGetter__ 'uint32n', -> Binary.UInt32BE()
binary.__defineGetter__ 'uint64', -> Binary.UInt64()
binary.__defineGetter__ 'uint64be', -> Binary.UInt64BE()
binary.__defineGetter__ 'uint64le', -> Binary.UInt64LE()
binary.__defineGetter__ 'uint64n', -> Binary.UInt64BE()

binary.__defineGetter__ 'string', -> Binary.String()
binary.bits = Binary.Bits

module.exports = binary
