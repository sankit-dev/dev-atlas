---
title: "Database Design"
slug: "database-design"
description: "Relationships, ER diagrams, junction tables, schema design, and cardinality."
track: "Databases & SQL"
---

Database design models real-world data into tables, columns, relationships, and constraints.

## Start with Entities

Examples:

- User.
- Order.
- Product.
- Payment.

Each entity often becomes a table.

## Relationships

### One-to-One

One user has one profile.

### One-to-Many

One user has many orders.

```text
users.id -> orders.user_id
```

### Many-to-Many

Students enroll in many courses; courses have many students.

Use a junction table:

```sql
CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

## Cardinality

Cardinality describes how many rows can participate in a relationship.

Examples:

- One-to-one.
- One-to-many.
- Many-to-many.

## Schema Design Tips

- Pick stable primary keys.
- Use foreign keys for important relationships.
- Normalize first, denormalize intentionally.
- Use constraints to enforce rules.
- Name tables and columns consistently.
- Design around query patterns, not only entities.

## Interview Notes

- Junction tables model many-to-many relationships.
- Foreign keys enforce referential integrity.
- ER diagrams help communicate entities and relationships.
- Good schema design balances correctness, query simplicity, and performance.
