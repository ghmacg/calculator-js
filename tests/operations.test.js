const assert = require('assert');
const { add, subtract, multiply, divide } = require('../scripts/main.js');

assert.strictEqual(add(1, 2), 3);
assert.strictEqual(subtract(5, 2), 3);
assert.strictEqual(multiply(3, 4), 12);
assert.strictEqual(divide(10, 2), 5);
assert.strictEqual(divide(1, 0), 'ERROR');

console.log('All tests passed.');
