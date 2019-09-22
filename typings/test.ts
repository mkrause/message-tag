///<reference lib="es2015"/>
///<reference path="./message-tag.d.ts"/>

// Test module to test TypeScript declaration file.
// Usage:
//   $ tsc --noEmit --strict --esModuleInterop typings/test.ts
// See: https://stackoverflow.com/questions/49296151/how-to-write-tests-for-typescript-typing-definition


import msg, { msgTag, raw, custom } from 'message-tag';


// None of the following should produce any type errors

const test1 : string = msg``;

const test2 : string = msg`foo`;

const test3 : string = msg`foo ${'bar'}`;

const test4 : string = msg`foo ${42}`;

const test5 : string = msg`foo ${{ x: 42 }}`;

const test6 : string = msg`foo ${(x : number) => x + 1}`;

const test7 : string = msg`foo ${msg.raw('bar')}`;


const msgCustom = msg.custom({ format: {} });

const testCustom1 : string = msgCustom`foo ${{ x: 42 }}`;
