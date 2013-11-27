(function() {
  var Binary, Packer, Unpacker, binary;

  Binary = (function() {

    Binary.Int8 = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readInt8(this.byte_offset), this.byte_offset + 1];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeInt8(value, this.byte_offset);
          }
          return [this.byte_offset + 1];
        }
      };
    };

    Binary.Int16 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readInt16' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeInt16' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.Int16BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readInt16BE(this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeInt16BE(value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.Int16LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readInt16LE(this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeInt16LE(value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.Int32 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readInt32' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeInt32' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.Int32BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readInt32BE(this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeInt32BE(value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.Int32LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readInt32LE(this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeInt32LE(value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.Int64 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readDouble' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeDouble' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.Int64BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readDoubleBE(this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeDoubleBE(value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.Int64LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readDoubleLE(this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeDoubleLE(value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.UInt8 = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readUInt8(this.byte_offset), this.byte_offset + 1];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeUInt8(value, this.byte_offset);
          }
          return [this.byte_offset + 1];
        }
      };
    };

    Binary.UInt16 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readUInt16' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeUInt16' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.UInt16BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readUInt16BE(this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeUInt16BE(value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.UInt16LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readUInt16LE(this.byte_offset), this.byte_offset + 2];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeUInt16LE(value, this.byte_offset);
          }
          return [this.byte_offset + 2];
        }
      };
    };

    Binary.UInt32 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readUInt32' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeUInt32' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.UInt32BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readUInt32BE(this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeUInt32BE(value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.UInt32LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readUInt32LE(this.byte_offset), this.byte_offset + 4];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeUInt32LE(value, this.byte_offset);
          }
          return [this.byte_offset + 4];
        }
      };
    };

    Binary.UInt64 = function() {
      return {
        unpack: function(buffer) {
          return [buffer['readDouble' + this.default_byte_order.toUpperCase()](this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer['writeDouble' + this.default_byte_order.toUpperCase()](value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.UInt64BE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readDoubleBE(this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeDoubleBE(value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.UInt64LE = function() {
      return {
        unpack: function(buffer) {
          return [buffer.readDoubleLE(this.byte_offset), this.byte_offset + 8];
        },
        pack: function(buffer, value) {
          if (value != null) {
            buffer.writeDoubleLE(value, this.byte_offset);
          }
          return [this.byte_offset + 8];
        }
      };
    };

    Binary.Bits = function(num) {
      return {
        unpack: function(buffer) {
          var byte, s;
          byte = buffer.readUInt8(this.byte_offset);
          s = 7 - (this.bit_offset + num - 1);
          byte = byte >>> s;
          return [byte & ~(0xff << num), this.byte_offset, this.bit_offset + num];
        },
        pack: function(buffer, value) {
          var byte;
          if (value != null) {
            byte = buffer.readUInt8(this.byte_offset);
            byte = byte | (value << (7 - this.bit_offset));
            buffer.writeUInt8(byte, this.byte_offset);
          }
          return [this.byte_offset, this.bit_offset + num];
        }
      };
    };

    Binary.String = function(encoding) {
      if (encoding == null) {
        encoding = 'ascii';
      }
      return {
        unpack: function(buffer) {
          var o;
          o = this.byte_offset;
          while (buffer[o] !== 0) {
            ++o;
          }
          return [buffer.slice(this.byte_offset, o).toString(encoding), o + 1];
        },
        pack: function(buffer, value) {
          var b;
          if (value != null) {
            b = new Buffer(value, encoding);
            b.copy(buffer, this.byte_offset, 0, b.length);
            buffer.writeUInt8(0, this.byte_offset + value.length);
          }
          return [this.byte_offset + value.length + 1];
        }
      };
    };

    function Binary(fields) {
      this.fields = fields;
      this.default_byte_order = 'BE';
    }

    Binary.prototype.unpack = function(buffer) {
      return new Unpacker({
        fields: this.fields,
        default_byte_order: this.default_byte_order
      }).unpack(buffer);
    };

    Binary.prototype.pack = function(data, buffer) {
      if (data != null) {
        return new Packer({
          fields: this.fields,
          default_byte_order: this.default_byte_order
        }).pack(data, buffer);
      }
    };

    return Binary;

  })();

  Unpacker = (function() {

    function Unpacker(b) {
      var k, v;
      for (k in b) {
        v = b[k];
        this[k] = v;
      }
      this.bit_offset = this.byte_offset = 0;
    }

    Unpacker.prototype.unpack = function(buffer) {
      var bit_offset, field, name, offset, struct, sub_unpacker, unpacked, _ref, _ref1;
      unpacked = {};
      offset = 0;
      _ref = this.fields;
      for (name in _ref) {
        field = _ref[name];
        if (field.unpack && typeof field.unpack === 'function') {
          _ref1 = field.unpack.call(this, buffer), unpacked[name] = _ref1[0], this.byte_offset = _ref1[1], bit_offset = _ref1[2];
          if (bit_offset != null) {
            this.byte_offset += parseInt(bit_offset / 8);
            this.bit_offset = bit_offset % 8;
          }
        } else {
          struct = new Binary(field);
          sub_unpacker = new Unpacker({
            fields: struct.fields,
            default_byte_order: struct.default_byte_order
          });
          sub_unpacker.bit_offset = this.bit_offset;
          sub_unpacker.byte_offset = this.byte_offset;
          sub_unpacker.default_byte_order = this.default_byte_order;
          unpacked[name] = sub_unpacker.unpack(buffer);
          this.bit_offset = sub_unpacker.bit_offset;
          this.byte_offset = sub_unpacker.byte_offset;
        }
      }
      return unpacked;
    };

    return Unpacker;

  })();

  Packer = (function() {

    function Packer(b) {
      var k, v;
      for (k in b) {
        v = b[k];
        this[k] = v;
      }
      this.bit_offset = this.byte_offset = 0;
    }

    Packer.prototype.pack = function(data, use_this_buffer) {
      var bit_offset, buffer, field, name, struct, sub_buffer, sub_packer, _ref, _ref1;
      buffer = use_this_buffer || new Buffer(1024);
      if (use_this_buffer == null) {
        buffer.fill(0);
      }
      _ref = this.fields;
      for (name in _ref) {
        field = _ref[name];
        if (field.pack && typeof field.pack === 'function') {
          _ref1 = field.pack.call(this, buffer, data != null ? data[name] : void 0), this.byte_offset = _ref1[0], bit_offset = _ref1[1];
          if (bit_offset != null) {
            if (bit_offset >= 8) {
              this.byte_offset += parseInt(bit_offset / 8);
            }
            this.bit_offset = bit_offset % 8;
          }
        } else {
          struct = new Binary(field);
          sub_packer = new Packer({
            fields: struct.fields,
            default_byte_order: struct.default_byte_order
          });
          sub_packer.bit_offset = this.bit_offset;
          sub_packer.byte_offset = this.byte_offset;
          sub_packer.default_byte_order = this.default_byte_order;
          sub_buffer = sub_packer.pack(data[name], buffer);
          this.bit_offset = sub_packer.bit_offset;
          this.byte_offset = sub_packer.byte_offset;
        }
      }
      if (use_this_buffer == null) {
        return buffer.slice(0, this.byte_offset);
      }
      return this.byte_offset;
    };

    return Packer;

  })();

  binary = function(fields) {
    return new Binary(fields);
  };

  binary.__defineGetter__('int8', function() {
    return Binary.Int8();
  });

  binary.__defineGetter__('int16', function() {
    return Binary.Int16();
  });

  binary.__defineGetter__('int16be', function() {
    return Binary.Int16BE();
  });

  binary.__defineGetter__('int16le', function() {
    return Binary.Int16LE();
  });

  binary.__defineGetter__('int16n', function() {
    return Binary.Int16BE();
  });

  binary.__defineGetter__('int32', function() {
    return Binary.Int32();
  });

  binary.__defineGetter__('int32be', function() {
    return Binary.Int32BE();
  });

  binary.__defineGetter__('int32le', function() {
    return Binary.Int32LE();
  });

  binary.__defineGetter__('int32n', function() {
    return Binary.Int32BE();
  });

  binary.__defineGetter__('int64', function() {
    return Binary.Int64();
  });

  binary.__defineGetter__('int64be', function() {
    return Binary.Int64BE();
  });

  binary.__defineGetter__('int64le', function() {
    return Binary.Int64LE();
  });

  binary.__defineGetter__('int64n', function() {
    return Binary.Int64BE();
  });

  binary.__defineGetter__('uint8', function() {
    return Binary.UInt8();
  });

  binary.__defineGetter__('uint16', function() {
    return Binary.UInt16();
  });

  binary.__defineGetter__('uint16be', function() {
    return Binary.UInt16BE();
  });

  binary.__defineGetter__('uint16le', function() {
    return Binary.UInt16LE();
  });

  binary.__defineGetter__('uint16n', function() {
    return Binary.UInt16BE();
  });

  binary.__defineGetter__('uint32', function() {
    return Binary.UInt32();
  });

  binary.__defineGetter__('uint32be', function() {
    return Binary.UInt32BE();
  });

  binary.__defineGetter__('uint32le', function() {
    return Binary.UInt32LE();
  });

  binary.__defineGetter__('uint32n', function() {
    return Binary.UInt32BE();
  });

  binary.__defineGetter__('uint64', function() {
    return Binary.UInt64();
  });

  binary.__defineGetter__('uint64be', function() {
    return Binary.UInt64BE();
  });

  binary.__defineGetter__('uint64le', function() {
    return Binary.UInt64LE();
  });

  binary.__defineGetter__('uint64n', function() {
    return Binary.UInt64BE();
  });

  binary.__defineGetter__('string', function() {
    return Binary.String();
  });

  binary.bits = Binary.Bits;

  module.exports = binary;

}).call(this);
