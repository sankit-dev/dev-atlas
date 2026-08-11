export type Accent = 'coral' | 'blue' | 'yellow' | 'green' | 'violet'

export type Note = {
  description: string
  priority?: 'Must Know' | 'Important'
  slug: string
  title: string
  sourceUrl: string
}

export type Track = {
  accent: Accent
  description: string
  eyebrow: string
  shortTitle: string
  status: string
  title: string
  topics: Note[]
}

const notionRootUrl =
  'https://app.notion.com/p/Always-Be-Job-Ready-Study-Resource-395d15d9b1dd80b396d7dc26826026c5'

const note = (
  title: string,
  description: string,
  sourceUrl: string,
  priority?: Note['priority'],
): Note => ({
  description,
  priority,
  slug: title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  sourceUrl,
  title,
})

export const tracks: Track[] = [
  {
    title: 'Operating Systems',
    shortTitle: 'OS',
    eyebrow: 'Computer fundamentals',
    description:
      'Core operating system concepts for interviews and backend engineering.',
    accent: 'coral',
    status: '9 notes',
    topics: [
      note('Process vs Thread', 'Core difference, context switching cost, when to prefer one over the other.', 'https://app.notion.com/p/39dd15d9b1dd804aaa7bc66eb2ca889a'),
      note('Process States & Lifecycle', 'New, Ready, Running, Waiting, Terminated.', 'https://app.notion.com/p/39dd15d9b1dd80af9d94caeb9f1aed87'),
      note('CPU Scheduling Algorithms', 'FCFS, SJF, Round Robin, Priority Scheduling, Multilevel Queue.', 'https://app.notion.com/p/39dd15d9b1dd80b5964cc9e3de0b7438'),
      note('Concurrency', 'Race Conditions, Critical Section, Mutex vs Semaphore.', 'https://app.notion.com/p/39dd15d9b1dd8032a782ced1c3f59bd6'),
      note('Deadlock', '4 Conditions, Prevention, Avoidance, Detection.', 'https://app.notion.com/p/39dd15d9b1dd80e2a7e9c1d0131e5388'),
      note('Memory Management', 'Paging, Segmentation, Virtual Memory, Page Faults.', 'https://app.notion.com/p/39dd15d9b1dd80ce8542cb132f1c9d96'),
      note('Multithreading vs Multiprocessing vs Multitasking', 'Clear distinction with real-world examples.', 'https://app.notion.com/p/39dd15d9b1dd800b8e51dcd98a95bd75'),
      note('System Calls', 'fork, exec, and how user mode transitions to kernel mode.', 'https://app.notion.com/p/39dd15d9b1dd8006b5afc9ee1b04322a'),
      note('Cache Memory & Locality of Reference', 'Temporal vs spatial locality and why caching improves performance.', 'https://app.notion.com/p/39dd15d9b1dd80ee8339c9e21f5c0de3'),
    ],
  },
  {
    title: 'Computer Networks',
    shortTitle: 'Networks',
    eyebrow: 'How data moves',
    description:
      'Networking concepts every backend developer should be able to explain.',
    accent: 'blue',
    status: '19 notes',
    topics: [
      note('TCP', 'Handshake, termination, sequence numbers, acknowledgements, retransmission, flow control, and congestion control.', 'https://app.notion.com/p/3a3d15d9b1dd8056a754c607ee7f252a'),
      note('UDP', 'Difference from TCP, when to use UDP, and real-world examples.', 'https://app.notion.com/p/3a3d15d9b1dd8058966cd0dac2683bed'),
      note('TCP vs UDP', 'Reliability, speed, ordering, error recovery, and use cases.', 'https://app.notion.com/p/3a3d15d9b1dd8067a860ea4725c15fb1'),
      note('OSI Model & TCP/IP Model', 'Why networking layers exist, OSI vs TCP/IP, and which layers backend engineers touch.', 'https://app.notion.com/p/3a3d15d9b1dd806eb5b8e017c3b057bd'),
      note('IP Addressing', 'IPv4, subnet masks, CIDR, gateway, router, DHCP, and public/private IPs.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
      note('DNS', 'DNS lookup process, caching, recursive resolvers, and why DNS is needed.', 'https://app.notion.com/p/3a3d15d9b1dd805ea798e340d2713368'),
      note('HTTP', 'Request/response, headers, methods, status codes, cookies, sessions, and keep-alive.', 'https://app.notion.com/p/3a3d15d9b1dd80269cb9c82621de14b3'),
      note('HTTPS', 'SSL/TLS, certificates, encryption, and HTTPS request flow.', 'https://app.notion.com/p/3a3d15d9b1dd80c09954c2f92211e957'),
      note('REST API', 'REST principles, statelessness, resources, idempotency, and HTTP methods.', 'https://app.notion.com/p/3a3d15d9b1dd8031afd7ee84f96e6991'),
      note('WebSockets', 'Why HTTP is not enough, full-duplex communication, handshakes, and real-time apps.', 'https://app.notion.com/p/3a3d15d9b1dd80448818e3e9b336fa3a'),
      note('Load Balancer', 'Why load balancers are needed, round robin, least connections, and health checks.', 'https://app.notion.com/p/3a3d15d9b1dd804680b2d27af17f208d'),
      note('Reverse Proxy', 'Nginx and why backend servers use reverse proxies.', 'https://app.notion.com/p/3a3d15d9b1dd80498435e96e45a31dbe'),
      note('CDN', 'Why images load faster, edge servers, and caching.', 'https://app.notion.com/p/3a3d15d9b1dd80c88d61c7458c60beab'),
      note('CORS', 'Same Origin Policy, preflight requests, and Access-Control-Allow-Origin.', 'https://app.notion.com/p/3a3d15d9b1dd80e18184f3827a278133'),
      note('Cookies vs Sessions vs JWT', 'Authentication state mechanisms and when each one fits.', 'https://app.notion.com/p/3a3d15d9b1dd807a9c47ffff13beb9c7'),
      note('Authentication vs Authorization', 'Identity verification versus permission checks.', 'https://app.notion.com/p/3a3d15d9b1dd80ccb77ec96291d31e21'),
      note('ARP', 'How local networks resolve IP addresses to hardware addresses.', 'https://app.notion.com/p/3a3d15d9b1dd804e8d0df22d2e9f63f2'),
      note('Ports', 'How network services share one machine through numbered ports.', 'https://app.notion.com/p/3a3d15d9b1dd808198f9ed9fdfa9e619'),
      note('Socket Programming', 'The programming interface behind network communication.', 'https://app.notion.com/p/3a3d15d9b1dd80f1901dc74138b901ea'),
    ],
  },
  {
    title: 'Object-Oriented Programming',
    shortTitle: 'OOP',
    eyebrow: 'Write maintainable code',
    description:
      'OOP concepts, relationships, design principles, and common interview questions.',
    accent: 'yellow',
    status: '18 notes',
    topics: [
      note('Introduction to OOP', 'What OOP is, why it exists, procedural programming vs OOP, and real-world analogies.', 'https://app.notion.com/p/3acd15d9b1dd8012a98cd92787292b8d'),
      note('Class & Object', 'The foundation of object-oriented modeling.', 'https://app.notion.com/p/3acd15d9b1dd8033bdd4d58bcb6160e6'),
      note('Encapsulation', 'Data hiding, getters and setters, and benefits.', 'https://app.notion.com/p/3acd15d9b1dd800dae9af26791370365'),
      note('Abstraction', 'Abstract classes, interfaces, examples, and abstraction vs encapsulation.', 'https://app.notion.com/p/3acd15d9b1dd804a872de451824bdd3e'),
      note('Inheritance', 'Types of inheritance, extends, and method overriding.', 'https://app.notion.com/p/3acd15d9b1dd8018b66ace67d2be85eb'),
      note('Polymorphism', 'Method overloading, method overriding, and dynamic dispatch.', 'https://app.notion.com/p/3acd15d9b1dd802babf1cd6fa9b90e60'),
      note('Relationships Between Classes', 'Association, aggregation, and composition.', 'https://app.notion.com/p/3acd15d9b1dd808b8587ef9b6e5201cf'),
      note('Method Overloading vs Overriding', 'Differences, rules, and interview questions.', 'https://app.notion.com/p/3acd15d9b1dd80e1938ed3b7c85069fc'),
      note('Constructors', 'Default constructors, parameterized constructors, constructor chaining, this(), and super().', 'https://app.notion.com/p/3acd15d9b1dd8088baf8cfee5a252732'),
      note('Access Modifiers', 'Public, private, protected, and package-private access.', 'https://app.notion.com/p/3acd15d9b1dd80b4afdfc0e777f446f2'),
      note('Static Keyword', 'Static variables, methods, blocks, and static vs instance members.', 'https://app.notion.com/p/3acd15d9b1dd80dfa4b7faa492194c44'),
      note('this & super', 'Common use cases for this and super.', 'https://app.notion.com/p/3acd15d9b1dd808e945ccd0a436df745'),
      note('Interface vs Abstract Class', 'Differences, use cases, and backend examples.', 'https://app.notion.com/p/3acd15d9b1dd80c4b94af74ff2ff8f1c'),
      note('SOLID Principles', 'SRP, OCP, LSP, ISP, and DIP.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
      note('Composition vs Inheritance', 'Pros, cons, when to use each, and backend examples.', 'https://app.notion.com/p/3acd15d9b1dd80d38fbfd7d2cb7eca7e'),
      note('Object Lifecycle & Memory', 'Object creation, references, heap, stack, and garbage collection.', 'https://app.notion.com/p/3acd15d9b1dd80df85bbde30129ef662'),
      note('Design Patterns', 'Singleton, Factory, Adapter, Decorator, Strategy, and Observer.', 'https://app.notion.com/p/3acd15d9b1dd800a9c6cd9246484e62f'),
      note('Common OOP Interview Questions', 'Frequently asked OOP interview questions.', 'https://app.notion.com/p/3acd15d9b1dd80ca9ac3c218cdff4fad'),
    ],
  },
  {
    title: 'Databases & SQL',
    shortTitle: 'DBMS',
    eyebrow: 'Store data well',
    description:
      'Database fundamentals, SQL, transactions, scaling, and interview-heavy DBMS topics.',
    accent: 'green',
    status: '22 notes',
    topics: [
      note('Database Fundamentals', 'DBMS, RDBMS vs NoSQL, tables, rows, columns, schemas, and constraints.', 'https://app.notion.com/p/3add15d9b1dd8015b160c6d287a04c7c'),
      note('Keys & Constraints', 'Primary keys, foreign keys, candidate keys, composite keys, super keys, alternate keys, and unique keys.', 'https://app.notion.com/p/3add15d9b1dd80df9a74e2596316e3a8'),
      note('SQL Basics', 'SELECT, WHERE, ORDER BY, DISTINCT, LIMIT, LIKE, IN, BETWEEN, IS NULL, and CASE.', 'https://app.notion.com/p/3add15d9b1dd8027be8be9162f61f3ff'),
      note('SQL Filtering & Sorting', 'Logical operators, aliases, and expressions.', 'https://app.notion.com/p/3add15d9b1dd804d87eee4de03d380dc'),
      note('SQL Joins', 'INNER, LEFT, RIGHT, FULL, CROSS, and SELF JOIN.', 'https://app.notion.com/p/3add15d9b1dd802fadb9f1c99b5c0afc'),
      note('Aggregation', 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING.', 'https://app.notion.com/p/3add15d9b1dd803bada9fc29ac0a3832'),
      note('Intermediate SQL', 'Subqueries, correlated subqueries, EXISTS, ANY, ALL, UNION, INTERSECT, and EXCEPT.', 'https://app.notion.com/p/3add15d9b1dd80caa5f0e9fce0c87213'),
      note('Window Functions', 'ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), and LAG().', 'https://app.notion.com/p/3add15d9b1dd802985c8d0bd2e3fe897'),
      note('Normalization', 'Data redundancy, anomalies, 1NF, 2NF, 3NF, BCNF, and denormalization.', 'https://app.notion.com/p/3add15d9b1dd80c7b28edc6f7236f21d'),
      note('Indexing', 'B-Tree, hash indexes, clustered indexes, composite indexes, and table scans.', 'https://app.notion.com/p/3add15d9b1dd80c8a951ee9a26aefcc8'),
      note('Transactions', 'Transaction lifecycle and ACID properties.', 'https://app.notion.com/p/3add15d9b1dd80538aacde6222588c64'),
      note('Concurrency Control', 'Dirty reads, non-repeatable reads, and phantom reads.', 'https://app.notion.com/p/3add15d9b1dd80d483f3c88569cea545'),
      note('Isolation Levels', 'Read uncommitted, read committed, repeatable read, and serializable.', 'https://app.notion.com/p/3add15d9b1dd809cafd1f77e2e91dbd5'),
      note('Locking', 'Shared locks, exclusive locks, row locks, table locks, optimistic locking, and pessimistic locking.', 'https://app.notion.com/p/3add15d9b1dd80af8ef4fe56143b2014'),
      note('Deadlocks', 'Causes, detection, prevention, and resolution.', 'https://app.notion.com/p/3add15d9b1dd8016b916fc1f9704bd74'),
      note('Views', 'Views and materialized views.', 'https://app.notion.com/p/3add15d9b1dd804d8390d14da556fc8d'),
      note('Stored Procedures & Triggers', 'Stored procedures, functions, and triggers.', 'https://app.notion.com/p/3add15d9b1dd80f7bc00cec13b3eea17'),
      note('Query Optimization', 'EXPLAIN, execution plans, optimizers, predicate pushdown, N+1, pagination, and SELECT *.', 'https://app.notion.com/p/3add15d9b1dd8061bf32d1a7b0f4a8bd'),
      note('Database Design', 'Relationships, ER diagrams, junction tables, schema design, and cardinality.', 'https://app.notion.com/p/3add15d9b1dd8086aa8bde98011e6e30'),
      note('Database Scaling', 'Vertical scaling, horizontal scaling, read replicas, partitioning, and sharding.', 'https://app.notion.com/p/3add15d9b1dd8078818cc81c86ba6420'),
      note('NoSQL', 'SQL vs NoSQL, document DB, key-value DB, column-family DB, graph DB, and when to use each.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
      note('Advanced Concepts', 'MVCC, WAL, replication, CAP theorem, BASE, connection pooling, and Redis caching.', 'https://app.notion.com/p/3add15d9b1dd806c8461c62bf08a8916'),
    ],
  },
  {
    title: 'AI for Backend Developers',
    shortTitle: 'AI',
    eyebrow: 'Build useful AI features',
    description:
      'AI fundamentals, APIs, RAG, pipelines, safety, and agent concepts for backend work.',
    accent: 'violet',
    status: '31 notes',
    topics: [
      note('What is AI?', 'Artificial intelligence as pattern learning and problem solving.', 'https://app.notion.com/p/3b3d15d9b1dd8098a881c2cabe4084c5'),
      note('Machine Learning vs Deep Learning vs Generative AI', 'How common AI terms relate to each other.', 'https://app.notion.com/p/3b3d15d9b1dd800fba57e8f31a0a5f1f'),
      note('How ChatGPT works', 'A high-level explanation of language model behavior.', 'https://app.notion.com/p/3b3d15d9b1dd802997bdfb7bebd4304b'),
      note('Tokens', 'The units AI models read, write, and charge for.', 'https://app.notion.com/p/3b3d15d9b1dd801381f6f66b08e3cd7a'),
      note('Context Window', 'How much information a model can consider at once.', 'https://app.notion.com/p/3b3d15d9b1dd80798b85e1adc301b5d2'),
      note('Temperature', 'How randomness affects model output.', 'https://app.notion.com/p/3b3d15d9b1dd80c0aeb5ed686006624f'),
      note('Hallucinations', 'Why models can produce plausible but wrong answers.', 'https://app.notion.com/p/3b3d15d9b1dd806787fcccfd44d81149'),
      note('Prompt Engineering', 'Writing instructions that produce useful model behavior.', 'https://app.notion.com/p/3b3d15d9b1dd8027bc44e5640fc0cbc2'),
      note('Embeddings', 'Representing meaning as vectors.', 'https://app.notion.com/p/3b3d15d9b1dd80cc8128c5e88cf44581'),
      note('Vector Databases', 'Storing and searching vectors for semantic retrieval.', 'https://app.notion.com/p/3b3d15d9b1dd806d84dedaa5553e4113'),
      note('RAG', 'Retrieval augmented generation.', 'https://app.notion.com/p/3b3d15d9b1dd80259940dc75aa567d4f'),
      note('API Keys & Authentication', 'Authenticating safely with AI APIs.', 'https://app.notion.com/p/3b3d15d9b1dd80f9932bc8b9490df1f6'),
      note('Chat Completion', 'Sending messages to a model and reading responses.', 'https://app.notion.com/p/3b3d15d9b1dd807682b1e53d02b5199c'),
      note('Structured Output', 'Getting predictable JSON-shaped model responses.', 'https://app.notion.com/p/3b3d15d9b1dd80ea9e43d3bb755da9e1'),
      note('Function Calling / Tool Use', 'Letting models request typed actions from your backend.', 'https://app.notion.com/p/3b3d15d9b1dd8092acf5e45903c33f91'),
      note('Streaming Responses', 'Sending partial model output to users as it arrives.', 'https://app.notion.com/p/3b3d15d9b1dd80548e1ef4ec14ea3090'),
      note('Token Usage & Cost Calculation', 'Estimating AI feature cost from token usage.', 'https://app.notion.com/p/3b3d15d9b1dd80799b23d6a610e6b278'),
      note('Prompt Templates', 'Reusable prompts for backend workflows.', 'https://app.notion.com/p/3b3d15d9b1dd80c392ecf3e5d1f147a2'),
      note('Conversation Memory', 'Remembering useful context across turns.', 'https://app.notion.com/p/3b3d15d9b1dd80818217ff557d19fd0b'),
      note('Chunking for RAG', 'Splitting documents for better retrieval.', 'https://app.notion.com/p/3b3d15d9b1dd806c8ce3d50ac1617e5c'),
      note('Semantic Search vs Keyword Search', 'Meaning-based search compared with exact matching.', 'https://app.notion.com/p/3b3d15d9b1dd805db5edf812ef6f0435'),
      note('AI Pipelines', 'Backend workflows that prepare, call, and post-process AI output.', 'https://app.notion.com/p/3b3d15d9b1dd802c89b6ee8bb097748d'),
      note('Caching for LLM responses', 'Caching model responses where it is correct and useful.', 'https://app.notion.com/p/3b3d15d9b1dd8070ae43dc6cdba60969'),
      note('Rate Limiting', 'Protecting AI endpoints from overuse.', 'https://app.notion.com/p/3b3d15d9b1dd8078b627fbe966513dfa'),
      note('AI Security', 'Prompt injection, data leakage, and defensive backend design.', 'https://app.notion.com/p/3b3d15d9b1dd8007b9a5c6b4f1b20433'),
      note('What is an AI Agent?', 'The basic agent loop and how it differs from one-shot prompting.', 'https://app.notion.com/p/3b3d15d9b1dd806aa66ed8d1f5142dea'),
      note('Agent Planning & Reasoning', 'How agents break work into steps.', 'https://app.notion.com/p/3b3d15d9b1dd801795c9f1c0cc4ca6a5'),
      note('Agent Memory', 'Short-term and long-term memory in agent systems.', 'https://app.notion.com/p/3b3d15d9b1dd80c38c42ff8aa03945bc'),
      note('Tools / Function Calling in Agents', 'How agents use tools to affect external systems.', 'https://app.notion.com/p/3b3d15d9b1dd803693e3d5b06aa06e09'),
      note('Multi-Agent Systems', 'Multiple agents coordinating on a task.', 'https://app.notion.com/p/3b3d15d9b1dd80868909ed35d5aa213e'),
      note('Agentic Workflows', 'Workflow patterns that combine model decisions and deterministic code.', 'https://app.notion.com/p/3b3d15d9b1dd80adb3b6c85673fcc040'),
    ],
  },
  {
    title: 'AWS Fundamentals',
    shortTitle: 'AWS',
    eyebrow: 'DevOps / Tools',
    description:
      'Must-know AWS services and cloud concepts for backend developers.',
    accent: 'blue',
    status: '8 notes',
    topics: [
      note('VPC and Networking Basics', 'VPCs, public/private subnets, routing, gateways and security groups.', 'https://app.notion.com/p/3b3d15d9b1dd810fa279c9515575806a', 'Must Know'),
      note('IAM: Users, Roles and Policies', 'Authentication, permissions and least-privilege access.', 'https://app.notion.com/p/3b3d15d9b1dd81159b17f0b036b8f34b', 'Must Know'),
      note('S3: Object Storage', 'Buckets, objects, access control, versioning and common use cases.', 'https://app.notion.com/p/3b3d15d9b1dd8137a186dbce4b7adff6', 'Must Know'),
      note('CloudWatch, Billing and Shared Responsibility', 'Logs, metrics, alarms, cost controls and AWS versus customer duties.', 'https://app.notion.com/p/3b3d15d9b1dd819aad46cd078c98dfc5', 'Important'),
      note('Cloud Basics and AWS Global Infrastructure', 'Cloud computing, Regions, Availability Zones and choosing a Region.', 'https://app.notion.com/p/3b3d15d9b1dd81a69fb7d9de8eda629e', 'Must Know'),
      note('RDS: Managed Databases', 'Managed SQL databases, backups, Multi-AZ and connection safety.', 'https://app.notion.com/p/3b3d15d9b1dd81a8a3adf422c727341c', 'Must Know'),
      note('EC2: Virtual Servers', 'Instances, AMIs, instance types, key pairs and security groups.', 'https://app.notion.com/p/3b3d15d9b1dd81df8552dd8a766c43c1', 'Must Know'),
      note('Load Balancing and Auto Scaling', 'Distributing traffic, health checks and automatically changing capacity.', 'https://app.notion.com/p/3b3d15d9b1dd81e3b19dff05927f84ab', 'Important'),
    ],
  },
  {
    title: 'Docker',
    shortTitle: 'Docker',
    eyebrow: 'DevOps / Tools',
    description:
      'Docker fundamentals for running and shipping backend applications.',
    accent: 'green',
    status: '8 notes',
    topics: [
      note('Build and Run Commands', 'Building, starting, viewing, stopping and debugging containers.', 'https://app.notion.com/p/3b3d15d9b1dd8144bd60ec84750fac1f', 'Must Know'),
      note('Environment Variables, Security and Optimization', 'Configuration, secrets, .dockerignore, small images and non-root users.', 'https://app.notion.com/p/3b3d15d9b1dd8152afc2cb8e38432869', 'Important'),
      note('Why Docker and How It Works', 'The problem Docker solves and containers versus virtual machines.', 'https://app.notion.com/p/3b3d15d9b1dd81648807dada3facfbb5', 'Must Know'),
      note('Volumes and Persistent Data', 'Why container files disappear and how volumes preserve data.', 'https://app.notion.com/p/3b3d15d9b1dd817291fec73bda07fb40', 'Must Know'),
      note('Images, Containers and Registries', 'The relationship between an image, running container and registry.', 'https://app.notion.com/p/3b3d15d9b1dd81848ac4c54e2200db1f', 'Must Know'),
      note('Writing a Dockerfile', 'FROM, WORKDIR, COPY, RUN, EXPOSE and CMD.', 'https://app.notion.com/p/3b3d15d9b1dd818b9facd64544f6dce6', 'Must Know'),
      note('Docker Networking', 'Container communication, service names and published ports.', 'https://app.notion.com/p/3b3d15d9b1dd81a8aeb9f88064024e9e', 'Must Know'),
      note('Docker Compose', 'Running a multi-container application with one YAML file.', 'https://app.notion.com/p/3b3d15d9b1dd81ee9995eab4d708c132', 'Must Know'),
    ],
  },
  {
    title: 'GitHub CI/CD',
    shortTitle: 'CI/CD',
    eyebrow: 'DevOps / Tools',
    description:
      'GitHub Actions workflows for CI, image publishing, and deployment.',
    accent: 'violet',
    status: '7 notes',
    topics: [
      note('Secrets, Tokens and Permissions', 'Safely authenticating deployments and limiting workflow access.', 'https://app.notion.com/p/3b3d15d9b1dd810d8cf5d1df83a1a98d', 'Must Know'),
      note('Environments, Approvals and Deployment', 'Staging/production separation, protected environments and safe releases.', 'https://app.notion.com/p/3b3d15d9b1dd812b9920cd938582b1f2', 'Must Know'),
      note('CI/CD Fundamentals', 'Continuous Integration, Continuous Delivery and Continuous Deployment.', 'https://app.notion.com/p/3b3d15d9b1dd81589eb1e759047321c6', 'Must Know'),
      note('Artifacts, Docker Images and Registries', 'Passing build output forward and publishing versioned images.', 'https://app.notion.com/p/3b3d15d9b1dd816db265e317052d15b0', 'Important'),
      note('Triggers, Filters and Manual Runs', 'Running workflows for the right branches and events.', 'https://app.notion.com/p/3b3d15d9b1dd8171ba70c6a6bf6cae9d', 'Must Know'),
      note('Building a Useful CI Pipeline', 'Install, lint, test, build and caching in the correct order.', 'https://app.notion.com/p/3b3d15d9b1dd8189af6ac8d02138a671', 'Must Know'),
      note('GitHub Actions Workflow Structure', 'Workflows, events, jobs, steps, actions and runners.', 'https://app.notion.com/p/3b3d15d9b1dd81eb9147e9349038dc31', 'Must Know'),
    ],
  },
]

export const totalNoteCount = tracks.reduce(
  (count, track) => count + track.topics.length,
  0,
)

export const source = {
  label: 'Always Be Job Ready Study Resource',
  url: notionRootUrl,
}

export const roadmapSteps = tracks.map((track) => ({
  description: track.description,
  title: track.title,
}))
