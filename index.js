'use strict';

var isObject = require('is-plain-object');
var forOwn = require('for-own');
var omit = require('omit-keys');

module.exports = function omitDeep(value, props) {
  if (typeof value === 'undefined') {
    return {};
  }

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = omitDeep(value[i], props);
    }
    return value;
  }

  if (Array.isArray(value)) {
    return omitDeep(value, props);
  }

  if (!isObject(value)) {
    return value;
  }

  var o = {};
  forOwn(value, function (val, key) {
    o[key] = omitDeep(val, props);
  });

  return omit(o, props);
};
