---
title: "CloudWatch, Billing and Shared Responsibility"
slug: "cloudwatch-billing-and-shared-responsibility"
description: "Logs, metrics, alarms, cost controls and AWS versus customer duties."
track: "AWS Fundamentals"
priority: "Important"
---

CloudWatch helps observe AWS systems. Billing tools help control cost. The shared responsibility model defines what AWS secures and what you must secure.

## CloudWatch

CloudWatch collects operational data.

Common CloudWatch features:

- Logs.
- Metrics.
- Alarms.
- Dashboards.
- Events.

Backend systems use CloudWatch to understand health, errors, latency, and resource usage.

## Logs

CloudWatch Logs stores application and service logs.

Examples:

- Lambda logs.
- ECS logs.
- EC2 application logs.
- API Gateway logs.

Logs are useful only if they are structured and searchable.

## Metrics and alarms

Metrics are numeric measurements over time.

Examples:

- CPU usage.
- Memory usage.
- Error count.
- Request latency.
- Database connections.

Alarms notify you when a metric crosses a threshold.

## Billing and cost controls

AWS cost can grow quickly without monitoring.

Use:

- Budgets.
- Cost Explorer.
- Billing alerts.
- Tags for cost allocation.
- Reserved or savings plans when usage is predictable.

For learning accounts, billing alerts are mandatory.

## Shared responsibility

AWS is responsible for security of the cloud. You are responsible for security in the cloud.

| AWS handles | You handle |
| --- | --- |
| Physical data centers | IAM permissions |
| Hardware | Network rules |
| Managed service infrastructure | Data classification |
| Global infrastructure | Application security |

## Quick revision

- CloudWatch provides logs, metrics, alarms, and dashboards.
- Billing tools protect against surprise cost.
- Tags help understand where cost comes from.
- AWS secures the cloud infrastructure.
- You secure your usage, data, identities, and applications.
