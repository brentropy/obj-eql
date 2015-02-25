# obj-eql

Compare two objects for equality, with support for custom comparison functions.

## Installation

```bash
$ npm install obj-eql --save
```

## Usage

```js
var objEql = require('obj-eql')
var x = {a:1}
var y = {a:1}
x === y // => false
objEql(x, y) // => true
```

### objEql([compisonFunction, ]objectA, objectB)

#### Arguments

- **comparisonFunction** *(optional)*: a function that takes two arguments and
returns a boolean if the two arguments should be considered equal.
- **objectA**: an object or value
- **objectA**: another object or value to be compared with `objectA`

#### Return Value

`objEql()` returns `true` if either both objects have the same identity, or if
both have the same attributes and all attribute comparisons return `true` (`===`
by default). Otherwise, `objEql()` returns `false`.

## Custom comparison functions

By default `===` is used to check equality of each value. An optional
comparson may be supplied instead. The comparison function is supplied as the
first argument because parital application is a thing.

### ImmutableJS

If the object contains ImmutableJS values, `Immutable.is` can be used directly
as the comparion function.

```
var Immutable = require('immutable')
objEql(Immutable.is, a, b)
```

Since mutating an ImmutableJS value always returns a reference to itself it
there was no change, `===` (the objEql default) can be used to test for changes.
However, for testing if two cases resulted in the same Immutable value,
`Immutable.is` can identify the values as being equal.

### Deep Equality

By binding `objEql` with itself as a comparison function it is even possible to
support deep equality checking.

```
var objEqlDeep = objEql.bind(null, (a, b) => objEqlDeep(a, b))
```

This may seen like a novel trick; however, in my limited tests, this out performs
[deep-equal](https://www.npmjs.com/package/deep-equal) every time. If you need
to do deep equality testing you should seriously consider using a persistent
data structure implementation like ImmutableJS. It will be much faster.

Since this could be a common use case, obj-eql exposes a pre-bound deep equality
function as `objEql.deep(a, b)`. It is implimented in one line exactly as seen
above.

