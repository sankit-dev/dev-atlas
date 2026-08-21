export type Accent = 'coral' | 'blue' | 'yellow' | 'green' | 'violet'

export type Note = {
  children?: Note[]
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
  sourceUrl,
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
      note('What is an Operating System?', 'What an OS is, why it exists, and what happens without it.', 'https://app.notion.com/p/39dd15d9b1dd804aaa7bc66eb2ca889a'),
      note('Process Management', 'How the OS creates, runs, switches, and schedules executing programs.', 'https://app.notion.com/p/39dd15d9b1dd804aaa7bc66eb2ca889a', undefined, undefined, [
        note('Process vs Thread', 'Core difference, context switching cost, when to prefer one over the other.', 'https://app.notion.com/p/39dd15d9b1dd804aaa7bc66eb2ca889a'),
        note('Process States & Lifecycle', 'New, Ready, Running, Waiting, Terminated.', 'https://app.notion.com/p/39dd15d9b1dd80af9d94caeb9f1aed87'),
        note('CPU Scheduling Algorithms', 'FCFS, SJF, Round Robin, Priority Scheduling, Multilevel Queue.', 'https://app.notion.com/p/39dd15d9b1dd80b5964cc9e3de0b7438'),
        note('Multithreading vs Multiprocessing vs Multitasking', 'Clear distinction with real-world examples.', 'https://app.notion.com/p/39dd15d9b1dd800b8e51dcd98a95bd75'),
      ]),
      note('Concurrency', 'Race Conditions, Critical Section, Mutex vs Semaphore.', 'https://app.notion.com/p/39dd15d9b1dd8032a782ced1c3f59bd6', undefined, undefined, [
        note('Deadlock', '4 Conditions, Prevention, Avoidance, Detection.', 'https://app.notion.com/p/39dd15d9b1dd80e2a7e9c1d0131e5388'),
      ]),
      note('Memory Management', 'Paging, Segmentation, Virtual Memory, Page Faults.', 'https://app.notion.com/p/39dd15d9b1dd80ce8542cb132f1c9d96', undefined, undefined, [
        note('Cache Memory & Locality of Reference', 'Temporal vs spatial locality and why caching improves performance.', 'https://app.notion.com/p/39dd15d9b1dd80ee8339c9e21f5c0de3'),
      ]),
      note('System Calls', 'fork, exec, and how user mode transitions to kernel mode.', 'https://app.notion.com/p/39dd15d9b1dd8006b5afc9ee1b04322a'),
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
      note('What is Computer Networking?', 'What networking is, why it exists, and real examples from everyday apps.', 'https://app.notion.com/p/3a3d15d9b1dd8056a754c607ee7f252a'),
      note('OSI Model', 'The 7 OSI layers and what each layer is responsible for.', 'https://app.notion.com/p/3a3d15d9b1dd806eb5b8e017c3b057bd', undefined, undefined, [
        note('TCP/IP Model', 'The practical 4-layer networking model used by the Internet.', 'https://app.notion.com/p/3a3d15d9b1dd806eb5b8e017c3b057bd'),
        note('OSI vs TCP/IP & Encapsulation', 'How OSI maps to TCP/IP and how encapsulation moves data through layers.', 'https://app.notion.com/p/3a3d15d9b1dd806eb5b8e017c3b057bd'),
      ]),
      note('IP Addressing', 'What an IP address is and how it identifies devices on a network.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7', undefined, undefined, [
        note('Network ID & Host ID', 'How an IP address is split into network and device parts.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('Subnet Mask', 'How devices know which part of an IP address is the network part.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('CIDR', 'The slash notation used to describe network size, such as /24.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('Public vs Private IP', 'Why local devices use private IPs and servers use public IPs.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('Router & Default Gateway', 'How traffic leaves your local network.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('NAT', 'How many private devices share one public IP address.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('DHCP', 'How devices automatically receive IP configuration.', 'https://app.notion.com/p/3a3d15d9b1dd80b8b37ad8416078bef7'),
        note('ARP', 'How local networks resolve IP addresses to hardware addresses.', 'https://app.notion.com/p/3a3d15d9b1dd804e8d0df22d2e9f63f2'),
      ]),
      note('Transport Layer', 'How applications choose reliable or fast delivery using TCP and UDP.', 'https://app.notion.com/p/3a3d15d9b1dd8056a754c607ee7f252a', undefined, undefined, [
        note('TCP', 'Handshake, termination, sequence numbers, acknowledgements, retransmission, flow control, and congestion control.', 'https://app.notion.com/p/3a3d15d9b1dd8056a754c607ee7f252a'),
        note('UDP', 'Difference from TCP, when to use UDP, and real-world examples.', 'https://app.notion.com/p/3a3d15d9b1dd8058966cd0dac2683bed'),
        note('TCP vs UDP', 'Reliability, speed, ordering, error recovery, and use cases.', 'https://app.notion.com/p/3a3d15d9b1dd8067a860ea4725c15fb1'),
      ]),
      note('DNS', 'DNS lookup process, caching, recursive resolvers, and why DNS is needed.', 'https://app.notion.com/p/3a3d15d9b1dd805ea798e340d2713368'),
      note('Web Communication', 'How web clients and servers exchange requests, responses, and real-time messages.', 'https://app.notion.com/p/3a3d15d9b1dd80269cb9c82621de14b3', undefined, undefined, [
        note('HTTP', 'Request/response, headers, methods, status codes, cookies, sessions, and keep-alive.', 'https://app.notion.com/p/3a3d15d9b1dd80269cb9c82621de14b3'),
        note('HTTPS', 'SSL/TLS, certificates, encryption, and HTTPS request flow.', 'https://app.notion.com/p/3a3d15d9b1dd80c09954c2f92211e957'),
        note('REST API', 'REST principles, statelessness, resources, idempotency, and HTTP methods.', 'https://app.notion.com/p/3a3d15d9b1dd8031afd7ee84f96e6991'),
        note('WebSockets', 'Why HTTP is not enough, full-duplex communication, handshakes, and real-time apps.', 'https://app.notion.com/p/3a3d15d9b1dd80448818e3e9b336fa3a'),
        note('CORS', 'Same Origin Policy, preflight requests, and Access-Control-Allow-Origin.', 'https://app.notion.com/p/3a3d15d9b1dd80e18184f3827a278133'),
        note('Cookies vs Sessions vs JWT', 'Authentication state mechanisms and when each one fits.', 'https://app.notion.com/p/3a3d15d9b1dd807a9c47ffff13beb9c7'),
        note('Authentication vs Authorization', 'Identity verification versus permission checks.', 'https://app.notion.com/p/3a3d15d9b1dd80ccb77ec96291d31e21'),
      ]),
      note('Network Infrastructure', 'Traffic distribution, proxying, edge delivery, ports, and socket-level programming.', 'https://app.notion.com/p/3a3d15d9b1dd804680b2d27af17f208d', undefined, undefined, [
        note('Load Balancer', 'Why load balancers are needed, round robin, least connections, and health checks.', 'https://app.notion.com/p/3a3d15d9b1dd804680b2d27af17f208d'),
        note('Reverse Proxy', 'Nginx and why backend servers use reverse proxies.', 'https://app.notion.com/p/3a3d15d9b1dd80498435e96e45a31dbe'),
        note('CDN', 'Why images load faster, edge servers, and caching.', 'https://app.notion.com/p/3a3d15d9b1dd80c88d61c7458c60beab'),
        note('Ports', 'How network services share one machine through numbered ports.', 'https://app.notion.com/p/3a3d15d9b1dd808198f9ed9fdfa9e619'),
        note('Socket Programming', 'The programming interface behind network communication.', 'https://app.notion.com/p/3a3d15d9b1dd80f1901dc74138b901ea'),
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
      note('Introduction to OOP', 'Why OOP emerged, where it is useful today, and how it relates to functional programming.', 'https://app.notion.com/p/3acd15d9b1dd8012a98cd92787292b8d'),
      note('Class & Object', 'Classes, objects, state, and behaviour using practical backend examples.', 'https://app.notion.com/p/3acd15d9b1dd8033bdd4d58bcb6160e6', undefined, undefined, [
        note('Constructors', 'Why constructors exist, how they protect valid objects, and how this() and super() work.', 'https://app.notion.com/p/3acd15d9b1dd8088baf8cfee5a252732'),
        note('this & super', 'Common use cases for this and super.', 'https://app.notion.com/p/3acd15d9b1dd808e945ccd0a436df745'),
        note('Static Keyword', 'Static variables, methods, blocks, and static vs instance members.', 'https://app.notion.com/p/3acd15d9b1dd80dfa4b7faa492194c44'),
        note('Access Modifiers', 'Public, private, protected, and package-private access.', 'https://app.notion.com/p/3acd15d9b1dd80b4afdfc0e777f446f2'),
        note('Object Lifecycle & Memory', 'Object creation, references, heap, stack, and garbage collection.', 'https://app.notion.com/p/3acd15d9b1dd80df85bbde30129ef662'),
      ]),
      note('OOP Principles', 'The core ideas that make object-oriented design useful.', 'https://app.notion.com/p/3acd15d9b1dd800dae9af26791370365', undefined, undefined, [
        note('Encapsulation', 'Protecting state and placing business rules where they belong.', 'https://app.notion.com/p/3acd15d9b1dd800dae9af26791370365'),
        note('Abstraction', 'Expose a simple useful contract while hiding unnecessary detail.', 'https://app.notion.com/p/3acd15d9b1dd804a872de451824bdd3e'),
        note('Polymorphism', 'One contract, multiple implementations, and runtime dispatch.', 'https://app.notion.com/p/3acd15d9b1dd802babf1cd6fa9b90e60'),
        note('Inheritance', 'True is-a relationships, extends, and when inheritance becomes fragile.', 'https://app.notion.com/p/3acd15d9b1dd8018b66ace67d2be85eb'),
      ]),
      note('Relationships Between Classes', 'Association, aggregation, composition, ownership, and lifecycle.', 'https://app.notion.com/p/3acd15d9b1dd808b8587ef9b6e5201cf', undefined, undefined, [
        note('Composition vs Inheritance', 'Choose flexible collaboration before reaching for a class hierarchy.', 'https://app.notion.com/p/3acd15d9b1dd80d38fbfd7d2cb7eca7e'),
        note('Interface vs Abstract Class', 'Choosing a flexible contract or a shared base implementation.', 'https://app.notion.com/p/3acd15d9b1dd80c4b94af74ff2ff8f1c'),
        note('Method Overloading vs Overriding', 'Two similar names, different problems: input convenience vs specialised behaviour.', 'https://app.notion.com/p/3acd15d9b1dd80e1938ed3b7c85069fc'),
      ]),
      note('Design Principles & Patterns', 'SOLID principles and common design patterns used to structure object-oriented code.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25', undefined, undefined, [
        note('SOLID Principles', 'Five object-oriented design principles that make code easier to change.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25', undefined, undefined, [
          note('Single Responsibility Principle', 'A class should have one clear reason to change.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
          note('Open/Closed Principle', 'Code should be open for extension but closed for modification.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
          note('Liskov Substitution Principle', 'Subtypes should be safely usable wherever the parent type is expected.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
          note('Interface Segregation Principle', 'Prefer small focused interfaces over large forced contracts.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
          note('Dependency Inversion Principle', 'High-level code should depend on abstractions, not concrete low-level classes.', 'https://app.notion.com/p/3acd15d9b1dd80c58157d516901a0d25'),
        ]),
        note('Design Patterns', 'Singleton, Factory, Adapter, Decorator, Strategy, and Observer.', 'https://app.notion.com/p/3acd15d9b1dd800a9c6cd9246484e62f'),
      ]),
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
    status: '24 notes',
    topics: [
      note('Database Fundamentals', 'DBMS, RDBMS vs NoSQL, tables, rows, columns, schemas, and constraints.', 'https://app.notion.com/p/3add15d9b1dd8015b160c6d287a04c7c'),
      note('Database Design', 'Relationships, ER diagrams, junction tables, schema design, and cardinality.', 'https://app.notion.com/p/3add15d9b1dd8086aa8bde98011e6e30', undefined, undefined, [
        note('Keys & Constraints', 'Primary keys, foreign keys, candidate keys, composite keys, super keys, alternate keys, and unique keys.', 'https://app.notion.com/p/3add15d9b1dd80df9a74e2596316e3a8'),
        note('Normalization', 'Data redundancy, anomalies, 1NF, 2NF, 3NF, BCNF, and denormalization.', 'https://app.notion.com/p/3add15d9b1dd80c7b28edc6f7236f21d'),
      ]),
      note('SQL Basics', 'SELECT, WHERE, ORDER BY, DISTINCT, LIMIT, LIKE, IN, BETWEEN, IS NULL, and CASE.', 'https://app.notion.com/p/3add15d9b1dd8027be8be9162f61f3ff', undefined, undefined, [
        note('SQL Filtering & Sorting', 'Logical operators, aliases, and expressions.', 'https://app.notion.com/p/3add15d9b1dd804d87eee4de03d380dc'),
        note('SQL Joins', 'INNER, LEFT, RIGHT, FULL, CROSS, and SELF JOIN.', 'https://app.notion.com/p/3add15d9b1dd802fadb9f1c99b5c0afc'),
        note('Aggregation', 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING.', 'https://app.notion.com/p/3add15d9b1dd803bada9fc29ac0a3832'),
        note('Intermediate SQL', 'Subqueries, correlated subqueries, EXISTS, ANY, ALL, UNION, INTERSECT, and EXCEPT.', 'https://app.notion.com/p/3add15d9b1dd80caa5f0e9fce0c87213'),
        note('Window Functions', 'ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), and LAG().', 'https://app.notion.com/p/3add15d9b1dd802985c8d0bd2e3fe897'),
      ]),
      note('Transactions', 'Transaction lifecycle and ACID properties.', 'https://app.notion.com/p/3add15d9b1dd80538aacde6222588c64', undefined, undefined, [
        note('Concurrency Control', 'Dirty reads, non-repeatable reads, and phantom reads.', 'https://app.notion.com/p/3add15d9b1dd80d483f3c88569cea545'),
        note('Isolation Levels', 'Read uncommitted, read committed, repeatable read, and serializable.', 'https://app.notion.com/p/3add15d9b1dd809cafd1f77e2e91dbd5'),
        note('Locking', 'Shared locks, exclusive locks, row locks, table locks, optimistic locking, and pessimistic locking.', 'https://app.notion.com/p/3add15d9b1dd80af8ef4fe56143b2014'),
        note('Deadlocks', 'Causes, detection, prevention, and resolution.', 'https://app.notion.com/p/3add15d9b1dd8016b916fc1f9704bd74'),
      ]),
      note('Database Programmability', 'Views, materialized views, stored procedures, functions, and triggers.', 'https://app.notion.com/p/3add15d9b1dd804d8390d14da556fc8d', undefined, undefined, [
        note('Views', 'Views and materialized views.', 'https://app.notion.com/p/3add15d9b1dd804d8390d14da556fc8d'),
        note('Stored Procedures & Triggers', 'Stored procedures, functions, and triggers.', 'https://app.notion.com/p/3add15d9b1dd80f7bc00cec13b3eea17'),
      ]),
      note('Database Performance & Scaling', 'Indexes, query optimization, scaling strategies, and advanced database internals.', 'https://app.notion.com/p/3add15d9b1dd80c8a951ee9a26aefcc8', undefined, undefined, [
        note('Indexing', 'B-Tree, hash indexes, clustered indexes, composite indexes, and table scans.', 'https://app.notion.com/p/3add15d9b1dd80c8a951ee9a26aefcc8'),
        note('Query Optimization', 'EXPLAIN, execution plans, optimizers, predicate pushdown, N+1, pagination, and SELECT *.', 'https://app.notion.com/p/3add15d9b1dd8061bf32d1a7b0f4a8bd'),
        note('Database Scaling', 'Vertical scaling, horizontal scaling, read replicas, partitioning, and sharding.', 'https://app.notion.com/p/3add15d9b1dd8078818cc81c86ba6420'),
        note('Advanced Concepts', 'MVCC, WAL, replication, CAP theorem, BASE, connection pooling, and Redis caching.', 'https://app.notion.com/p/3add15d9b1dd806c8461c62bf08a8916'),
      ]),
      note('NoSQL', 'Non-relational database models and when they fit better than SQL.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e', undefined, undefined, [
        note('Types of NoSQL Databases', 'Document, key-value, wide-column, and graph database models.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
        note('MongoDB & Document Databases', 'How document databases store JSON-like data and when MongoDB fits.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
        note('Key-Value Databases', 'Fast key-based lookup using databases such as Redis.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
        note('Wide-Column Databases', 'Distributed write-heavy storage using databases such as Cassandra.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
        note('Graph Databases', 'Relationship-heavy data using nodes and edges.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
        note('When to Use SQL vs NoSQL', 'Clear decision rules with practical examples.', 'https://app.notion.com/p/3add15d9b1dd8082b3ddf52d1ab3a45e'),
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
      note('What is AI?', 'Artificial intelligence as pattern learning and problem solving.', 'https://app.notion.com/p/3b3d15d9b1dd8098a881c2cabe4084c5', undefined, undefined, [
        note('Machine Learning vs Deep Learning vs Generative AI', 'How common AI terms relate to each other.', 'https://app.notion.com/p/3b3d15d9b1dd800fba57e8f31a0a5f1f'),
        note('How ChatGPT works', 'A high-level explanation of language model behavior.', 'https://app.notion.com/p/3b3d15d9b1dd802997bdfb7bebd4304b'),
        note('Tokens', 'The units AI models read, write, and charge for.', 'https://app.notion.com/p/3b3d15d9b1dd801381f6f66b08e3cd7a'),
        note('Context Window', 'How much information a model can consider at once.', 'https://app.notion.com/p/3b3d15d9b1dd80798b85e1adc301b5d2'),
        note('Temperature', 'How randomness affects model output.', 'https://app.notion.com/p/3b3d15d9b1dd80c0aeb5ed686006624f'),
        note('Hallucinations', 'Why models can produce plausible but wrong answers.', 'https://app.notion.com/p/3b3d15d9b1dd806787fcccfd44d81149'),
      ]),
      note('Prompt Engineering', 'Writing instructions that produce useful model behavior.', 'https://app.notion.com/p/3b3d15d9b1dd8027bc44e5640fc0cbc2', undefined, undefined, [
        note('Prompt Templates', 'Reusable prompts for backend workflows.', 'https://app.notion.com/p/3b3d15d9b1dd80c392ecf3e5d1f147a2'),
        note('Chat Completion', 'Sending messages to a model and reading responses.', 'https://app.notion.com/p/3b3d15d9b1dd807682b1e53d02b5199c'),
        note('Structured Output', 'Getting predictable JSON-shaped model responses.', 'https://app.notion.com/p/3b3d15d9b1dd80ea9e43d3bb755da9e1'),
        note('Function Calling / Tool Use', 'Letting models request typed actions from your backend.', 'https://app.notion.com/p/3b3d15d9b1dd8092acf5e45903c33f91'),
        note('Streaming Responses', 'Sending partial model output to users as it arrives.', 'https://app.notion.com/p/3b3d15d9b1dd80548e1ef4ec14ea3090'),
        note('Token Usage & Cost Calculation', 'Estimating AI feature cost from token usage.', 'https://app.notion.com/p/3b3d15d9b1dd80799b23d6a610e6b278'),
      ]),
      note('RAG', 'Retrieval augmented generation.', 'https://app.notion.com/p/3b3d15d9b1dd80259940dc75aa567d4f', undefined, undefined, [
        note('Embeddings', 'Representing meaning as vectors.', 'https://app.notion.com/p/3b3d15d9b1dd80cc8128c5e88cf44581'),
        note('Vector Databases', 'Storing and searching vectors for semantic retrieval.', 'https://app.notion.com/p/3b3d15d9b1dd806d84dedaa5553e4113'),
        note('Chunking for RAG', 'Splitting documents for better retrieval.', 'https://app.notion.com/p/3b3d15d9b1dd806c8ce3d50ac1617e5c'),
        note('Semantic Search vs Keyword Search', 'Meaning-based search compared with exact matching.', 'https://app.notion.com/p/3b3d15d9b1dd805db5edf812ef6f0435'),
      ]),
      note('AI Pipelines', 'Backend workflows that prepare, call, and post-process AI output.', 'https://app.notion.com/p/3b3d15d9b1dd802c89b6ee8bb097748d', undefined, undefined, [
        note('API Keys & Authentication', 'Authenticating safely with AI APIs.', 'https://app.notion.com/p/3b3d15d9b1dd80f9932bc8b9490df1f6'),
        note('Caching for LLM responses', 'Caching model responses where it is correct and useful.', 'https://app.notion.com/p/3b3d15d9b1dd8070ae43dc6cdba60969'),
        note('Rate Limiting', 'Protecting AI endpoints from overuse.', 'https://app.notion.com/p/3b3d15d9b1dd8078b627fbe966513dfa'),
        note('AI Security', 'Prompt injection, data leakage, and defensive backend design.', 'https://app.notion.com/p/3b3d15d9b1dd8007b9a5c6b4f1b20433'),
      ]),
      note('What is an AI Agent?', 'The basic agent loop and how it differs from one-shot prompting.', 'https://app.notion.com/p/3b3d15d9b1dd806aa66ed8d1f5142dea', undefined, undefined, [
        note('Agent Planning & Reasoning', 'How agents break work into steps.', 'https://app.notion.com/p/3b3d15d9b1dd801795c9f1c0cc4ca6a5'),
        note('Agent Memory', 'Short-term and long-term memory in agent systems.', 'https://app.notion.com/p/3b3d15d9b1dd80c38c42ff8aa03945bc'),
        note('Conversation Memory', 'Remembering useful context across turns.', 'https://app.notion.com/p/3b3d15d9b1dd80818217ff557d19fd0b'),
        note('Tools / Function Calling in Agents', 'How agents use tools to affect external systems.', 'https://app.notion.com/p/3b3d15d9b1dd803693e3d5b06aa06e09'),
        note('Multi-Agent Systems', 'Multiple agents coordinating on a task.', 'https://app.notion.com/p/3b3d15d9b1dd80868909ed35d5aa213e'),
        note('Agentic Workflows', 'Workflow patterns that combine model decisions and deterministic code.', 'https://app.notion.com/p/3b3d15d9b1dd80adb3b6c85673fcc040'),
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
      note('Cloud Basics and AWS Global Infrastructure', 'Cloud computing, Regions, Availability Zones and choosing a Region.', 'https://app.notion.com/p/3b3d15d9b1dd81a69fb7d9de8eda629e', 'Must Know', undefined, [
        note('VPC and Networking Basics', 'VPCs, public/private subnets, routing, gateways and security groups.', 'https://app.notion.com/p/3b3d15d9b1dd810fa279c9515575806a', 'Must Know'),
        note('IAM: Users, Roles and Policies', 'Authentication, permissions and least-privilege access.', 'https://app.notion.com/p/3b3d15d9b1dd81159b17f0b036b8f34b', 'Must Know'),
        note('CloudWatch, Billing and Shared Responsibility', 'Logs, metrics, alarms, cost controls and AWS versus customer duties.', 'https://app.notion.com/p/3b3d15d9b1dd819aad46cd078c98dfc5', 'Important'),
      ]),
      note('S3: Object Storage', 'Buckets, objects, access control, versioning and common use cases.', 'https://app.notion.com/p/3b3d15d9b1dd8137a186dbce4b7adff6', 'Must Know'),
      note('RDS: Managed Databases', 'Managed SQL databases, backups, Multi-AZ and connection safety.', 'https://app.notion.com/p/3b3d15d9b1dd81a8a3adf422c727341c', 'Must Know'),
      note('EC2: Virtual Servers', 'Instances, AMIs, instance types, key pairs and security groups.', 'https://app.notion.com/p/3b3d15d9b1dd81df8552dd8a766c43c1', 'Must Know', undefined, [
        note('Load Balancing and Auto Scaling', 'Distributing traffic, health checks and automatically changing capacity.', 'https://app.notion.com/p/3b3d15d9b1dd81e3b19dff05927f84ab', 'Important'),
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
      note('React Roadmap', 'How to study React for frontend, MERN apps, and interviews.', 'https://react.dev/learn', 'Must Know', 'react-roadmap', [
        note('React Must Know', 'The core React concepts every MERN developer should understand first.', 'https://react.dev/learn', 'Must Know', 'react-must-know', [
          note('React Inception', 'Set up React from first principles with plain HTML, DOM APIs, CDN scripts, React elements, and roots.', 'https://github.com/sankitdev/NamasteReact/blob/main/01_Inception/README.md', 'Must Know'),
          note('Igniting a React App', 'Bundlers, package managers, Parcel, npm scripts, dependencies, browserslist, and production builds.', 'https://github.com/sankitdev/NamasteReact/blob/main/02_Igniting_App/README.md', 'Must Know'),
          note('Laying the Foundation', 'Babel, JSX, React elements, components, composition, and the early structure of a React app.', 'https://github.com/sankitdev/NamasteReact/blob/main/03_Laying_Foundation/README.md', 'Must Know'),
          note('Talk Is Cheap, Show Me the Code', 'Planning and building a food ordering app with components, props, config-driven UI, and project structure.', 'https://github.com/sankitdev/NamasteReact/blob/main/04_Talk_is_cheap/README.md', 'Must Know', 'talk-is-cheap-show-me-the-code'),
          note('Let’s Get Hooked', 'ES modules, React hooks, useState, state-driven rendering, reconciliation, and React Fiber basics.', 'https://github.com/sankitdev/NamasteReact/blob/main/05_Lets_get_hooked/README.md', 'Must Know', 'lets-get-hooked'),
          note('Exploring the World', 'Fetching data, service architectures, useEffect, shimmer UI, conditional rendering, and search filtering.', 'https://github.com/sankitdev/NamasteReact/blob/main/06_Exploring_World/README.md', 'Must Know'),
          note('Finding the Path', 'Client-side routing with react-router-dom, nested routes, outlets, dynamic routes, and error pages.', 'https://github.com/sankitdev/NamasteReact/blob/main/07_Finding_Path/README.md', 'Must Know'),
          note('Data Is the New Oil', 'Data layer thinking, context, prop drilling, lifting state, controlled components, and React data flow.', 'https://github.com/sankitdev/NamasteReact/blob/main/11_Data_new_oil/README.md', 'Must Know'),
        ]),
        note('React Good to Know', 'Useful React concepts after the core path is clear.', 'https://react.dev/learn', 'Important', 'react-good-to-know', [
          note('Let’s Get Classy', 'Class components, props, state, lifecycle methods, async effects, and cleanup.', 'https://github.com/sankitdev/NamasteReact/blob/main/08_Lets_get_classy/README.md', 'Important', 'lets-get-classy'),
          note('Optimizing a React App', 'Custom hooks, modularity, single responsibility, lazy loading, Suspense, and code splitting.', 'https://github.com/sankitdev/NamasteReact/blob/main/09_Optimise_App/README.md', 'Important'),
          note('Styling React with Tailwind', 'CSS approaches in React, CSS frameworks, Tailwind setup, utility classes, and pros and cons.', 'https://github.com/sankitdev/NamasteReact/blob/main/10_Tailwind/README.md', 'Important'),
        ]),
        note('React Coding Exercises', 'Practice tasks commonly asked in React interviews and machine-coding rounds.', 'https://react.dev/learn', 'Must Know', 'react-coding-exercises', [
          note('Component Composition Exercise', 'Break a UI into reusable components with props and lists.', 'https://react.dev/learn/passing-props-to-a-component', 'Must Know'),
          note('Hooks and Data Fetching Exercise', 'Build loading, error, empty, and success states around API data.', 'https://react.dev/reference/react/useEffect', 'Must Know'),
          note('Routing and State Exercise', 'Build nested routes, detail pages, and shared app state.', 'https://reactrouter.com/en/main/start/overview', 'Important'),
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
      note('JavaScript Roadmap', 'How to study JavaScript for React, Node.js, interviews, and coding rounds.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Must Know', 'javascript-roadmap', [
        note('JavaScript Must Know', 'The core concepts every MERN developer should understand first.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Must Know', undefined, [
          note('What is JavaScript?', 'What JavaScript is, why it exists, and where it runs.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Must Know'),
          note('Execution Context and Call Stack', 'How JavaScript runs code step by step.', 'https://developer.mozilla.org/en-US/docs/Glossary/Call_stack', 'Must Know'),
          note('Scope, Hoisting, var, let and const', 'How variable visibility and declaration behavior work.', 'https://developer.mozilla.org/en-US/docs/Glossary/Scope', 'Must Know'),
          note('Closures', 'How functions remember variables from their outer scope.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures', 'Must Know'),
          note('this Keyword', 'How this is decided in different call sites.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this', 'Must Know'),
          note('Prototypes and Prototype Chain', 'How JavaScript objects inherit behavior.', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes', 'Must Know'),
          note('Arrays, Objects and Common Methods', 'Working with data using map, filter, reduce, spread, rest, and destructuring.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', 'Must Know'),
          note('Event Loop', 'Why asynchronous callbacks run after the current call stack.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', 'Must Know'),
          note('Promises and async await', 'How JavaScript represents and handles future async results.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', 'Must Know'),
          note('Error Handling', 'try/catch, throwing errors, and handling async failures.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch', 'Must Know'),
          note('JavaScript Modules', 'CommonJS vs ES Modules and how imports/exports organize code.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', 'Must Know'),
          note('Debounce and Throttle', 'Control how often a function runs during frequent events.', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events', 'Must Know'),
        ]),
        note('JavaScript Good to Know', 'Useful concepts that deepen understanding after the core path.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Important', undefined, [
          note('Classes in JavaScript', 'Class syntax over prototype-based behavior.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', 'Important'),
          note('Shallow Copy vs Deep Copy', 'How object copying works and where reference bugs come from.', 'https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy', 'Important'),
          note('Memory Leaks in JavaScript', 'Common ways references stay alive longer than expected.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management', 'Important'),
          note('Currying and Memoization', 'Function patterns often asked in interviews and coding rounds.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', 'Important'),
        ]),
        note('JavaScript Coding Exercises', 'Practice problems commonly asked in frontend and MERN coding rounds.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Must Know', undefined, [
          note('Polyfills: map, filter and reduce', 'Implement common array methods from scratch.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', 'Must Know'),
          note('Implement Debounce and Throttle', 'Write reusable debounce and throttle helpers.', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events', 'Must Know'),
          note('Flatten Array and Deep Clone', 'Handle nested arrays and object copying safely.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat', 'Must Know'),
          note('Promise Utilities', 'Implement Promise.all, sequential execution, retry, and timeout helpers.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all', 'Must Know'),
          note('Event Emitter and LRU Cache', 'Build two common machine-coding round utilities.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map', 'Important'),
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
      note('What is Docker?', 'A simple explanation of Docker, the problem it solves, and when you actually need it.', 'https://app.notion.com/p/3b3d15d9b1dd81648807dada3facfbb5', 'Must Know', 'why-docker-and-how-it-works', [
        note('Images, Containers and Registries', 'Understand the package, the running app, and the place where Docker images are stored.', 'https://app.notion.com/p/3b3d15d9b1dd81848ac4c54e2200db1f', 'Must Know'),
        note('Writing a Dockerfile', 'Write the recipe that packages your app into a Docker image.', 'https://app.notion.com/p/3b3d15d9b1dd818b9facd64544f6dce6', 'Must Know'),
        note('Build and Run Commands', 'Build an image, start your app, view logs, and stop it when you are done.', 'https://app.notion.com/p/3b3d15d9b1dd8144bd60ec84750fac1f', 'Must Know'),
        note('Volumes and Persistent Data', 'Keep important data, such as a database, when a container is replaced.', 'https://app.notion.com/p/3b3d15d9b1dd817291fec73bda07fb40', 'Must Know'),
        note('Docker Networking', 'Let your containers and your computer communicate using ports and service names.', 'https://app.notion.com/p/3b3d15d9b1dd81a8aeb9f88064024e9e', 'Must Know'),
        note('Docker Compose', 'Start an API, database, and other local services together from one file.', 'https://app.notion.com/p/3b3d15d9b1dd81ee9995eab4d708c132', 'Must Know'),
        note('Configuration, Security and Optimization', 'Handle settings and secrets safely, then make your production image smaller and safer.', 'https://app.notion.com/p/3b3d15d9b1dd8152afc2cb8e38432869', 'Important', 'environment-variables-security-and-optimization'),
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
      note('Node.js Roadmap', 'How to study Node.js for backend development and interviews.', 'https://nodejs.org/en/learn', 'Must Know', 'nodejs-roadmap', [
        note('Node.js Must Know', 'Core runtime concepts every backend developer should understand first.', 'https://nodejs.org/en/learn', 'Must Know', 'nodejs-must-know', [
          note('What is Node.js?', 'What Node.js is, why it exists, and when to use it.', 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs', 'Must Know'),
          note('Node.js vs Browser JavaScript', 'Same language, different runtime capabilities and APIs.', 'https://nodejs.org/en/learn/getting-started/differences-between-nodejs-and-the-browser', 'Must Know'),
          note('Node.js Event Loop and Non-blocking IO', 'libuv, event loop phases, microtasks, macrotasks, and callback priority.', 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick', 'Must Know'),
          note('Modules and NPM', 'CommonJS, ES Modules, npm packages, and project dependencies.', 'https://nodejs.org/api/modules.html', 'Must Know'),
          note('File System and Path', 'Read, write, and resolve files safely in Node.js.', 'https://nodejs.org/api/fs.html', 'Must Know'),
          note('Events and EventEmitter', 'Build event-driven code using Node.js EventEmitter.', 'https://nodejs.org/api/events.html', 'Must Know'),
          note('Streams and Buffers', 'Process large data without loading everything into memory.', 'https://nodejs.org/api/stream.html', 'Must Know'),
          note('HTTP Server in Node.js', 'Create a basic server without Express to understand the foundation.', 'https://nodejs.org/api/http.html', 'Must Know'),
          note('Environment Variables and process', 'Use process.env, argv, exit codes, and runtime metadata.', 'https://nodejs.org/api/process.html', 'Must Know'),
          note('Node.js Error Handling', 'Handle sync errors, async errors, callbacks, and rejected promises.', 'https://nodejs.org/en/learn/errors/error-handling', 'Must Know'),
        ]),
        note('Node.js Good to Know', 'Useful runtime features after the core path.', 'https://nodejs.org/api/', 'Important', 'nodejs-good-to-know', [
          note('Worker Threads', 'Run CPU-heavy JavaScript work off the main thread.', 'https://nodejs.org/api/worker_threads.html', 'Important'),
          note('Child Processes', 'Run external commands or separate programs from Node.js.', 'https://nodejs.org/api/child_process.html', 'Important'),
          note('Package Versioning', 'Understand semver, package-lock, dependencies, and devDependencies.', 'https://docs.npmjs.com/about-semantic-versioning', 'Important'),
          note('Node.js Security Basics', 'Protect secrets, dependencies, inputs, and runtime configuration.', 'https://nodejs.org/en/learn/getting-started/security-best-practices', 'Important'),
        ]),
        note('Node.js Coding Exercises', 'Backend coding exercises commonly asked around Node.js fundamentals.', 'https://nodejs.org/en/learn', 'Must Know', 'nodejs-coding-exercises', [
          note('HTTP Server without Express', 'Build a tiny router with Node.js http module.', 'https://nodejs.org/api/http.html', 'Must Know'),
          note('Build a CLI Tool', 'Read command line arguments and create a useful script.', 'https://nodejs.org/api/process.html', 'Important'),
          note('File Upload with Streams', 'Use streams to handle large files efficiently.', 'https://nodejs.org/api/stream.html', 'Important'),
          note('Custom EventEmitter', 'Implement a small event emitter from scratch.', 'https://nodejs.org/api/events.html', 'Must Know'),
          note('In-memory Rate Limiter', 'Limit repeated requests using Map and time windows.', 'https://nodejs.org/en/learn', 'Must Know'),
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
      note('Express.js Roadmap', 'How to study Express for real backend API development.', 'https://expressjs.com/', 'Must Know', 'expressjs-roadmap', [
        note('Express.js Must Know', 'Core Express concepts for building maintainable APIs.', 'https://expressjs.com/en/guide/routing.html', 'Must Know', 'expressjs-must-know', [
          note('What is Express?', 'What Express adds on top of Node.js and why it exists.', 'https://expressjs.com/', 'Must Know'),
          note('Routing', 'Map HTTP methods and URLs to handler functions.', 'https://expressjs.com/en/guide/routing.html', 'Must Know'),
          note('Params, Query and Body', 'Understand where request input comes from.', 'https://expressjs.com/en/api.html#req', 'Must Know'),
          note('Middleware', 'How Express runs request logic in a chain.', 'https://expressjs.com/en/guide/using-middleware.html', 'Must Know'),
          note('Controllers and Services', 'Separate HTTP handling from business logic.', 'https://expressjs.com/en/starter/generator.html', 'Must Know'),
          note('REST API Design', 'Design resource-based APIs using HTTP methods and status codes.', 'https://expressjs.com/en/guide/routing.html', 'Must Know'),
          note('Request Validation', 'Validate input before it reaches business logic.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Must Know'),
          note('Error Handling Middleware', 'Centralize errors and responses in Express.', 'https://expressjs.com/en/guide/error-handling.html', 'Must Know'),
          note('Authentication and JWT', 'Verify user identity with tokens.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Must Know'),
          note('Authorization', 'Control what authenticated users are allowed to do.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Must Know'),
          note('CORS in Express', 'Allow controlled browser access from other origins.', 'https://expressjs.com/en/resources/middleware/cors.html', 'Must Know'),
          note('Pagination, Filtering and Sorting', 'Return large datasets in a controlled API shape.', 'https://expressjs.com/en/guide/routing.html', 'Must Know'),
        ]),
        note('Express.js Good to Know', 'Useful production concepts after basic APIs work.', 'https://expressjs.com/en/advanced/best-practice-performance.html', 'Important', 'expressjs-good-to-know', [
          note('Cookie Sessions', 'Store auth state with cookies and server/session strategy.', 'https://expressjs.com/en/resources/middleware/session.html', 'Important'),
          note('File Uploads in Express', 'Accept files safely using middleware and storage rules.', 'https://expressjs.com/en/resources/middleware.html', 'Important'),
          note('Rate Limiting in Express', 'Protect APIs from repeated abusive requests.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Important'),
          note('Security Headers', 'Use headers to reduce common web risks.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Important'),
          note('Testing Express APIs', 'Test routes, middleware, and error responses.', 'https://expressjs.com/en/advanced/best-practice-performance.html', 'Important'),
        ]),
        note('Express.js Coding Exercises', 'Practice APIs commonly asked in backend coding rounds.', 'https://expressjs.com/', 'Must Know', 'expressjs-coding-exercises', [
          note('CRUD API', 'Build create, read, update, and delete routes.', 'https://expressjs.com/en/guide/routing.html', 'Must Know'),
          note('JWT Auth API', 'Build login, register, and protected routes.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Must Know'),
          note('Role-based Authorization API', 'Restrict routes by user role.', 'https://expressjs.com/en/guide/using-middleware.html', 'Must Know'),
          note('Pagination and Search API', 'Add query-based list controls to an endpoint.', 'https://expressjs.com/en/api.html#req.query', 'Must Know'),
          note('URL Shortener API', 'Build a common backend machine-coding project.', 'https://expressjs.com/', 'Important'),
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
      note('MongoDB Roadmap', 'How to study MongoDB for MERN apps and backend interviews.', 'https://www.mongodb.com/docs/', 'Must Know', 'mongodb-roadmap', [
        note('MongoDB Must Know', 'Core MongoDB concepts for practical backend development.', 'https://www.mongodb.com/docs/manual/', 'Must Know', undefined, [
          note('What is MongoDB?', 'What MongoDB is, why document databases exist, and where it fits.', 'https://www.mongodb.com/docs/manual/', 'Must Know'),
          note('Documents and Collections', 'How MongoDB stores JSON-like records.', 'https://www.mongodb.com/docs/manual/core/document/', 'Must Know'),
          note('MongoDB vs SQL', 'How document databases differ from relational databases.', 'https://www.mongodb.com/resources/basics/databases/nosql-explained', 'Must Know'),
          note('CRUD Operations in MongoDB', 'Create, read, update, and delete documents.', 'https://www.mongodb.com/docs/manual/crud/', 'Must Know'),
          note('Query and Update Operators', 'Use operators like $set, $inc, $in, $gt, and $or.', 'https://www.mongodb.com/docs/manual/reference/operator/query/', 'Must Know'),
          note('Schema Design in MongoDB', 'Design documents around access patterns.', 'https://www.mongodb.com/docs/manual/data-modeling/', 'Must Know'),
          note('Embedding vs Referencing', 'Choose nested documents or separate linked collections.', 'https://www.mongodb.com/docs/manual/data-modeling/concepts/embedding-vs-references/', 'Must Know'),
          note('Indexes in MongoDB', 'Speed up queries with indexes and understand write tradeoffs.', 'https://www.mongodb.com/docs/manual/indexes/', 'Must Know'),
          note('Aggregation Pipeline', 'Transform and summarize data with pipeline stages.', 'https://www.mongodb.com/docs/manual/core/aggregation-pipeline/', 'Must Know'),
          note('Mongoose Schema and Model', 'Define application-level models for MongoDB documents.', 'https://mongoosejs.com/docs/guide.html', 'Must Know'),
          note('Mongoose Validation', 'Validate document shape and values before saving.', 'https://mongoosejs.com/docs/validation.html', 'Must Know'),
          note('Population in Mongoose', 'Replace referenced ids with related documents.', 'https://mongoosejs.com/docs/populate.html', 'Must Know'),
        ]),
        note('MongoDB Good to Know', 'Useful concepts for stronger production data design.', 'https://www.mongodb.com/docs/manual/', 'Important', undefined, [
          note('Transactions in MongoDB', 'Make multiple writes succeed or fail together.', 'https://www.mongodb.com/docs/manual/core/transactions/', 'Important'),
          note('Compound and Text Indexes', 'Use multi-field and text search indexes.', 'https://www.mongodb.com/docs/manual/core/indexes/index-types/', 'Important'),
          note('MongoDB Performance Mistakes', 'Avoid unindexed queries, huge documents, and bad pagination.', 'https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/', 'Important'),
          note('MongoDB Data Modeling Patterns', 'Use common document modeling patterns for real apps.', 'https://www.mongodb.com/blog/post/building-with-patterns-a-summary', 'Important'),
        ]),
        note('MongoDB Coding Exercises', 'Practice schema design, CRUD, search, aggregation, and transactions.', 'https://www.mongodb.com/docs/', 'Must Know', undefined, [
          note('User Post Comment Schema', 'Design social-style collections and relationships.', 'https://www.mongodb.com/docs/manual/data-modeling/', 'Must Know'),
          note('CRUD with Mongoose', 'Build model-based create, read, update, and delete operations.', 'https://mongoosejs.com/docs/models.html', 'Must Know'),
          note('Search and Pagination in MongoDB', 'Implement query search and paginated lists.', 'https://www.mongodb.com/docs/manual/reference/method/cursor.skip/', 'Must Know'),
          note('Aggregation Reports', 'Calculate grouped summaries using aggregation pipeline.', 'https://www.mongodb.com/docs/manual/aggregation/', 'Must Know'),
          note('Order Placement with Transaction', 'Use transactions for multi-document order flow.', 'https://www.mongodb.com/docs/manual/core/transactions/', 'Important'),
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
      note('MERN Integration Roadmap', 'How the four MERN parts connect into one application.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know', 'mern-integration-roadmap', [
        note('MERN Must Know', 'The full-stack concepts needed before building projects.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know', undefined, [
          note('MERN Architecture', 'How React, Express, Node, and MongoDB communicate.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('Frontend vs Backend Responsibility', 'Decide what belongs in React and what belongs on the server.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('API Contract', 'Define request and response shapes between frontend and backend.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('Authentication Flow in MERN', 'Connect login, tokens/cookies, protected APIs, and UI state.', 'https://expressjs.com/en/advanced/best-practice-security.html', 'Must Know'),
          note('Protected Routes', 'Protect frontend screens and backend endpoints correctly.', 'https://reactrouter.com/en/main/start/overview', 'Must Know'),
          note('Full-stack Error Handling', 'Handle errors consistently from database to UI.', 'https://expressjs.com/en/guide/error-handling.html', 'Must Know'),
          note('CORS in MERN', 'Understand why local React and Express apps hit CORS errors.', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS', 'Must Know'),
          note('Environment Variables in MERN', 'Separate frontend and backend configuration safely.', 'https://nodejs.org/api/process.html#processenv', 'Must Know'),
          note('Deployment Overview', 'Build React, run the API, connect env vars, and deploy safely.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Important'),
        ]),
        note('MERN Projects', 'Full-stack projects that combine React, Express, Node.js, and MongoDB.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know', undefined, [
          note('Todo App with Auth', 'Build auth, CRUD, protected routes, and user-owned data.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('Blog App with Comments', 'Build posts, comments, authors, and moderation basics.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('Notes App with Search', 'Build notes, search, pagination, and ownership.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Must Know'),
          note('URL Shortener', 'Build slug generation, redirects, analytics, and validation.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Important'),
          note('Basic E-commerce App', 'Build products, cart, orders, and transaction thinking.', 'https://www.mongodb.com/resources/languages/mern-stack', 'Important'),
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
      note('What is Git?', 'Why version control exists, what Git solves, and what happens without it.', 'https://git-scm.com/doc', 'Must Know', undefined, [
        note('Repository, Working Tree, Staging Area and Commit', 'The core Git mental model: where changes live before they become history.', 'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository', 'Must Know'),
        note('Installing and Configuring Git', 'Set name, email, editor, default branch, and authentication basics.', 'https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup', 'Must Know'),
      ]),
      note('Daily Git Workflow', 'The commands used in normal development: status, add, commit, log, diff, and restore.', 'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository', 'Must Know', undefined, [
        note('git status, diff, add and commit', 'See changes, choose what to save, and create meaningful commits.', 'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository', 'Must Know'),
        note('Reading Git History', 'Use log, show, blame, and diff to understand how code changed.', 'https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History', 'Important'),
        note('Undoing Changes Safely', 'Restore files, amend commits, revert bad commits, and know when reset is risky.', 'https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things', 'Must Know'),
        note('Ignoring Files with .gitignore', 'Keep dependencies, secrets, builds, and local files out of Git.', 'https://git-scm.com/docs/gitignore', 'Must Know'),
      ]),
      note('Branches and Merging', 'Work on isolated lines of development and combine changes safely.', 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell', 'Must Know', undefined, [
        note('Merge vs Rebase', 'Two ways to integrate branch work and when each one makes sense.', 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing', 'Must Know'),
        note('Merge Conflicts', 'Why conflicts happen and how to resolve them without panic.', 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging', 'Must Know'),
        note('Stash and Temporary Work', 'Put unfinished work aside when you need to switch context.', 'https://git-scm.com/docs/git-stash', 'Important'),
      ]),
      note('Remote Repositories', 'How local Git history connects to shared repositories through clone, fetch, pull, and push.', 'https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes', 'Must Know', undefined, [
        note('Clone, Fetch, Pull and Push', 'Understand the commands that move commits between your machine and a remote.', 'https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes', 'Must Know'),
        note('GitHub Basics', 'What GitHub adds on top of Git: hosting, issues, pull requests, reviews, and collaboration.', 'https://docs.github.com/en/get-started/start-your-journey/about-github-and-git', 'Must Know'),
        note('Pull Requests and Code Review', 'Use PRs to discuss, review, test, and merge code as a team.', 'https://docs.github.com/en/pull-requests', 'Must Know'),
        note('Forks, Upstream and Open Source Workflow', 'Contribute to repositories you do not own using forks and upstream remotes.', 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks', 'Important'),
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
      note('What is GitHub CI/CD?', 'A beginner-friendly explanation of CI, CD, why teams use it, and a real example.', 'https://app.notion.com/p/3b3d15d9b1dd81589eb1e759047321c6', 'Must Know', 'ci-cd-fundamentals', [
        note('GitHub Actions: How It Works', 'The GitHub feature that runs your automation: workflows, jobs, steps, actions, and runners.', 'https://app.notion.com/p/3b3d15d9b1dd81eb9147e9349038dc31', 'Must Know', 'github-actions-workflow-structure'),
        note('When Should a Workflow Run?', 'Choose pull requests, pushes, manual runs, and path filters for the task.', 'https://app.notion.com/p/3b3d15d9b1dd8171ba70c6a6bf6cae9d', 'Must Know', 'triggers-filters-and-manual-runs'),
        note('Your First CI Pipeline', 'Set up a simple check that installs, lints, tests, and builds your app.', 'https://app.notion.com/p/3b3d15d9b1dd8189af6ac8d02138a671', 'Must Know', 'building-a-useful-ci-pipeline'),
        note('Artifacts, Docker Images and Registries', 'Save build output and package an app so a server can run the exact version you tested.', 'https://app.notion.com/p/3b3d15d9b1dd816db265e317052d15b0', 'Important'),
        note('Secrets, Tokens and Permissions', 'Give a workflow only the credentials and access it needs—without exposing them in code.', 'https://app.notion.com/p/3b3d15d9b1dd810d8cf5d1df83a1a98d', 'Must Know'),
        note('Deploying Safely', 'Use staging, production approvals, and a rollback plan when you start releasing automatically.', 'https://app.notion.com/p/3b3d15d9b1dd812b9920cd938582b1f2', 'Must Know', 'environments-approvals-and-deployment'),
      ]),
    ],
  },
]

export const totalNoteCount = tracks.reduce(
  (count, track) => count + countNotes(track.topics),
  0,
)

export const source = {
  label: 'Always Be Job Ready Study Resource',
  url: notionRootUrl,
}
