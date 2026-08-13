---
title: "Let’s Get Hooked"
slug: "lets-get-hooked"
description: "ES modules, React hooks, useState, state-driven rendering, reconciliation, and React Fiber basics."
track: "React / Namaste React"
priority: "Must Know"
---

## Export and Import in JavaScript (ES6)

- JavaScript (ES6) provides two main ways to export and import modules: **default export** and **named export**.

### 1. Default Export

- **Usage:** When a module exports a single entity, you use export default.
- **Importing:** You can import it with any name.
- But use the same name to import.

```javascript
// Exporting (module.js)
export default function greet() {
  console.log("Hello, world!");
}

// Importing (main.js)
import greetFunction from "./module.js";

greetFunction(); // Outputs: Hello, world!
```

- **Note:** The name `greetFunction` used in the import can be anything

### 2. Named Export

- **Usage:** When a module exports multiple entities, you use export without `default`.
- **Importing:** You must import using the exact names, enclosed in `{}`.

```javascript
// Exporting (module.js)
export function greet() {
  console.log("Hello, world!");
}

export const PI = 3.14159;
```

```javascript
// Importing (main.js)
import { greet, PI } from "./module.js";

greet(); // Outputs: Hello, world!
console.log(PI); // Outputs: 3.14159
```

- We can also imports whole as objects
  **Note:** The names in the import statement must match the export names.

### Importing Multiple Named Exports as an Object

- If we have multiple named exports and want to import them all at once as an object, we can do so by using the` * as` syntax.

```javascript
// Exporting (module.js)
export function greet() {
  console.log("Hello, world!");
}

export const PI = 3.14159;

export const multiply = (a, b) => a * b;
```

```javascript
// Importing as an Object (main.js)
import * as myModule from "./module.js";

myModule.greet(); // Outputs: Hello, world!
console.log(myModule.PI); // Outputs: 3.14159
console.log(myModule.multiply(2, 3)); // Outputs: 6
```

#### How It Works:

- `import * as myModule`:
  - This imports all named exports from `module.js` as properties of the `myModule` object.
- Accessing the Exports:
  - We can access each exported function or variable using dot notation, like `myModule.greet`, `myModule.PI`, and `myModule.multiply`.

#### When to Use

- **Namespace:** It’s useful when you want to group related functions or constants together under a single namespace.
- **Avoiding Name Conflicts:** If you have multiple modules with overlapping export names, importing them as objects can prevent name conflicts.

### 4. Combining Default and Named Exports

- You can use both default and named exports in the same module.

```javascript
// Exporting (module.js)
export default function greet() {
  console.log("Hello, world!");
}

export const PI = 3.14159;
```

```javascript
// Importing (main.js)
import greetFunction, { PI } from "./module.js";

greetFunction(); // Outputs: Hello, world!
console.log(PI); // Outputs: 3.14159
```

**Note:** `greetFunction` imports the default export, while `{ PI }` imports the named export.

## constant.js

- We use `constant.js` to store values that are fixed and unchanging throughout the application.
- Its a centeral place to store constant data for us to use easily anywhere in our react app.
- We will put things which we need thorought our application like links,etc.
- Example:

```javascript
// constant.js
export const API_TIMEOUT = 5000;
export const MAX_USERS = 100;
export const DEFAULT_LANGUAGE = "en";
```

## What is Hook in React?

- Hook is a `special function` in React that lets us use state and other React features in function components.
- Hooks were introduced in React 16.8 to allow developers to manage state, lifecycle events, and side effects within functional components, which were previously only possible in class components.

### Why use Hooks?

- Enable state and lifecycle management in functional components.
- Simplify code, elimination the need for classes
- We can create our own hook for certain features and reuse it anywhere in our project.

### Common React Hooks

- `useState:` Adds state to functional components.
- `useEffect:` Handles side effects like data fetching, subscriptions, and DOM updates.
- `useContext:` Provides an easy way to pass data through the component tree without using props.
- `useReducer:` Manages state with more complex logic, similar to redux.
- `useRef:` Provides a way to access and manipulate DOM elements directly.
- `useMemo:` Optimizes performance by memoizing expensive calculations.

## What is One-Way Data Binding?

- In one-way data binding, data flows in a single direction—from the parent component (or state) to the child component or from the state to the UI.

## Why Do We Need State Variables in React?

- When we declare a normal variable like `const a = 10`, and the value of `a` is changed later in the code, React won’t reflect this change in the UI.
- This happens because React doesn't keep track of these normal variables.
- React requires you to use state variables (through hooks) to track and update changes. React will automatically update the UI whenever a state variable changes.
- `useState` is one such hook that allows React components to store, track, and update data over time.
- This enables your application to respond to user interactions, changes in data, and other events dynamically and efficiently.

## useState Hook

- The `useState` hook in React returns an array with two elements:

1. **State Variable:** The current value of the state.
2. **Setter Function:** A function to update the state value.

### Syntax

```javascript
const [state, setState] = useState(initialValue);
```

### Elements Returned

1. **State Variable**(`state`):

- Represents the current state value.
- Initially set to the `initialValue` provided when calling `useState`.
- Example: If you call `useState(0)`, `state` will initially be `0`.

2. **Setter Function** (`setState`):

- A function used to update the state.
- When called, it schedules a re-render of the component with the new state value.
- Example: Calling `setState(1)` will update the state to `1` and trigger a re-render.

### Example

```javascript
import React, { useState } from "react";

function Counter() {
  // Declare a state variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

- `count` - The state variable, initially set to `0`.
- `setCount` - The function used to update `count`.
