---
title: "Optimizing a React App"
slug: "optimizing-a-react-app"
description: "Custom hooks, modularity, single responsibility, lazy loading, Suspense, and code splitting."
track: "React / Namaste React"
priority: "Must Know"
---

- We can separate the logic into a central place, like a `utils` directory inside a `helper.js` file (just a naming convention).
- Inside this file, we can add common logic and then export it. This allows us to call it from any component by importing it.
- This approach makes our code **modular**, **reusable**, **cleaner**, and **easier to test**.
- It also enhances maintainability since it becomes easier to debug.
- For example, if we have filter logic and our app has grown, we won't need to hunt for where the filter logic is located within different components.
- We’ll know exactly where the logic is—in the `utils` folder—making it much easier to find and manage.

## Modularity

- **Modularity** means breaking down the code into meaningful, manageable pieces.
- Hooks work similarly. We can create a custom hook for specific logic and then reuse it wherever we need it.

## Let's Create Our Own Hook

- Below is the logic for which we will create a custom hook.
- The code is part of the `RestaurantMenu` component, where I am getting the `id` from the `url` and making an API call using that `id`.
- The data is then populated inside the `RestaurantMenu` component.
- Currently, a lot is happening inside the `RestaurantMenu` component. We will separate these concerns to make our code modular and clean.
- I am going to make a custom hook for the code below:

```javascript
const [menu, setMenu] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${REST_MENU_URL}${id}`);
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  fetchData();
}, [id]);
```

- As we can see, we're making an API call here. We're using the `useState()` hook to manage our state variable.
- We're also using the `useParams()` hook to get the `restaurantId` from the URL, which we then pass to the `axios` URL to fetch the details of that specific restaurant.
- Now, let's create a custom hook to handle all of this. The hook will manage the data fetching, and all we have to do is pass the `id` (restaurant ID) to the hook. We don't need to worry about where the data is coming from.
- The primary responsibility of the `RestaurantMenu` component should be to populate the data, not to handle data fetching logic.
- This is why we'll offload these tasks to our custom hook.

- Below is the code where we'll use our custom hook. We simply pass the `id`, and everything will be taken care of. We don't need to manage state or anything else; we can just use the `menu` variable to populate the data.

```javascript
 const menu = useRestaurantMenu(id);
```
- Below is the `useRestaurantMenu()` hook.

```javascript
import { useState, useEffect } from "react";
const useRestaurantMenu = (id) => {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_MENU_URL}${id}`);
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchData();
  }, []);
  return menu;
};
```

- How is this `hook` function different from a `Component`?
- Both `hooks` and `components` are regular JavaScript functions, but there's a key difference:

  - A `Component` is a function that returns JSX.
  - A `hook` doesn't return any JSX; instead, it returns logic (like state or functions) that can be used within components.

- The hook we created above was straightforward because we had already written the logic ourselves.
- Now, let's create a hook from scratch that performs a specific task.

### Q: Why don't we just use a regular function instead of `hooks`?
- In a regular function, you can't use `hooks` to manage state or leverage other React features. That's why we use `hooks`.

- Now, we'll create a custom hook to check whether a user is online or offline.

```javascript
const offline = true;
if (offline) {
  return <h1>Offline</h1>;
}
```
- In the code above, we've simulated a situation where if the user is offline, an `<h1>` element displaying "Offline" will be returned instead of the actual data.
- Now, let's create a custom hook that will not only manage the `online/offline` state but also handle other related tasks.

```javascript
const offline = useOnline();
```

- The `useOnline` hook will return a boolean value (`true` or `false`). Below is the custom `useOnline` hook that manages the online/offline state:

```javascript
import { useState, useEffect } from "react";

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const handleOnline = () => {
    console.log("IsOnline is here");
    setIsOnline(true);
  };
  const handleOffline = () => {
    console.log("IsOffline is here");
    setIsOnline(false);
  };
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  }, []);
  return isOnline;
};
export default useOnline;
```

