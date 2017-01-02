'use strict';

var isObject = require('isobject');
var isArray = require('isarray')
var forOwn = require('for-own');
var omit = require('omit-keys');


module.exports = function omitDeep(input, props) {
  function omitDeepOnOwnProps(obj) {
    if (!isArray(obj) && !isObject(obj)) {
      return obj;
    }

    if (isArray(obj)) {
      return omitDeep(obj, props);
    }

    var o = {};
    forOwn(obj, function (value, key) {
      o[key] = omitDeep(value, props);
    });
    return omit(o, props);
  }

  if (typeof input === 'undefined') {
    return {};
  }

  if (isArray(input)) {
    return input.map(omitDeepOnOwnProps);
  }

  return omitDeepOnOwnProps(input);
};
