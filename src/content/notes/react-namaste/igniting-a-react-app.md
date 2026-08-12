---
title: "Igniting a React App"
slug: "igniting-a-react-app"
description: "Bundlers, package managers, Parcel, npm scripts, dependencies, browserslist, and production builds."
track: "React / Namaste React"
priority: "Must Know"
---

## Building React with Bundlers

Bundlers like **Webpack**, **Vite**, **Parcel**, and others are essential tools for modern React development. They offer several key features that streamline the development process:

### Key Features of Bundlers:

- **Code Bundling**: Combines multiple files (JavaScript, CSS, etc.) into a single bundle, optimizing load times and reducing the number of HTTP requests a browser needs to make.
- **Minification**: Reduces the size of the bundled files by removing unnecessary characters, comments, and whitespace, further improving load times.
- **Tree Shaking**: Eliminates unused code from the final bundle, ensuring that only the necessary code is included, resulting in smaller bundle sizes.
- **Code Splitting**: Breaks up your code into smaller chunks, allowing parts of your application to load on demand ("lazy loading"), improving initial load performance.
- **HMR (Hot Module Replacement)**: Updates modules in real-time without a full page reload during development, providing a faster and more efficient development experience. It uses File Watcher algortihm (written in C++) to watch files to update things in real time.
- **Asset Management**: Handles assets like images, fonts, and stylesheets, optimizing them (e.g., compressing images) and ensuring they're included in the bundle efficiently.
- **Transpilation**: Converts modern JavaScript (ES6+) into backward-compatible versions (ES5), allowing your code to run in older browsers that may not support the latest features.
- **Source Maps**: Provides a way to map the bundled code back to the original source code, making debugging during development much easier.
- **Environment Configuration**: Easily manage different settings for development, production, and testing environments, streamlining the deployment process.
- **Plugin Ecosystem**: Bundlers are extensible through a wide variety of plugins that can add additional functionality, such as linting (code quality checks), testing, or handling specific file types like images or stylesheets.

We can use any bundler for a React app. But in this course, Akshay used Parcel, a zero-configuration bundler.

We will be setting up our own `npm create-react-app` from scratch to learn in-depth. Once we learn this and know all the fundamentals, then we can use any bundler to set up our project.

To start with:

```bash
npm init
```

OR

```bash
npm init -y # with -y it will say yes to all questions
```

With this, we are initializing npm for our project, which will give us a `package.json` file with the project information.

## What is npm?

- npm is the standard package manager for Node.js.
- npm manages the downloads of dependencies (packages) for our project.
- We can install any package by using `npm install <package-name>` or `npm i <package-name>`.

[Read more on NPM](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)

## Why do we need npm?

- **Access to Powerful Tools**: While working with React or any other library, there are many helper packages (or "superpowers") that can greatly enhance your web app's functionality.
- npm allows you to easily install these packages, integrating powerful tools into your project with just a few commands.

- **Core for Managing Libraries**: npm is essential for managing the libraries and packages in your web app.
- It handles the installation, updating, and removal of dependencies, ensuring your project stays organized and up-to-date.
- It also helps manage different versions of dependencies, resolving conflicts, and ensuring compatibility.

After doing `npm init` and setting up our `package.json`, we need to set up Parcel.

### Install Parcel as a Dev Dependency

- We don't need Parcel in production, so we will install it as a development dependency.

```bash
npm i -D parcel
```

or

```bash
npm i --save-dev parcel
```

### Difference Between dependency and dev dependency

- In our `package.json` file, we find two main sections for listing packages:

#### dependencies:

- These are packages that your project relies on to run in production.
- They are essential for the core functionality of your application and will be included when you deploy your app.
- Examples include React, React DOM, and any other libraries your app directly uses.

#### devDependencies:

- These are packages that are only required during development and testing.
- They are not needed in the final production build of your application.
- Examples include bundlers like Parcel or Webpack, testing frameworks, linters, and other development tools.

Now, when we install any library we see its name with version for ex- `^2.8.2`, `~2.8.2`, `>=2.8.2` and many more.

Let's understand what these terms means.

- In npm, version number often includes some special symbols like tilde (~), caret (^), and comparison operators (>=, <=, etc.).
- These symbols are used to specify version ranges for dependencies, allowing developers to control how strictly or loosely npm should resolve package versions.

## npm Versioning Specifiers

### 1. Tilde (~)

- **Example:** `~1.2.3`
- **Meaning:** This allows npm to install the latest patch version that is greater than or equal to 1.2.3 but less than 1.3.0.
- **Range:** `>=1.2.3 <1.3.0`
- **Use Case:** Use `~` when you want to get the latest bug fixes and security patches but avoid potentially breaking changes introduced in a new minor version.

