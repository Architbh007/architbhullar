from pathlib import Path

content = r"""# Recruiter Portfolio Project Content

This file contains copy-ready content for the projects section of Archit Bhullar's portfolio.

## How the projects show progression

The order below presents a clear engineering progression:

1. **Smart Car Parking System** — embedded systems, sensors, hardware control and IoT messaging.
2. **GridRace** — live data ingestion, analytics, clustering and rapid product delivery.
3. **NodeMap** — static analysis, graph modelling, full-stack engineering and cloud deployment.
4. **EVAT** — conversational AI, retrieval-augmented generation, distributed services and technical leadership.
5. **AquBlend** — early-stage product leadership, data strategy and system design.

> Replace every `[ADD ...]` placeholder before publishing. No project-specific GitHub link, video URL or banner asset has been invented.

---

# 1. Smart Car Parking System

## Name

Smart Car Parking System

## Full Name

Smart Car Parking and Reservation System

## Tagline

An IoT-enabled parking prototype that detects space availability, validates reservations, recognises vehicle number plates and automates gate access.

## Timeline

[ADD YEAR] · [ADD DURATION]

## Status

Completed · Academic Embedded Systems Prototype

## GitHub URL

[ADD PROJECT GITHUB URL]

## Video

[ADD DEMO VIDEO URL]

## Banner Image

[ADD BANNER IMAGE PATH OR URL]

**Suggested banner:** A wide image showing the physical prototype, ultrasonic sensors, entry gate, camera and parking-space interface in one frame.

## Problem

Drivers often enter a parking facility without knowing whether a space is available, while operators rely on manual checks or disconnected systems to manage occupancy, reservations and entry access. This creates unnecessary waiting, inefficient space usage and limited visibility across the parking process.

The project explored how embedded hardware, real-time messaging and application software could be combined into one automated workflow. The goal was to detect parking-space occupancy, support time-based reservations, verify a vehicle at entry and control the gate without requiring continuous manual intervention.

## Architecture

The system was designed as a small cyber-physical platform rather than a single hardware program.

- **Ultrasonic sensors** measured whether individual parking spaces were occupied.
- An **Arduino Nano 33 IoT** collected sensor readings and handled low-level hardware interaction.
- **MQTT** provided an event-driven communication layer so that sensor updates and control commands could move between components without tightly coupling the hardware to the user interface.
- A **Raspberry Pi** acted as the higher-level controller and coordinated reservation validation, camera input and gate decisions.
- A **Python-based desktop application built with Tkinter** displayed availability and supported the parking-management workflow.
- A **camera-based number-plate recognition component** was used to identify an arriving vehicle and compare it with a valid booking.
- A **servo motor** controlled the physical gate after the reservation and vehicle details were validated.
- Booking logic included **time-window validation**, preventing an entry decision from being based only on whether a number plate existed in the system.

The separation between sensor collection, messaging, application logic and hardware actuation made the prototype easier to test and extend.

## Impact

The final prototype demonstrated an end-to-end parking workflow that connected physical sensing, booking validation, vehicle identification and gate automation.

Its main value was not an isolated sensor reading or interface screen, but the integration of several independent components into one functioning system. The project established my foundation in embedded systems and taught me how software decisions affect real physical behaviour, latency and reliability.

## Tech Stack

- Arduino Nano 33 IoT
- Raspberry Pi
- Arduino C/C++
- Python
- MQTT
- Tkinter
- Ultrasonic sensors
- Camera-based number-plate recognition
- Servo motor
- Embedded and IoT communication

## Technical Challenges

### Maintaining consistent parking state

Sensor readings, bookings and gate state originated from different parts of the system. I had to prevent the interface from showing stale availability and ensure that a gate decision was based on the latest sensor and reservation information.

### Handling noisy sensor readings

Ultrasonic measurements can fluctuate because of object position, surface angle and environmental interference. The system needed stable occupancy logic rather than treating every individual reading as a final state change.

### Coordinating asynchronous components

The Arduino, Raspberry Pi, desktop interface, camera pipeline and servo did not operate at the same speed. MQTT helped decouple these components, but message timing, duplicate events and missing updates still had to be considered.

### Validating more than vehicle identity

Recognising a number plate was not enough. The system also had to verify that the associated booking was valid for the current time window before opening the gate.

### Connecting software to physical actuation

A software error could cause incorrect gate movement. I had to treat the servo as part of a controlled state transition rather than a UI action that could be triggered without validation.

## Key Learnings

- I learned how to divide an IoT system into sensing, communication, decision and actuation layers.
- I gained practical experience with event-driven communication through MQTT.
- I learned that embedded systems require calibration, filtering and state validation because physical inputs are not perfectly reliable.
- I developed a stronger understanding of asynchronous workflows and the importance of avoiding tightly coupled hardware and application logic.
- I learned to test components independently before validating the complete end-to-end system.
- I understood why security and failure states must be considered when software controls physical hardware.

## Future Improvements

- Replace the desktop-only interface with a responsive web or mobile application.
- Store bookings, occupancy history and access events in a persistent database.
- Add authenticated users and role-based permissions for drivers and parking operators.
- Secure MQTT communication using authentication and TLS.
- Improve number-plate recognition under poor lighting and varied camera angles.
- Add sensor-health monitoring and fallback behaviour when a sensor stops reporting.
- Support multiple parking facilities through a scalable cloud backend.
- Introduce audit logs and manual override controls for gate failures or emergency access.

---

# 2. GridRace

## Name

GridRace

## Full Name

GridRace — Live Household Energy Challenge

## Tagline

A gamified energy platform that uses live AEMO grid data, household clustering and real-time leaderboards to encourage smarter electricity use.

## Timeline

2026 · Hackathon Prototype

## Status

Completed · Hackathon MVP

## GitHub URL

[ADD PROJECT GITHUB URL]

## Video

[ADD DEMO OR PITCH VIDEO URL]

## Banner Image

[ADD BANNER IMAGE PATH OR URL]

**Suggested banner:** A dashboard containing a live grid-status indicator, household score, energy trend and leaderboard.

## Problem

Households consume electricity without a clear view of when the grid is under pressure or when cleaner energy is more available. Even when users can see their total usage, the information is often historical and does not give them a strong reason to shift flexible activities such as charging, washing or other high-energy tasks.

A second issue is fairness. Ranking households only by raw electricity consumption would favour smaller homes and disadvantage larger households regardless of how responsibly they use energy.

GridRace was created to make grid-aware behaviour understandable and competitive. It translated live energy data into a scoring experience where comparable households could compete based on improvement and timing rather than only absolute consumption.

## Architecture

GridRace was designed as a live data and analytics pipeline connected to a user-facing competition layer.

- A **data-ingestion component** collected live or frequently updated information from **AEMO energy data sources**.
- A **processing layer** cleaned and transformed raw grid information into application-ready signals that could be used by the scoring logic.
- A **household clustering component** grouped users with broadly comparable energy profiles, improving the fairness of competition.
- A **scoring engine** translated energy behaviour and grid conditions into points.
- A **leaderboard service** ranked households and updated the competition view as new information became available.
- A **frontend dashboard** presented the user's score, relative position and current grid context.
- The complete prototype was scoped and delivered under hackathon time constraints, so the architecture prioritised a working end-to-end flow and a clear product demonstration.

## Impact

GridRace converted technical energy-market information into a product concept that ordinary households could understand and act upon.

The prototype demonstrated:

- ingestion of live AEMO grid information;
- grouping of households for fairer comparison;
- conversion of energy behaviour into a competitive score; and
- a real-time leaderboard that made the result visible and engaging.

The project strengthened my ability to turn a complex dataset into a focused user experience while working under a short delivery window.

## Tech Stack

### Confirmed components

- Live AEMO grid data
- Data-ingestion pipeline
- Household clustering
- Energy-scoring logic
- Real-time leaderboard
- Dashboard-based user experience

### Add the exact implementation tools before publishing

- Programming language: [ADD LANGUAGE]
- Data-processing library: [ADD LIBRARY]
- Clustering library or method: [ADD LIBRARY OR ALGORITHM]
- Backend framework: [ADD FRAMEWORK]
- Frontend framework: [ADD FRAMEWORK]
- Deployment platform: [ADD PLATFORM]

## Technical Challenges

### Converting external grid data into stable application signals

Live data can contain changing schemas, unavailable fields, delayed updates or values that are meaningful to energy specialists but difficult to use directly in a consumer product. The pipeline needed to separate raw ingestion from product-level metrics.

### Designing a fair competition model

Raw household consumption is not a fair basis for comparison. The project needed a method for grouping similar households and rewarding behaviour relative to an appropriate baseline.

### Keeping scores explainable

A leaderboard is less useful when users cannot understand why their position changed. The scoring approach needed to remain simple enough to communicate while still responding to changing grid conditions.

### Updating a live experience

The data pipeline, scoring logic and leaderboard had to remain synchronised so that the interface did not display a rank calculated from an older data state.

### Delivering within hackathon constraints

The team had to reduce scope, prioritise the core user journey and build a presentable end-to-end prototype without spending the available time on low-impact features.

## Key Learnings

- I learned how to transform a live external dataset into product-level information rather than exposing raw technical data directly.
- I developed a stronger understanding of normalisation, segmentation and why model outputs must be fair and explainable.
- I learned that data quality, update frequency and fallback behaviour should be considered before building the interface around a live source.
- I improved my ability to choose a narrow MVP and deliver the most valuable flow under time pressure.
- I learned how gamification can make an invisible infrastructure problem more understandable, while still requiring careful scoring design to avoid misleading users.

## Future Improvements

- Connect directly to household smart-meter data with clear user consent.
- Create personal consumption baselines instead of relying only on group comparison.
- Add short-term forecasts for demand, renewable availability and electricity prices.
- Send recommendations when flexible energy use can be shifted to a better time.
- Include EV-charging and appliance-scheduling integrations.
- Add persistent user accounts, historical performance and achievement tracking.
- Introduce anti-gaming rules and anomaly detection for unrealistic consumption data.
- Validate whether the scoring system produces measurable behaviour change through a real household pilot.
- Add monitoring and fallback data sources when the primary energy feed is unavailable.

---

# 3. NodeMap

## Name

NodeMap

## Full Name

NodeMap — Codebase Intelligence and Dependency Analysis Platform

## Tagline

A codebase intelligence tool that turns unfamiliar repositories into interactive architecture maps, dependency graphs and actionable risk insights.

## Timeline

2026 · Independent Project

## Status

Deployed MVP · Active Iteration

## GitHub URL

[ADD NODEMAP GITHUB URL]

## Video

[ADD NODEMAP DEMO VIDEO URL]

## Banner Image

[ADD NODEMAP BANNER IMAGE PATH OR URL]

**Suggested banner:** A clean screenshot of the interactive dependency graph with an expanded service, risk indicators and the Fit control visible.

## Problem

Understanding an unfamiliar codebase is slow because its architecture is rarely documented in the same way that it exists in the source code. Developers often have to search through files manually, trace imports, identify entry points and estimate the effect of a change before they can contribute safely.

This becomes more difficult when dependencies are circular, modules are unused or a small number of files act as hidden risk hotspots.

NodeMap was built to reduce this discovery time. It analyses a repository and converts source relationships into an interactive graph so that developers can understand structure, investigate dependencies and identify risk before modifying the code.

## Architecture

NodeMap is a full-stack static-analysis and visualisation platform.

- A user submits or loads a codebase for analysis.
- The **analysis service** scans the repository and extracts relationships between source files, including import and dependency information.
- A **path-resolution layer** normalises file references so that relative imports can be mapped to consistent graph nodes.
- The application constructs a **directed dependency graph** where files or modules become nodes and relationships become edges.
- An **analysis layer** uses this graph to surface circular dependencies, possible dead code, dependency concentration, risk hotspots and change-impact information.
- A **Fastify API built on Node.js** exposes the processed graph and analysis results.
- A **React and TypeScript frontend** consumes the API.
- **React Flow** renders the interactive graph and supports expansion, navigation, panning, zooming and fitting the architecture into view.
- The graph uses a structured horizontal layout to make dependency direction easier to follow.
- The complete application was deployed to **Azure**, taking the project from local analysis code to a usable hosted product.

## Impact

NodeMap demonstrates my ability to independently take a developer-tool idea through product definition, backend analysis, graph modelling, frontend interaction and cloud deployment.

The deployed MVP allows a developer to:

- visualise the structure of an unfamiliar repository;
- inspect dependency relationships;
- identify circular references and potential dead code;
- locate highly connected or risky modules; and
- reason about the possible impact of a change before editing the code.

The project moved my work beyond building application features and into tooling that reasons about software systems themselves.

## Tech Stack

- React
- TypeScript
- React Flow
- Node.js
- Fastify
- Static source analysis
- Directed graph modelling
- Azure
- Git

## Technical Challenges

### Resolving source-code relationships

Import paths can be relative, aliased or written in different forms. They had to be normalised before two references could reliably be treated as the same dependency.

### Preventing duplicate and inconsistent graph nodes

The parser could encounter the same file through several paths. A stable node identity strategy was required to avoid duplicates and incorrect edges.

### Handling circular dependencies safely

Circular references are an important result, but graph traversal can become recursive or repeat indefinitely when cycles are not tracked correctly. The analysis needed explicit visited-state and cycle-detection logic.

### Presenting large graphs without losing usability

A dependency graph can quickly become unreadable. I had to balance automatic layout, expandable sections, navigation controls and visual density so that the graph remained useful rather than becoming a diagram of every file at once.

### Defining useful risk signals

A highly connected file may be important, risky or both. The system needed to distinguish between raw graph statistics and insights that could actually help a developer make a decision.

### Deploying separate frontend and backend services

Moving from a local tool to Azure required production configuration, correct API routing and handling differences between local and hosted environments.

## Key Learnings

- I learned how graph structures can represent software architecture more effectively than a flat file list.
- I strengthened my understanding of dependency traversal, cycle detection and change-impact reasoning.
- I learned that static-analysis results should include confidence and limitations because source relationships are not always completely resolvable.
- I gained experience designing developer tools where information density and interaction design are as important as backend correctness.
- I learned to separate parsing, graph construction, analysis and presentation so that each part can evolve independently.
- I gained end-to-end deployment experience across a TypeScript frontend and a Node.js backend.

## Future Improvements

- Replace lightweight source parsing with language-aware AST tooling such as TypeScript Compiler APIs, ts-morph or Tree-sitter.
- Support additional programming languages and framework-specific relationships.
- Integrate directly with GitHub so a repository can be analysed without a manual upload workflow.
- Add pull-request analysis that highlights only architecture changes introduced by a branch.
- Compare two commits and visualise added, removed or redirected dependencies.
- Improve dead-code detection by considering dynamic imports, framework conventions and runtime entry points.
- Add caching and background jobs for large repositories.
- Add authentication and private-repository access controls.
- Allow teams to attach architecture notes and ownership information to graph nodes.
- Generate exportable architecture reports for onboarding and technical reviews.

---

# 4. EVAT

## Name

EVAT

## Full Name

EVAT (Chameleon) — AI-Powered EV Adoption and Charging Assistant

## Tagline

A conversational EV platform that converts complex charging, cost and environmental questions into personalised, grounded guidance.

## Timeline

2025–2026 · Multi-Trimester University Capstone

## Status

Active Development · App Team Lead

## GitHub URL

[ADD EVAT GITHUB URL]

## Video

[ADD EVAT DEMO VIDEO URL]

## Banner Image

[ADD EVAT BANNER IMAGE PATH OR URL]

**Suggested banner:** The EVAT chat interface beside a simplified architecture diagram showing React, the API, Rasa, the retrieval layer and MongoDB.

## Problem

People considering an electric vehicle must compare charging options, ownership costs, environmental impact and personal driving requirements across fragmented sources. A conventional search bar is not well suited to questions containing several conditions at once, such as location, vehicle type, charger preference, budget and expected usage.

The original experience could return basic information, but it did not reliably understand realistic multi-entity questions or maintain a structured conversation.

EVAT was developed to make this process more accessible through a conversational interface that can identify user intent, extract important entities, manage dialogue and retrieve relevant EV information before producing a response.

## Architecture

EVAT uses several connected services rather than treating the chatbot as one standalone model.

### Frontend

- A **React application built with Vite** provides the user-facing EV comparison and conversational experience.
- The frontend communicates with the application backend and displays structured responses from the assistant.

### Application Backend

- A **Node.js, TypeScript and Express API** handles the main application services.
- **JWT authentication** protects user-specific functionality.
- **MongoDB Atlas** stores application data.
- **Swagger/OpenAPI documentation** supports API discovery and team integration.
- The backend service operates separately from the conversational AI services, which allows the web application and assistant pipeline to evolve independently.

### Conversational AI

- **Rasa 3.6.15** provides the NLU and dialogue-management layer.
- A **DIETClassifier** identifies user intent and extracts entities from multi-part EV questions.
- **TEDPolicy** supports dialogue decisions and determines the next conversational action.
- Rasa Core and custom-action services are separated so that dialogue prediction and application-specific logic can be managed independently.

### Retrieval-Augmented Generation

- A **RAG layer** retrieves relevant EV information before a response is generated.
- This reduces dependence on unsupported model memory and gives the assistant domain context related to charging, comparison and personalised EV guidance.
- The retrieval layer complements the deterministic intent and entity pipeline rather than replacing it.

### Integration

- The React frontend, Express backend, MongoDB database, Rasa service and action/retrieval components communicate through defined service boundaries.
- Configuration across local and hosted environments is managed through application settings and environment variables, although reducing remaining hard-coded configuration is part of the planned technical improvement work.

## Impact

My contribution moved EVAT from a basic search-oriented interaction toward a more capable conversational system.

I:

- built the NLU pipeline using intent classification and entity extraction;
- implemented dialogue handling through Rasa policies;
- added a retrieval-augmented generation layer for more grounded responses;
- worked through integration across the frontend, backend, database and Rasa services;
- led and mentored more than 20 contributors as App Team Lead; and
- presented architecture decisions to faculty stakeholders.

The project demonstrates both technical depth in conversational AI and the ability to coordinate a large contributor group around shared interfaces and architecture decisions.

## Tech Stack

### Frontend

- React
- Vite
- JavaScript/TypeScript

### Backend

- Node.js
- TypeScript
- Express
- REST APIs
- Swagger/OpenAPI
- JWT

### Database

- MongoDB Atlas

### AI and NLP

- Python
- Rasa 3.6.15
- DIETClassifier
- TEDPolicy
- Intent classification
- Entity extraction
- Dialogue management
- Retrieval-Augmented Generation

### Infrastructure and Collaboration

- Git and GitHub
- Cloud-hosted services
- Environment-based configuration
- Multi-service application architecture

## Technical Challenges

### Understanding realistic multi-entity questions

Users do not ask EV questions in a fixed template. One request can contain several vehicle, location, price and charging constraints. The NLU pipeline required training examples and entity definitions that could generalise beyond exact wording.

### Balancing deterministic dialogue and retrieval

Intent classification and dialogue policies provide control, while retrieval provides broader domain context. I had to define when a query should follow a structured action and when retrieved information should support the answer.

### Integrating independent services

The frontend, Express API, MongoDB, Rasa server and custom actions all had separate runtimes and configuration. Debugging required tracing a request across service boundaries rather than inspecting one codebase.

### Managing Rasa and Python compatibility

Rasa 3.6.15 supports a restricted range of Python versions. Resolving environment and package compatibility was necessary before the NLU service could be installed and trained reliably.

### Maintaining consistent contracts across a large team

With more than 20 contributors, small differences in API fields, ports, environment variables and response structures could block integration. Clear documentation and architecture communication were necessary to reduce rework.

### Reducing hard-coded infrastructure assumptions

Some parts of the existing application relied on hard-coded configuration and limited developer-menu functionality. These areas made local setup and cloud integration harder and became important targets for refactoring.

## Key Learnings

- I learned how intent classification, entity extraction, dialogue policies and retrieval fit together in a production-style conversational pipeline.
- I developed a stronger understanding of where deterministic chatbot logic is more reliable than open-ended generation.
- I learned that RAG quality depends on retrieval, chunking, metadata and evaluation, not only the language model.
- I gained practical experience debugging requests across multiple services and runtimes.
- I learned to treat API contracts, environment configuration and setup documentation as core engineering work in a large team.
- Leading contributors taught me how to explain architecture decisions, divide work around service boundaries and review integration risk before implementation.
- I learned that an AI feature should be evaluated against realistic user queries rather than only a small set of successful demonstrations.

## Future Improvements

- Replace remaining hard-coded values with validated environment configuration and secrets management.
- Containerise the frontend, backend, Rasa and action services for consistent local and cloud environments.
- Add automated NLU evaluation for intent accuracy, entity extraction and dialogue outcomes.
- Build a curated test set of realistic multi-entity EV questions.
- Add retrieval metrics and answer-grounding checks.
- Improve observability with structured logs, request tracing and service-health monitoring.
- Expand the developer/admin interface so content and configuration can be updated without code changes.
- Add stronger personalisation based on driving habits, location, charging access and budget.
- Introduce CI/CD checks for API compatibility and model regression.
- Reduce coupling between the hosted infrastructure and local training workflow.
- Add feedback capture so incorrect assistant responses can be reviewed and added to future training or evaluation data.

---

# 5. AquBlend

## Name

AquBlend

## Full Name

AquBlend — [ADD OFFICIAL FULL PROJECT NAME]

## Tagline

[ADD ONE SENTENCE THAT IDENTIFIES THE USER, THE CORE PROBLEM AND THE PRODUCT OUTCOME]

**Recommended structure:**

> A data-driven platform that helps [TARGET USER] make better [DOMAIN] decisions by collecting, validating and transforming [TYPE OF DATA] into [CLEAR OUTPUT].

## Timeline

2026 · In Progress

## Status

Discovery and Development · Project Lead

## GitHub URL

[ADD AQUABLEND GITHUB URL OR WRITE "Private Repository"]

## Video

Not available yet · Project in development

## Banner Image

[ADD CONCEPT IMAGE, WIREFRAME OR EARLY PRODUCT SCREENSHOT]

**Suggested banner:** Use the current system diagram or product dashboard rather than a generic water image. A recruiter should immediately see what the software does.

## Problem

The exact problem statement must be confirmed before this section is published. Avoid describing AquBlend only as an application that “uses data” because that does not explain why the product needs to exist.

Use the following final structure:

> [TARGET USER] currently relies on [CURRENT PROCESS OR TOOL] to make [IMPORTANT DECISION]. The process is difficult because [DATA OR WORKFLOW PROBLEM], which leads to [MEASURABLE CONSEQUENCE]. AquBlend is being developed to collect the required information, validate its quality and convert it into [DECISION, RECOMMENDATION, FORECAST OR AUTOMATED ACTION].

### Details still required

- Who is the primary user?
- What exact decision are they trying to make?
- What is currently manual, slow, inaccurate or fragmented?
- Which data is required?
- What happens when the decision is wrong?
- What result will AquBlend produce?

## Architecture

AquBlend is still in development, so the portfolio should describe the architecture as an evolving system rather than presenting unfinished components as production-ready.

The recruiter-facing architecture should eventually explain these layers:

1. **Data Sources**  
   The APIs, datasets, sensors, uploaded files or user inputs that provide the raw information.

2. **Ingestion Layer**  
   The process that collects data and handles unavailable fields, duplicates, changing formats and update frequency.

3. **Validation and Transformation**  
   Rules that check data quality, standardise units and convert raw inputs into a consistent internal model.

4. **Application Backend**  
   The API and business logic responsible for calculations, recommendations or workflow decisions.

5. **Database**  
   The storage model for users, source data, processed results, configuration and history.

6. **Analytics or AI Layer**  
   Any forecasting, optimisation, classification, ranking or recommendation logic used by the product.

7. **Frontend**  
   The interface through which users submit information, inspect results and act on recommendations.

8. **Deployment and Monitoring**  
   The hosting environment, automated deployment, logging and system-health checks.

### Current project-lead focus

- Clarifying the problem and product scope.
- Researching the domain before implementation.
- Determining which data is required and where it can be obtained.
- Defining an architecture that separates ingestion, domain logic and presentation.
- Preparing the project so contributors can work against clear technical boundaries.

## Impact

Because the product is still in progress, do not claim user adoption, time savings or accuracy improvements until they have been measured.

A truthful current impact statement is:

> As Project Lead, I am guiding AquBlend through its early product and technical-definition phase. My current work focuses on converting a broad idea into a testable problem statement, identifying the data needed to support the product and defining an architecture that the team can build incrementally.

Once the MVP is tested, replace this paragraph with evidence such as:

- number of datasets or sources integrated;
- data-quality improvement;
- reduction in manual processing time;
- model or recommendation accuracy;
- number of pilot users;
- user feedback; or
- a measurable operational outcome.

## Tech Stack

[ADD ONLY AFTER THE ARCHITECTURE IS CONFIRMED]

Suggested format:

- Frontend: [ADD]
- Backend: [ADD]
- Database: [ADD]
- Data ingestion: [ADD]
- Analytics/AI: [ADD]
- Infrastructure: [ADD]
- Testing and CI/CD: [ADD]

## Technical Challenges

The final section should contain challenges you have actually solved. At the current stage, the most defensible technical challenges are:

### Defining the correct data requirements

The usefulness of the system depends on collecting data that directly supports the product decision. The challenge is distinguishing necessary inputs from information that is available but not meaningful.

### Designing for incomplete or inconsistent data

Real-world datasets can use different formats, units, update intervals and quality standards. The system needs validation and transformation boundaries before data reaches the business logic.

### Avoiding architecture driven by the interface

The team needs to define the domain model, data flow and service responsibilities before committing too heavily to a frontend implementation.

### Creating clear boundaries for contributors

As the project grows, contributors require stable contracts between ingestion, backend logic, storage and the frontend. Establishing these boundaries early reduces duplicated work and integration problems.

> Replace or extend these items after implementation with specific debugging, algorithm, scaling or deployment problems that you personally solved.

## Key Learnings

- I am learning to begin with data and decision requirements rather than selecting technologies first.
- I am developing a stronger understanding of how early architecture choices influence a team's ability to work in parallel.
- I am learning to separate confirmed requirements from assumptions that still need user or domain validation.
- I am applying lessons from EVAT by improving documentation, ownership boundaries and integration planning earlier in the project lifecycle.
- I am strengthening my ability to lead a product from discovery into an implementable technical roadmap.

## Future Improvements

### Immediate

- Confirm the primary user and measurable problem.
- Finalise the MVP scope.
- Document the required data sources and quality rules.
- Produce the first end-to-end architecture diagram.
- Select the stack based on product and data requirements.
- Create a delivery plan with component ownership and integration checkpoints.

### After the first MVP

- Automate data ingestion.
- Add data-quality monitoring and source-failure handling.
- Build persistent history and auditability.
- Validate the product with real users or domain stakeholders.
- Measure the improvement against the current process.
- Add automated tests and CI/CD.
- Introduce observability and production security controls.
- Refine analytics or AI only after a reliable baseline workflow exists.

---

# Final Publishing Checklist

Before adding these blocks to the live portfolio:

- Replace all `[ADD ...]` placeholders.
- Verify every timeline and project duration.
- Use project-specific GitHub links rather than only a GitHub profile.
- Keep private repositories labelled as private instead of linking to an inaccessible page.
- Add a 60–120 second demo video for each completed project where possible.
- Use screenshots from the actual product rather than generic stock images.
- Add measurable impact only when evidence exists.
- Keep technical challenges focused on problems you personally solved.
- Avoid listing technologies that were planned but not implemented.
- For team projects, make your personal contribution explicit.
- Order the projects so the progression from embedded systems to data, full-stack software, AI and leadership is immediately visible.
"""

output_path = Path("/mnt/data/portfolio_projects_readme.md")
output_path.write_text(content, encoding="utf-8")

print(f"Created: {output_path}")
print(f"Words: {len(content.split()):,}")
