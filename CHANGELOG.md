
# Change Log

- v0.9
  - Upgrade message-tag to use modern Node.js 14+ features.
  - Drop support for Node 12.
  - Use `exports` in package.json rather than `main`.
  - Upgrade all dependencies to latest versions.
  - Move dist files to new `dist` directory containing ESM, CommonJS, and TypeScript build files.

- v0.8
  - Invalid `Date` instances are now formatted as `[invalid Date]`, rather than throwing a TypeError as before.

- v0.7
  - Update import for `pretty-format`.

- v0.6
  - Drop support for Node v10, and IE 11.

- v0.5
  - Drop support for Node v8, add tests for Node v14.

- v0.4
  - Remove core-js polyfills to improve file size.
  - Add `tsd` to test TypeScript declaration.

- v0.3
  - Add TypeScript support.

- v0.0
  - Initial version.
