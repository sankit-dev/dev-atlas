---
title: "Order Placement with Transaction"
slug: "order-placement-with-transaction"
description: "Use transactions for multi-document order flow."
track: "MongoDB"
priority: "Important"
---

# Order Placement with Transaction

Order placement is a good transaction example.

Multiple writes must stay consistent.

## Requirement

When a user places an order:

1. create order,
2. reduce product stock,
3. create payment record,
4. commit all changes together.

If any step fails, roll back everything.

## Collections involved

```text
products
orders
payments
```

Product:

```json
{
  "_id": "product_1",
  "name": "Keyboard",
  "price": 2500,
  "stock": 10
}
```

Order:

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

Store price/name snapshot in the order because product price can change later.

## Transaction shape

```js
const session = await mongoose.startSession()

try {
  await session.withTransaction(async () => {
    const order = await Order.create([orderData], { session })

    await Product.updateOne(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { session },
    )

    await Payment.create([paymentData], { session })
  })
} finally {
  await session.endSession()
}
```

## Safer stock update check

Check whether stock was actually updated:

```js
const stockUpdate = await Product.updateOne(
  { _id: productId, stock: { $gte: quantity } },
  { $inc: { stock: -quantity } },
  { session },
)

if (stockUpdate.modifiedCount !== 1) {
  throw new Error('Insufficient stock')
}
```

The condition `{ stock: { $gte: quantity } }` prevents stock from going negative.

## Important checks

- verify stock exists,
- prevent negative stock,
- handle payment failure,
- keep transaction short,
- do not do slow external work inside transaction if avoidable.

## Common mistake

Do not call payment provider inside a long database transaction without thinking.

External network calls can be slow and unpredictable.

Often systems use careful state transitions and compensation logic.

## Test cases

- creates order when stock is available,
- reduces stock correctly,
- fails when stock is insufficient,
- does not create order if stock update fails,
- does not reduce stock if order creation fails.

## Interview angle

Explain why partial success is dangerous in order placement. A transaction helps keep order, stock, and payment records consistent by committing all writes or rolling them back together.
