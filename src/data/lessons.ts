import { Lesson, Quiz } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Variables and Data Types',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    description: 'Master JavaScript variables (const, let, var) and understand all primitive and reference data types',
    estimatedTime: 15,
    content: '# Variables and Data Types\n\n' +
'Variables are containers for storing data values. JavaScript provides three ways to declare variables, each with different behaviors and use cases.\n\n' +
'## Variable Declaration Keywords\n\n' +
'### const (ES6+)\n' +
'- **Immutable Binding**: Cannot be reassigned after initialization\n' +
'- **Must Initialize**: Must assign a value when declaring\n' +
'- **Block Scoped**: Only accessible within the block it\'s defined\n' +
'- **Best Practice**: Use const by default for all variables\n\n' +
'### let (ES6+)\n' +
'- **Mutable Binding**: Can be reassigned\n' +
'- **Block Scoped**: Limited to the block, statement, or expression\n' +
'- **No Hoisting Issues**: Cannot be used before declaration\n' +
'- **Use Case**: Counters, loop variables, conditional reassignments\n\n' +
'### var (Legacy - Avoid)\n' +
'- **Function Scoped**: Not block scoped\n' +
'- **Hoisting**: Declared variables are moved to top of scope\n' +
'- **Can Cause Bugs**: Due to function scope and hoisting behavior\n' +
'- **Deprecated**: Replaced by let and const in modern JavaScript\n\n' +
'## Primitive Data Types\n\n' +
'JavaScript has 7 primitive data types that represent single values:\n\n' +
'### String\n' +
'Text data enclosed in quotes (single, double, or backticks)\n' +
'- **Immutable**: Cannot change individual characters\n' +
'- **Template Literals**: Use backticks for interpolation and multi-line\n' +
'- **Common Methods**: `toLowerCase()`, `toUpperCase()`, `slice()`, `includes()`\n\n' +
'### Number\n' +
'All numeric values (integers and decimals)\n' +
'- **IEEE 754 Format**: 64-bit floating-point\n' +
'- **Special Values**: `Infinity`, `-Infinity`, `NaN` (Not a Number)\n' +
'- **Safe Range**: -(2^53 - 1) to (2^53 - 1)\n' +
'- **BigInt**: For numbers beyond safe range\n\n' +
'### Boolean\n' +
'Logical values: `true` or `false`\n' +
'- **Truthy Values**: Non-empty strings, non-zero numbers, objects, arrays\n' +
'- **Falsy Values**: `false`, `0`, `""`, `null`, `undefined`, `NaN`\n' +
'- **Type Coercion**: Automatic conversion in logical contexts\n\n' +
'### Undefined\n' +
'Variable declared but not assigned a value\n' +
'- **Default Value**: Uninitialized variables\n' +
'- **Return Value**: Functions without `return` statement\n' +
'- **Missing Properties**: Accessing non-existent object properties\n\n' +
'### Null\n' +
'Intentional absence of any value\n' +
'- **Explicit Assignment**: Programmer explicitly sets to `null`\n' +
'- **Type Quirk**: `typeof null` returns `"object"` (historical bug)\n' +
'- **Use Case**: Clearing variables or indicating "no value"\n\n' +
'### Symbol (ES6+)\n' +
'Unique and immutable primitive value\n' +
'- **Unique Identifier**: Each `Symbol` is guaranteed to be unique\n' +
'- **Object Properties**: Often used as object property keys\n' +
'- **Not Enumerable**: Doesn\'t appear in `for...in` loops\n\n' +
'### BigInt (ES2020+)\n' +
'Integers larger than `Number.MAX_SAFE_INTEGER`\n' +
'- **Syntax**: Add `n` suffix (e.g., `123n`)\n' +
'- **Arbitrary Precision**: No size limit\n' +
'- **Cannot Mix**: Cannot mix `BigInt` and `Number` in operations\n\n' +
'## Reference Types\n\n' +
'### Object\n' +
'Collection of key-value pairs\n' +
'- **Mutable**: Can add, modify, delete properties\n' +
'- **Pass by Reference**: Variables hold references, not values\n' +
'- **Prototype Chain**: Inherits from `Object.prototype`\n\n' +
'### Array\n' +
'Ordered list of values\n' +
'- **Special Object**: Actually an object with numeric keys\n' +
'- **Dynamic Length**: Can grow or shrink\n' +
'- **Methods**: `map()`, `filter()`, `reduce()`, `forEach()`, etc.\n\n' +
'### Function\n' +
'First-class objects that can be invoked\n' +
'- **Callable**: Can be executed with `()`\n' +
'- **Can be Passed**: As arguments or returned from functions\n' +
'- **Can Have Properties**: Functions are objects\n\n' +
'## Type Checking and Conversion\n\n' +
'### typeof Operator\n' +
'- Returns string indicating type\n' +
'- Quirks: `typeof null === "object"`, `typeof function === "function"`\n\n' +
'### Type Coercion\n' +
'- **Implicit**: Automatic conversion (e.g., `"5" + 1 = "51"`)\n' +
'- **Explicit**: Manual conversion using `Number()`, `String()`, `Boolean()`\n\n' +
'### Strict Equality (===)\n' +
'- Compares value AND type\n' +
'- No type coercion\n' +
'- Preferred over loose equality `==`\n\n' +
'## Best Practices\n\n' +
'### Choose the Right Declaration\n' +
'- Default to `const` for values that won\'t change\n' +
'- Use `let` only when reassignment is needed\n' +
'- Never use `var` in modern JavaScript\n\n' +
'### Descriptive Names\n' +
'- Use `camelCase` for variables (e.g., `userName`, `totalPrice`)\n' +
'- Choose meaningful, self-documenting names\n' +
'- Avoid single letters except in loops (`i`, `j`, `k`)\n\n' +
'### Initialize Variables\n' +
'- Always initialize variables when declaring\n' +
'- Avoid `undefined` values when possible\n' +
'- Use `null` to explicitly indicate "no value"\n\n' +
'### Type Safety\n' +
'- Be consistent with types\n' +
'- Avoid mixing types in operations\n' +
'- Use strict equality `===` for comparisons',
    codeExample: {
      code: `// CONST - Cannot Reassign
const PI = 3.14159;
const MAX_USERS = 100;
const userName = "Alice";
// PI = 3.14; // ERROR: Assignment to constant variable

// Note: const objects can have properties modified
const person = { name: "Bob" };
person.name = "Charlie"; // OK - property change
person.age = 30; // OK - adding property
// person = {}; // ERROR - cannot reassign

// LET - Can Reassign
let score = 0;
let message = "Hello";
score = 100; // OK
message = "Goodbye"; // OK

// Block Scope Demo
if (true) {
  const blockVar = "I'm block scoped";
  console.log(blockVar); // OK
}
// console.log(blockVar); // ERROR: not defined

// PRIMITIVE TYPES
const text = "Hello World"; // String
const age = 25; // Number
const price = 19.99; // Number (no separate float)
const isActive = true; // Boolean
let notAssigned; // undefined
const empty = null; // null
const uniqueId = Symbol("id"); // Symbol
const bigNumber = 9007199254740991n; // BigInt

// TYPE CHECKING
console.log(typeof text); // "string"
console.log(typeof age); // "number"
console.log(typeof isActive); // "boolean"
console.log(typeof notAssigned); // "undefined"
console.log(typeof empty); // "object" (quirk!)
console.log(typeof uniqueId); // "symbol"
console.log(typeof bigNumber); // "bigint"

// ARRAY (Reference Type)
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null, { key: "value" }];
console.log(typeof numbers); // "object"
console.log(Array.isArray(numbers)); // true

// TYPE CONVERSION
const numString = "42";
const num = Number(numString); // Explicit: 42
const num2 = +numString; // Shorthand: 42
const str = String(100); // "100"
const bool = Boolean(1); // true

// TEMPLATE LITERALS (String Interpolation)
const name = "Alice";
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
const multiLine = \`
  This is a
  multi-line string
  using template literals
\`;

// STRICT EQUALITY
console.log(5 === "5"); // false (different types)
console.log(5 == "5"); // true (coercion, avoid!)
console.log(null === undefined); // false
console.log(null == undefined); // true (avoid!)`,
      language: 'javascript',
      explanation: 'This comprehensive example demonstrates all variable declaration types, primitive data types, type checking, and best practices. Notice how const prevents reassignment but allows property modification on objects. Always prefer const, use let only when necessary, and avoid var completely in modern JavaScript.'
    }
  },
  {
    id: '2',
    title: 'Functions',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    description: 'Deep dive into function declarations, expressions, arrow functions, parameters, closures, and higher-order functions',
    estimatedTime: 20,
    content: `# Functions in JavaScript

Functions are fundamental building blocks in JavaScript. They are reusable blocks of code designed to perform specific tasks, making code modular, organized, and maintainable.

## Function Declaration

The traditional and most recognizable way to create functions.

### Characteristics
- **Hoisted**: Can be called before declaration in code
- **Named**: Must have a name
- **Function Keyword**: Uses the function keyword
- **Own 'this'**: Has its own this binding

### When to Use
- Main functions that need to be available throughout scope
- Functions that might be called before definition
- When you need a named function for stack traces

## Function Expression

Assigning a function to a variable.

### Characteristics
- **Not Hoisted**: Cannot be called before definition
- **Can be Anonymous**: Name is optional
- **Variable Assignment**: Treated as a value
- **More Flexible**: Can be passed around easily

### When to Use
- Callbacks and event handlers
- Immediately Invoked Function Expressions (IIFE)
- When you want to control hoisting behavior

## Arrow Functions (ES6+)

Modern, concise syntax for writing functions.

### Characteristics
- **Concise Syntax**: Shorter code
- **Implicit Return**: Single expressions return automatically
- **Lexical 'this'**: Inherits this from parent scope
- **No arguments Object**: Cannot access arguments
- **Cannot be Constructor**: Cannot use with new

### When to Use
- Short, simple functions
- Array methods (map, filter, reduce)
- Callbacks where you need parent's this
- Functional programming patterns

### Syntax Variations
- Single parameter: \`x => x * 2\`
- Multiple parameters: \`(x, y) => x + y\`
- No parameters: \`() => console.log("Hi")\`
- Block body: \`(x, y) => { const sum = x + y; return sum; }\`

## Parameters and Arguments

### Default Parameters
Provide fallback values when arguments are not supplied

### Rest Parameters (...)
Collect all remaining arguments into an array
- Must be last parameter
- Creates true array (not array-like)
- Replaces arguments object

### Spread Operator (...)
Expand array into individual arguments
- Used when calling functions
- Can combine with regular parameters
- Works with any iterable

## Return Values

### Explicit Return
Use return keyword to send value back to caller

### Implicit Return
Arrow functions with single expression return automatically

### No Return
Functions without return statement return undefined

### Multiple Returns
Can have multiple return statements (early exit pattern)

## Scope and Closures

### Function Scope
Variables declared in function are only accessible inside it

### Lexical Scope
Functions can access variables from outer scopes

### Closures
Functions that remember variables from outer scope even after outer function has returned
- Data privacy and encapsulation
- Factory functions
- Event handlers with private state

## Higher-Order Functions

Functions that:
- Take functions as parameters, OR
- Return functions, OR
- Both

### Common Patterns
- **Callbacks**: Functions passed to other functions
- **Function Factories**: Functions that create other functions
- **Decorators**: Functions that enhance other functions
- **Composition**: Combining multiple functions

## Pure Functions

Functions that:
- Always return same output for same input
- Have no side effects
- Don't modify external state

### Benefits
- Predictable and testable
- Easy to reason about
- Can be cached (memoized)
- Parallelizable

## Best Practices

### Naming
- Use verb prefixes: get, set, calculate, validate, handle
- Be descriptive and specific
- Use camelCase

### Single Responsibility
- Each function should do one thing well
- Keep functions small and focused
- Extract complex logic into separate functions

### Parameters
- Limit to 3-4 parameters ideally
- Use object destructuring for many parameters
- Provide default values where appropriate

### Documentation
- Add JSDoc comments for complex functions
- Describe parameters and return values
- Include usage examples`,
    codeExample: {
      code: `// FUNCTION DECLARATION (Hoisted)
console.log(greet("Alice")); // Works! Hoisting allows this
function greet(name) {
  return \`Hello, \${name}!\`;
}

// FUNCTION EXPRESSION (Not Hoisted)
// console.log(farewell("Bob")); // ERROR: Cannot access before initialization
const farewell = function(name) {
  return \`Goodbye, \${name}!\`;
};

// ARROW FUNCTION - Concise Syntax
const add = (a, b) => a + b; // Implicit return
const square = x => x * x; // Single param, no parens
const greetAll = () => "Hello everyone!"; // No params

// Arrow function with block body (explicit return)
const calculateTax = (price, taxRate) => {
  const tax = price * taxRate;
  const total = price + tax;
  return total;
};

// DEFAULT PARAMETERS
const createUser = (name, role = "user", status = "active") => {
  return { name, role, status };
};
console.log(createUser("Alice"));
// { name: "Alice", role: "user", status: "active" }

// REST PARAMETERS (...rest)
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30

// Mix regular and rest parameters
const introduce = (greeting, ...names) => {
  return \`\${greeting} \${names.join(", ")}\`;
};
console.log(introduce("Hello", "Alice", "Bob", "Charlie"));
// "Hello Alice, Bob, Charlie"

// SPREAD OPERATOR in function calls
const numbers = [5, 12, 8, 3, 19];
console.log(Math.max(...numbers)); // 19
// Equivalent to: Math.max(5, 12, 8, 3, 19)

// HIGHER-ORDER FUNCTION (takes function as parameter)
const processArray = (arr, callback) => {
  return arr.map(callback);
};
const doubled = processArray([1, 2, 3], num => num * 2);
// [2, 4, 6]

// FUNCTION FACTORY (returns function)
const createMultiplier = (multiplier) => {
  return (number) => number * multiplier;
};
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// CLOSURE Example (function remembers outer variables)
const createCounter = () => {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => count = 0
  };
};

const counter1 = createCounter();
console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter1.getCount()); // 2
// count is not directly accessible - data privacy!

// PURE FUNCTION (no side effects)
const multiply = (a, b) => a * b; // Always same output for same input
const isPure = multiply(3, 4) === multiply(3, 4); // true

// IMPURE FUNCTION (has side effects)
let globalCount = 0;
const impureIncrement = () => ++globalCount; // Modifies external state

// ARROW FUNCTION vs REGULAR - 'this' behavior
const obj = {
  name: "JavaScript",

  // Regular function - has own 'this'
  regularFunc: function() {
    console.log(this.name); // "JavaScript"
  },

  // Arrow function - inherits 'this' from parent
  arrowFunc: () => {
    console.log(this.name); // undefined (inherits from outer scope)
  },

  // Arrow in method (lexical this is useful for callbacks)
  delayedGreet: function() {
    setTimeout(() => {
      console.log(this.name); // "JavaScript" (inherits from delayedGreet)
    }, 1000);
  }
};

// FUNCTION COMPOSITION
const addTen = x => x + 10;
const multiplyByTwo = x => x * 2;
const subtract = compose(multiplyByTwo, addTen);
// compose is a higher-order function that combines functions

// IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
(function() {
  const privateVar = "I'm private";
  console.log("This runs immediately!");
})();

// JSDoc Documentation Example
/**
 * Calculates the area of a rectangle
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @returns {number} The area of the rectangle
 */
const calculateArea = (width, height) => width * height;`,
      language: 'javascript',
      explanation: 'This example showcases all major function concepts in JavaScript: declarations, expressions, arrow functions, parameters (default, rest, spread), closures for data privacy, higher-order functions, and the difference in "this" binding. Arrow functions are preferred for most cases due to concise syntax and lexical this binding, but regular functions are still needed when you want their own this context or need the arguments object.'
    }
  },
  {
    id: '3',
    title: 'Arrays and Array Methods',
    category: 'Data Structures',
    difficulty: 'Beginner',
    description: 'Complete guide to arrays, array manipulation, and mastering essential methods like map, filter, reduce, and more',
    estimatedTime: 25,
    content: `# Arrays and Array Methods

Arrays are ordered, indexed collections that can hold multiple values of any type. They are one of the most commonly used data structures in JavaScript and come with powerful built-in methods.

## Array Basics

### Creating Arrays
- **Array Literal**: Most common way using square brackets []
- **Array Constructor**: Using new Array() (less common)
- **Array.of()**: Creates array from arguments
- **Array.from()**: Creates array from array-like or iterable objects

### Array Characteristics
- **Zero-Indexed**: First element is at index 0
- **Dynamic Length**: Can grow or shrink automatically
- **Heterogeneous**: Can contain mixed data types
- **Reference Type**: Passed by reference, not by value

## Essential Array Methods

### Transformation Methods

#### map()
**Purpose**: Transform every element and create new array
- **Returns**: New array with same length
- **Use Case**: Converting, formatting, or calculating values
- **Pure Function**: Doesn't modify original array

#### filter()
**Purpose**: Select elements that pass a test
- **Returns**: New array with 0 or more elements
- **Use Case**: Finding matching items, removing unwanted items
- **Predicate Function**: Callback returns true/false

#### reduce()
**Purpose**: Combine all elements into single value
- **Returns**: Any type (number, string, object, array)
- **Use Case**: Summing, counting, grouping, complex transformations
- **Accumulator**: Carries value across iterations
- **Initial Value**: Second parameter (recommended)

### Search Methods

#### find()
**Purpose**: Get first element that matches
- **Returns**: Element or undefined
- **Stops**: Returns immediately on first match

#### findIndex()
**Purpose**: Get index of first matching element
- **Returns**: Index or -1 if not found

#### includes()
**Purpose**: Check if value exists
- **Returns**: Boolean (true/false)
- **Uses Strict Equality**: ===

#### indexOf()
**Purpose**: Get index of first occurrence
- **Returns**: Index or -1
- **Accepts Start Position**: Second parameter

#### some()
**Purpose**: Check if ANY element passes test
- **Returns**: Boolean
- **Short-Circuits**: Stops at first true

#### every()
**Purpose**: Check if ALL elements pass test
- **Returns**: Boolean
- **Short-Circuits**: Stops at first false

### Modification Methods

#### push()
**Purpose**: Add element(s) to end
- **Modifies Original**: Mutates array
- **Returns**: New length

#### pop()
**Purpose**: Remove last element
- **Modifies Original**: Mutates array
- **Returns**: Removed element

#### unshift()
**Purpose**: Add element(s) to beginning
- **Modifies Original**: Mutates array
- **Returns**: New length

#### shift()
**Purpose**: Remove first element
- **Modifies Original**: Mutates array
- **Returns**: Removed element

#### splice()
**Purpose**: Add, remove, or replace elements at any position
- **Modifies Original**: Mutates array
- **Returns**: Array of removed elements
- **Parameters**: start, deleteCount, items to add

#### slice()
**Purpose**: Extract portion of array
- **Pure Function**: Doesn't modify original
- **Returns**: New array
- **Parameters**: start, end (end not included)

### Ordering Methods

#### sort()
**Purpose**: Sort elements in place
- **Modifies Original**: Mutates array
- **Default**: Converts to strings and sorts alphabetically
- **Compare Function**: Provide for custom sorting

#### reverse()
**Purpose**: Reverse order of elements
- **Modifies Original**: Mutates array

### Iteration Methods

#### forEach()
**Purpose**: Execute function for each element
- **Returns**: undefined (always)
- **Cannot Break**: No way to stop iteration early
- **Use Case**: Side effects (logging, updating external state)

### Combining Methods

#### concat()
**Purpose**: Merge arrays
- **Pure Function**: Returns new array
- **Doesn't Flatten**: Nested arrays stay nested

#### flat()
**Purpose**: Flatten nested arrays
- **Pure Function**: Returns new array
- **Depth Parameter**: How many levels to flatten

#### flatMap()
**Purpose**: Map then flatten (one level)
- **Combination**: map() + flat(1)
- **More Efficient**: Than separate operations

### Creating Arrays

#### Array.from()
**Purpose**: Create array from iterable or array-like object
- **Use Cases**: Converting strings, NodeLists, Sets, Maps
- **Mapping Function**: Optional second parameter

#### Array.of()
**Purpose**: Create array from arguments
- **Difference**: Unlike Array(), always creates array

#### fill()
**Purpose**: Fill array with static value
- **Modifies Original**: Mutates array
- **Parameters**: value, start, end

## Array Destructuring

Extract values from arrays into variables

### Basic Destructuring
Unpack array values into distinct variables

### Skip Elements
Use commas to skip unwanted elements

### Rest Pattern
Collect remaining elements

### Default Values
Provide fallback values

### Swapping Variables
Elegant variable swapping without temp variable

## Spread Operator with Arrays

### Copying Arrays
Create shallow copy of array

### Combining Arrays
Merge multiple arrays

### Function Arguments
Pass array elements as individual arguments

## Multi-Dimensional Arrays

Arrays containing arrays (matrices)

### Accessing Elements
Use multiple bracket notations

### Iterating
Nested loops or flat() method

## Best Practices

### Method Chaining
Combine multiple operations fluently

### Avoid Mutations
Prefer pure methods (map, filter) over mutating methods

### Performance
- **forEach vs for loop**: for loop slightly faster
- **map vs forEach**: Use map for transformations
- **Avoid Sparse Arrays**: Gaps in indices can hurt performance

### Immutability
- Use spread operator or slice() to copy
- Avoid direct index modification when possible
- Consider immutable libraries for complex state

### Readability
- Chain methods for clarity
- Use descriptive callback names
- Break complex chains into intermediate variables`,
    codeExample: {
      code: `// CREATING ARRAYS
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null, { key: "value" }, [1, 2]];
const empty = [];

// Array constructor (less common)
const arr1 = new Array(3); // [empty × 3] - length 3
const arr2 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of() - always creates array with elements
const arr3 = Array.of(3); // [3] - contains number 3
const arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from() - create from iterable
const str = "hello";
const chars = Array.from(str); // ["h", "e", "l", "l", "o"]
const range = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

// MAP - Transform each element
const prices = [10, 20, 30, 40];
const withTax = prices.map(price => price * 1.1);
// [11, 22, 33, 44]

const users = ["alice", "bob", "charlie"];
const capitalized = users.map(name =>
  name.charAt(0).toUpperCase() + name.slice(1)
);
// ["Alice", "Bob", "Charlie"]

// FILTER - Select matching elements
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Mouse", price: 25, inStock: false },
  { name: "Keyboard", price: 75, inStock: true }
];
const available = products.filter(p => p.inStock);
// [{ name: "Laptop", ... }, { name: "Keyboard", ... }]

// REDUCE - Combine into single value
const numbers2 = [1, 2, 3, 4, 5];
const sum = numbers2.reduce((acc, num) => acc + num, 0);
// 15

// Complex reduce: counting occurrences
const votes = ["yes", "no", "yes", "yes", "no", "yes"];
const count = votes.reduce((acc, vote) => {
  acc[vote] = (acc[vote] || 0) + 1;
  return acc;
}, {});
// { yes: 4, no: 2 }

// Reduce: flattening nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5, 6]

// FIND - Get first match
const ages = [12, 18, 25, 30, 16];
const adult = ages.find(age => age >= 18);
// 18 (first match)

// FIND INDEX
const index = ages.findIndex(age => age >= 18);
// 1 (index of 18)

// INCLUDES - Check existence
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false

// SOME - Check if ANY passes test
const hasAdult = ages.some(age => age >= 18);
// true

// EVERY - Check if ALL pass test
const allAdults = ages.every(age => age >= 18);
// false

// SORT - Order elements
const unsorted = [3, 1, 4, 1, 5, 9, 2];
const sorted = [...unsorted].sort((a, b) => a - b);
// [1, 1, 2, 3, 4, 5, 9]

// Sort objects
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];
people.sort((a, b) => a.age - b.age);
// Sorted by age ascending

// SLICE - Extract portion (doesn't modify original)
const letters = ["a", "b", "c", "d", "e"];
const middle = letters.slice(1, 4); // ["b", "c", "d"]
const lastTwo = letters.slice(-2); // ["d", "e"]

// SPLICE - Add/remove at position (modifies original)
const items = ["a", "b", "c", "d"];
items.splice(2, 1, "X", "Y"); // Remove 1 at index 2, add X, Y
// items is now ["a", "b", "X", "Y", "d"]

// METHOD CHAINING - Combine operations
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = data
  .filter(n => n % 2 === 0)  // [2, 4, 6, 8, 10]
  .map(n => n * 2)            // [4, 8, 12, 16, 20]
  .reduce((sum, n) => sum + n, 0); // 60

// DESTRUCTURING
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Skip elements
const [a, , c] = [1, 2, 3];
// a = 1, c = 3 (skipped 2)

// Default values
const [x = 0, y = 0] = [10];
// x = 10, y = 0 (default)

// Swapping variables
let var1 = 1, var2 = 2;
[var1, var2] = [var2, var1];
// var1 = 2, var2 = 1

// SPREAD OPERATOR
const arr = [1, 2, 3];
const copy = [...arr]; // Shallow copy
const combined = [...arr, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
const merged = [...arr, ...letters]; // Merge arrays

// FLAT - Flatten nested arrays
const nestedDeep = [1, [2, [3, [4]]]];
const flat1 = nestedDeep.flat(1); // [1, 2, [3, [4]]]
const flat2 = nestedDeep.flat(2); // [1, 2, 3, [4]]
const flatAll = nestedDeep.flat(Infinity); // [1, 2, 3, 4]

// FLATMAP - Map + Flat in one operation
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar"]

// PRACTICAL EXAMPLE - Data Processing Pipeline
const transactions = [
  { id: 1, amount: 100, type: "income", category: "salary" },
  { id: 2, amount: 50, type: "expense", category: "food" },
  { id: 3, amount: 200, type: "income", category: "bonus" },
  { id: 4, amount: 75, type: "expense", category: "transport" },
  { id: 5, amount: 30, type: "expense", category: "food" }
];

// Calculate total expenses on food
const foodExpenses = transactions
  .filter(t => t.type === "expense" && t.category === "food")
  .map(t => t.amount)
  .reduce((sum, amount) => sum + amount, 0);
// 80

// Group by category
const grouped = transactions.reduce((acc, t) => {
  if (!acc[t.category]) acc[t.category] = [];
  acc[t.category].push(t);
  return acc;
}, {});`,
      language: 'javascript',
      explanation: 'Arrays are fundamental to JavaScript programming. Master map() for transformations, filter() for selection, and reduce() for aggregation. These three methods form the foundation of functional programming in JavaScript. Method chaining creates readable data processing pipelines. Remember: map, filter, and reduce create new arrays and don\'t modify the original, making your code more predictable and easier to debug.'
    }
  },
  {
    id: '4',
    title: 'Objects and Destructuring',
    category: 'Data Structures',
    difficulty: 'Beginner',
    description: 'Learn object creation, property access, methods, destructuring, and object manipulation techniques',
    estimatedTime: 20,
    content: `# Objects and Destructuring

Objects are collections of key-value pairs that allow you to store structured data. They are fundamental to JavaScript and used everywhere in modern development.

## Object Basics

### Creating Objects
- **Object Literal**: Most common using curly braces {}
- **Constructor**: new Object() (rarely used)
- **Object.create()**: Create with specific prototype

### Object Properties
- **Keys**: Strings or Symbols
- **Values**: Any data type
- **Dynamic**: Can add/remove properties anytime

## Accessing Properties

### Dot Notation
Use for known property names

### Bracket Notation
Use for:
- Dynamic property names
- Properties with spaces or special characters
- Computed property access

## Object Methods

Functions stored as object properties

### Method Shorthand (ES6+)
Concise syntax for defining methods

### 'this' Keyword
Refers to the object the method belongs to

## Destructuring

Extract properties into variables

### Basic Destructuring
Unpack object properties

### Renaming Variables
Assign to different variable names

### Default Values
Provide fallbacks for missing properties

### Nested Destructuring
Extract from nested objects

### Function Parameters
Destructure in function signatures

## Object Methods

### Object.keys()
Get array of property names

### Object.values()
Get array of property values

### Object.entries()
Get array of [key, value] pairs

### Object.assign()
Copy properties from source to target

### Object.freeze()
Make object immutable

### Object.seal()
Prevent adding/removing properties

## Spread Operator

### Copying Objects
Create shallow copies

### Merging Objects
Combine multiple objects

### Adding Properties
Clone and add new properties

## Computed Property Names

Dynamic property keys using []

## Property Shorthand

When variable name matches property name

## Optional Chaining (?.)

Safely access nested properties

## Nullish Coalescing (??)

Provide default for null/undefined`,
    codeExample: {
      code: `// CREATING OBJECTS
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  isActive: true
};

// ACCESSING PROPERTIES
console.log(user.name); // "Alice" (dot notation)
console.log(user["email"]); // "alice@example.com" (bracket)

// Dynamic property access
const prop = "age";
console.log(user[prop]); // 30

// ADDING/MODIFYING PROPERTIES
user.city = "New York"; // Add new property
user.age = 31; // Modify existing

// DELETING PROPERTIES
delete user.email;

// OBJECT METHODS
const calculator = {
  value: 0,

  add(num) {
    this.value += num;
    return this; // For chaining
  },

  subtract(num) {
    this.value -= num;
    return this;
  },

  getValue() {
    return this.value;
  }
};

calculator.add(10).subtract(3).add(5);
console.log(calculator.getValue()); // 12

// DESTRUCTURING - Basic
const person = {
  firstName: "Bob",
  lastName: "Smith",
  age: 25,
  city: "Boston"
};

const { firstName, lastName, age } = person;
console.log(firstName); // "Bob"

// DESTRUCTURING - Renaming
const { firstName: fName, lastName: lName } = person;
console.log(fName); // "Bob"

// DESTRUCTURING - Default Values
const { country = "USA", state = "MA" } = person;
console.log(country); // "USA" (default)

// DESTRUCTURING - Nested Objects
const employee = {
  id: 1,
  name: "Alice",
  position: {
    title: "Developer",
    level: "Senior",
    department: "Engineering"
  }
};

const {
  name,
  position: { title, level }
} = employee;
console.log(title); // "Developer"

// DESTRUCTURING - Function Parameters
const printUser = ({ name, age, city = "Unknown" }) => {
  console.log(\`\${name}, \${age}, from \${city}\`);
};

printUser({ name: "Charlie", age: 35 });
// "Charlie, 35, from Unknown"

// OBJECT.KEYS/VALUES/ENTRIES
const product = {
  name: "Laptop",
  price: 999,
  brand: "Dell"
};

console.log(Object.keys(product));
// ["name", "price", "brand"]

console.log(Object.values(product));
// ["Laptop", 999, "Dell"]

console.log(Object.entries(product));
// [["name", "Laptop"], ["price", 999], ["brand", "Dell"]]

// Iterate over entries
Object.entries(product).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// SPREAD OPERATOR - Copying
const original = { a: 1, b: 2 };
const copy = { ...original }; // Shallow copy

// SPREAD OPERATOR - Merging
const defaults = { theme: "light", language: "en" };
const userSettings = { language: "es", fontSize: 14 };
const settings = { ...defaults, ...userSettings };
// { theme: "light", language: "es", fontSize: 14 }

// SPREAD OPERATOR - Adding Properties
const baseUser = { name: "Alice", age: 30 };
const adminUser = { ...baseUser, role: "admin", permissions: ["read", "write"] };

// COMPUTED PROPERTY NAMES
const key = "dynamicKey";
const obj = {
  [key]: "value",
  [\`prefix_\${key}\`]: "another value"
};
// { dynamicKey: "value", prefix_dynamicKey: "another value" }

// PROPERTY SHORTHAND
const name = "Alice";
const age = 30;
const user2 = { name, age }; // Same as { name: name, age: age }

// OPTIONAL CHAINING (?.)
const data = {
  user: {
    profile: {
      address: {
        city: "NYC"
      }
    }
  }
};

// Safe access to deeply nested properties
console.log(data?.user?.profile?.address?.city); // "NYC"
console.log(data?.user?.profile?.phone?.number); // undefined (no error!)

// NULLISH COALESCING (??)
const config = {
  timeout: 0,
  retries: null
};

// ?? only considers null/undefined as "missing"
const timeout = config.timeout ?? 5000; // 0 (not replaced)
const retries = config.retries ?? 3; // 3 (null is replaced)

// Compare with ||
const timeout2 = config.timeout || 5000; // 5000 (0 is falsy!)

// OBJECT.ASSIGN - Copying/Merging
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
Object.assign(target, source);
// target is now { a: 1, b: 3, c: 4 }

// OBJECT.FREEZE - Immutable
const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 10; // Silently fails (throws in strict mode)
console.log(frozen.x); // 1 (unchanged)

// OBJECT.SEAL - Fixed Structure
const sealed = Object.seal({ a: 1, b: 2 });
sealed.a = 10; // OK - can modify existing
sealed.c = 3; // Fails - can't add new
delete sealed.b; // Fails - can't delete`,
      language: 'javascript',
      explanation: 'Objects are the foundation of JavaScript. Master destructuring for cleaner code, spread operator for immutability, and optional chaining for safe property access. Understanding the difference between dot and bracket notation, and knowing when to use Object methods, will make you a more effective JavaScript developer.'
    }
  },
  {
    id: '5',
    title: 'Promises and Async/Await',
    category: 'Asynchronous',
    difficulty: 'Intermediate',
    description: 'Master asynchronous programming with Promises, async/await, error handling, and concurrent operations',
    estimatedTime: 25,
    content: `# Promises and Async/Await

Asynchronous programming is essential in JavaScript for handling operations that take time, like API calls, file operations, and timers.

## The Problem: Callback Hell

Traditional callbacks lead to deeply nested, hard-to-read code

## Promises

A Promise represents a value that may be available now, later, or never

### Three States
- **Pending**: Initial state, operation not completed
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Creating Promises
Use Promise constructor with executor function

### Promise Methods
- **.then()**: Handle success
- **.catch()**: Handle errors
- **.finally()**: Run regardless of outcome

## Async/Await

Modern syntax for working with Promises

### async Function
Returns a Promise automatically

### await Keyword
Pauses execution until Promise resolves

### Error Handling
Use try/catch blocks

## Promise Combinators

### Promise.all()
Wait for all Promises to resolve

### Promise.race()
Wait for first Promise to settle

### Promise.allSettled()
Wait for all Promises, regardless of outcome

### Promise.any()
Wait for first Promise to fulfill

## Best Practices

### Always Handle Errors
Use .catch() or try/catch

### Avoid Mixing Patterns
Don't mix callbacks with Promises

### Parallel vs Sequential
Run independent operations in parallel`,
    codeExample: {
      code: `// CREATING A PROMISE
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ data: "Hello World" });
      } else {
        reject(new Error("Failed to fetch"));
      }
    }, 1000);
  });
};

// USING .then() and .catch()
fetchData()
  .then(result => {
    console.log(result.data);
    return result.data.toUpperCase();
  })
  .then(upperData => {
    console.log(upperData);
  })
  .catch(error => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Operation complete");
  });

// ASYNC/AWAIT - Much cleaner!
const loadData = async () => {
  try {
    const result = await fetchData();
    console.log(result.data);

    const upperData = result.data.toUpperCase();
    console.log(upperData);

    return upperData;
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Operation complete");
  }
};

// PARALLEL EXECUTION with Promise.all()
const fetchUser = () => Promise.resolve({ name: "Alice" });
const fetchPosts = () => Promise.resolve([1, 2, 3]);
const fetchComments = () => Promise.resolve([4, 5, 6]);

const loadAllData = async () => {
  try {
    // All requests happen simultaneously
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ]);

    console.log({ user, posts, comments });
  } catch (error) {
    console.error("One request failed:", error);
  }
};

// SEQUENTIAL EXECUTION (when needed)
const processSteps = async () => {
  const step1 = await firstStep();
  const step2 = await secondStep(step1); // Depends on step1
  const step3 = await thirdStep(step2); // Depends on step2
  return step3;
};

// PROMISE.RACE - First to complete wins
const timeout = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
};

const fetchWithTimeout = async (url, ms) => {
  try {
    const result = await Promise.race([
      fetch(url),
      timeout(ms)
    ]);
    return result;
  } catch (error) {
    console.error("Request timed out or failed");
  }
};

// PROMISE.ALLSETTLED - Get all results
const multipleRequests = async () => {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    Promise.reject(new Error("Failed"))
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(\`Request \${index} succeeded:\`, result.value);
    } else {
      console.log(\`Request \${index} failed:\`, result.reason);
    }
  });
};

// ERROR HANDLING - Multiple catches
const robustFetch = async () => {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes("NetworkError")) {
      console.error("Network error - check connection");
    } else if (error.message.includes("HTTP")) {
      console.error("Server error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // Re-throw if needed
  }
};`,
      language: 'javascript',
      explanation: 'Async/await makes asynchronous code look synchronous and is much easier to read than Promise chains. Use Promise.all() for parallel operations to improve performance. Always handle errors with try/catch. Understanding when to use sequential vs parallel execution is crucial for optimal performance.'
    }
  },
  {
    id: '6',
    title: 'ES6+ Features',
    category: 'Modern JavaScript',
    difficulty: 'Intermediate',
    description: 'Explore modern JavaScript features including template literals, destructuring, spread/rest, and more',
    estimatedTime: 20,
    content: `# ES6+ Modern Features

ECMAScript 2015 (ES6) and later versions introduced powerful features that make JavaScript more expressive and concise.

## Template Literals

String interpolation and multi-line strings using backticks

### String Interpolation
Embed expressions with \${expression}

### Multi-line Strings
No need for concatenation or escape characters

### Tagged Templates
Custom string processing

## Destructuring

Extract values from arrays and objects

### Array Destructuring
Unpack array values

### Object Destructuring
Extract object properties

### Function Parameters
Destructure in function signatures

## Spread and Rest Operators

### Spread (...)
Expand iterables

### Rest (...)
Collect multiple elements

## Enhanced Object Literals

### Property Shorthand
Concise property definition

### Method Shorthand
Shorter method syntax

### Computed Property Names
Dynamic keys

## Arrow Functions

Concise function syntax with lexical this

## Default Parameters

Provide fallback values for function parameters

## Classes

Syntactic sugar over prototypal inheritance

## Modules

Import and export functionality

## Let and Const

Block-scoped variable declarations`,
    codeExample: {
      code: `// TEMPLATE LITERALS
const name = "Alice";
const age = 30;
const greeting = \`Hello, \${name}! You are \${age} years old.\`;

const multiLine = \`
  This is a
  multi-line string
  without concatenation
\`;

// DESTRUCTURING
const [a, b, ...rest] = [1, 2, 3, 4, 5];
const { name: userName, age: userAge } = { name: "Bob", age: 25 };

// SPREAD OPERATOR
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// REST PARAMETERS
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4, 5)); // 15

// ARROW FUNCTIONS
const double = x => x * 2;
const add = (a, b) => a + b;
const greet = () => "Hello!";

// DEFAULT PARAMETERS
const multiply = (a, b = 1) => a * b;
console.log(multiply(5)); // 5 (b defaults to 1)

// ENHANCED OBJECT LITERALS
const x = 10, y = 20;
const point = {
  x, // Property shorthand
  y,

  // Method shorthand
  display() {
    console.log(\`(\${this.x}, \${this.y})\`);
  },

  // Computed property name
  [\`prop_\${x}\`]: "value"
};

// CLASSES
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
}

class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
}

// LET and CONST
let mutable = 1;
mutable = 2; // OK

const immutable = 1;
// immutable = 2; // ERROR

// Block scope
if (true) {
  let blockScoped = "accessible only here";
  const alsoBlockScoped = "same";
}
// console.log(blockScoped); // ERROR`,
      language: 'javascript',
      explanation: 'ES6+ features make JavaScript more powerful and expressive. Template literals improve string handling, destructuring simplifies data extraction, spread/rest operators provide flexibility, and arrow functions offer concise syntax. These features are essential for modern JavaScript development.'
    }
  },
  {
    id: '7',
    title: 'Classes and OOP',
    category: 'Object-Oriented',
    difficulty: 'Intermediate',
    description: 'Master object-oriented programming with classes, inheritance, encapsulation, and design patterns',
    estimatedTime: 25,
    content: `# Classes and Object-Oriented Programming

Classes provide a cleaner, more intuitive syntax for creating objects and implementing inheritance in JavaScript.

## Class Basics

### Constructor
Initialize instance properties

### Instance Methods
Methods available on class instances

### Static Methods
Methods called on the class itself

## Inheritance

### Extends Keyword
Create subclass from parent class

### Super Keyword
Access parent class methods and constructor

## Encapsulation

### Private Fields (#)
Properties only accessible within class

### Public Fields
Standard properties

### Getters and Setters
Controlled property access

## Class Features

### Class Expressions
Classes as values

### Static Fields
Class-level properties

### Private Methods
Internal helper methods

## Design Patterns

### Factory Pattern
Create objects without specifying class

### Singleton Pattern
Ensure only one instance exists

### Observer Pattern
Subscribe to and react to events`,
    codeExample: {
      code: `// BASIC CLASS
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    return \`\${this.name} makes a sound\`;
  }

  // Static method
  static info() {
    return "Animals are living organisms";
  }
}

const animal = new Animal("Generic", 5);
console.log(animal.speak());
console.log(Animal.info()); // Called on class, not instance

// INHERITANCE
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    return \`\${this.name} barks!\`;
  }

  fetch() {
    return \`\${this.name} fetches the ball\`;
  }
}

const dog = new Dog("Max", 3, "Golden Retriever");
console.log(dog.speak()); // "Max barks!"
console.log(dog.fetch());

// PRIVATE FIELDS
class BankAccount {
  #balance = 0; // Private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice");
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // ERROR: Private field

// GETTERS AND SETTERS
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    this._celsius = value;
  }
}

const temp = new Temperature(0);
console.log(temp.fahrenheit); // 32
temp.fahrenheit = 212;
console.log(temp.celsius); // 100

// STATIC FIELDS
class Config {
  static apiUrl = "https://api.example.com";
  static timeout = 5000;

  static getFullUrl(endpoint) {
    return \`\${this.apiUrl}\${endpoint}\`;
  }
}

console.log(Config.apiUrl);
console.log(Config.getFullUrl("/users"));

// SINGLETON PATTERN
class Database {
  static #instance = null;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    Database.#instance = this;
    this.connection = "Connected to DB";
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true (same instance)

// FACTORY PATTERN
class UserFactory {
  static createUser(type, name) {
    switch(type) {
      case 'admin':
        return new Admin(name);
      case 'customer':
        return new Customer(name);
      default:
        return new Guest(name);
    }
  }
}

class Admin {
  constructor(name) {
    this.name = name;
    this.role = 'admin';
    this.permissions = ['read', 'write', 'delete'];
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.role = 'customer';
    this.permissions = ['read'];
  }
}`,
      language: 'javascript',
      explanation: 'Classes provide a clean syntax for object-oriented programming in JavaScript. Use inheritance to share functionality, private fields for encapsulation, and static methods for utility functions. Design patterns like Singleton and Factory help organize code and solve common problems.'
    }
  },
  {
    id: '8',
    title: 'Error Handling',
    category: 'Best Practices',
    difficulty: 'Intermediate',
    description: 'Learn to handle errors gracefully with try/catch, custom errors, and best practices for robust applications',
    estimatedTime: 15,
    content: `# Error Handling

Proper error handling is crucial for building robust applications that gracefully handle unexpected situations.

## Try/Catch/Finally

### Try Block
Code that might throw an error

### Catch Block
Handle the error

### Finally Block
Always executes, regardless of error

## Error Types

### Built-in Error Types
- Error
- SyntaxError
- ReferenceError
- TypeError
- RangeError

### Custom Errors
Create application-specific error types

## Throwing Errors

### Throw Statement
Manually trigger errors

### When to Throw
Validation failures, invalid states

## Error Handling Strategies

### Fail Fast
Detect and report errors early

### Graceful Degradation
Provide fallback functionality

### Logging
Record errors for debugging

## Async Error Handling

### Try/Catch with Async/Await
Handle Promise rejections

### .catch() Method
Handle Promise errors

## Best Practices

### Specific Error Messages
Clear, actionable error descriptions

### Don't Swallow Errors
Always handle or propagate

### Use Error Boundaries (React)
Catch errors in component trees`,
    codeExample: {
      code: `// BASIC TRY/CATCH
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Operation failed:", error.message);
} finally {
  console.log("Cleanup runs regardless");
}

// CUSTOM ERROR CLASS
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

// THROWING CUSTOM ERRORS
const validateUser = (user) => {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
  if (!user.email || !user.email.includes('@')) {
    throw new ValidationError("Valid email required", "email");
  }
  return true;
};

// CATCHING SPECIFIC ERROR TYPES
try {
  validateUser({ name: "", email: "invalid" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Validation failed on \${error.field}: \${error.message}\`);
  } else {
    console.error("Unexpected error:", error);
  }
}

// ASYNC ERROR HANDLING
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);

    if (!response.ok) {
      throw new NetworkError(
        "Failed to fetch user",
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(\`Network error (\${error.statusCode}):\`, error.message);
    } else if (error instanceof TypeError) {
      console.error("Failed to parse response:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw for caller to handle
  }
};

// ERROR HANDLING WITH PROMISE.CATCH
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => {
    // Handle error from async function
    console.error("Failed to load user:", error.message);
  });

// MULTIPLE TRY/CATCH BLOCKS
const processData = async () => {
  let data;

  // First operation
  try {
    data = await fetchData();
  } catch (error) {
    console.error("Fetch failed, using cached data");
    data = getCachedData();
  }

  // Second operation
  try {
    const processed = await transformData(data);
    return processed;
  } catch (error) {
    console.error("Transform failed:", error.message);
    return data; // Return unprocessed data
  }
};

// FAIL FAST PATTERN
const divide = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};

// GRACEFUL DEGRADATION
const getSettings = () => {
  try {
    const saved = localStorage.getItem('settings');
    return JSON.parse(saved);
  } catch (error) {
    console.warn("Failed to load settings, using defaults");
    return getDefaultSettings();
  }
};

// ERROR LOGGING UTILITY
class Logger {
  static logError(error, context = {}) {
    const errorLog = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context
    };

    // In production, send to logging service
    console.error("Error logged:", errorLog);

    // Could send to external service
    // sendToLoggingService(errorLog);
  }
}

// Usage
try {
  riskyOperation();
} catch (error) {
  Logger.logError(error, {
    userId: currentUser.id,
    action: "data_processing"
  });
}`,
      language: 'javascript',
      explanation: 'Proper error handling makes applications robust and user-friendly. Use custom error classes for specific error types, always handle async errors with try/catch or .catch(), and provide meaningful error messages. Remember to log errors appropriately and never silently ignore them.'
    }
  },
  {
    id: '9',
    title: 'Closures and Scope',
    category: 'Advanced Concepts',
    difficulty: 'Advanced',
    description: 'Deep dive into closures, scope chain, lexical environment, and practical closure patterns',
    estimatedTime: 20,
    content: `# Closures and Scope

Closures are one of the most powerful features in JavaScript, enabling data privacy, function factories, and elegant design patterns.

## Understanding Scope

### Global Scope
Variables accessible everywhere

### Function Scope
Variables accessible within function

### Block Scope
Variables limited to block (let/const)

### Lexical Scope
Inner functions access outer variables

## Closures Defined

A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.

## How Closures Work

### Function Creation
Function "remembers" its lexical environment

### Variable Retention
Outer variables remain accessible

### Private Data
Closure creates private state

## Practical Closure Patterns

### Data Privacy
Hide implementation details

### Function Factories
Create customized functions

### Module Pattern
Encapsulate related functionality

### Event Handlers
Maintain state in callbacks

## Common Use Cases

### Counter Functions
Maintain count between calls

### Memoization
Cache function results

### Partial Application
Pre-fill function arguments

### Currying
Transform multi-argument functions`,
    codeExample: {
      code: `// BASIC CLOSURE
function outerFunction() {
  const outerVar = "I'm from outer scope";

  function innerFunction() {
    console.log(outerVar); // Accesses outer variable
  }

  return innerFunction;
}

const closure = outerFunction();
closure(); // "I'm from outer scope"
// outerFunction finished, but innerFunction still accesses outerVar!

// PRIVATE VARIABLES (Data Privacy)
function createCounter() {
  let count = 0; // Private variable

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// console.log(count); // ERROR: count is private

// FUNCTION FACTORY
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// MODULE PATTERN
const Calculator = (function() {
  // Private variables and functions
  let memory = 0;

  const log = (operation, result) => {
    console.log(\`\${operation} = \${result}\`);
  };

  // Public API
  return {
    add(a, b) {
      const result = a + b;
      log(\`\${a} + \${b}\`, result);
      return result;
    },

    subtract(a, b) {
      const result = a - b;
      log(\`\${a} - \${b}\`, result);
      return result;
    },

    saveToMemory(value) {
      memory = value;
    },

    recallFromMemory() {
      return memory;
    }
  };
})();

Calculator.add(5, 3); // "5 + 3 = 8"
Calculator.saveToMemory(100);
console.log(Calculator.recallFromMemory()); // 100

// CLOSURE IN LOOPS (Common Pitfall)
// WRONG WAY (all log 3)
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // All print 3!
  }, 100);
}

// RIGHT WAY #1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}

// RIGHT WAY #2: Create closure with IIFE
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // 0, 1, 2
    }, 100);
  })(i);
}

// MEMOIZATION (Cache Results)
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Returning cached result");
      return cache[key];
    }

    console.log("Calculating result");
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const slowSquare = (n) => {
  // Simulate slow operation
  for (let i = 0; i < 1000000000; i++) {}
  return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5)); // Slow first time
console.log(fastSquare(5)); // Instant (cached)

// PARTIAL APPLICATION
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn.apply(this, [...fixedArgs, ...remainingArgs]);
  };
}

const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
console.log(add5(10, 15)); // 30 (5 + 10 + 15)

// CURRYING
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, [...args, ...moreArgs]);
      };
    }
  };
}

const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2, 3, 4)); // 24

// EVENT HANDLERS WITH CLOSURES
function createButton(label) {
  let clickCount = 0;

  return {
    render() {
      const button = document.createElement('button');
      button.textContent = label;
      button.onclick = function() {
        clickCount++;
        console.log(\`\${label} clicked \${clickCount} times\`);
      };
      return button;
    }
  };
}

const btn = createButton("Click Me");
document.body.appendChild(btn.render());`,
      language: 'javascript',
      explanation: 'Closures are fundamental to JavaScript and enable powerful patterns like data privacy, function factories, and memoization. Understanding how closures work with the scope chain is essential for advanced JavaScript programming. Use closures for encapsulation, but be aware of memory implications when capturing large objects.'
    }
  },
  {
    id: '10',
    title: 'Modules and Imports',
    category: 'Modern JavaScript',
    difficulty: 'Intermediate',
    description: 'Learn ES6 modules, import/export syntax, dynamic imports, and module best practices',
    estimatedTime: 15,
    content: `# Modules and Imports

Modules allow you to break your code into separate files, making it more organized, maintainable, and reusable.

## Why Modules?

### Code Organization
Separate concerns into different files

### Reusability
Share code across projects

### Namespace Management
Avoid global scope pollution

### Dependency Management
Clear dependencies between files

## ES6 Module Syntax

### Named Exports
Export multiple items from a module

### Default Export
Export single main item from module

### Import Syntax
Bring exported items into current file

## Module Patterns

### Named Exports
Multiple exports per module

### Default + Named
Combine export types

### Re-exporting
Aggregate exports from multiple modules

## Dynamic Imports

### Import()
Load modules conditionally or lazily

### Code Splitting
Load code only when needed

## Module Best Practices

### One Module Per File
Keep modules focused

### Clear Naming
Descriptive file and export names

### Avoid Circular Dependencies
Can cause initialization issues

### Tree Shaking
Remove unused exports in bundlers`,
    codeExample: {
      code: `// ========== math.js ==========
// NAMED EXPORTS
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// Can also export at end
const divide = (a, b) => a / b;
const power = (base, exp) => Math.pow(base, exp);
export { divide, power };

// ========== utils.js ==========
// DEFAULT EXPORT (one per module)
export default function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// Can combine default + named
export const TAX_RATE = 0.1;

// ========== main.js ==========
// IMPORTING NAMED EXPORTS
import { add, subtract, PI } from './math.js';

console.log(add(5, 3)); // 8
console.log(PI); // 3.14159

// IMPORT ALL as namespace
import * as math from './math.js';

console.log(math.add(5, 3));
console.log(math.PI);

// IMPORT DEFAULT (can choose any name)
import formatCurrency from './utils.js';
console.log(formatCurrency(99.5)); // "$99.50"

// IMPORT DEFAULT + NAMED
import formatCurrency, { TAX_RATE } from './utils.js';

// RENAME IMPORTS
import { add as addition, subtract as subtraction } from './math.js';
console.log(addition(10, 5)); // 15

// ========== api.js ==========
// RE-EXPORTING (barrel exports)
export { add, subtract } from './math.js';
export { default as format } from './utils.js';

// Now can import from api.js instead
import { add, format } from './api.js';

// ========== lazy-load.js ==========
// DYNAMIC IMPORTS
button.addEventListener('click', async () => {
  // Load module only when needed
  const module = await import('./heavy-module.js');
  module.doSomething();
});

// Conditional import
const loadFeature = async (featureName) => {
  if (featureName === 'charts') {
    const charts = await import('./charts.js');
    return charts.default;
  } else if (featureName === 'tables') {
    const tables = await import('./tables.js');
    return tables.default;
  }
};

// ========== index.js (barrel file) ==========
// Aggregate exports from multiple files
export { add, subtract, multiply, divide } from './math.js';
export { formatCurrency, formatDate } from './formatters.js';
export { default as ApiClient } from './api-client.js';

// Usage:
import { add, formatCurrency, ApiClient } from './utils/index.js';

// ========== config.js ==========
// Module pattern for configuration
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

export default Object.freeze(config); // Immutable config

// ========== singleton.js ==========
// Singleton pattern with modules
class Database {
  constructor() {
    this.connection = null;
  }

  connect() {
    this.connection = "Connected";
    return this;
  }
}

// Export single instance
export default new Database();

// All imports get same instance
import db from './singleton.js';

// ========== Best Practice Example ==========
// user-service.js
export class UserService {
  async getUser(id) {
    // Implementation
  }

  async createUser(data) {
    // Implementation
  }
}

export const userService = new UserService();

// constants.js
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

export const MAX_LOGIN_ATTEMPTS = 3;

// types.js (TypeScript-style comments)
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

export {};`,
      language: 'javascript',
      explanation: 'ES6 modules provide a standard way to organize and share JavaScript code. Use named exports for utilities and multiple functions, default exports for main module functionality. Dynamic imports enable code splitting and lazy loading. Always use relative paths for local modules and keep your module structure clean and organized.'
    }
  },
  {
    id: '11',
    title: 'DOM Manipulation',
    category: 'Web Development',
    difficulty: 'Beginner',
    description: 'Learn to interact with the Document Object Model: selecting elements, modifying content, and handling events',
    estimatedTime: 20,
    content: `# DOM Manipulation

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page structure as a tree of objects that JavaScript can manipulate.

## Selecting Elements

### querySelector
Select first matching element

### querySelectorAll
Select all matching elements

### getElementById
Select by ID (fast)

### getElementsByClassName
Select by class name

### getElementsByTagName
Select by tag name

## Modifying Content

### textContent
Plain text content

### innerHTML
HTML content (use carefully)

### innerText
Visible text content

## Modifying Attributes

### setAttribute
Set attribute value

### getAttribute
Get attribute value

### removeAttribute
Remove attribute

### classList
Add/remove CSS classes

## Creating Elements

### createElement
Create new element

### appendChild
Add child element

### insertBefore
Insert at specific position

### removeChild
Remove element

## Event Handling

### addEventListener
Attach event listener

### Event Object
Information about the event

### Event Delegation
Handle events on parent element

## Styling Elements

### style Property
Inline styles

### classList
CSS class manipulation

## Best Practices

### Cache Selectors
Store DOM references

### Batch Updates
Minimize reflows/repaints

### Event Delegation
Efficient event handling`,
    codeExample: {
      code: `// SELECTING ELEMENTS
const header = document.querySelector('header');
const buttons = document.querySelectorAll('.btn');
const userList = document.getElementById('user-list');
const items = document.getElementsByClassName('item');
const paragraphs = document.getElementsByTagName('p');

// MODIFYING CONTENT
const title = document.querySelector('h1');
title.textContent = 'New Title'; // Plain text
title.innerHTML = '<span>New</span> Title'; // HTML

// MODIFYING ATTRIBUTES
const link = document.querySelector('a');
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
console.log(link.getAttribute('href'));
link.removeAttribute('target');

// WORKING WITH CLASSES
const box = document.querySelector('.box');
box.classList.add('active');
box.classList.remove('hidden');
box.classList.toggle('highlight');
console.log(box.classList.contains('active')); // true

// CREATING AND ADDING ELEMENTS
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'message';
newDiv.id = 'greeting';

document.body.appendChild(newDiv);

// Create complex structure
const card = document.createElement('div');
card.className = 'card';

const cardTitle = document.createElement('h3');
cardTitle.textContent = 'Card Title';
card.appendChild(cardTitle);

const cardContent = document.createElement('p');
cardContent.textContent = 'Card content here';
card.appendChild(cardContent);

document.body.appendChild(card);

// REMOVING ELEMENTS
const oldElement = document.getElementById('old');
oldElement.remove(); // Modern way
// Or: oldElement.parentNode.removeChild(oldElement); // Old way

// EVENT HANDLING
const button = document.querySelector('#myButton');

button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event:', event.type);
  console.log('Target:', event.target);
});

// Arrow function event handler
button.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default action
  console.log('Clicked');
});

// EVENT DELEGATION (efficient for many elements)
const list = document.querySelector('#todo-list');

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains('edit-btn')) {
    const item = e.target.parentElement;
    // Edit logic
  }
});

// MODIFYING STYLES
const box2 = document.querySelector('.box');
box2.style.backgroundColor = 'blue';
box2.style.width = '200px';
box2.style.padding = '20px';

// Multiple styles
Object.assign(box2.style, {
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '10px'
});

// FORM HANDLING
const form = document.querySelector('#myForm');
const input = document.querySelector('#nameInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (value) {
    console.log('Form submitted:', value);
    input.value = ''; // Clear input
  }
});

// INPUT EVENTS
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

input.addEventListener('focus', () => {
  input.style.borderColor = 'blue';
});

input.addEventListener('blur', () => {
  input.style.borderColor = '';
});

// PRACTICAL EXAMPLE: Todo List
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();

  if (text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    todoInput.value = '';
  }
});

// Event delegation for delete buttons
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});

// DATASET ATTRIBUTES
const user = document.querySelector('.user');
user.dataset.userId = '123';
user.dataset.role = 'admin';

console.log(user.dataset.userId); // "123"

// CHECKING ELEMENT PROPERTIES
console.log(input.value);
console.log(checkbox.checked);
console.log(select.selectedIndex);`,
      language: 'javascript',
      explanation: 'DOM manipulation is essential for creating interactive web pages. Use querySelector for modern element selection, addEventListener for event handling, and classList for class manipulation. Always cache DOM references in variables for better performance, and use event delegation for dynamically created elements.'
    }
  },
  {
    id: '12',
    title: 'Local Storage',
    category: 'Web Development',
    difficulty: 'Beginner',
    description: 'Store data in the browser with localStorage and sessionStorage APIs for persistent user data',
    estimatedTime: 15,
    content: `# Local Storage

Web Storage API allows you to store data in the browser, persisting across page reloads and even browser restarts.

## localStorage vs sessionStorage

### localStorage
- Persists until explicitly cleared
- Shared across all tabs/windows
- ~5-10MB storage limit

### sessionStorage
- Clears when tab/window closes
- Separate for each tab/window
- Same storage limit

## Basic Operations

### setItem()
Store data as key-value pairs

### getItem()
Retrieve stored data

### removeItem()
Delete specific item

### clear()
Delete all stored data

## Storing Complex Data

### JSON.stringify()
Convert objects to strings

### JSON.parse()
Convert strings back to objects

## Use Cases

### User Preferences
Theme, language, settings

### Form Data
Save progress, drafts

### Shopping Cart
Persist cart items

### Authentication
Store tokens (with security considerations)

## Limitations

### Storage Limits
5-10MB per origin

### Synchronous API
Blocks main thread

### String Only
Must serialize objects

### Security
Accessible to JavaScript (XSS risk)

## Best Practices

### Error Handling
Storage might be full or disabled

### Validation
Check data before using

### Expiration
Implement manual expiration

### Security
Never store sensitive data`,
    codeExample: {
      code: `// BASIC OPERATIONS
// Store data
localStorage.setItem('username', 'Alice');
localStorage.setItem('theme', 'dark');

// Retrieve data
const username = localStorage.getItem('username');
console.log(username); // "Alice"

// Remove item
localStorage.removeItem('theme');

// Clear all
localStorage.clear();

// STORING OBJECTS (must stringify)
const user = {
  name: 'Bob',
  age: 30,
  preferences: {
    theme: 'light',
    language: 'en'
  }
};

// Save object
localStorage.setItem('user', JSON.stringify(user));

// Retrieve object
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // "Bob"

// STORING ARRAYS
const items = ['apple', 'banana', 'orange'];
localStorage.setItem('cart', JSON.stringify(items));

const cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart); // ['apple', 'banana', 'orange']

// CHECKING IF KEY EXISTS
if (localStorage.getItem('username')) {
  console.log('Username exists');
} else {
  console.log('Username not found');
}

// ERROR HANDLING
const saveData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage limit exceeded');
    } else {
      console.error('Failed to save:', error);
    }
    return false;
  }
};

const loadData = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load:', error);
    return defaultValue;
  }
};

// STORAGE HELPER CLASS
class StorageHelper {
  static save(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(\`Error saving \${key}:\`, error);
      return false;
    }
  }

  static load(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(\`Error loading \${key}:\`, error);
      return defaultValue;
    }
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static exists(key) {
    return localStorage.getItem(key) !== null;
  }
}

// Usage
StorageHelper.save('settings', { theme: 'dark', size: 'large' });
const settings = StorageHelper.load('settings', { theme: 'light' });

// EXPIRATION HANDLING
class ExpiringStorage {
  static save(key, value, expiresInMinutes) {
    const item = {
      value: value,
      expiry: Date.now() + (expiresInMinutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static load(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);

    // Check if expired
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }
}

// Save for 30 minutes
ExpiringStorage.save('session', { userId: 123 }, 30);

// Load (returns null if expired)
const session = ExpiringStorage.load('session');

// PRACTICAL EXAMPLE: Shopping Cart
class ShoppingCart {
  constructor() {
    this.storageKey = 'shopping-cart';
    this.items = this.load();
  }

  load() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.save();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 999 });
cart.addItem({ id: 2, name: 'Mouse', price: 25 });
console.log(cart.getTotal()); // 1024

// STORAGE EVENTS (listen for changes in other tabs)
window.addEventListener('storage', (e) => {
  console.log('Storage changed:');
  console.log('Key:', e.key);
  console.log('Old value:', e.oldValue);
  console.log('New value:', e.newValue);

  // Sync UI with storage changes
  if (e.key === 'cart') {
    updateCartUI();
  }
});

// SESSION STORAGE (clears on tab close)
sessionStorage.setItem('tempData', 'This persists only for this session');

// Check storage availability
const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

if (isStorageAvailable()) {
  console.log('Storage is available');
} else {
  console.warn('Storage is not available or disabled');
}`,
      language: 'javascript',
      explanation: 'localStorage provides persistent client-side storage for web applications. Always stringify objects before storing and parse when retrieving. Implement error handling for storage operations and consider adding expiration logic for time-sensitive data. Never store sensitive information like passwords or tokens in localStorage due to XSS vulnerabilities.'
    }
  },
  {
    id: '13',
    title: 'Regular Expressions',
    category: 'Advanced Concepts',
    difficulty: 'Advanced',
    description: 'Master pattern matching with regex: syntax, common patterns, validation, and text processing',
    estimatedTime: 25,
    content: `# Regular Expressions

Regular expressions (regex) are patterns used to match character combinations in strings. They're powerful tools for validation, searching, and text manipulation.

## Regex Basics

### Creating Regex
Literal notation /pattern/flags or RegExp constructor

### Flags
- g: Global (all matches)
- i: Case-insensitive
- m: Multi-line
- s: Dot matches newline
- u: Unicode
- y: Sticky

## Basic Patterns

### Literals
Exact character matches

### Character Classes
Match any character in set

### Ranges
[a-z] [0-9]

### Negation
[^abc] matches anything except a, b, c

## Special Characters

### Meta Characters
. ^ $ * + ? { } [ ] \ | ( )

### Escape Sequences
\\d digit, \\w word, \\s whitespace
\\D \\W \\S (negations)

### Anchors
^ start, $ end, \\b word boundary

## Quantifiers

### Exact
{n} exactly n times

### Range
{n,m} between n and m times

### Shorthand
* (0+), + (1+), ? (0 or 1)

## Groups and Capturing

### Capturing Groups
(pattern) captures matched text

### Non-capturing Groups
(?:pattern) groups without capturing

### Backreferences
\\1 \\2 reference captured groups

## Common Patterns

### Email Validation
Complex but useful pattern

### Phone Numbers
Various formats

### URLs
Match web addresses

### Dates
Different date formats

## Regex Methods

### test()
Check if pattern matches

### exec()
Get match details

### match()
Find matches in string

### replace()
Replace matched text

### split()
Split string by pattern`,
    codeExample: {
      code: `// CREATING REGEX
const pattern1 = /hello/;
const pattern2 = new RegExp('hello');
const caseInsensitive = /hello/i;
const global = /hello/g;

// BASIC MATCHING
const text = "Hello World";
console.log(/hello/i.test(text)); // true
console.log(/goodbye/.test(text)); // false

// CHARACTER CLASSES
const hasVowel = /[aeiou]/.test("hello"); // true
const hasDigit = /[0-9]/.test("abc123"); // true
const hasLetter = /[a-zA-Z]/.test("Hello"); // true

// SPECIAL CHARACTERS
const digitPattern = /\\d+/; // One or more digits
const wordPattern = /\\w+/; // One or more word chars
const spacePattern = /\\s+/; // One or more spaces

console.log(/\\d+/.test("abc123")); // true
console.log(/^\\d+$/.test("123")); // true (only digits)
console.log(/^\\d+$/.test("123abc")); // false

// QUANTIFIERS
const exactThree = /\\d{3}/; // Exactly 3 digits
const threeToFive = /\\d{3,5}/; // 3 to 5 digits
const threeOrMore = /\\d{3,}/; // 3 or more digits

const zeroOrMore = /a*/; // 0 or more 'a'
const oneOrMore = /a+/; // 1 or more 'a'
const zeroOrOne = /a?/; // 0 or 1 'a'

// ANCHORS
const startsWithHello = /^hello/i;
const endsWithWorld = /world$/i;
const exactMatch = /^hello$/i;

console.log(/^hello/.test("hello world")); // true
console.log(/^hello/.test("say hello")); // false
console.log(/world$/.test("hello world")); // true

// WORD BOUNDARIES
const wordBoundary = /\\bcat\\b/;
console.log(wordBoundary.test("cat")); // true
console.log(wordBoundary.test("catch")); // false
console.log(wordBoundary.test("the cat runs")); // true

// CAPTURING GROUPS
const datePattern = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = "2024-01-15".match(datePattern);
console.log(match[0]); // "2024-01-15" (full match)
console.log(match[1]); // "2024" (year)
console.log(match[2]); // "01" (month)
console.log(match[3]); // "15" (day)

// NON-CAPTURING GROUP
const nonCapturing = /(?:\\d{3})-\\d{4}/;

// BACKREFERENCES
const repeatedWord = /\\b(\\w+)\\s+\\1\\b/;
console.log(repeatedWord.test("hello hello")); // true
console.log(repeatedWord.test("hello world")); // false

// EMAIL VALIDATION
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailPattern.test("user@example.com")); // true
console.log(emailPattern.test("invalid.email")); // false

// PHONE NUMBER VALIDATION
const phonePattern = /^\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/;
console.log(phonePattern.test("(123) 456-7890")); // true
console.log(phonePattern.test("123-456-7890")); // true
console.log(phonePattern.test("1234567890")); // true

// URL VALIDATION
const urlPattern = /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/;
console.log(urlPattern.test("https://example.com")); // true

// PASSWORD VALIDATION
// At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
console.log(passwordPattern.test("Pass123!")); // true
console.log(passwordPattern.test("weak")); // false

// STRING METHODS WITH REGEX

// match() - Find matches
const text2 = "The year is 2024, not 2023";
const years = text2.match(/\\d{4}/g);
console.log(years); // ["2024", "2023"]

// replace() - Replace matches
const censored = "Hello damn world".replace(/damn/gi, "****");
console.log(censored); // "Hello **** world"

// Replace with function
const text3 = "hello world";
const capitalized = text3.replace(/\\b\\w/g, char => char.toUpperCase());
console.log(capitalized); // "Hello World"

// split() - Split by pattern
const words = "hello,world;test".split(/[,;]/);
console.log(words); // ["hello", "world", "test"]

// exec() - Get match details
const pattern = /\\d+/g;
const text4 = "abc123def456";
let result;
while ((result = pattern.exec(text4)) !== null) {
  console.log(\`Found \${result[0]} at index \${result.index}\`);
}
// Found 123 at index 3
// Found 456 at index 9

// PRACTICAL EXAMPLES

// Extract hashtags
const extractHashtags = (text) => {
  return text.match(/#[a-zA-Z0-9_]+/g) || [];
};
console.log(extractHashtags("Love #javascript and #coding"));
// ["#javascript", "#coding"]

// Validate credit card (basic)
const validateCreditCard = (number) => {
  const cleaned = number.replace(/\\s/g, '');
  return /^\\d{16}$/.test(cleaned);
};

// Format phone number
const formatPhone = (phone) => {
  const cleaned = phone.replace(/\\D/g, '');
  const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
  return match ? \`(\${match[1]}) \${match[2]}-\${match[3]}\` : phone;
};
console.log(formatPhone("1234567890"));
// "(123) 456-7890"

// Remove HTML tags
const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, '');
};
console.log(stripHtml("<p>Hello <b>World</b></p>"));
// "Hello World"

// Validate username (alphanumeric, 3-16 chars)
const validateUsername = (username) => {
  return /^[a-zA-Z0-9_]{3,16}$/.test(username);
};`,
      language: 'javascript',
      explanation: 'Regular expressions are powerful tools for pattern matching and text processing. Master the basic character classes (\\d, \\w, \\s), quantifiers (+, *, ?), and anchors (^, $). Use capturing groups to extract parts of matches. Always test your regex patterns thoroughly and consider readability - complex regex can be hard to maintain.'
    }
  },
  {
    id: '14',
    title: 'Fetch API',
    category: 'Web Development',
    difficulty: 'Intermediate',
    description: 'Master HTTP requests with the Fetch API: GET, POST, headers, error handling, and best practices',
    estimatedTime: 20,
    content: `# Fetch API

The Fetch API provides a modern, promise-based way to make HTTP requests in JavaScript, replacing the older XMLHttpRequest.

## Basic Fetch

### Simple GET Request
Fetch returns a Promise

### Response Object
Contains status, headers, body

### Reading Response
.json(), .text(), .blob()

## Request Options

### Method
GET, POST, PUT, DELETE, PATCH

### Headers
Content-Type, Authorization, etc.

### Body
Request payload (POST/PUT)

### Credentials
Include cookies/auth

## Error Handling

### Network Errors
Catch network failures

### HTTP Errors
Check response.ok

### Timeout
Implement request timeout

## Common Patterns

### GET Request
Retrieve data

### POST Request
Send data to server

### Authentication
Bearer tokens, API keys

### File Upload
FormData for files

## Advanced Features

### Abort Controller
Cancel requests

### Request Interceptors
Modify before sending

### Response Caching
Optimize performance

## Best Practices

### Error Handling
Always catch errors

### Loading States
Show loading indicators

### Retry Logic
Handle transient failures

### Security
Validate responses`,
    codeExample: {
      code: `// BASIC GET REQUEST
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// ASYNC/AWAIT (cleaner)
const getUsers = async () => {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// CHECK RESPONSE STATUS
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// POST REQUEST
const createUser = async (userData) => {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Usage
createUser({
  name: 'Alice',
  email: 'alice@example.com'
});

// PUT REQUEST (update)
const updateUser = async (userId, updates) => {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });

  return response.json();
};

// DELETE REQUEST
const deleteUser = async (userId) => {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
    method: 'DELETE'
  });

  return response.ok;
};

// AUTHENTICATION WITH BEARER TOKEN
const fetchWithAuth = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

// UPLOAD FILE
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);

  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData
    // Don't set Content-Type header - browser will set it with boundary
  });

  return response.json();
};

// ABORT CONTROLLER (cancel request)
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    }
    throw error;
  }
};

// API CLIENT CLASS
class ApiClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;

    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(\`API request failed: \${url}\`, error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Usage
const api = new ApiClient('https://api.example.com');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'Alice' });

// RETRY LOGIC
const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      return response;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// PARALLEL REQUESTS
const fetchMultiple = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users').then(r => r.json()),
      fetch('https://api.example.com/posts').then(r => r.json()),
      fetch('https://api.example.com/comments').then(r => r.json())
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// QUERY PARAMETERS
const buildURL = (baseURL, params = {}) => {
  const url = new URL(baseURL);
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  return url.toString();
};

const searchUsers = async (filters) => {
  const url = buildURL('https://api.example.com/users', filters);
  const response = await fetch(url);
  return response.json();
};

// Usage
searchUsers({ role: 'admin', active: true });
// https://api.example.com/users?role=admin&active=true

// DOWNLOAD FILE
const downloadFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
};`,
      language: 'javascript',
      explanation: 'The Fetch API is the modern standard for making HTTP requests. Always check response.ok and handle both network errors and HTTP errors. Use async/await for cleaner code, implement timeout and retry logic for robustness, and create reusable API client classes for consistency across your application.'
    }
  },
  {
    id: '15',
    title: 'Performance Optimization',
    category: 'Best Practices',
    difficulty: 'Advanced',
    description: 'Learn techniques to optimize JavaScript performance: debouncing, throttling, memoization, and best practices',
    estimatedTime: 25,
    content: `# Performance Optimization

Writing performant JavaScript is crucial for creating fast, responsive applications. Learn techniques to optimize your code and improve user experience.

## Debouncing

### Definition
Delay function execution until after a pause in events

### Use Cases
Search input, window resize, scroll

### Implementation
setTimeout with clearing

## Throttling

### Definition
Limit function execution rate

### Use Cases
Scroll handlers, mouse movement

### Implementation
Time-based gating

## Memoization

### Definition
Cache function results

### Use Cases
Expensive calculations, recursive functions

### Implementation
Store results by input

## DOM Optimization

### Batch Updates
Minimize reflows/repaints

### Document Fragments
Build DOM offline

### Event Delegation
Fewer event listeners

## Loop Optimization

### Cache Length
Don't recalculate each iteration

### Avoid Heavy Operations
Move outside loops

### Early Exit
Break when possible

## Memory Management

### Avoid Memory Leaks
Clear event listeners

### Weak References
WeakMap, WeakSet

### Garbage Collection
Help GC by nullifying references

## Async Optimization

### Parallel Requests
Use Promise.all()

### Code Splitting
Load only needed code

### Lazy Loading
Defer non-critical resources

## Best Practices

### Use const/let
Better optimization by engine

### Avoid eval()
Security and performance issues

### Use Web Workers
Offload heavy computation

### Measure Performance
Use Performance API`,
    codeExample: {
      code: `// DEBOUNCING
const debounce = (func, delay) => {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Usage: Search input
const searchInput = document.querySelector('#search');
const performSearch = (query) => {
  console.log('Searching for:', query);
  // API call here
};

const debouncedSearch = debounce(performSearch, 500);
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// THROTTLING
const throttle = (func, limit) => {
  let inThrottle;

  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Usage: Scroll handler
const handleScroll = () => {
  console.log('Scroll position:', window.scrollY);
};

const throttledScroll = throttle(handleScroll, 200);
window.addEventListener('scroll', throttledScroll);

// MEMOIZATION
const memoize = (fn) => {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('Cache hit');
      return cache.get(key);
    }

    console.log('Computing result');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Expensive function
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const memoizedFib = memoize(fibonacci);
console.log(memoizedFib(40)); // Slow first time
console.log(memoizedFib(40)); // Instant (cached)

// DOM OPTIMIZATION - Batch Updates
// BAD: Multiple reflows
const list = document.querySelector('#list');
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i}\`;
  list.appendChild(li); // Reflow on each append!
}

// GOOD: Use Document Fragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
list.appendChild(fragment); // Single reflow

// EVENT DELEGATION
// BAD: Listener on each item
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// GOOD: Single listener on parent
const container = document.querySelector('#container');
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
});

// LOOP OPTIMIZATION
const arr = [1, 2, 3, 4, 5];

// BAD: Recalculates length each iteration
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// GOOD: Cache length
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i]);
}

// BEST: Modern syntax
for (const item of arr) {
  console.log(item);
}

// AVOID MEMORY LEAKS
class Component {
  constructor() {
    this.handler = this.handleClick.bind(this);
    document.addEventListener('click', this.handler);
  }

  handleClick() {
    // Handle click
  }

  destroy() {
    // IMPORTANT: Remove event listener
    document.removeEventListener('click', this.handler);
  }
}

// LAZY LOADING IMAGES
const lazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// PERFORMANCE MEASUREMENT
const measurePerformance = (fn, label) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(\`\${label} took \${end - start}ms\`);
};

measurePerformance(() => {
  // Your code here
}, 'My Operation');

// DEBOUNCED RESIZE HANDLER
const handleResize = debounce(() => {
  console.log('Window resized:', window.innerWidth);
}, 250);

window.addEventListener('resize', handleResize);

// REQUEST ANIMATION FRAME
let lastScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  lastScrollPosition = window.scrollY;

  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollIndicator(lastScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

// WEB WORKERS (offload heavy computation)
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: heavyData });

worker.onmessage = (e) => {
  console.log('Result from worker:', e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = performHeavyComputation(e.data);
  self.postMessage(result);
};

// OBJECT POOLING (reuse objects)
class ObjectPool {
  constructor(createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
  }

  acquire() {
    return this.pool.length > 0
      ? this.pool.pop()
      : this.createFn();
  }

  release(obj) {
    this.resetFn(obj);
    this.pool.push(obj);
  }
}

// AVOID LAYOUT THRASHING
// BAD: Interleaved reads and writes
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
});

// GOOD: Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});`,
      language: 'javascript',
      explanation: 'Performance optimization requires understanding when and why code is slow. Use debouncing for frequent events, memoization for expensive calculations, and batch DOM operations to minimize reflows. Always measure before optimizing - use the Performance API and browser DevTools to identify actual bottlenecks. Remember: premature optimization is the root of all evil, but informed optimization is essential for good user experience.'
    }
  }
];

