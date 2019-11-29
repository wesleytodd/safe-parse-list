'use strict'

module.exports = function safeParseList (str, options) {
  if (typeof str !== 'string') {
    return str
  }
  var opts = options || {}
  var whitespace = (opts.whitespace ? opts.whitespace : [' ', '\t']).map(function (s) {
    return s.charCodeAt(0)
  })
  var delimiters = (opts.delimiters ? opts.delimiters : [',']).map(function (s) {
    return s.charCodeAt(0)
  })

  var list = []
  var end = 0
  var start = 0

  for (var i = 0, len = str.length; i < len; i++) {
    var charCode = str.charCodeAt(i)
    if (whitespace.includes(charCode)) {
      if (start === end) {
        start = end = i + 1
      }
    } else if (delimiters.includes(charCode)) {
      var s = str.substring(start, end)
      s && list.push(s)
      start = end = i + 1
    } else {
      end = i + 1
    }
  }

  // Last item
  var ss = str.substring(start, end)
  ss && list.push(ss)

  return list
}
