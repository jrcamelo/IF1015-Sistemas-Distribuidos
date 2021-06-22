module.exports.serverMarshaller = function(status, result) {
  const buffer = Buffer.alloc(64)
  buffer.writeInt32BE(status)
  buffer.writeInt32BE(result, 32)
  return buffer
}

module.exports.clientMarshaller = function(operator, first, second) {
  const buffer = Buffer.alloc(72)
  buffer.writeInt8(operator)
  buffer.writeInt32BE(first, 8)
  buffer.writeInt32BE(second, 40)
  return buffer
}

module.exports.serverUnmarshaller = function(data) {
  if (data.length == 72) {
    return {
      operator: data.readInt8(),
      first:    data.readInt32BE(8),
      second:   data.readInt32BE(40),
    }
  }
  return null
}

module.exports.clientUnmarshaller = function(data) {
  if (data.length == 64) {
    return {
      status: data.readInt32BE(),
      result: data.readInt32BE(32),
    }
  }
  return null
}