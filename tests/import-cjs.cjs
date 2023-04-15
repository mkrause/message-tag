
/*
Test the public interface of this package, simulating a CommonJS consumer.

Note: this is intended to run in Node.js directly without transpiling, so only use features of Node that are supported
by all supported Node.js versions.
*/

const assert = require('node:assert');

// Test: importing a CJS package from a CJS context
const msg = require('message-tag');
//console.log(msg);
assert(typeof msg.default === 'function');
assert(typeof msg.msgTag === 'function');
assert(typeof msg.raw === 'function');
assert(typeof msg.custom === 'function');


// Test: importing an ESM package from a CJS context
import('message-tag')
  .then((msg) => {
    assert(typeof msg.default === 'function');
    assert(typeof msg.msgTag === 'function');
    assert(typeof msg.raw === 'function');
    assert(typeof msg.custom === 'function');
  });
