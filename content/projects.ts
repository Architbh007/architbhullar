import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'evat',
    name: 'EVAT',
    fullName: 'Chameleon EV Adoption Tools',
    tagline: 'AI-powered platform helping Australians understand their EV adoption readiness',
    problem:
      'Most Australians considering electric vehicles face fragmented, confusing information about range anxiety, charging infrastructure, and total cost of ownership. Existing resources were either manufacturer-biased or too technical for everyday users. There was no unified tool that could take a user\'s specific context — their location, driving habits, and budget — and give them a clear, honest answer about EV readiness.',
    architecture:
      'Multi-component platform built around a Rasa NLU conversational assistant as the primary interface. The assistant connects to a FastAPI backend that integrates live charging station data, route range calculations, and a cost modelling engine. A React frontend provides the chat interface and a separate visual dashboard for range and cost analysis. The Rasa model was trained on a custom domain-specific dataset covering EV specifications, charging behaviour, and government incentives.',
    challenges: [
      'Training a Rasa NLU model that could accurately classify intent across a complex domain with many edge cases and ambiguous user inputs',
      'Integrating real-time charging station data that varied significantly in format and reliability across different API sources',
      'Designing conversational flows that felt natural without being frustratingly rigid — particularly for follow-up questions and clarifications',
      'Balancing chatbot scope: keeping the assistant focused on what it could reliably answer while gracefully degrading for out-of-scope questions',
    ],
    solution:
      'Built a conversational AI assistant (Rasa NLU) trained on EV domain data, paired with a route range calculator and a cost-benefit analysis tool. The assistant was designed to ask clarifying questions to personalise its recommendations rather than giving generic responses.',
    stack: ['Python', 'Rasa NLU', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/architbhullar/evat',
    status: 'completed',
    timeline: '2023 · 6 months',
    role: 'Lead Developer & AI Engineer',
    impact:
      'Delivered as a capstone project. Demonstrated how domain-specific conversational AI can simplify complex consumer decisions — a user could ask "Is an EV realistic for me?" and get a personalised, honest answer within a few exchanges.',
    learnings: [
      'Useful AI requires deep domain understanding before touching any model configuration',
      'Conversational flow design is harder than NLU training — the intent model was fine within weeks, the dialogue felt natural only after months of iteration',
      'Real-world data integration is where most AI projects actually fail',
      'Scope discipline: a focused chatbot that does five things well beats a broad one that does twenty things poorly',
    ],
    futureImprovements: [
      'Integration with live vehicle listings to provide actual purchase recommendations',
      'Route planning with charging stop optimisation',
      'State/territory-specific incentive tracking updated automatically',
    ],
    featured: true,
  },
  {
    id: 'nodemap',
    name: 'NodeMap',
    fullName: 'NodeMap',
    tagline: 'Interactive dependency graph visualiser for codebases',
    problem:
      'Understanding how components, modules, and services connect in a large codebase typically meant either running a bloated enterprise tool or manually tracing imports. Neither option was fast or pleasant.',
    architecture:
      'A Fastify backend parses project source files, builds a dependency graph using a recursive traversal algorithm, and serves it as a JSON graph structure. The React frontend uses D3.js force-directed simulation to render the graph. Nodes are colour-coded by type (component, service, utility) and edges show dependency direction. A search/filter sidebar lets users isolate specific modules.',
    challenges: [
      'D3.js force simulation performance degrades significantly above ~500 nodes — required implementing node clustering and level-of-detail rendering',
      'Handling circular dependencies correctly without causing infinite loops in the traversal',
      'Supporting multiple module system formats (CommonJS, ES Modules, mixed) in the file parser',
      'Making the graph readable — automatic layout produces overlapping nodes that required significant tuning',
    ],
    solution:
      'Built during Deakin Hack 2023 (48h prototype), then developed into a full tool. Parses project file structure, builds a dependency graph, and renders it as an interactive, filterable visualisation.',
    stack: ['React', 'TypeScript', 'Fastify', 'D3.js', 'Node.js'],
    github: 'https://github.com/architbhullar/nodemap',
    status: 'completed',
    timeline: '2023 · Hackathon → 3 months',
    role: 'Full-Stack Developer',
    impact:
      'Top 3 placement at Deakin Hack 2023. Developed into a tool that produces an accurate, interactive dependency map of a mid-sized project in under 10 seconds.',
    learnings: [
      'Graph algorithms for dependency resolution and cycle detection',
      'D3.js internals well enough to implement custom rendering optimisations',
      'Fastify is significantly faster than Express for this kind of parsing workload',
      'The 48-hour hackathon constraint taught more about prioritisation than months of normal development',
    ],
    futureImprovements: [
      'Support for monorepo structures',
      'Change impact analysis — highlight which components are affected by modifying a given file',
      'VS Code extension for inline graph viewing',
    ],
    featured: false,
  },
  {
    id: 'gridrace',
    name: 'GridRace',
    fullName: 'GridRace',
    tagline: 'Real-time multiplayer strategy game built to understand WebSocket architecture',
    problem:
      'I wanted to understand WebSocket architecture and real-time state synchronisation at a level that tutorials couldn\'t provide. Building a toy feature doesn\'t reveal the real problems — concurrent connections, disconnection handling, race conditions, and state drift only appear under realistic load.',
    architecture:
      'Node.js WebSocket server manages game rooms, player sessions, and authoritative game state. Each room runs an independent game loop at 20 ticks/second. Clients send input events; the server validates, applies them to the canonical state, and broadcasts deltas back to all clients in the room. The React + Canvas frontend renders the game state using requestAnimationFrame and performs client-side prediction to mask latency.',
    challenges: [
      'Client-side prediction: clients need to render moves immediately but must reconcile when the server state disagrees',
      'Graceful disconnection — players dropping mid-game without breaking the room for remaining players',
      'Managing game tick rate vs. WebSocket message frequency to avoid flooding clients',
      'Race conditions when two players claim the same grid cell within the same tick',
    ],
    solution:
      'Multiplayer game where players race to claim grid territories in real time. Authoritative server maintains canonical state; clients use prediction and reconciliation.',
    stack: ['Node.js', 'WebSockets', 'React', 'TypeScript', 'Canvas API'],
    github: 'https://github.com/architbhullar/gridrace',
    status: 'completed',
    timeline: '2024 · 2 months',
    role: 'Full-Stack Developer',
    impact:
      'Learned more about real-time systems from this project than from all prior coursework on the topic combined.',
    learnings: [
      'Client-side prediction and server reconciliation are the two hardest problems in real-time multiplayer',
      'WebSocket server architecture — room management, session state, tick loops',
      'Canvas API performance optimisation for 60fps rendering',
      'Race conditions only become visible under concurrent load, not in single-player testing',
    ],
    futureImprovements: [
      'Matchmaking system',
      'Persistent leaderboard with player statistics',
      'Spectator mode',
    ],
    featured: false,
  },
  {
    id: 'cosmax-lims',
    name: 'Cosmax LIMS',
    fullName: 'Cosmax Laboratory Information Management System',
    tagline: 'Custom LIMS replacing spreadsheet workflows for a cosmetics laboratory',
    problem:
      'Cosmax\'s laboratory team tracked sample tests, results, and approval sign-offs across a patchwork of Excel spreadsheets. Analysts were manually copying data between files, version conflicts caused data loss, and there was no audit trail for regulatory compliance. Product approval delays were a direct consequence.',
    architecture:
      'PostgreSQL database with a schema designed around the lab\'s domain model: samples, test types, test runs, results, and approval workflows. Prisma ORM for type-safe database access. Fastify REST API serving a React + TypeScript frontend. Role-based access control separates analyst, supervisor, and admin roles. All state changes are appended to an audit log table — no soft deletes, full history.',
    challenges: [
      'Translating unstructured spreadsheet logic into a coherent relational schema without losing edge cases the lab team had never documented',
      'Building approval workflows that matched the lab\'s actual process, which turned out to be more complex than initially described',
      'Audit trail requirements meant rethinking standard CRUD operations — every write needed to produce an immutable history record',
      'Onboarding non-technical users who were accustomed to Excel and suspicious of the new system',
    ],
    solution:
      'Full LIMS with sample tracking, test scheduling, results recording, approval workflows, and an audit trail. Replaced 11 separate spreadsheets.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    status: 'completed',
    timeline: '2024 · 4 months',
    role: 'Full-Stack Developer & Database Designer',
    impact:
      'Replaced 11 spreadsheets. First project where I owned database schema design for a production system with real regulatory constraints.',
    learnings: [
      'Database schema design for domains with audit and compliance requirements is meaningfully different from application-layer schema design',
      'Domain understanding comes before system design — spent three weeks just observing lab workflows before writing a line of code',
      'Approval workflow state machines are deceptively complex once you account for rejection, revision, and re-approval cycles',
      'Non-technical user onboarding requires as much design work as the system itself',
    ],
    futureImprovements: [
      'PDF report generation for regulatory submissions',
      'Bulk import from legacy spreadsheets to migrate historical data',
      'Email notifications for pending approvals',
    ],
    featured: false,
  },
]
