
// Test module to test TypeScript declaration.
// Usage: `tsd`.

import { expectType, expectError } from 'tsd';
import msg, { msgTag, raw, custom } from '.';


expectType<string>(msg``);

expectType<string>(msg`foo`);

expectType<string>(msg`foo ${'bar'}`);

expectType<string>(msg`foo ${42}`);

expectType<string>(msg`foo ${{ x: 42 }}`);

expectType<string>(msg`foo ${(x : number) => x + 1}`);

expectType<string>(msg`foo ${msg.raw('bar')}`);


const msgCustom = msg.custom({ format: {} });

expectType<string>(msgCustom`foo ${{ x: 42 }}`);
