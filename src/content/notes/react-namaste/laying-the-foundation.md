---
title: "Laying the Foundation"
slug: "laying-the-foundation"
description: "Babel, JSX, React elements, components, composition, and the early structure of a React app."
track: "React / Namaste React"
priority: "Must Know"
---

## Babel and `browserslist` 🌐

**Transpiling Code:** 🔄

- When we specify a `browserslist` configuration, Babel uses it to determine which JavaScript features need to be transpiled (converted to an older, more widely supported syntax) to ensure compatibility with the specified browsers.
- This means Babel will transform modern JavaScript features (like arrow functions, `const`, `let`, etc.) into versions that older browsers can understand and execute.

```javascript
// Modern Code (ES6+):
const add = (a, b) => a + b;

// Transpiled Code (ES5):
var add = function (a, b) {
  return a + b;
};
```

**Polyfills** 🧩

- For features that can't be transpiled directly (such as new APIs or methods that don't exist in older browsers), Babel can leverage polyfills.
- Polyfills are code snippets that provide implementations of modern JavaScript features in environments where they are not natively supported.
- For example, if you're using `Array.prototype.includes`, which isn't available in older browsers, Babel will include a polyfill to ensure this method functions correctly.

```javascript
// Modern Code:
if (myArray.includes(5)) {
  // ... do something
}

// Polyfilled Code (simplified representation):
if (polyfill_includes(myArray, 5)) {
  // ... do something
}
```

### 💡Important Note:

- When we write `last 10 Chrome versions`, it doesn't mean our web app will _only_ support the last 10 Chrome versions.
- It will support all browsers, but it _will definitely_ support the `last 10 Chrome versions.`
- It just a way for priotizing our web app for specific browser or version, if we want.

```bash
  "browserslist": [
    "last 10 Chrome version"
  ]
```

We used `npx parcel index.html` to run our project. This command can both run and build our project, but it's not the most convenient approach.

To make things easier, we can define scripts inside our `package.json` file:

```json
"scripts": {
  "start": "parcel index.html",
  "build": "parcel build index.html"
}
```

So now that we have set up scripts, we can run our project using `npm run start`.

- Think of `npm run` == `npx`.
- We can go one more step ahead to shortent the command by writing `npm start` which will also start the server. It is one and the same thing.
- Therefore `npm run start === npm start` (More concise).👍

When we are using `Parcel` our `console.log()` statements are not removed by default from our build. So, we will need to configure Parcel to remove`console.log` as well.

## Configuring Parcel to remove console.logs 🧹

Search for `babel-plugin-transform-remove-console` OR [click here](https://babeljs.io/docs/babel-plugin-transform-remove-console/)

To install, use the following code:

```bash
npm install babel-plugin-transform-remove-console --save-dev
```

- After installing we will need to configure it.
- Go to above website for configuration and add the configuration to `.babelrc` (Mine didn't remove the `console.log()` even after doing everything.🤷‍♂️😂)

### Keys in React 🔑

- When there are multiple siblings within a parent div, keys should be used to identify each child.
- This helps React know where a new child is added when we add one. It improves performance and reconciliation

### How does `React.createElement()` API works? ⚛️

- The `React.createElement()` API creates an object, and that object is rendered into HTML and then added to the DOM.

- Lets create the below code using React API:-

```html
<div class="header">
  <ul>
    Namaste React
  </ul>
  <ul>
    <li>About us</li>
    <li>Support</li>
    <li>Home</li>
  </ul>
</div>
```

To convert the above code using` React.createElement()`, here's the equivalent:

```javascript
const div = React.createElement("div", { className: "header" }, [
  React.createElement("ul", { key: "1" }, "Namaste React"),
  React.createElement("ul", { key: "2" }, [
    React.createElement("li", { key: "1" }, "About Us"),
    React.createElement("li", { key: "2" }, "Support"),
    React.createElement("li", { key: "3" }, "Home"),
  ]),
]);
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(div);
```

- As we can observe from the above code, it is very lengthy and verbose.
- Writing a whole website like this would create a mess. 🤯

### To Solve this Issue, React Introduce JSX

- JSX is HTML like syntax but it is _not_ HTML inside JS.
- JSX is just a syntactic sugar about the native React.createElement() API.
- JSX is not understood by our browser or React directly.
- Babel converts `JSX` into `React` code, which is then converted into JavaScript and appended to the DOM.

```jsx
function App() {
  return (
    <div id="header">
      <ul>Namaste React</ul>
      <ul>
        <li key="1">About Us</li>
        <li key="2">Support</li>
        <li key="3">Home</li>
      </ul>
    </div>
  );
}
```

- With JSX, our code looks more readable, with an HTML-like structure. But behind the scenes, everything is converted to native React code and then to JavaScript before being added to the DOM. ✨

**Note**- JSX is not a requiremnet for using React. Using React without JSX is especially convenient when you don’t want to set up compilation in your build environment.

[Read More](https://legacy.reactjs.org/docs/react-without-jsx.html)

## React Elements 🧱

- Elements are the smallest building blocks of React apps.
- A React element is nothing but a normal JavaScript variable.

```javascript
const element = <h1>Hello, world</h1>;
```

- React elements are immutable. One we create an element we can't change its children or attributes.
- An element is like a single frame in a movie: it represents the UI at a certain point in time
- To render `React Element` we can render it directly:

```bash
 root.render(element)
```

## React Component 📦

- React component is nothing but a normal javascript function that returns some jsx (markup).
- These components are reusable UI element for our apps.
- React components are regular JavaScript function but their name should start with a capital letter or they won't work.

```javascript
const HeaderComponent = () => {
  return (
    <div>
      <h1>Namaste React functional Component</h1>
      <h2>This is h2 tag</h2>
    </div>
  );
};
```

- To use this functional Component we can render it by:-

```javascript
root.render(<HeaderComponent />);
```

## How do we call elements and components inside an existing component?

```javascript
const Component = () => {
  return (
    <div>
      {element} //react element
      {<HeaderComponent />} //one way
      {HeaderComponent()} //second way
      <h1>Normal functional Component</h1>
    </div>
  );
};
```

- We can directly call any **React Element** inside component using `{element}`.
- Actually we can write any piece of valid JavaScript inside it.
- And we are just passing reference to the variable.
- But to call **React Component** we use angle brackets `{<HeaderComponent/>}`.
- But is there any other way yes we can call directly `{HeaderComponent()}`, like we call in our JS file. because at the end of the day components are normal JS funtion nothing else.

### Component Composition 🤝

- If we use component inside a component. It is call Component Composition.
