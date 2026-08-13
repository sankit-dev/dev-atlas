---
title: "Component Composition Exercise"
slug: "component-composition-exercise"
description: "Break a UI into reusable components with props and lists."
track: "React / Namaste React"
priority: "Must Know"
---

# Component Composition Exercise

Build a restaurant listing page.

This tests whether you can break UI into clean components.

## Requirements

Show:

- header,
- search input,
- restaurant list,
- restaurant card,
- rating,
- cuisine list,
- empty state when no restaurant matches.

## Suggested components

```text
App
Header
SearchBox
RestaurantList
RestaurantCard
EmptyState
```

## Data example

```js
const restaurants = [
  {
    id: 1,
    name: 'Spice House',
    rating: 4.4,
    cuisines: ['North Indian', 'Chinese'],
  },
]
```

## What to practice

- pass data using props,
- render lists using `map`,
- use stable keys,
- keep search state in the right component,
- derive filtered list from state.

## Common mistake

Do not use array index as key when list order can change.

Use a stable id:

```jsx
{restaurants.map((restaurant) => (
  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
))}
```

