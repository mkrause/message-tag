
/*
Test the public interface of this package, simulating an ESM consumer.

Note: this is intended to run in Node.js directly without transpiling, so only use features of Node that are supported
by all supported Node.js versions.
*/


import assert from 'node:assert';

import msg, { msgTag, raw, custom } from 'message-tag';


// Test: importing an ESM package from an ESM context
//console.log(msg);
assert(typeof msg === 'function');
assert(typeof msgTag === 'function');
assert(typeof raw === 'function');
assert(typeof custom === 'function');


// Note: importing a CJS package from an ESM context is not possible
//require('message-tag');
