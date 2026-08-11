---
title: "VPC and Networking Basics"
slug: "vpc-and-networking-basics"
description: "VPCs, public/private subnets, routing, gateways and security groups."
track: "AWS Fundamentals"
priority: "Must Know"
---

A VPC is your private network inside AWS. It lets you decide how cloud resources communicate with each other and with the internet.

## VPC

A Virtual Private Cloud contains your AWS networking setup.

Inside a VPC you configure:

- IP address ranges.
- Subnets.
- Route tables.
- Internet access.
- Security boundaries.
- Connectivity between services.

Most production AWS systems start with a VPC design.

## Subnets

A subnet is a smaller network range inside a VPC.

| Subnet type | Meaning |
| --- | --- |
| Public subnet | Has a route to an Internet Gateway |
| Private subnet | Does not have direct inbound internet access |

A public IP alone does not make a subnet public. The subnet route table must route internet traffic to an Internet Gateway.

## Public and private layout

A common backend layout:

- Load balancer in public subnets.
- Application servers in private subnets.
- Database in private subnets.
- NAT Gateway for private servers that need outbound internet.

This keeps the public attack surface small.

## Route tables

Route tables decide where network traffic goes.

Examples:

- Local VPC traffic stays inside the VPC.
- Internet traffic from public subnets goes to an Internet Gateway.
- Internet traffic from private subnets can go through a NAT Gateway.

## Security groups

A security group is a virtual firewall attached to resources like EC2, load balancers, and databases.

Security groups control allowed inbound and outbound traffic.

Example:

- Allow HTTP and HTTPS from the internet to the load balancer.
- Allow app port traffic only from the load balancer to EC2.
- Allow database port traffic only from EC2 to RDS.

## Quick revision

- VPC is your private AWS network.
- Subnets split the VPC into smaller ranges.
- Public subnets route to an Internet Gateway.
- Private subnets should hold application servers and databases.
- Security groups control resource-level traffic.
