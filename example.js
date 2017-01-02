var omitDeep = require('./');
var res = omitDeep({a: 'a', b: 'b', c: {b: 'b', d: {b: 'b', f: 'f'}}}, ['b']);
//=> {a: 'a', c: {d: {f: 'f'}}}

console.log(res);

var obj = {a: 'a', b: 'b', c: {b: 'b', d: {b: 'b', f: 'f'}}};
console.log(omitDeep(obj, ['c.d.b', 'f']));
//=> { a: 'a', b: 'b', c: { b: 'b', d: {} } }
