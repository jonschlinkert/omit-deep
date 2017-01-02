'use strict';

var isObject = require('is-plain-object');
var forOwn = require('for-own');
var omit = require('omit-keys');

module.exports = function omitDeep(value, keys) {
  if (typeof value === 'undefined') {
    return {};
  }

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = omitDeep(value[i], keys);
    }
    return value;
  }

  if (!isObject(value)) {
    return value;
  }

  if (typeof keys === 'string') {
    keys = [keys];
  }

  if (!Array.isArray(keys)) {
    return value;
  }

  var o = {};
  forOwn(value, function (val, key) {
    o[key] = omitDeep(val, keys);
  });

  return omit(o, keys);
};