- Now that we've abstracted this logic into a custom hook, our central component is cleaner and more focused on its primary job.
- When the user goes offline, the appropriate message will show up.
- However, when subscribing to event listeners using `useEffect()`, it’s important to **unsubscribe** from them when the component unmounts.
- To unmount in `useEffect`, we need to return a cleanup function that removes the event listeners. Below is the code to remove the event listeners:

```javascript
return () => {
  console.log("Cleaning the eventListener");
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
};
```
- When we navigate to another component, the event listeners will unmount, ensuring that we don't leave any unnecessary listeners hanging around, which could lead to memory leaks.
- This pattern is often used in chat applications, where the green dot (indicating online status) and red dot (indicating offline status) are controlled by similar logic.
- By adopting a mindset where we create custom hooks for any reusable logic, we can keep our code cleaner, more modular, and easier to maintain.


## Let's Optimize Our App

- We create our React app using bundlers, which provide many features like tree-shaking, bundling, code-splitting, hot module replacement (HMR), development server, and more.
- However, the core job of bundlers is to bundle everything into a single file.
- This approach works well up to a certain limit, but if our app grows large and has more than 100 components, it can negatively impact performance.
- This is where optimization becomes crucial. For instance, consider a platform like `MakeMyTrip`.
- It has various sections for booking flights, trains, hotels, etc.
- If a user is looking to book a flight ticket, they are unlikely to visit the other sections like trains or hotels during that session.
- Therefore, we can use code splitting to load only the flight booking component when needed, rather than loading the entire application at once.

  We use several terms for this technique:
  - Chunking
  - Code Splitting
  - Dynamic Bundling
  - Lazy Loading
  - On-Demand Loading
  - Dynamic Importing

- To implement lazy loading, instead of importing a component normally, we use the `lazy` function provided by React.

```javascript
const Instamart = lazy(() => import("./path/of/component"));
```
- The `lazy` function is imported from `React`.
- This function facilitates on-demand loading, dynamic import, dynamic bundling, code splitting, and other related techniques.
- When using `lazy`, the bundler excludes that component from the initial bundle.
- Since the code for the component is not initially included, React will attempt to suspend the loading of the component until it's available. ⏳
- Without proper handling, you may encounter errors if you try to navigate to a route that renders a lazily-loaded component before it's fully loaded.
- To handle this, we wrap the lazily-loaded component in a `<Suspense />` component, which allows us to specify a fallback UI that is displayed while the component is being loaded.

```javascript
<Suspense fallback={<Shimmer />}>
  <Instamart />
</Suspense>
```
- The `<Suspense />` component takes a `fallback` prop, which specifies what to display while the component is loading.
- The fallback can be a spinner, a loading message, or any other placeholder UI. ⏳

## Good Practices for Lazy Loading

1. **Use `React.lazy` and `Suspense` Wisely**
   - **Tip**: Only lazy-load components that are not immediately necessary for the initial render. This helps in reducing the initial load time and improves user experience.
   - Example:
     ```javascript
     import React, { Suspense, lazy } from 'react';

     const LazyComponent = lazy(() => import('./LazyComponent'));

     function App() {
       return (
         <div>
           <Suspense fallback={<div>Loading...</div>}>
             <LazyComponent />
           </Suspense>
         </div>
       );
     }
     ```

2. **Split Code Strategically**
   - **Tip**: Identify and split large components or routes that can be loaded on-demand. This prevents large bundles and speeds up initial page load.
   - Example:
     ```javascript
     import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
     import React, { Suspense, lazy } from 'react';

     const Home = lazy(() => import('./Home'));
     const About = lazy(() => import('./About'));

     function App() {
       return (
         <Router>
           <Suspense fallback={<div>Loading...</div>}>
             <Switch>
               <Route exact path="/" component={Home} />
               <Route path="/about" component={About} />
             </Switch>
           </Suspense>
         </Router>
       );
     }
     ```

3. **Optimize Fallback UI**
   - **Tip**: Provide engaging fallback UI during loading to keep users informed and entertained. Consider using spinners, skeleton screens, or other dynamic placeholders.
   - Example:
     ```javascript
     <Suspense fallback={<div className="spinner">Loading...</div>}>
       <LazyComponent />
     </Suspense>
     ```
