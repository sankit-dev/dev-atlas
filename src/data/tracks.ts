export type Accent = 'coral' | 'blue' | 'yellow' | 'green' | 'violet'

export type Note = {
  children?: Note[]
  description: string
  priority?: 'Must Know' | 'Important'
  slug: string
  title: string
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


const note = (
  title: string,
  description: string,
  priority?: Note['priority'],
  slug?: string,
  children?: Note[],
): Note => ({
  children,
  description,
  priority,
  slug: slug ?? title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  title,
})

export function flattenNotes(notes: Note[]): Note[] {
  return notes.flatMap((item) => [
    item,
    ...(item.children ? flattenNotes(item.children) : []),
  ])
}

export function countNotes(notes: Note[]) {
  return flattenNotes(notes).length
}

export const tracks: Track[] = [
  {
    title: 'Operating Systems',
    shortTitle: 'OS',
    eyebrow: 'Computer fundamentals',
    description:
      'Core operating system concepts for interviews and backend engineering.',
    accent: 'coral',
    status: '11 notes',
    topics: [
      note('What is an Operating System?', 'What an OS is, why it exists, and what happens without it.'),
      note('Process Management', 'How the OS creates, runs, switches, and schedules executing programs.', undefined, undefined, [
        note('Process vs Thread', 'Core difference, context switching cost, when to prefer one over the other.'),
        note('Process States & Lifecycle', 'New, Ready, Running, Waiting, Terminated.'),
        note('CPU Scheduling Algorithms', 'FCFS, SJF, Round Robin, Priority Scheduling, Multilevel Queue.'),
        note('Multithreading vs Multiprocessing vs Multitasking', 'Clear distinction with real-world examples.'),
      ]),
      note('Concurrency', 'Race Conditions, Critical Section, Mutex vs Semaphore.', undefined, undefined, [
        note('Deadlock', '4 Conditions, Prevention, Avoidance, Detection.'),
      ]),
      note('Memory Management', 'Paging, Segmentation, Virtual Memory, Page Faults.', undefined, undefined, [
        note('Cache Memory & Locality of Reference', 'Temporal vs spatial locality and why caching improves performance.'),
      ]),
      note('System Calls', 'fork, exec, and how user mode transitions to kernel mode.'),
    ],
  },
  {
    title: 'Computer Networks',
    shortTitle: 'Networks',
    eyebrow: 'How data moves',
    description:
      'Networking concepts every backend developer should be able to explain.',
    accent: 'blue',
    status: '32 notes',
    topics: [
      note('What is Computer Networking?', 'What networking is, why it exists, and real examples from everyday apps.'),
      note('OSI Model', 'The 7 OSI layers and what each layer is responsible for.', undefined, undefined, [
        note('TCP/IP Model', 'The practical 4-layer networking model used by the Internet.'),
        note('OSI vs TCP/IP & Encapsulation', 'How OSI maps to TCP/IP and how encapsulation moves data through layers.'),
      ]),
      note('IP Addressing', 'What an IP address is and how it identifies devices on a network.', undefined, undefined, [
        note('Network ID & Host ID', 'How an IP address is split into network and device parts.'),
        note('Subnet Mask', 'How devices know which part of an IP address is the network part.'),
        note('CIDR', 'The slash notation used to describe network size, such as /24.'),
        note('Public vs Private IP', 'Why local devices use private IPs and servers use public IPs.'),
        note('Router & Default Gateway', 'How traffic leaves your local network.'),
        note('NAT', 'How many private devices share one public IP address.'),
        note('DHCP', 'How devices automatically receive IP configuration.'),
        note('ARP', 'How local networks resolve IP addresses to hardware addresses.'),
      ]),
      note('Transport Layer', 'How applications choose reliable or fast delivery using TCP and UDP.', undefined, undefined, [
        note('TCP', 'Handshake, termination, sequence numbers, acknowledgements, retransmission, flow control, and congestion control.'),
        note('UDP', 'Difference from TCP, when to use UDP, and real-world examples.'),
        note('TCP vs UDP', 'Reliability, speed, ordering, error recovery, and use cases.'),
      ]),
      note('DNS', 'DNS lookup process, caching, recursive resolvers, and why DNS is needed.'),
      note('Web Communication', 'How web clients and servers exchange requests, responses, and real-time messages.', undefined, undefined, [
        note('HTTP', 'Request/response, headers, methods, status codes, cookies, sessions, and keep-alive.'),
        note('HTTPS', 'SSL/TLS, certificates, encryption, and HTTPS request flow.'),
        note('REST API', 'REST principles, statelessness, resources, idempotency, and HTTP methods.'),
        note('WebSockets', 'Why HTTP is not enough, full-duplex communication, handshakes, and real-time apps.'),
        note('CORS', 'Same Origin Policy, preflight requests, and Access-Control-Allow-Origin.'),
        note('Cookies vs Sessions vs JWT', 'Authentication state mechanisms and when each one fits.'),
        note('Authentication vs Authorization', 'Identity verification versus permission checks.'),
      ]),
      note('Network Infrastructure', 'Traffic distribution, proxying, edge delivery, ports, and socket-level programming.', undefined, undefined, [
        note('Load Balancer', 'Why load balancers are needed, round robin, least connections, and health checks.'),
        note('Reverse Proxy', 'Nginx and why backend servers use reverse proxies.'),
        note('CDN', 'Why images load faster, edge servers, and caching.'),
        note('Ports', 'How network services share one machine through numbered ports.'),
        note('Socket Programming', 'The programming interface behind network communication.'),
      ]),
    ],
  },
  {
    title: 'Object-Oriented Programming',
    shortTitle: 'OOP',
    eyebrow: 'Write maintainable code',
    description:
      'OOP concepts, relationships, design principles, and common interview questions.',
    accent: 'yellow',
    status: '20 notes',
    topics: [
      note('Introduction to OOP', 'Why OOP emerged, where it is useful today, and how it relates to functional programming.'),
      note('Class & Object', 'Classes, objects, state, and behaviour using practical backend examples.', undefined, undefined, [
        note('Constructors', 'Why constructors exist, how they protect valid objects, and how this() and super() work.'),
        note('this & super', 'Common use cases for this and super.'),
        note('Static Keyword', 'Static variables, methods, blocks, and static vs instance members.'),
        note('Access Modifiers', 'Public, private, protected, and package-private access.'),
        note('Object Lifecycle & Memory', 'Object creation, references, heap, stack, and garbage collection.'),
      ]),
      note('OOP Principles', 'The core ideas that make object-oriented design useful.', undefined, undefined, [
        note('Encapsulation', 'Protecting state and placing business rules where they belong.'),
        note('Abstraction', 'Expose a simple useful contract while hiding unnecessary detail.'),
        note('Polymorphism', 'One contract, multiple implementations, and runtime dispatch.'),
        note('Inheritance', 'True is-a relationships, extends, and when inheritance becomes fragile.'),
      ]),
      note('Relationships Between Classes', 'Association, aggregation, composition, ownership, and lifecycle.', undefined, undefined, [
        note('Composition vs Inheritance', 'Choose flexible collaboration before reaching for a class hierarchy.'),
        note('Interface vs Abstract Class', 'Choosing a flexible contract or a shared base implementation.'),
        note('Method Overloading vs Overriding', 'Two similar names, different problems: input convenience vs specialised behaviour.'),
      ]),
      note('Design Principles & Patterns', 'SOLID principles and common design patterns used to structure object-oriented code.', undefined, undefined, [
        note('SOLID Principles', 'Five object-oriented design principles that make code easier to change.', undefined, undefined, [
          note('Single Responsibility Principle', 'A class should have one clear reason to change.'),
          note('Open/Closed Principle', 'Code should be open for extension but closed for modification.'),
          note('Liskov Substitution Principle', 'Subtypes should be safely usable wherever the parent type is expected.'),
          note('Interface Segregation Principle', 'Prefer small focused interfaces over large forced contracts.'),
          note('Dependency Inversion Principle', 'High-level code should depend on abstractions, not concrete low-level classes.'),
        ]),
        note('Design Patterns', 'Singleton, Factory, Adapter, Decorator, Strategy, and Observer.'),
      ]),
      note('Common OOP Interview Questions', 'Frequently asked OOP interview questions.'),
    ],
  },
  {
    title: 'Databases & SQL',
    shortTitle: 'DBMS',
    eyebrow: 'Store data well',
    description:
      'Database fundamentals, SQL, transactions, scaling, and interview-heavy DBMS topics.',
    accent: 'green',
    status: '24 notes',
    topics: [
      note('Database Fundamentals', 'DBMS, RDBMS vs NoSQL, tables, rows, columns, schemas, and constraints.'),
      note('Database Design', 'Relationships, ER diagrams, junction tables, schema design, and cardinality.', undefined, undefined, [
        note('Keys & Constraints', 'Primary keys, foreign keys, candidate keys, composite keys, super keys, alternate keys, and unique keys.'),
        note('Normalization', 'Data redundancy, anomalies, 1NF, 2NF, 3NF, BCNF, and denormalization.'),
      ]),
      note('SQL Basics', 'SELECT, WHERE, ORDER BY, DISTINCT, LIMIT, LIKE, IN, BETWEEN, IS NULL, and CASE.', undefined, undefined, [
        note('SQL Filtering & Sorting', 'Logical operators, aliases, and expressions.'),
        note('SQL Joins', 'INNER, LEFT, RIGHT, FULL, CROSS, and SELF JOIN.'),
        note('Aggregation', 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING.'),
        note('Intermediate SQL', 'Subqueries, correlated subqueries, EXISTS, ANY, ALL, UNION, INTERSECT, and EXCEPT.'),
        note('Window Functions', 'ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), and LAG().'),
      ]),
      note('Transactions', 'Transaction lifecycle and ACID properties.', undefined, undefined, [
        note('Concurrency Control', 'Dirty reads, non-repeatable reads, and phantom reads.'),
        note('Isolation Levels', 'Read uncommitted, read committed, repeatable read, and serializable.'),
        note('Locking', 'Shared locks, exclusive locks, row locks, table locks, optimistic locking, and pessimistic locking.'),
        note('Deadlocks', 'Causes, detection, prevention, and resolution.'),
      ]),
      note('Database Programmability', 'Views, materialized views, stored procedures, functions, and triggers.', undefined, undefined, [
        note('Views', 'Views and materialized views.'),
        note('Stored Procedures & Triggers', 'Stored procedures, functions, and triggers.'),
      ]),
      note('Database Performance & Scaling', 'Indexes, query optimization, scaling strategies, and advanced database internals.', undefined, undefined, [
        note('Indexing', 'B-Tree, hash indexes, clustered indexes, composite indexes, and table scans.'),
        note('Query Optimization', 'EXPLAIN, execution plans, optimizers, predicate pushdown, N+1, pagination, and SELECT *.'),
        note('Database Scaling', 'Vertical scaling, horizontal scaling, read replicas, partitioning, and sharding.'),
        note('Advanced Concepts', 'MVCC, WAL, replication, CAP theorem, BASE, connection pooling, and Redis caching.'),
      ]),
      note('NoSQL', 'Non-relational database models and when they fit better than SQL.', undefined, undefined, [
        note('Types of NoSQL Databases', 'Document, key-value, wide-column, and graph database models.'),
        note('MongoDB & Document Databases', 'How document databases store JSON-like data and when MongoDB fits.'),
        note('Key-Value Databases', 'Fast key-based lookup using databases such as Redis.'),
        note('Wide-Column Databases', 'Distributed write-heavy storage using databases such as Cassandra.'),
        note('Graph Databases', 'Relationship-heavy data using nodes and edges.'),
        note('When to Use SQL vs NoSQL', 'Clear decision rules with practical examples.'),
      ]),
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
      note('What is AI?', 'Artificial intelligence as pattern learning and problem solving.', undefined, undefined, [
        note('Machine Learning vs Deep Learning vs Generative AI', 'How common AI terms relate to each other.'),
        note('How ChatGPT works', 'A high-level explanation of language model behavior.'),
        note('Tokens', 'The units AI models read, write, and charge for.'),
        note('Context Window', 'How much information a model can consider at once.'),
        note('Temperature', 'How randomness affects model output.'),
        note('Hallucinations', 'Why models can produce plausible but wrong answers.'),
      ]),
      note('Prompt Engineering', 'Writing instructions that produce useful model behavior.', undefined, undefined, [
        note('Prompt Templates', 'Reusable prompts for backend workflows.'),
        note('Chat Completion', 'Sending messages to a model and reading responses.'),
        note('Structured Output', 'Getting predictable JSON-shaped model responses.'),
        note('Function Calling / Tool Use', 'Letting models request typed actions from your backend.'),
        note('Streaming Responses', 'Sending partial model output to users as it arrives.'),
        note('Token Usage & Cost Calculation', 'Estimating AI feature cost from token usage.'),
      ]),
      note('RAG', 'Retrieval augmented generation.', undefined, undefined, [
        note('Embeddings', 'Representing meaning as vectors.'),
        note('Vector Databases', 'Storing and searching vectors for semantic retrieval.'),
        note('Chunking for RAG', 'Splitting documents for better retrieval.'),
        note('Semantic Search vs Keyword Search', 'Meaning-based search compared with exact matching.'),
      ]),
      note('AI Pipelines', 'Backend workflows that prepare, call, and post-process AI output.', undefined, undefined, [
        note('API Keys & Authentication', 'Authenticating safely with AI APIs.'),
        note('Caching for LLM responses', 'Caching model responses where it is correct and useful.'),
        note('Rate Limiting', 'Protecting AI endpoints from overuse.'),
        note('AI Security', 'Prompt injection, data leakage, and defensive backend design.'),
      ]),
      note('What is an AI Agent?', 'The basic agent loop and how it differs from one-shot prompting.', undefined, undefined, [
        note('Agent Planning & Reasoning', 'How agents break work into steps.'),
        note('Agent Memory', 'Short-term and long-term memory in agent systems.'),
        note('Conversation Memory', 'Remembering useful context across turns.'),
        note('Tools / Function Calling in Agents', 'How agents use tools to affect external systems.'),
        note('Multi-Agent Systems', 'Multiple agents coordinating on a task.'),
        note('Agentic Workflows', 'Workflow patterns that combine model decisions and deterministic code.'),
      ]),
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
      note('Cloud Basics and AWS Global Infrastructure', 'Cloud computing, Regions, Availability Zones and choosing a Region.', 'Must Know', undefined, [
        note('VPC and Networking Basics', 'VPCs, public/private subnets, routing, gateways and security groups.', 'Must Know'),
        note('IAM: Users, Roles and Policies', 'Authentication, permissions and least-privilege access.', 'Must Know'),
        note('CloudWatch, Billing and Shared Responsibility', 'Logs, metrics, alarms, cost controls and AWS versus customer duties.', 'Important'),
      ]),
      note('S3: Object Storage', 'Buckets, objects, access control, versioning and common use cases.', 'Must Know'),
      note('RDS: Managed Databases', 'Managed SQL databases, backups, Multi-AZ and connection safety.', 'Must Know'),
      note('EC2: Virtual Servers', 'Instances, AMIs, instance types, key pairs and security groups.', 'Must Know', undefined, [
        note('Load Balancing and Auto Scaling', 'Distributing traffic, health checks and automatically changing capacity.', 'Important'),
      ]),
    ],
  },
  {
    title: 'React / Namaste React',
    shortTitle: 'React',
    eyebrow: 'Frontend engineering',
    description:
      'React notes from the public NamasteReact course repository, covering foundations, routing, hooks, data flow, styling, optimization, and testing basics.',
    accent: 'coral',
    status: '18 notes',
    topics: [
      note('React Roadmap', 'How to study React for frontend, MERN apps, and interviews.', 'Must Know', 'react-roadmap', [
        note('React Must Know', 'The core React concepts every MERN developer should understand first.', 'Must Know', 'react-must-know', [
          note('React Inception', 'Set up React from first principles with plain HTML, DOM APIs, CDN scripts, React elements, and roots.', 'Must Know'),
          note('Igniting a React App', 'Bundlers, package managers, Parcel, npm scripts, dependencies, browserslist, and production builds.', 'Must Know'),
          note('Laying the Foundation', 'Babel, JSX, React elements, components, composition, and the early structure of a React app.', 'Must Know'),
          note('Talk Is Cheap, Show Me the Code', 'Planning and building a food ordering app with components, props, config-driven UI, and project structure.', 'Must Know', 'talk-is-cheap-show-me-the-code'),
          note('Let’s Get Hooked', 'ES modules, React hooks, useState, state-driven rendering, reconciliation, and React Fiber basics.', 'Must Know', 'lets-get-hooked'),
          note('Exploring the World', 'Fetching data, service architectures, useEffect, shimmer UI, conditional rendering, and search filtering.', 'Must Know'),
          note('Finding the Path', 'Client-side routing with react-router-dom, nested routes, outlets, dynamic routes, and error pages.', 'Must Know'),
          note('Data Is the New Oil', 'Data layer thinking, context, prop drilling, lifting state, controlled components, and React data flow.', 'Must Know'),
        ]),
        note('React Good to Know', 'Useful React concepts after the core path is clear.', 'Important', 'react-good-to-know', [
          note('Let’s Get Classy', 'Class components, props, state, lifecycle methods, async effects, and cleanup.', 'Important', 'lets-get-classy'),
          note('Optimizing a React App', 'Custom hooks, modularity, single responsibility, lazy loading, Suspense, and code splitting.', 'Important'),
          note('Styling React with Tailwind', 'CSS approaches in React, CSS frameworks, Tailwind setup, utility classes, and pros and cons.', 'Important'),
        ]),
        note('React Coding Exercises', 'Practice tasks commonly asked in React interviews and machine-coding rounds.', 'Must Know', 'react-coding-exercises', [
          note('Component Composition Exercise', 'Break a UI into reusable components with props and lists.', 'Must Know'),
          note('Hooks and Data Fetching Exercise', 'Build loading, error, empty, and success states around API data.', 'Must Know'),
          note('Routing and State Exercise', 'Build nested routes, detail pages, and shared app state.', 'Important'),
        ]),
      ]),
    ],
  },
  {
    title: 'JavaScript',
    shortTitle: 'JS',
    eyebrow: 'MERN foundation',
    description:
      'JavaScript fundamentals, async behavior, browser/runtime concepts, and coding-round exercises.',
    accent: 'yellow',
    status: '25 notes',
    topics: [
      note('JavaScript Roadmap', 'How to study JavaScript for React, Node.js, interviews, and coding rounds.', 'Must Know', 'javascript-roadmap', [
        note('JavaScript Must Know', 'The core concepts every MERN developer should understand first.', 'Must Know', undefined, [
          note('What is JavaScript?', 'What JavaScript is, why it exists, and where it runs.', 'Must Know'),
          note('Execution Context and Call Stack', 'How JavaScript runs code step by step.', 'Must Know'),
          note('Scope, Hoisting, var, let and const', 'How variable visibility and declaration behavior work.', 'Must Know'),
          note('Closures', 'How functions remember variables from their outer scope.', 'Must Know'),
          note('this Keyword', 'How this is decided in different call sites.', 'Must Know'),
          note('Prototypes and Prototype Chain', 'How JavaScript objects inherit behavior.', 'Must Know'),
          note('Arrays, Objects and Common Methods', 'Working with data using map, filter, reduce, spread, rest, and destructuring.', 'Must Know'),
          note('Event Loop', 'Why asynchronous callbacks run after the current call stack.', 'Must Know'),
          note('Promises and async await', 'How JavaScript represents and handles future async results.', 'Must Know'),
          note('Error Handling', 'try/catch, throwing errors, and handling async failures.', 'Must Know'),
          note('JavaScript Modules', 'CommonJS vs ES Modules and how imports/exports organize code.', 'Must Know'),
          note('Debounce and Throttle', 'Control how often a function runs during frequent events.', 'Must Know'),
        ]),
        note('JavaScript Good to Know', 'Useful concepts that deepen understanding after the core path.', 'Important', undefined, [
          note('Classes in JavaScript', 'Class syntax over prototype-based behavior.', 'Important'),
          note('Shallow Copy vs Deep Copy', 'How object copying works and where reference bugs come from.', 'Important'),
          note('Memory Leaks in JavaScript', 'Common ways references stay alive longer than expected.', 'Important'),
          note('Currying and Memoization', 'Function patterns often asked in interviews and coding rounds.', 'Important'),
        ]),
        note('JavaScript Coding Exercises', 'Practice problems commonly asked in frontend and MERN coding rounds.', 'Must Know', undefined, [
          note('Polyfills: map, filter and reduce', 'Implement common array methods from scratch.', 'Must Know'),
          note('Implement Debounce and Throttle', 'Write reusable debounce and throttle helpers.', 'Must Know'),
          note('Flatten Array and Deep Clone', 'Handle nested arrays and object copying safely.', 'Must Know'),
          note('Promise Utilities', 'Implement Promise.all, sequential execution, retry, and timeout helpers.', 'Must Know'),
          note('Event Emitter and LRU Cache', 'Build two common machine-coding round utilities.', 'Important'),
        ]),
      ]),
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
      note('What is Docker?', 'A simple explanation of Docker, the problem it solves, and when you actually need it.', 'Must Know', 'why-docker-and-how-it-works', [
        note('Images, Containers and Registries', 'Understand the package, the running app, and the place where Docker images are stored.', 'Must Know'),
        note('Writing a Dockerfile', 'Write the recipe that packages your app into a Docker image.', 'Must Know'),
        note('Build and Run Commands', 'Build an image, start your app, view logs, and stop it when you are done.', 'Must Know'),
        note('Volumes and Persistent Data', 'Keep important data, such as a database, when a container is replaced.', 'Must Know'),
        note('Docker Networking', 'Let your containers and your computer communicate using ports and service names.', 'Must Know'),
        note('Docker Compose', 'Start an API, database, and other local services together from one file.', 'Must Know'),
        note('Configuration, Security and Optimization', 'Handle settings and secrets safely, then make your production image smaller and safer.', 'Important', 'environment-variables-security-and-optimization'),
      ]),
    ],
  },
  {
    title: 'Node.js',
    shortTitle: 'Node',
    eyebrow: 'Backend runtime',
    description:
      'Node.js runtime fundamentals, async IO, modules, streams, and backend coding exercises.',
    accent: 'green',
    status: '23 notes',
    topics: [
      note('Node.js Roadmap', 'How to study Node.js for backend development and interviews.', 'Must Know', 'nodejs-roadmap', [
        note('Node.js Must Know', 'Core runtime concepts every backend developer should understand first.', 'Must Know', 'nodejs-must-know', [
          note('What is Node.js?', 'What Node.js is, why it exists, and when to use it.', 'Must Know'),
          note('Node.js vs Browser JavaScript', 'Same language, different runtime capabilities and APIs.', 'Must Know'),
          note('Node.js Event Loop and Non-blocking IO', 'libuv, event loop phases, microtasks, macrotasks, and callback priority.', 'Must Know'),
          note('Modules and NPM', 'CommonJS, ES Modules, npm packages, and project dependencies.', 'Must Know'),
          note('File System and Path', 'Read, write, and resolve files safely in Node.js.', 'Must Know'),
          note('Events and EventEmitter', 'Build event-driven code using Node.js EventEmitter.', 'Must Know'),
          note('Streams and Buffers', 'Process large data without loading everything into memory.', 'Must Know'),
          note('HTTP Server in Node.js', 'Create a basic server without Express to understand the foundation.', 'Must Know'),
          note('Environment Variables and process', 'Use process.env, argv, exit codes, and runtime metadata.', 'Must Know'),
          note('Node.js Error Handling', 'Handle sync errors, async errors, callbacks, and rejected promises.', 'Must Know'),
        ]),
        note('Node.js Good to Know', 'Useful runtime features after the core path.', 'Important', 'nodejs-good-to-know', [
          note('Worker Threads', 'Run CPU-heavy JavaScript work off the main thread.', 'Important'),
          note('Child Processes', 'Run external commands or separate programs from Node.js.', 'Important'),
          note('Package Versioning', 'Understand semver, package-lock, dependencies, and devDependencies.', 'Important'),
          note('Node.js Security Basics', 'Protect secrets, dependencies, inputs, and runtime configuration.', 'Important'),
        ]),
        note('Node.js Coding Exercises', 'Backend coding exercises commonly asked around Node.js fundamentals.', 'Must Know', 'nodejs-coding-exercises', [
          note('HTTP Server without Express', 'Build a tiny router with Node.js http module.', 'Must Know'),
          note('Build a CLI Tool', 'Read command line arguments and create a useful script.', 'Important'),
          note('File Upload with Streams', 'Use streams to handle large files efficiently.', 'Important'),
          note('Custom EventEmitter', 'Implement a small event emitter from scratch.', 'Must Know'),
          note('In-memory Rate Limiter', 'Limit repeated requests using Map and time windows.', 'Must Know'),
        ]),
      ]),
    ],
  },
  {
    title: 'Express.js',
    shortTitle: 'Express',
    eyebrow: 'API framework',
    description:
      'Express routing, middleware, REST APIs, auth, validation, and backend API exercises.',
    accent: 'blue',
    status: '26 notes',
    topics: [
      note('Express.js Roadmap', 'How to study Express for real backend API development.', 'Must Know', 'expressjs-roadmap', [
        note('Express.js Must Know', 'Core Express concepts for building maintainable APIs.', 'Must Know', 'expressjs-must-know', [
          note('What is Express?', 'What Express adds on top of Node.js and why it exists.', 'Must Know'),
          note('Routing', 'Map HTTP methods and URLs to handler functions.', 'Must Know'),
          note('Params, Query and Body', 'Understand where request input comes from.', 'Must Know'),
          note('Middleware', 'How Express runs request logic in a chain.', 'Must Know'),
          note('Controllers and Services', 'Separate HTTP handling from business logic.', 'Must Know'),
          note('REST API Design', 'Design resource-based APIs using HTTP methods and status codes.', 'Must Know'),
          note('Request Validation', 'Validate input before it reaches business logic.', 'Must Know'),
          note('Error Handling Middleware', 'Centralize errors and responses in Express.', 'Must Know'),
          note('Authentication and JWT', 'Verify user identity with tokens.', 'Must Know'),
          note('Authorization', 'Control what authenticated users are allowed to do.', 'Must Know'),
          note('CORS in Express', 'Allow controlled browser access from other origins.', 'Must Know'),
          note('Pagination, Filtering and Sorting', 'Return large datasets in a controlled API shape.', 'Must Know'),
        ]),
        note('Express.js Good to Know', 'Useful production concepts after basic APIs work.', 'Important', 'expressjs-good-to-know', [
          note('Cookie Sessions', 'Store auth state with cookies and server/session strategy.', 'Important'),
          note('File Uploads in Express', 'Accept files safely using middleware and storage rules.', 'Important'),
          note('Rate Limiting in Express', 'Protect APIs from repeated abusive requests.', 'Important'),
          note('Security Headers', 'Use headers to reduce common web risks.', 'Important'),
          note('Testing Express APIs', 'Test routes, middleware, and error responses.', 'Important'),
        ]),
        note('Express.js Coding Exercises', 'Practice APIs commonly asked in backend coding rounds.', 'Must Know', 'expressjs-coding-exercises', [
          note('CRUD API', 'Build create, read, update, and delete routes.', 'Must Know'),
          note('JWT Auth API', 'Build login, register, and protected routes.', 'Must Know'),
          note('Role-based Authorization API', 'Restrict routes by user role.', 'Must Know'),
          note('Pagination and Search API', 'Add query-based list controls to an endpoint.', 'Must Know'),
          note('URL Shortener API', 'Build a common backend machine-coding project.', 'Important'),
        ]),
      ]),
    ],
  },
  {
    title: 'MongoDB',
    shortTitle: 'MongoDB',
    eyebrow: 'MERN database',
    description:
      'MongoDB documents, schema design, indexes, aggregation, Mongoose, and database exercises.',
    accent: 'green',
    status: '25 notes',
    topics: [
      note('MongoDB Roadmap', 'How to study MongoDB for MERN apps and backend interviews.', 'Must Know', 'mongodb-roadmap', [
        note('MongoDB Must Know', 'Core MongoDB concepts for practical backend development.', 'Must Know', undefined, [
          note('What is MongoDB?', 'What MongoDB is, why document databases exist, and where it fits.', 'Must Know'),
          note('Documents and Collections', 'How MongoDB stores JSON-like records.', 'Must Know'),
          note('MongoDB vs SQL', 'How document databases differ from relational databases.', 'Must Know'),
          note('CRUD Operations in MongoDB', 'Create, read, update, and delete documents.', 'Must Know'),
          note('Query and Update Operators', 'Use operators like $set, $inc, $in, $gt, and $or.', 'Must Know'),
          note('Schema Design in MongoDB', 'Design documents around access patterns.', 'Must Know'),
          note('Embedding vs Referencing', 'Choose nested documents or separate linked collections.', 'Must Know'),
          note('Indexes in MongoDB', 'Speed up queries with indexes and understand write tradeoffs.', 'Must Know'),
          note('Aggregation Pipeline', 'Transform and summarize data with pipeline stages.', 'Must Know'),
          note('Mongoose Schema and Model', 'Define application-level models for MongoDB documents.', 'Must Know'),
          note('Mongoose Validation', 'Validate document shape and values before saving.', 'Must Know'),
          note('Population in Mongoose', 'Replace referenced ids with related documents.', 'Must Know'),
        ]),
        note('MongoDB Good to Know', 'Useful concepts for stronger production data design.', 'Important', undefined, [
          note('Transactions in MongoDB', 'Make multiple writes succeed or fail together.', 'Important'),
          note('Compound and Text Indexes', 'Use multi-field and text search indexes.', 'Important'),
          note('MongoDB Performance Mistakes', 'Avoid unindexed queries, huge documents, and bad pagination.', 'Important'),
          note('MongoDB Data Modeling Patterns', 'Use common document modeling patterns for real apps.', 'Important'),
        ]),
        note('MongoDB Coding Exercises', 'Practice schema design, CRUD, search, aggregation, and transactions.', 'Must Know', undefined, [
          note('User Post Comment Schema', 'Design social-style collections and relationships.', 'Must Know'),
          note('CRUD with Mongoose', 'Build model-based create, read, update, and delete operations.', 'Must Know'),
          note('Search and Pagination in MongoDB', 'Implement query search and paginated lists.', 'Must Know'),
          note('Aggregation Reports', 'Calculate grouped summaries using aggregation pipeline.', 'Must Know'),
          note('Order Placement with Transaction', 'Use transactions for multi-document order flow.', 'Important'),
        ]),
      ]),
    ],
  },
  {
    title: 'MERN Integration',
    shortTitle: 'MERN',
    eyebrow: 'Full-stack flow',
    description:
      'How React, Node, Express, and MongoDB connect in real full-stack applications.',
    accent: 'violet',
    status: '17 notes',
    topics: [
      note('MERN Integration Roadmap', 'How the four MERN parts connect into one application.', 'Must Know', 'mern-integration-roadmap', [
        note('MERN Must Know', 'The full-stack concepts needed before building projects.', 'Must Know', undefined, [
          note('MERN Architecture', 'How React, Express, Node, and MongoDB communicate.', 'Must Know'),
          note('Frontend vs Backend Responsibility', 'Decide what belongs in React and what belongs on the server.', 'Must Know'),
          note('API Contract', 'Define request and response shapes between frontend and backend.', 'Must Know'),
          note('Authentication Flow in MERN', 'Connect login, tokens/cookies, protected APIs, and UI state.', 'Must Know'),
          note('Protected Routes', 'Protect frontend screens and backend endpoints correctly.', 'Must Know'),
          note('Full-stack Error Handling', 'Handle errors consistently from database to UI.', 'Must Know'),
          note('CORS in MERN', 'Understand why local React and Express apps hit CORS errors.', 'Must Know'),
          note('Environment Variables in MERN', 'Separate frontend and backend configuration safely.', 'Must Know'),
          note('Deployment Overview', 'Build React, run the API, connect env vars, and deploy safely.', 'Important'),
        ]),
        note('MERN Projects', 'Full-stack projects that combine React, Express, Node.js, and MongoDB.', 'Must Know', undefined, [
          note('Todo App with Auth', 'Build auth, CRUD, protected routes, and user-owned data.', 'Must Know'),
          note('Blog App with Comments', 'Build posts, comments, authors, and moderation basics.', 'Must Know'),
          note('Notes App with Search', 'Build notes, search, pagination, and ownership.', 'Must Know'),
          note('URL Shortener', 'Build slug generation, redirects, analytics, and validation.', 'Important'),
          note('Basic E-commerce App', 'Build products, cart, orders, and transaction thinking.', 'Important'),
        ]),
      ]),
    ],
  },
  {
    title: 'Git & GitHub',
    shortTitle: 'Git',
    eyebrow: 'Version control',
    description:
      'Git fundamentals, branching, collaboration, and GitHub workflows from scratch.',
    accent: 'yellow',
    status: '17 notes',
    topics: [
      note('What is Git?', 'Why version control exists, what Git solves, and what happens without it.', 'Must Know', undefined, [
        note('Repository, Working Tree, Staging Area and Commit', 'The core Git mental model: where changes live before they become history.', 'Must Know'),
        note('Installing and Configuring Git', 'Set name, email, editor, default branch, and authentication basics.', 'Must Know'),
      ]),
      note('Daily Git Workflow', 'The commands used in normal development: status, add, commit, log, diff, and restore.', 'Must Know', undefined, [
        note('git status, diff, add and commit', 'See changes, choose what to save, and create meaningful commits.', 'Must Know'),
        note('Reading Git History', 'Use log, show, blame, and diff to understand how code changed.', 'Important'),
        note('Undoing Changes Safely', 'Restore files, amend commits, revert bad commits, and know when reset is risky.', 'Must Know'),
        note('Ignoring Files with .gitignore', 'Keep dependencies, secrets, builds, and local files out of Git.', 'Must Know'),
      ]),
      note('Branches and Merging', 'Work on isolated lines of development and combine changes safely.', 'Must Know', undefined, [
        note('Merge vs Rebase', 'Two ways to integrate branch work and when each one makes sense.', 'Must Know'),
        note('Merge Conflicts', 'Why conflicts happen and how to resolve them without panic.', 'Must Know'),
        note('Stash and Temporary Work', 'Put unfinished work aside when you need to switch context.', 'Important'),
      ]),
      note('Remote Repositories', 'How local Git history connects to shared repositories through clone, fetch, pull, and push.', 'Must Know', undefined, [
        note('Clone, Fetch, Pull and Push', 'Understand the commands that move commits between your machine and a remote.', 'Must Know'),
        note('GitHub Basics', 'What GitHub adds on top of Git: hosting, issues, pull requests, reviews, and collaboration.', 'Must Know'),
        note('Pull Requests and Code Review', 'Use PRs to discuss, review, test, and merge code as a team.', 'Must Know'),
        note('Forks, Upstream and Open Source Workflow', 'Contribute to repositories you do not own using forks and upstream remotes.', 'Important'),
      ]),
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
      note('What is GitHub CI/CD?', 'A beginner-friendly explanation of CI, CD, why teams use it, and a real example.', 'Must Know', 'ci-cd-fundamentals', [
        note('GitHub Actions: How It Works', 'The GitHub feature that runs your automation: workflows, jobs, steps, actions, and runners.', 'Must Know', 'github-actions-workflow-structure'),
        note('When Should a Workflow Run?', 'Choose pull requests, pushes, manual runs, and path filters for the task.', 'Must Know', 'triggers-filters-and-manual-runs'),
        note('Your First CI Pipeline', 'Set up a simple check that installs, lints, tests, and builds your app.', 'Must Know', 'building-a-useful-ci-pipeline'),
        note('Artifacts, Docker Images and Registries', 'Save build output and package an app so a server can run the exact version you tested.', 'Important'),
        note('Secrets, Tokens and Permissions', 'Give a workflow only the credentials and access it needs—without exposing them in code.', 'Must Know'),
        note('Deploying Safely', 'Use staging, production approvals, and a rollback plan when you start releasing automatically.', 'Must Know', 'environments-approvals-and-deployment'),
      ]),
    ],
  },
]

export const totalNoteCount = tracks.reduce(
  (count, track) => count + countNotes(track.topics),
  0,
)
