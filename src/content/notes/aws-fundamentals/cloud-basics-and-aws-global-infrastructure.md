---
title: "Cloud Basics and AWS Global Infrastructure"
slug: "cloud-basics-and-aws-global-infrastructure"
description: "Cloud computing, Regions, Availability Zones and choosing a Region."
track: "AWS Fundamentals"
priority: "Must Know"
---

Cloud computing lets you rent computing resources instead of buying and operating your own hardware.

## Why cloud exists

Cloud providers let teams create infrastructure on demand.

Benefits:

- Faster provisioning.
- Pay-as-you-go pricing.
- Managed services.
- Global reach.
- Elastic scaling.
- Less physical hardware management.

Cloud does not remove engineering responsibility. It changes what you manage.

## AWS account

An AWS account is the boundary for billing, permissions, and resources.

Production systems often use multiple accounts:

- Development.
- Staging.
- Production.
- Security or logging.

This reduces blast radius.

## Regions

A Region is a geographic area where AWS has multiple data centers.

Examples:

- us-east-1.
- eu-west-1.
- ap-south-1.

Choose a Region based on latency, service availability, compliance, and cost.

## Availability Zones

An Availability Zone is one or more isolated data centers inside a Region.

Deploying across multiple Availability Zones improves availability because one zone can fail without taking down the whole system.

## Edge locations

Edge locations are used by services like CloudFront to cache content closer to users.

They reduce latency for static assets, downloads, and global delivery.

## Backend architecture view

A typical backend may use:

- EC2 or containers for compute.
- RDS for relational data.
- S3 for files.
- VPC for networking.
- IAM for permissions.
- CloudWatch for monitoring.

## Quick revision

- Cloud means renting infrastructure and managed services.
- AWS accounts isolate billing and resources.
- Regions are geographic areas.
- Availability Zones improve resilience inside a Region.
- Pick Regions based on latency, compliance, service support, and cost.
