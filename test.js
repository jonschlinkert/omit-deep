'use strict';

require('mocha');
var assert = require('assert');
var omitDeep = require('./');

describe('.omit()', function() {
  it('should recursively omit key passed as a string.', function() {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, 'b')
    assert.deepEqual(o, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit key passed as an array.', function() {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b'])
    assert.deepEqual(o, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit multiple keys.', function() {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b', 'd', 'f'])
    assert.deepEqual(o, {a: 'a', c: {e: {g: {c: 'c'}}}});
  });

  it('should omit the given keys.', function() {
    assert.deepEqual(omitDeep({a: 'a', b: 'b', c: 'c'}, ['a', 'c']), { b: 'b' });
  });

  it('should return the object if no keys are specified.', function() {
    assert.deepEqual(omitDeep({a: 'a', b: 'b', c: 'c'}), {a: 'a', b: 'b', c: 'c'});
  });

  it('should return an empty object if no object is specified.', function() {
    assert.deepEqual(omitDeep(), {});
  });

  it('should return the input unchaged if not an array or an object', function() {
    assert.deepEqual(omitDeep('foo'), 'foo');
  });

  it('should omit keys from objects in arrays', function() {
    var o = omitDeep([
      {a: 'a', b: 'b'},
      [
        {a: 'a', b: 'b'}
      ]
    ], 'b')
    assert.deepEqual(o, [
      {a: 'a'},
      [
        {a: 'a'}
      ]
    ]);
  });

  it('should preserve arrays when not omitting objects from them', function() {
    var o = omitDeep({
      "numbers": ["1", "2"]
    }, 'nothing')

    assert.deepEqual(o, {
      "numbers": ["1", "2"]
    });
  })
});
