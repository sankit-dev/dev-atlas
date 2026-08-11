---
title: "Keys & Constraints"
slug: "keys-and-constraints"
description: "Primary keys, foreign keys, candidate keys, composite keys, super keys, alternate keys, and unique keys."
track: "Databases & SQL"
---

Keys uniquely identify records or define relationships. Constraints enforce rules so invalid data does not enter the database.

## Primary Key

A primary key uniquely identifies each row.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255)
);
```

Rules:

- Unique.
- Not null.
- Stable.
- One primary key per table.

## Foreign Key

A foreign key points to a primary key in another table.

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id)
);
```

It enforces referential integrity.

## Candidate, Alternate, Super, Composite

| Key | Meaning |
| --- | --- |
| Super key | Any column set that uniquely identifies a row |
| Candidate key | Minimal super key |
| Primary key | Chosen candidate key |
| Alternate key | Candidate key not chosen as primary |
| Composite key | Key made of multiple columns |

## Common Constraints

| Constraint | Purpose |
| --- | --- |
| NOT NULL | Value is required |
| UNIQUE | No duplicate values |
| PRIMARY KEY | Unique + not null identity |
| FOREIGN KEY | Valid referenced row required |
| CHECK | Custom condition |
| DEFAULT | Fallback value |

## Example

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  salary INT CHECK (salary > 0),
  department_id INT REFERENCES departments(id)
);
```

## Interview Notes

- Primary key identifies a row in the same table.
- Foreign key connects rows across tables.
- Unique allows one null in some DBMSs; primary key does not allow null.
- Composite keys are useful for junction tables and natural multi-column identity.