// Note: Due to length constraints, I'll create the quizzes separately
export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    lessonId: '1',
    questions: [
      {
        id: 'q1-1',
        question: 'Which keyword should you use for a variable that will NOT be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'Use "const" for variables that won\'t be reassigned. It creates a read-only reference and is the default choice in modern JavaScript.'
      },
      {
        id: 'q1-2',
        question: 'What is the result of: typeof null',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctAnswer: 2,
        explanation: 'This is a known JavaScript quirk. typeof null returns "object" due to a legacy bug that cannot be fixed without breaking existing code.'
      },
      {
        id: 'q1-3',
        question: 'Which of these is NOT a primitive data type in JavaScript?',
        options: ['String', 'Number', 'Array', 'Boolean'],
        correctAnswer: 2,
        explanation: 'Array is an object type, not a primitive. The 7 primitive types are: string, number, boolean, null, undefined, symbol, and bigint.'
      },
      {
        id: 'q1-4',
        question: 'What happens when you try to change a property of a const object?',
        options: [
          'Error: Cannot modify const',
          'The property is successfully changed',
          'The entire object becomes null',
          'Nothing happens'
        ],
        correctAnswer: 1,
        explanation: 'const prevents reassignment of the variable, but does not make the object immutable. You can still modify properties, add new ones, or delete existing ones.'
      },
      {
        id: 'q1-5',
        question: 'What is the main difference between let and var?',
        options: [
          'let is faster than var',
          'let is block-scoped, var is function-scoped',
          'var is newer than let',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'let is block-scoped (limited to the block where it\'s declared), while var is function-scoped (available throughout the entire function). This makes let more predictable and less error-prone.'
      }
    ]
  },
  {
    id: 'quiz-2',
    lessonId: '2',
    questions: [
      {
        id: 'q2-1',
        question: 'Which arrow function syntax is correct for returning a value directly?',
        options: [
          'const add = (a, b) => { a + b }',
          'const add = (a, b) => a + b',
          'const add = (a, b) -> a + b',
          'const add = a, b => a + b'
        ],
        correctAnswer: 1,
        explanation: 'Arrow functions with a single expression can omit braces and the return keyword for implicit return: (a, b) => a + b'
      },
      {
        id: 'q2-2',
        question: 'What is a closure in JavaScript?',
        options: [
          'A way to close browser windows',
          'A function that has access to variables in its outer scope',
          'A method to end function execution',
          'A type of loop'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that retains access to variables from its outer (enclosing) scope, even after the outer function has finished executing. This enables data privacy and function factories.'
      },
      {
        id: 'q2-3',
        question: 'What does the rest parameter (...args) do?',
        options: [
          'Pauses function execution',
          'Spreads an array into individual elements',
          'Collects all remaining arguments into an array',
          'Makes the function sleep'
        ],
        correctAnswer: 2,
        explanation: 'The rest parameter (...args) collects all remaining function arguments into a real array, making it easy to handle functions with variable numbers of parameters.'
      },
      {
        id: 'q2-4',
        question: 'How does "this" behave in arrow functions?',
        options: [
          'It has its own this binding',
          'It inherits this from the parent scope',
          'It is always undefined',
          'It points to the global object'
        ],
        correctAnswer: 1,
        explanation: 'Arrow functions don\'t have their own "this" binding. They lexically inherit "this" from the enclosing scope, which is particularly useful for callbacks and event handlers.'
      }
    ]
  },
  {
    id: 'quiz-3',
    lessonId: '3',
    questions: [
      {
        id: 'q3-1',
        question: 'What does the map() method return?',
        options: [
          'The original array',
          'A new array with transformed elements',
          'A single value',
          'undefined'
        ],
        correctAnswer: 1,
        explanation: 'map() creates a new array with the results of calling a function on every element. The new array has the same length as the original.'
      },
      {
        id: 'q3-2',
        question: 'Which method would you use to find the sum of all numbers in an array?',
        options: ['map()', 'filter()', 'reduce()', 'find()'],
        correctAnswer: 2,
        explanation: 'reduce() combines all elements into a single value by applying a function to each element and accumulating the result, making it perfect for summing numbers.'
      },
      {
        id: 'q3-3',
        question: 'What does filter() do?',
        options: [
          'Transforms each element',
          'Returns elements that pass a test',
          'Sorts the array',
          'Finds the first match'
        ],
        correctAnswer: 1,
        explanation: 'filter() creates a new array containing only the elements that pass the test implemented by the provided function. Elements that return false are excluded.'
      },
      {
        id: 'q3-4',
        question: 'What is the difference between slice() and splice()?',
        options: [
          'slice() modifies the original, splice() doesn\'t',
          'splice() modifies the original, slice() doesn\'t',
          'They are the same',
          'splice() is faster'
        ],
        correctAnswer: 1,
        explanation: 'splice() modifies the original array by adding/removing elements, while slice() returns a new array without modifying the original. Remember: "splice" has a "p" for "permanent change".'
      },
      {
        id: 'q3-5',
        question: 'What does flat() do to nested arrays?',
        options: [
          'Converts array to object',
          'Removes duplicate elements',
          'Flattens nested arrays into a single level',
          'Sorts the array'
        ],
        correctAnswer: 2,
        explanation: 'flat() creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. flat(Infinity) flattens all levels.'
      }
    ]
  },
  {
    id: 'quiz-4',
    lessonId: '4',
    questions: [
      {
        id: 'q4-1',
        question: 'What is the correct way to access a property with a space in its name?',
        options: [
          'object.property name',
          'object["property name"]',
          'object->property name',
          'object::property name'
        ],
        correctAnswer: 1,
        explanation: 'Bracket notation must be used for property names with spaces or special characters. Dot notation only works with valid identifier names.'
      },
      {
        id: 'q4-2',
        question: 'What does Object.keys() return?',
        options: [
          'An array of property values',
          'An array of property names',
          'An array of [key, value] pairs',
          'A string of property names'
        ],
        correctAnswer: 1,
        explanation: 'Object.keys() returns an array containing all of the object\'s own enumerable property names (keys).'
      },
      {
        id: 'q4-3',
        question: 'What does the spread operator do with objects?',
        options: [
          'Deletes all properties',
          'Creates a shallow copy',
          'Converts object to array',
          'Freezes the object'
        ],
        correctAnswer: 1,
        explanation: 'The spread operator (...) creates a shallow copy of an object, copying all enumerable properties to a new object.'
      },
      {
        id: 'q4-4',
        question: 'What is optional chaining (?.) used for?',
        options: [
          'Checking if a value is null',
          'Safely accessing nested properties',
          'Creating optional properties',
          'Deleting properties'
        ],
        correctAnswer: 1,
        explanation: 'Optional chaining (?.) allows you to safely access deeply nested properties without having to check if each level exists, returning undefined if any part is null/undefined.'
      },
      {
        id: 'q4-5',
        question: 'In destructuring, what does { name: userName } do?',
        options: [
          'Creates a property called userName',
          'Extracts name property and assigns it to userName variable',
          'Renames the property in the object',
          'Creates an error'
        ],
        correctAnswer: 1,
        explanation: 'This syntax extracts the "name" property from the object and assigns its value to a new variable called "userName". The original property name remains "name".'
      }
    ]
  },
  {
    id: 'quiz-5',
    lessonId: '5',
    questions: [
      {
        id: 'q5-1',
        question: 'What does the await keyword do?',
        options: [
          'Creates a new Promise',
          'Pauses execution until Promise resolves',
          'Rejects a Promise',
          'Chains Promises'
        ],
        correctAnswer: 1,
        explanation: 'await pauses the execution of an async function until the Promise is resolved or rejected, making asynchronous code look and behave more like synchronous code.'
      },
      {
        id: 'q5-2',
        question: 'Where can you use the await keyword?',
        options: [
          'Anywhere in JavaScript',
          'Only in async functions',
          'Only in Promises',
          'Only in classes'
        ],
        correctAnswer: 1,
        explanation: 'await can only be used inside async functions (or at the top level in ES modules). Using it outside will result in a syntax error.'
      },
      {
        id: 'q5-3',
        question: 'What does Promise.all() do?',
        options: [
          'Waits for the first Promise to resolve',
          'Waits for all Promises to resolve',
          'Rejects all Promises',
          'Cancels all Promises'
        ],
        correctAnswer: 1,
        explanation: 'Promise.all() takes an array of Promises and returns a new Promise that resolves when all input Promises have resolved, or rejects if any Promise rejects.'
      },
      {
        id: 'q5-4',
        question: 'What happens if you don\'t use try/catch with await?',
        options: [
          'Nothing, errors are ignored',
          'The application crashes',
          'Unhandled Promise rejection',
          'Errors are automatically caught'
        ],
        correctAnswer: 2,
        explanation: 'Without try/catch, rejected Promises will result in unhandled Promise rejections, which can cause issues in your application. Always handle errors with try/catch or .catch().'
      },
      {
        id: 'q5-5',
        question: 'When should you use Promise.all() vs sequential awaits?',
        options: [
          'Always use Promise.all()',
          'When operations are independent and can run in parallel',
          'When one operation depends on another',
          'Never use Promise.all()'
        ],
        correctAnswer: 1,
        explanation: 'Use Promise.all() when operations are independent and can run concurrently for better performance. Use sequential awaits when one operation depends on the result of another.'
      }
    ]
  },
  {
    id: 'quiz-6',
    lessonId: '6',
    questions: [
      {
        id: 'q6-1',
        question: 'What is the correct syntax for template literals?',
        options: [
          '"Hello ${name}"',
          '\'Hello ${name}\'',
          '`Hello ${name}`',
          '<Hello ${name}>'
        ],
        correctAnswer: 2,
        explanation: 'Template literals use backticks (`) and allow string interpolation with ${expression} syntax.'
      },
      {
        id: 'q6-2',
        question: 'What does the spread operator do with arrays?',
        options: [
          'Deletes all elements',
          'Expands array elements',
          'Sorts the array',
          'Reverses the array'
        ],
        correctAnswer: 1,
        explanation: 'The spread operator (...) expands an array\'s elements, allowing you to copy arrays, merge arrays, or pass array elements as individual arguments.'
      },
      {
        id: 'q6-3',
        question: 'What is the difference between let and const?',
        options: [
          'let is faster',
          'const cannot be reassigned, let can',
          'const is block-scoped, let is not',
          'No difference'
        ],
        correctAnswer: 1,
        explanation: 'const creates a binding that cannot be reassigned, while let creates a binding that can be reassigned. Both are block-scoped.'
      },
      {
        id: 'q6-4',
        question: 'What does array destructuring allow you to do?',
        options: [
          'Delete array elements',
          'Sort array elements',
          'Extract values into variables',
          'Combine arrays'
        ],
        correctAnswer: 2,
        explanation: 'Array destructuring allows you to unpack values from arrays into distinct variables in a single statement.'
      },
      {
        id: 'q6-5',
        question: 'What is the property shorthand in objects?',
        options: [
          'A way to delete properties',
          'Omitting the value when it matches the variable name',
          'Making properties private',
          'Renaming properties'
        ],
        correctAnswer: 1,
        explanation: 'Property shorthand allows you to write { name } instead of { name: name } when the property name and variable name are the same.'
      }
    ]
  },
  {
    id: 'quiz-7',
    lessonId: '7',
    questions: [
      {
        id: 'q7-1',
        question: 'What keyword is used to create a subclass?',
        options: [
          'inherit',
          'extends',
          'implements',
          'derive'
        ],
        correctAnswer: 1,
        explanation: 'The "extends" keyword is used to create a class that is a child of another class, establishing an inheritance relationship.'
      },
      {
        id: 'q7-2',
        question: 'What does the super keyword do?',
        options: [
          'Deletes the parent class',
          'Calls methods from the parent class',
          'Makes the class more powerful',
          'Creates a new class'
        ],
        correctAnswer: 1,
        explanation: 'super is used to call methods (including the constructor) from the parent class. It\'s required when using a constructor in a subclass.'
      },
      {
        id: 'q7-3',
        question: 'How do you create a private field in a class?',
        options: [
          'Use the private keyword',
          'Prefix with underscore _',
          'Prefix with hash #',
          'Use a special method'
        ],
        correctAnswer: 2,
        explanation: 'Private fields in JavaScript classes are created by prefixing the field name with a hash symbol (#). They are truly private and cannot be accessed outside the class.'
      },
      {
        id: 'q7-4',
        question: 'What is a static method?',
        options: [
          'A method that never changes',
          'A method called on the class itself, not instances',
          'A method that doesn\'t move',
          'A private method'
        ],
        correctAnswer: 1,
        explanation: 'Static methods are called on the class itself rather than on instances. They\'re useful for utility functions related to the class.'
      },
      {
        id: 'q7-5',
        question: 'What is the purpose of getters and setters?',
        options: [
          'To get and set the class name',
          'To control access to properties',
          'To create new properties',
          'To delete properties'
        ],
        correctAnswer: 1,
        explanation: 'Getters and setters provide controlled access to object properties, allowing you to add validation, computed values, or other logic when getting or setting property values.'
      }
    ]
  },
  {
    id: 'quiz-8',
    lessonId: '8',
    questions: [
      {
        id: 'q8-1',
        question: 'What block is used to handle errors in JavaScript?',
        options: [
          'try/catch',
          'if/else',
          'switch/case',
          'do/while'
        ],
        correctAnswer: 0,
        explanation: 'try/catch blocks are used to handle errors. Code that might throw an error goes in the try block, and error handling goes in the catch block.'
      },
      {
        id: 'q8-2',
        question: 'What does the finally block do?',
        options: [
          'Only runs if there\'s an error',
          'Only runs if there\'s no error',
          'Always runs, regardless of errors',
          'Never runs'
        ],
        correctAnswer: 2,
        explanation: 'The finally block always executes after try and catch, regardless of whether an error occurred. It\'s useful for cleanup operations.'
      },
      {
        id: 'q8-3',
        question: 'How do you create a custom error?',
        options: [
          'Use the Error() function',
          'Extend the Error class',
          'Use throw "error"',
          'Call error.create()'
        ],
        correctAnswer: 1,
        explanation: 'Custom errors are created by extending the built-in Error class, allowing you to create application-specific error types with custom properties and behavior.'
      },
      {
        id: 'q8-4',
        question: 'What happens if you don\'t catch an error?',
        options: [
          'The error is ignored',
          'The program crashes/stops execution',
          'The error is automatically fixed',
          'Nothing happens'
        ],
        correctAnswer: 1,
        explanation: 'Uncaught errors will cause the program to stop execution (in Node.js) or be reported as unhandled errors (in browsers). Always handle errors appropriately.'
      },
      {
        id: 'q8-5',
        question: 'How do you handle errors in async/await?',
        options: [
          'Use .catch()',
          'Use try/catch',
          'Errors are automatic',
          'Use finally'
        ],
        correctAnswer: 1,
        explanation: 'With async/await, you use try/catch blocks to handle errors. The catch block will catch any rejected Promises from the awaited expressions.'
      }
    ]
  },
  {
    id: 'quiz-9',
    lessonId: '9',
    questions: [
      {
        id: 'q9-1',
        question: 'What is a closure?',
        options: [
          'A function that closes files',
          'A function that remembers its outer scope',
          'A way to end a program',
          'A type of loop'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that has access to variables from its outer (enclosing) lexical scope, even after the outer function has finished executing.'
      },
      {
        id: 'q9-2',
        question: 'What is lexical scope?',
        options: [
          'Global scope only',
          'Scope determined by where variables are declared',
          'Scope determined at runtime',
          'No scope at all'
        ],
        correctAnswer: 1,
        explanation: 'Lexical scope means that scope is determined by where variables and blocks of code are written in the source code, not where they are called.'
      },
      {
        id: 'q9-3',
        question: 'Why are closures useful for data privacy?',
        options: [
          'They encrypt data',
          'They hide variables from outer scope',
          'They make variables global',
          'They delete sensitive data'
        ],
        correctAnswer: 1,
        explanation: 'Closures can create private variables that are only accessible through returned functions, providing encapsulation and data privacy.'
      },
      {
        id: 'q9-4',
        question: 'What is memoization?',
        options: [
          'Remembering variable names',
          'Caching function results',
          'Memorizing code',
          'Saving files'
        ],
        correctAnswer: 1,
        explanation: 'Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again.'
      },
      {
        id: 'q9-5',
        question: 'What problem occurs with var in loops?',
        options: [
          'Syntax error',
          'All iterations share the same variable',
          'Loop runs forever',
          'No problem'
        ],
        correctAnswer: 1,
        explanation: 'var is function-scoped, not block-scoped, so all iterations of a loop share the same variable. Use let for proper block scoping in loops.'
      }
    ]
  },
  {
    id: 'quiz-10',
    lessonId: '10',
    questions: [
      {
        id: 'q10-1',
        question: 'What is the syntax for a named export?',
        options: [
          'default export const name',
          'export const name',
          'export default name',
          'module.exports = name'
        ],
        correctAnswer: 1,
        explanation: 'Named exports use the "export" keyword before the declaration: export const name = value. You can have multiple named exports per module.'
      },
      {
        id: 'q10-2',
        question: 'How many default exports can a module have?',
        options: [
          'Unlimited',
          'One',
          'Two',
          'None'
        ],
        correctAnswer: 1,
        explanation: 'A module can have only one default export, but it can have multiple named exports alongside the default export.'
      },
      {
        id: 'q10-3',
        question: 'What does import * as name do?',
        options: [
          'Imports only the default export',
          'Imports all named exports as a namespace object',
          'Deletes all exports',
          'Creates a new module'
        ],
        correctAnswer: 1,
        explanation: 'import * as name imports all named exports from a module and groups them under a namespace object.'
      },
      {
        id: 'q10-4',
        question: 'What are dynamic imports used for?',
        options: [
          'Static code analysis',
          'Loading modules conditionally or lazily',
          'Deleting modules',
          'Renaming modules'
        ],
        correctAnswer: 1,
        explanation: 'Dynamic imports (import()) allow you to load modules conditionally or on-demand, enabling code splitting and lazy loading.'
      },
      {
        id: 'q10-5',
        question: 'What is tree shaking?',
        options: [
          'Shaking your computer',
          'Removing unused exports during bundling',
          'Randomizing code',
          'Testing modules'
        ],
        correctAnswer: 1,
        explanation: 'Tree shaking is a build optimization that removes unused exports from your final bundle, reducing the size of your application.'
      }
    ]
  },
  {
    id: 'quiz-11',
    lessonId: '11',
    questions: [
      {
        id: 'q11-1',
        question: 'Which method selects the first matching element?',
        options: [
          'querySelectorAll()',
          'querySelector()',
          'getElementById()',
          'getElementsByClassName()'
        ],
        correctAnswer: 1,
        explanation: 'querySelector() returns the first element that matches the specified CSS selector, or null if no match is found.'
      },
      {
        id: 'q11-2',
        question: 'What is the difference between textContent and innerHTML?',
        options: [
          'No difference',
          'textContent is plain text, innerHTML parses HTML',
          'innerHTML is faster',
          'textContent doesn\'t work'
        ],
        correctAnswer: 1,
        explanation: 'textContent sets or gets plain text content, while innerHTML parses and sets HTML. Use textContent for security and performance unless you need HTML.'
      },
      {
        id: 'q11-3',
        question: 'What does classList.toggle() do?',
        options: [
          'Adds a class',
          'Removes a class',
          'Adds if absent, removes if present',
          'Renames a class'
        ],
        correctAnswer: 2,
        explanation: 'classList.toggle() adds the class if it\'s not present, or removes it if it is present. It\'s useful for toggling states like "active".'
      },
      {
        id: 'q11-4',
        question: 'What is event delegation?',
        options: [
          'Deleting events',
          'Attaching listener to parent instead of children',
          'Creating new events',
          'Renaming events'
        ],
        correctAnswer: 1,
        explanation: 'Event delegation attaches a single event listener to a parent element to handle events from child elements, which is more efficient than adding listeners to each child.'
      },
      {
        id: 'q11-5',
        question: 'What does createElement() do?',
        options: [
          'Selects an existing element',
          'Creates a new DOM element',
          'Deletes an element',
          'Copies an element'
        ],
        correctAnswer: 1,
        explanation: 'document.createElement() creates a new HTML element that can be configured and then added to the DOM using methods like appendChild().'
      }
    ]
  },
  {
    id: 'quiz-12',
    lessonId: '12',
    questions: [
      {
        id: 'q12-1',
        question: 'What is the difference between localStorage and sessionStorage?',
        options: [
          'No difference',
          'localStorage persists, sessionStorage clears on tab close',
          'sessionStorage is faster',
          'localStorage is bigger'
        ],
        correctAnswer: 1,
        explanation: 'localStorage persists until explicitly cleared, while sessionStorage clears when the browser tab/window is closed.'
      },
      {
        id: 'q12-2',
        question: 'What type of data can localStorage store?',
        options: [
          'Any JavaScript object',
          'Only strings',
          'Only numbers',
          'Only arrays'
        ],
        correctAnswer: 1,
        explanation: 'localStorage can only store strings. To store objects or arrays, you must use JSON.stringify() to convert them to strings first.'
      },
      {
        id: 'q12-3',
        question: 'How do you store an object in localStorage?',
        options: [
          'localStorage.setItem(key, object)',
          'localStorage.setItem(key, JSON.stringify(object))',
          'localStorage.object = object',
          'localStorage.save(object)'
        ],
        correctAnswer: 1,
        explanation: 'Objects must be converted to strings using JSON.stringify() before storing in localStorage. Use JSON.parse() when retrieving them.'
      },
      {
        id: 'q12-4',
        question: 'What happens if localStorage is full?',
        options: [
          'Old data is deleted',
          'QuotaExceededError is thrown',
          'New data overwrites old data',
          'Nothing happens'
        ],
        correctAnswer: 1,
        explanation: 'When storage quota is exceeded, a QuotaExceededError (or DOMException) is thrown. Always implement error handling for storage operations.'
      },
      {
        id: 'q12-5',
        question: 'Is it safe to store passwords in localStorage?',
        options: [
          'Yes, it\'s encrypted',
          'No, it\'s vulnerable to XSS attacks',
          'Yes, if using HTTPS',
          'Yes, it\'s private'
        ],
        correctAnswer: 1,
        explanation: 'Never store sensitive data like passwords or tokens in localStorage. It\'s accessible to any JavaScript code and vulnerable to XSS attacks.'
      }
    ]
  },
  {
    id: 'quiz-13',
    lessonId: '13',
    questions: [
      {
        id: 'q13-1',
        question: 'What does the regex /\\d+/ match?',
        options: [
          'One or more letters',
          'One or more digits',
          'Exactly one digit',
          'Any character'
        ],
        correctAnswer: 1,
        explanation: '\\d matches any digit (0-9), and the + quantifier means one or more occurrences, so /\\d+/ matches sequences of one or more digits.'
      },
      {
        id: 'q13-2',
        question: 'What does the ^ anchor represent?',
        options: [
          'End of string',
          'Start of string',
          'Word boundary',
          'Any character'
        ],
        correctAnswer: 1,
        explanation: 'The ^ anchor matches the start of a string. When used as /^pattern/, it ensures the pattern matches at the beginning of the string.'
      },
      {
        id: 'q13-3',
        question: 'What is the difference between test() and match()?',
        options: [
          'No difference',
          'test() returns boolean, match() returns array',
          'match() is faster',
          'test() modifies the string'
        ],
        correctAnswer: 1,
        explanation: 'test() returns true/false indicating if a match exists, while match() returns an array of matches (or null if no match).'
      },
      {
        id: 'q13-4',
        question: 'What does the g flag do?',
        options: [
          'Case-insensitive matching',
          'Global matching (find all matches)',
          'Greedy matching',
          'Group matching'
        ],
        correctAnswer: 1,
        explanation: 'The g (global) flag makes the regex find all matches in the string, not just the first one.'
      },
      {
        id: 'q13-5',
        question: 'What does [^abc] match?',
        options: [
          'a, b, or c',
          'Any character except a, b, or c',
          'Start of string',
          'End of string'
        ],
        correctAnswer: 1,
        explanation: 'Inside square brackets, ^ means negation. [^abc] matches any character that is NOT a, b, or c.'
      }
    ]
  },
  {
    id: 'quiz-14',
    lessonId: '14',
    questions: [
      {
        id: 'q14-1',
        question: 'What does fetch() return?',
        options: [
          'The response data',
          'A Promise',
          'An error',
          'Nothing'
        ],
        correctAnswer: 1,
        explanation: 'fetch() returns a Promise that resolves to the Response object representing the response to the request.'
      },
      {
        id: 'q14-2',
        question: 'How do you check if a fetch request was successful?',
        options: [
          'Check response.success',
          'Check response.ok',
          'Check response.status === 200',
          'Fetch always succeeds'
        ],
        correctAnswer: 1,
        explanation: 'response.ok is a boolean that is true if the response status is in the range 200-299. Always check this before processing the response.'
      },
      {
        id: 'q14-3',
        question: 'How do you send JSON data in a POST request?',
        options: [
          'Set body to the object directly',
          'Use JSON.stringify() and set Content-Type header',
          'Use JSON.parse()',
          'Fetch automatically handles it'
        ],
        correctAnswer: 1,
        explanation: 'To send JSON, you must stringify the object with JSON.stringify() and set the Content-Type header to "application/json".'
      },
      {
        id: 'q14-4',
        question: 'What is AbortController used for?',
        options: [
          'Retrying requests',
          'Canceling fetch requests',
          'Speeding up requests',
          'Logging requests'
        ],
        correctAnswer: 1,
        explanation: 'AbortController allows you to cancel one or more fetch requests when needed, which is useful for implementing timeouts or cleaning up pending requests.'
      },
      {
        id: 'q14-5',
        question: 'Does fetch() reject on HTTP error statuses (like 404)?',
        options: [
          'Yes, always',
          'No, only on network failures',
          'Only on 500 errors',
          'Yes, but only 404'
        ],
        correctAnswer: 1,
        explanation: 'fetch() only rejects on network failures. HTTP error statuses (4xx, 5xx) are considered successful responses - you must check response.ok yourself.'
      }
    ]
  },
  {
    id: 'quiz-15',
    lessonId: '15',
    questions: [
      {
        id: 'q15-1',
        question: 'What is debouncing?',
        options: [
          'Running a function immediately',
          'Delaying function execution until after a pause',
          'Running a function repeatedly',
          'Canceling all functions'
        ],
        correctAnswer: 1,
        explanation: 'Debouncing delays function execution until after a specified time has passed since the last invocation. It\'s useful for search inputs and resize events.'
      },
      {
        id: 'q15-2',
        question: 'What is throttling?',
        options: [
          'Stopping all execution',
          'Limiting function execution rate',
          'Speeding up functions',
          'Deleting functions'
        ],
        correctAnswer: 1,
        explanation: 'Throttling limits how often a function can execute, ensuring it runs at most once per specified time period. It\'s useful for scroll and mouse move handlers.'
      },
      {
        id: 'q15-3',
        question: 'What is memoization used for?',
        options: [
          'Memorizing code',
          'Caching expensive function results',
          'Deleting variables',
          'Creating functions'
        ],
        correctAnswer: 1,
        explanation: 'Memoization caches the results of expensive function calls and returns the cached result when the same inputs occur again, improving performance.'
      },
      {
        id: 'q15-4',
        question: 'Why is event delegation more efficient?',
        options: [
          'It\'s faster to write',
          'Uses one listener instead of many',
          'It prevents all events',
          'It deletes events'
        ],
        correctAnswer: 1,
        explanation: 'Event delegation uses a single event listener on a parent element instead of multiple listeners on child elements, reducing memory usage and improving performance.'
      },
      {
        id: 'q15-5',
        question: 'What is the purpose of Document Fragment?',
        options: [
          'Breaking documents',
          'Building DOM offline to minimize reflows',
          'Deleting DOM elements',
          'Copying documents'
        ],
        correctAnswer: 1,
        explanation: 'Document Fragment allows you to build DOM structures in memory and add them to the document in a single operation, minimizing expensive reflows and repaints.'
      }
    ]
  }
];
