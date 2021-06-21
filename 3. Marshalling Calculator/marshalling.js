module.exports.serverMarshaller = function(status, result) {
  const buffer = Buffer.allocUnsafe(128)
  buffer.write(status.toString())
  buffer.write(result.toString(), 64)
  return buffer
}

module.exports.clientMarshaller = function(operator, first, second) {
  const buffer = Buffer.allocUnsafe(192)
  buffer.write(operator.toString())
  buffer.write(first.toString(), 64)
  buffer.write(second.toString(), 128)
  return buffer
}

module.exports.serverUnmarshaller = function(data) {
  if (data.length == 192) {
    return {
      operator: parseInt(data.slice(0, 64)),
      first:    parseInt(data.slice(64, 128)),
      second:   parseInt(data.slice(128))
    }
  }
  return null
}

module.exports.clientUnmarshaller = function(data) {
  if (data.length == 128) {
    return {
      status: parseInt(data.slice(0, 64)),
      result: parseInt(data.slice(64)),
    }
  }
  return null
}