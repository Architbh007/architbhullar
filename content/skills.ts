import type { SkillGroup } from '@/types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript', proficiency: 'Strong grasp of the type system — generics, utility types, discriminated unions. Used across NodeMap, GridRace, and Cosmax LIMS in production. Still deepening knowledge of advanced mapped types and conditional types.' },
      { name: 'Python', proficiency: 'Comfortable with scripting, FastAPI, and ML tooling through EVAT. Solid understanding of async patterns and packaging. Less experience with large-scale Python architecture and testing patterns.' },
      { name: 'JavaScript', proficiency: 'Day-to-day language for most frontend and Node work. Confident with async/await, closures, and the event loop. Not something I need to think about much anymore.' },
      { name: 'SQL', proficiency: 'Wrote production schemas for EVAT and Cosmax LIMS — joins, indexes, constraints, audit log patterns. Still building fluency with query optimisation and execution plans for larger datasets.' },
      { name: 'Java', proficiency: 'Primarily academic. Comfortable with OOP fundamentals and data structures. Haven\'t used it in a real project yet — would need a ramp-up period on modern Java patterns.' },
      { name: 'Bash', proficiency: 'Comfortable writing scripts for automation, CI steps, and tooling. Not an expert — I reach for it when I need it rather than as a primary tool.' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', proficiency: 'Used in every project I\'ve shipped. Solid understanding of hooks, context, rendering behaviour, and component design. Comfortable with both simple UIs and complex state-heavy interfaces.' },
      { name: 'Next.js', proficiency: 'Building this site with it. Understand App Router, server components, ISR, and route handlers. Still getting hands-on with more advanced caching strategies and edge deployments.' },
      { name: 'Tailwind CSS', proficiency: 'Go-to for styling. Fast and consistent. Used heavily in Cosmax LIMS and this site. Comfortable with v4\'s new config approach.' },
      { name: 'D3.js', proficiency: 'Used for the force-directed graph in NodeMap. Understand the data-join model and simulation API. Complex enough that I\'d need to re-read docs for anything beyond what I\'ve already built.' },
      { name: 'Canvas API', proficiency: 'Used for GridRace\'s game renderer. Comfortable with the 2D context, requestAnimationFrame loops, and performance optimisation. Wouldn\'t call myself an expert.' },
      { name: 'Framer Motion', proficiency: 'Used for animations on this site. Comfortable with variants, AnimatePresence, and layout animations. Haven\'t explored gesture and scroll-driven animations deeply yet.' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', proficiency: 'Primary backend environment. Comfortable with the event loop, streams, and building APIs. Used across most of my projects — it\'s where I feel most at home server-side.' },
      { name: 'Fastify', proficiency: 'Used in NodeMap and Cosmax LIMS. Prefer it over Express for its speed and schema validation. Comfortable with plugins and lifecycle hooks.' },
      { name: 'Express', proficiency: 'Familiar from earlier projects and coursework. Straightforward to use but I\'ve moved toward Fastify for new work.' },
      { name: 'FastAPI', proficiency: 'Used in EVAT for the Python backend. Appreciated the automatic validation and OpenAPI docs. Would need to revisit async patterns and dependency injection for a larger project.' },
      { name: 'WebSockets', proficiency: 'Built a full multiplayer game server with authoritative state and client prediction in GridRace. Solid understanding of the protocol, connection lifecycle, and room management.' },
      { name: 'REST API design', proficiency: 'Designed APIs for three shipped projects. Comfortable with resource modelling, versioning decisions, and error response patterns. Less hands-on with GraphQL.' },
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      { name: 'Rasa NLU', proficiency: 'Trained a production NLU model for EVAT — intent classification, entity extraction, custom actions, and dialogue management. Understand the training pipeline and its limitations well.' },
      { name: 'OpenAI API', proficiency: 'Used for personal experiments and prompt chaining. Comfortable with the chat completions API and function calling. Still exploring fine-tuning and embeddings in depth.' },
      { name: 'LangChain', proficiency: 'Familiar with the concepts and have built small chains. Haven\'t used it in a production project yet — still evaluating where it genuinely adds value vs. adds complexity.' },
      { name: 'Prompt engineering', proficiency: 'Spent significant time iterating on prompts for EVAT and personal projects. Understand few-shot prompting, chain-of-thought, and output formatting. Still learning what works at scale.' },
      { name: 'Conversational AI design', proficiency: 'Designed end-to-end dialogue flows for EVAT. Learned that good conversation design is as much UX work as it is technical. Still studying multi-turn context handling and fallback strategies.' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', proficiency: 'Primary database for production projects. Comfortable with schema design, relations, indexing, and audit trail patterns. Built the Cosmax LIMS schema from scratch for a regulatory environment.' },
      { name: 'Prisma ORM', proficiency: 'Used in Cosmax LIMS. Appreciate the type safety and migration workflow. Understand its limitations with complex raw queries.' },
      { name: 'MongoDB', proficiency: 'Covered academically and in small experiments. Understand document modelling but haven\'t shipped anything meaningful with it yet.' },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker', proficiency: 'Used to containerise EVAT\'s multi-service setup. Comfortable writing Dockerfiles and compose files for development. Less experience with production orchestration and Kubernetes.' },
      { name: 'Git & GitHub', proficiency: 'Daily driver. Comfortable with branching strategies, rebasing, and code review workflows. Introduced Git practices to the Deakin App Team.' },
      { name: 'CI/CD', proficiency: 'Set up basic pipelines with GitHub Actions for the App Team. Understand the concepts well — still building experience with more complex pipeline configurations.' },
      { name: 'Vercel', proficiency: 'Deploying this site on it. Comfortable with project configuration, environment variables, and Blob storage. Straightforward for Next.js projects.' },
      { name: 'Linux', proficiency: 'Comfortable in a terminal — file system, permissions, process management, and shell scripting. Daily development environment.' },
    ],
  },
]
