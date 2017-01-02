'use strict';

require('mocha');
var assert = require('assert');
var omitDeep = require('./');

describe('.omit()', function() {
  it('should return the object if it is not a plain object', function() {
    var date = new Date();
    var obj = omitDeep(date, 'foo');
    assert(obj === date);
    assert.deepEqual(obj, date);
  });

  it('should return the value if it is not a plain object', function() {
    assert.deepEqual(omitDeep('foo'), 'foo');
    assert.deepEqual(omitDeep(42), 42);
  });

  it('should omit keys using dot notation', function() {
    var obj = omitDeep({a: {b: {c: {d: {e: 'e'}, f: {g: 'g'}}}}}, 'a.b.c.d');
    assert.deepEqual(obj, {a: {b: {c: {f: {g: 'g'}}}}});
  });

  it('should omit multiple keys using dot notation', function() {
    var obj = omitDeep({a: {x: 'y', b: {c: {d: {e: 'e'}, f: {g: 'g'}}}}}, ['a.b.c.d', 'a.x']);
    assert.deepEqual(obj, {a: {b: {c: {f: {g: 'g'}}}}});
  });

  it('should recursively omit key passed as a string.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, 'b');
    assert.deepEqual(obj, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit key passed as an array.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b']);
    assert.deepEqual(obj, {a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit multiple keys.', function() {
    var obj = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b', 'd', 'f']);
    assert.deepEqual(obj, {a: 'a', c: {e: {g: {c: 'c'}}}});
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
    var obj = omitDeep([
      {a: 'a', b: 'b'},
      [
        {a: 'a', b: 'b'}
      ]
    ], 'b');
    assert.deepEqual(obj, [
      {a: 'a'},
      [
        {a: 'a'}
      ]
    ]);
  });

  it('should preserve arrays when not omitting objects from them', function() {
    var obj = omitDeep({
      'numbers': ['1', '2']
    }, 'nothing');

    assert.deepEqual(obj, {
      'numbers': ['1', '2']
    });
  });
});
