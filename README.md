# Parse comma delimited string to array

[![NPM Version](https://badgen.net/npm/v/safe-parse-list?icon=npm)](https://npmjs.org/package/safe-parse-list)
[![NPM Downloads](https://badgen.net/npm/dm/safe-parse-list?icon=npm)](https://npmjs.org/package/safe-parse-list)
[![JS Standard Style](https://badgen.net/badge/code%20style/standard/blue)](https://github.com/standard/standard)
[![GitHub Sponsor](https://badgen.net/badge/icon/sponsor/pink?icon=github&label=github)](https://github.com/sponsors/wesleytodd)

## Usage

```
$ npm install safe-parse-list
```

```javascript
const split = require('safe-parse-list')
split('1,2,3') // ['1', '2', '3']
split('1, 2, 3') // ['1', '2', '3']
split('1,\t2,\t3') // ['1', '2', '3']
split('1,\t\t2,\t 3') // ['1', '2', '3']
split('1,22 22,3') // ['1', '22 22', '3']

// Other delimteters or whitespace chars
split('1 2 3', {
  whitespace: [],
  delimiters: [' ']
}) // ['1', '2', '3']
```

## Why is this module "safe"?

Usually this type of thing is done with a Regular Expression.  This [has some problems](https://snyk.io/node-js/express).
This package implements the [loop trim implementation](https://github.com/jshttp/fresh/commit/21a0f0c2a5f447e0d40bc16be0c23fa98a7b46ec)
used to solve most of these ReDOS issues.
