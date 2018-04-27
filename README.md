
# message-tag

[![npm](https://img.shields.io/npm/v/message-tag.svg)](https://www.npmjs.com/package/message-tag)
[![Travis](https://img.shields.io/travis/mkrause/message-tag.svg)](https://travis-ci.org/mkrause/message-tag)

A [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to format arbitrary values in a string template. Useful for error messages, logs, etc.

```js
import msg from 'message-tag';

const time = new Date();
const user = { name: 'John' };

const message = msg`[${time}] Found user: ${user}`;
// Result: '[2018-04-22T22:19:39Z] Found user: `{"name":"John"}`'
```


## Motivation

When constructing (plain text) messages, we often want to include other JS objects, dates, etc. These need to be converted to string first, in order to interpolate them into the message template.

```js
const log = `Current user: '${formatUserAsString(user)}'`;
```


Converting a JS value to a string is in general not straightforward. The `toString()` method only exists for objects, and even then is often useless as it just prints the type of the value (e.g. the well-known `[object Object]`). `JSON.stringify` often does the job, but includes tons of edge cases. Because `JSON.stringify` only prints valid JSON, it won't work as expected for values like `undefined`, `NaN`, or `Infinity`. For custom types, this approach also won't work unless they've implemented `toJSON`.

If you always know the type of the input, then these can be dealt with by using the correct formatting procedure, but getting it right is often cumbersome and error-prone.

In addition, sometimes we do not have any knowledge of the type of the input at all. This is common in the case of error handling, where we may want to construct error messages such as:

```js
if (!(input instanceof Foo)) {
    throw new TypeError(`Expected instance of Foo, but given '${JSON.stringify(input)}' instead`);
}
```

Since we do not know the type of `input`, using `JSON.stringify` is optimistic here. It will produce suboptimal or cryptic results for values like `NaN`, functions, or custom types that don't implement `toJSON()`.


## Usage

First, import or require the `msg` tag:

```js
import msg from 'message-tag';
//const msg = require('message-tag'); // CommonJS version
```


Values of any known, built-in type can be formatted:

```js
msg`Message: ${undefined}`; // 'Message: `undefined`'
msg`Message: ${null}`; // 'Message: `null`'
msg`Message: ${42}`; // 'Message: 42'
msg`Message: ${[1, 2, 3]}`; // 'Message: `[1,2,3]`'
msg`Message: ${{ name: 'John' }}`; // 'Message: `{"name":"John"}`'

// Dates are formatted as ISO strings:
msg`Message: ${new Date()}`; // 'Message: 2018-04-22T22:19:39.161Z'

// Also works for functions:
msg`Message: ${x => x + 1}`; // 'Message: `x => x + 1`'
```


Instances of custom types will be printed with the name of the type, and with the contents serialized through `toJSON()`. If `toJSON` is not implemented, all enumerable properties of the instance are used instead.

```js
class MyType {
    value = 42;
    
    toJSON() {
        return { value: this.value };
    }
}

msg`Custom: ${new MyType()}`; // 'Custom: `{"value":42}`'
```


If you want to disable formatting for a specific input, use `msg.raw`:

```js
msg`Will not be formatted: ${msg.raw('foo')}`; // 'Will not be formatted: foo'
```


## Custom formatting

You can customize the formatting using `msg.custom`. For example:

```js
msg`The date is: ${msg.custom({ dateFormat: 'mmmm dS, yyyy' }, new Date('2018-01-01'))}`;
// Result: 'The date is: January 1st, 2018'
```

You can also change the defaults by creating your own customized tag:

```js
import { msgTag } from 'message-tag';

const msg = msgTag({ dateFormat: 'mmmm dS, yyyy' });
msg`The date is: ${new Date('2018-01-01')}`;
// Result: 'The date is: January 1st, 2018'
```

Supported options:

* `dateFormat`: Custom format for `Date` objects. See the [dateformat](https://www.npmjs.com/package/dateformat) package for a complete overview of the format options.
* `format`: Formatting for JS objects. Can use any option supported by [pretty-format](https://www.npmjs.com/package/pretty-format).
