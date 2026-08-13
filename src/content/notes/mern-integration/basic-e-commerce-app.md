---
title: "Basic E-commerce App"
slug: "basic-e-commerce-app"
description: "Build products, cart, orders, and transaction thinking."
track: "MERN Integration"
priority: "Important"
---

# Basic E-commerce App

A basic e-commerce app is larger than todo/blog apps.

Build it only after you are comfortable with auth and CRUD.

## Features

- product listing,
- product details,
- cart,
- checkout,
- order creation,
- order history,
- admin product management,
- stock update thinking.

## Core collections

```text
users
products
carts
orders
payments
```

## Order document

```json
{
  "userId": "user_1",
  "items": [
    {
      "productId": "product_1",
      "name": "Keyboard",
      "price": 2500,
      "quantity": 2
    }
  ],
  "totalAmount": 5000,
  "status": "placed"
}
```

Store product snapshot data like name and price inside order items because product details may change later.

## Important backend concerns

- validate stock,
- prevent negative inventory,
- calculate price on backend,
- never trust frontend total,
- protect admin routes,
- consider transactions for order placement.

## What this project proves

- real schema design,
- auth and authorization,
- protected admin APIs,
- transactional thinking,
- frontend/backend responsibility,
- full-stack state management.

