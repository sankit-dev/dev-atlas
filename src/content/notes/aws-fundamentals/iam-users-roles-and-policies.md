---
title: "IAM: Users, Roles and Policies"
slug: "iam-users-roles-and-policies"
description: "Authentication, permissions and least-privilege access."
track: "AWS Fundamentals"
priority: "Must Know"
---

IAM controls who can access AWS and what they are allowed to do.

## Core idea

IAM stands for Identity and Access Management.

It answers two questions:

- Who is making the request?
- Is this request allowed?

IAM is one of the most important AWS services because misconfigured permissions can expose an entire system.

## Users

An IAM user usually represents a person or long-lived identity.

For human access, prefer IAM Identity Center where possible. Avoid creating many long-lived access keys for people.

## Roles

An IAM role is an identity with permissions that can be assumed temporarily.

Common role use cases:

- EC2 instance reads from S3.
- Lambda writes logs to CloudWatch.
- CI/CD deploys infrastructure.
- A user temporarily assumes admin access.

Roles are safer than storing permanent credentials in code.

## Policies

A policy is a JSON document that allows or denies actions.

Policy parts include:

- Effect: Allow or Deny.
- Action: what API action is affected.
- Resource: which resource is affected.
- Condition: optional extra rules.

Example action: `s3:GetObject`.

## Least privilege

Least privilege means giving only the permissions actually needed.

Bad:

- Give an app full administrator access.

Better:

- Give the app only read access to one required S3 bucket path.

## Backend example

An EC2 server needs to read uploaded files from S3.

Use an IAM role attached to the EC2 instance with only the required S3 read permission. Do not put AWS access keys inside application code.

## Quick revision

- IAM manages authentication and authorization in AWS.
- Users are identities, often for people.
- Roles provide temporary permissions.
- Policies define allowed or denied actions.
- Use least privilege everywhere.
