
# message-tag

[ES6 template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to format arbitrary values in a string template. Useful for error messages, logs, etc.

```js
    import msg from 'message-tag';
    
    const user = { name: 'John' };
    
    const message = msg`Found user: ${user}`;
    // Output: 'Found user: `{"name":"John"}`'
```