### 2. Caret (^)

- **Example:** `^1.2.3`
- **Meaning:** This allows npm to install the latest minor or patch version that is greater than or equal to 1.2.3 but less than 2.0.0.
- **Range:** `>=1.2.3 <2.0.0`
- **Use Case:** Use `^` when you are comfortable with receiving updates that include new features or non-breaking changes but want to avoid major version upgrades that might break compatibility.

### 3. Greater Than or Equal (>=)

- **Example:** `>=1.2.3`
- **Meaning:** This allows npm to install any version that is greater than or equal to 1.2.3, including major version upgrades.
- **Use Case:** Use `>=` when you need a specific minimum version or are willing to accept all updates, even major ones, potentially introducing breaking changes.

And there are other as well but this much is enough.

Now when we do `npm init` we get `package.json` along with this we also get `package-lock.json`.

### package.json vs package-lock.json

**package.json**

- Contains all the installed dependencies and devDependencies that our project needs, as well as other information like project metadata (name, version, etc.).
- Includes scripts to run our files and allows specifying other settings like types.
- Lists module versions with tilde (`~`) or caret (`^`), which specify version ranges that can be updated when we explicitly run commands like `npm update` or install a new package version.

**package-lock.json**

- Contains all the dependencies of dependencies (sub-dependencies).
- For example, if Parcel is a devDependency, it may rely on many other packages, and those packages may rely on others as well. `package-lock.json` records the entire dependency tree.
- Lists the exact versions of every package and sub-package that is installed.
- This file ensures that every time the project is installed, the same versions of packages are used, maintaining consistency across different environments.

## Question by Akshay: Should We Add `node_modules` to Our Git?

- No, we should not push **node_modules** to our Git because it is the heaviest object in the universe. 🤣
- Actually, `package-lock.json` contains sufficient information about our project’s dependencies and configuration. So, we can easily recreate the `node_modules` directory using the information in `package-lock.json`.
- Therefore, push `package-lock.json` and `package.json`, but not **node_modules** (the heaviest object in the universe).

```bash
 Note:- Anything that can be generated on server will be put inside .gitignore
```

After installing parcel we installed `react` and `react-dom` as dependency. Because we need these library to go on production also.

```bash
npm i react react-dom
```

- Now we have react in our project. So we will import `react` and `react-dom` because we are not using the cdn links.
- Make sure to make the src file with `type="module"` without this browser will not understand `import`.

Now we are ready to start our development server. To start just write the below cmd:

```bash
 npx parcel index.html
```

### What Does `npx` Do?

- **Run Local Packages:**

  - Executes packages installed locally in your project without needing to add them to your PATH.
  - Example: `npx parcel index.html`

- **Run Remote Packages:**

  - Executes packages directly from the npm registry without installing them globally.
  - Example: `npx create-react-app my-app`

- **Avoid Global Installs:**

  - Eliminates the need for global installations, keeping your environment clean and avoiding version conflicts.
  - Example: `npx http-server`

- **Handle Multiple Versions:**

  - Allows running a specific version of a package or command, useful when different versions are needed.
  - Example: `npx -p [package]@[version] [command]`

- **Execute Shell Scripts:**
  - Can be used to execute shell scripts directly from a Node.js package.

## Question by Akshay: Why Are React Apps Fast? Is It Only React?

- React is fast in itself, but when we create web apps using React, we also use bundlers like Vite, Parcel, Webpack, etc.
- These bundlers optimize our code using various algorithms such as tree shaking, code splitting, and optimization.
- However, these bundlers also depend on other libraries or packages to ensure these processes work effectively.
- Therefore, React apps are fast because of the combined efforts of React and these bundlers, not just React alone.

**Example by Akshay to Understand This:**

- If _React_ is **ModiJi**, then **Amit Shah** represents the _bundler_.
- The `node_modules` are like other ministers who help **Amit Shah** with the processes required.
- So **Amit Shah** (bundler) is depend on other pacakges and then those pacakges would depend on some other package. This is also known as `Transitive Dependency`
- VS Code is Ratan Tata (some guy said).🤣

**Answer to tell to interviewer by Akshay**

- When we are building a production-ready app, we need to do a lot of things.
- Bundling, minification, image optimization, hashing, differential bundling, so many things we have to do, and we can't do this alone.
- We need some dependencies on it. When we need dependencies, those dependencies are also dependent on something else. This is a dependency tree. That is called `Transitive Dependency`

There is a `browserslist` package that help to make our website support to older browser too.

```bash
  "browserslist": [
    "last 2 versions"
  ]
```

With this configuration we are supporting Last 2 versions of each major browser.

This was it. In this session we successfully create our own `create-react-app` from the scratch.
