---
title: "Load Balancing and Auto Scaling"
slug: "load-balancing-and-auto-scaling"
description: "Distributing traffic, health checks and automatically changing capacity."
track: "AWS Fundamentals"
priority: "Important"
---

Load balancing distributes traffic across multiple servers. Auto Scaling changes capacity based on demand.

## Load balancer

A load balancer receives client traffic and forwards it to healthy targets.

Benefits:

- High availability.
- Better traffic distribution.
- Health checks.
- TLS termination.
- Single stable endpoint.

In AWS, Application Load Balancer is common for HTTP and HTTPS backend services.

## Health checks

Health checks tell the load balancer whether a target can receive traffic.

A good health endpoint checks whether the application process is alive and able to serve basic requests.

Avoid health checks that are too heavy or depend on every downstream service.

## Auto Scaling Group

An Auto Scaling Group manages a group of EC2 instances.

It can:

- Maintain a desired number of instances.
- Replace unhealthy instances.
- Scale out when demand increases.
- Scale in when demand decreases.

## Scaling policies

Scaling can be based on metrics such as:

- CPU usage.
- Request count.
- Queue depth.
- Custom application metrics.

Choose metrics that represent actual pressure on the service.

## Deployment pattern

A common setup:

1. Load balancer in public subnets.
2. EC2 instances in private subnets.
3. Auto Scaling Group manages instances.
4. Load balancer sends traffic only to healthy instances.

## Common mistakes

- Scaling only on CPU when bottleneck is database connections.
- Health check endpoint is too shallow or too deep.
- Instances have slow startup but scaling assumes instant capacity.
- No minimum capacity for critical services.

## Quick revision

- Load balancers distribute traffic to healthy targets.
- Auto Scaling adjusts capacity automatically.
- Health checks control traffic routing.
- Scaling metrics should match real bottlenecks.
- Use multiple Availability Zones for resilience.
