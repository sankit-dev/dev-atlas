---
title: "RDS: Managed Databases"
slug: "rds-managed-databases"
description: "Managed SQL databases, backups, Multi-AZ and connection safety."
track: "AWS Fundamentals"
priority: "Must Know"
---

RDS is AWS managed relational database service.

## What RDS manages

With RDS, AWS handles much of the database infrastructure work.

RDS can help with:

- Provisioning database instances.
- Backups.
- Patching.
- Monitoring.
- Replication options.
- Failover options.

You still design schemas, indexes, queries, permissions, and application behavior.

## Supported engines

RDS supports engines such as:

- PostgreSQL.
- MySQL.
- MariaDB.
- Oracle.
- SQL Server.

Amazon Aurora is a cloud-optimized relational database compatible with PostgreSQL or MySQL.

## Backups

Automated backups allow point-in-time recovery within a retention period.

Manual snapshots can be kept longer and copied across Regions when needed.

Backups are not useful unless restore is tested.

## Multi-AZ

Multi-AZ deployment keeps a standby database in another Availability Zone.

If the primary fails, RDS can fail over to the standby.

Multi-AZ improves availability. It is not primarily for read scaling.

## Read replicas

Read replicas copy data from the primary and can serve read traffic.

Use them for:

- Read-heavy workloads.
- Reporting queries.
- Reducing primary database load.

Replication lag must be considered.

## Connection safety

Databases can fail under too many open connections.

Backend systems should use:

- Connection pooling.
- Reasonable timeouts.
- Private subnet placement.
- Security groups allowing only app access.

## Quick revision

- RDS is managed relational database hosting.
- AWS handles infrastructure tasks, not schema quality.
- Automated backups support recovery.
- Multi-AZ improves availability.
- Read replicas help scale reads.
