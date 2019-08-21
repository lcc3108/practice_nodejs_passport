"use strict"

var utils = require("loader-utils")

module.exports = function(content) {
  this.cacheable && this.cacheable()
  var opt = utils.getOptions(this)
  return (opt.data || "") + content
}