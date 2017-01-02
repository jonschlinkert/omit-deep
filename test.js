'use strict';

var should = require('should');
var omitDeep = require('./');

describe('.omit()', function () {
  it('should recursively omit key passed as a string.', function () {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, 'b')
    o.should.eql({a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit key passed as an array.', function () {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b'])
    o.should.eql({a: 'a', c: {d: 'd', e: {f: 'f', g: {c: 'c'}}}});
  });

  it('should recursively omit multiple keys.', function () {
    var o = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: 'd', e: {b: 'b', f: 'f', g: {b: 'b', c: 'c'}}}}, ['b', 'd', 'f'])
    o.should.eql({a: 'a', c: {e: {g: {c: 'c'}}}});
  });

  it('should omit the given keys.', function () {
    omitDeep({a: 'a', b: 'b', c: 'c'}, ['a', 'c']).should.eql({ b: 'b' });
  });

  it('should return the object if no keys are specified.', function () {
    omitDeep({a: 'a', b: 'b', c: 'c'}).should.eql({a: 'a', b: 'b', c: 'c'});
  });

  it('should return an empty object if no object is specified.', function () {
    omitDeep().should.eql({});
  });

  it('should return the input unchaged if not an array or an object', function () {
    omitDeep('foo').should.eql('foo');
  });

  it('should omit keys from objects in arrays', function () {
    var o = omitDeep([
      {a: 'a', b: 'b'},
      [
        {a: 'a', b: 'b'}
      ]
    ], 'b')
    o.should.eql([
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

    o.should.eql({
      "numbers": ["1", "2"]
    });
  })
});
