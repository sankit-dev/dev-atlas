---
title: "EC2: Virtual Servers"
slug: "ec2-virtual-servers"
description: "Instances, AMIs, instance types, key pairs and security groups."
track: "AWS Fundamentals"
priority: "Must Know"
---

EC2 provides virtual servers in AWS.

## Instance

An EC2 instance is a virtual machine.

You choose:

- AMI.
- Instance type.
- Storage.
- Network.
- Security group.
- Key pair or access method.

EC2 gives flexibility, but you manage more than with fully managed services.

## AMI

An AMI is an Amazon Machine Image. It is the starting template for an instance.

It includes:

- Operating system.
- Preinstalled software.
- Configuration.

Common AMIs include Amazon Linux, Ubuntu, and Windows Server.

## Instance types

Instance types define CPU, memory, networking, and hardware characteristics.

Examples:

- General purpose.
- Compute optimized.
- Memory optimized.
- Storage optimized.

Pick based on workload, not guesswork.

## Security groups

Security groups control inbound and outbound traffic.

For a backend server:

- Avoid exposing SSH to the whole internet.
- Allow app traffic only from a load balancer.
- Allow database traffic only to the database port.

## User data

User data runs scripts when an instance starts.

It is often used to:

- Install packages.
- Pull application code.
- Start services.
- Configure agents.

Do not put secrets directly in user data.

## Operational responsibility

With EC2, you usually own:

- OS updates.
- Runtime installation.
- Disk management.
- Process supervision.
- Security hardening.
- Monitoring agent setup.

## Quick revision

- EC2 is virtual servers.
- AMI is the server image.
- Instance type controls capacity.
- Security groups are critical.
- EC2 gives control but requires operational work.
