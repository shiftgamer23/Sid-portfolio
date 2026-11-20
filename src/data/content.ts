// Single source of truth for every piece of copy on the site.
// Everything here comes from the resume. Items marked TODO need your input.

export const profile = {
  name: "Siddhant Roy Choudhary",
  short: "Siddhant",
  email: "siddhantroy04@gmail.com",
  phone: "+91-8384038129",
  github: "https://github.com/shiftgamer23",
  linkedin: "https://www.linkedin.com/in/siddhant-roy-choudhary-6b03a2255/",
  location: "Bengaluru, India",
  resume: "/Resume%20of%20Siddhant%20Roy%20Choudhary%20latest.pdf",
  resumeName: "Siddhant_Roy_Choudhary_Resume.pdf",
  headline: ["I build AI systems", "that ship to", "production."],
  sub: "Agents, RAG pipelines and the backend services they run on, shipped at Maersk and NHPC. B.Tech CSE '26, IIIT Nagpur.",
};

export const nav = [
  { id: "experience", label: "Experience" },
  { id: "impact", label: "Impact" },
  { id: "projects", label: "Projects" },
  { id: "assistant", label: "Ask me" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export type ImpactSource = "Maersk" | "NHPC";

// Mostly company outcomes, one project number. `value` animates; `text` is shown as-is.
export const impact: {
  source: ImpactSource;
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
  context: string;
  feature?: boolean;
}[] = [
  { source: "Maersk", text: "Monolith → Microservices", label: "Migrated a large-scale Python backend into independently deployable, independently scalable services", context: "Python · service APIs · inter-service workflows", feature: true },
  { source: "Maersk", value: 10, suffix: "+", label: "Months shipping production systems on Maersk's Forward Deployed Engineering team", context: "Jan 2026 – present" },
  { source: "Maersk", value: 3, label: "Countries of sales-CRM data enriched with external sources for sales executives", context: "PySpark · Databricks" },
  { source: "NHPC", value: 40, suffix: "%", label: "Faster query responses from a RAG pipeline over policy documents", context: "Retrieval-Augmented Generation" },
  { source: "Maersk", text: "Agentic API orchestration", label: "Contributed to a LangGraph agent that picks and calls APIs dynamically from user queries", context: "LangGraph · tool calling" },
  { source: "Maersk", value: 3, label: "Platform services stood up on Kubernetes: Langfuse, Redis and graph databases", context: "Helm · SSO integration" },
  { source: "NHPC", value: 25, suffix: "%", label: "Higher answer accuracy on internal benchmarks after fine-tuning", context: "Mistral · LLaMA" },
  { source: "Maersk", text: "Service-to-service APIs", label: "Designed the communication workflows and APIs that let distributed services exchange data reliably", context: "Microservices · API design" },
  { source: "NHPC", value: 100, suffix: "+", label: "Policy and governance documents made queryable in real time", context: "<200 ms SLA · Streamlit" },
];

export const experience = [
  {
    company: "A.P. Moller – Maersk",
    role: "AIML Intern, FDE Team",
    period: "Jan 2026 – Present",
    location: "Bengaluru, Karnataka",
    current: true,
    mono: "M",
    // **text** renders highlighted so the key result is scannable.
    points: [
      "Migrated a large-scale Python backend from a **monolith to microservices**, so each service deploys and scales independently.",
      "Designed **inter-service communication** workflows and APIs for reliable data exchange across distributed services.",
      "Contributed to an **AI agent built on LangGraph** that orchestrates APIs dynamically and runs workflows from user queries.",
      "Engineered **PySpark/Databricks pipelines** that enrich Maersk's sales CRM with external data across **3 countries**, giving sales executives actionable customer insight.",
      "Set up **Kubernetes infrastructure** for Langfuse, Redis and graph databases with **Helm charts** and deployment configs, including **SSO integration**.",
      "Extended production codebases with new backend functionality, improving maintainability and operational efficiency.",
    ],
    tags: ["Python", "LangGraph", "Microservices", "PySpark", "Databricks", "Kubernetes", "Helm", "Langfuse", "Redis"],
  },
  {
    company: "NHPC Ltd",
    role: "AI Engineer Intern",
    period: "May 2025 – Jul 2025",
    location: "New Delhi, India",
    current: false,
    mono: "N",
    points: [
      "Architected a **Retrieval-Augmented Generation pipeline** over **100+ policy and governance documents**, cutting query response time by **40%**.",
      "Integrated and **fine-tuned open-source LLMs** (Mistral, LLaMA) on in-house data, lifting answer accuracy on internal benchmarks by **25%**.",
      "Built modular Python microservices and a Streamlit dashboard for real-time Q&A and policy summarization, with a **<200 ms SLA** per request.",
      "Led knowledge-transfer workshops on RAG best practices and prompt engineering for **15+ team members**.",
    ],
    tags: ["RAG", "Mistral", "LLaMA", "Fine-tuning", "Streamlit", "Python"],
  },
];

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  tone?: "accent" | "mint" | "pink" | "neutral";
};
export type DiagramEdge = {
  from: string;
  to: string;
  fromSide?: "l" | "r" | "t" | "b";
  toSide?: "l" | "r" | "t" | "b";
  dashed?: boolean;
};

export const projects = [
  {
    id: "reviewcrew",
    index: "01",
    title: "ReviewCrew",
    kicker: "Multi-agent code reviewer",
    summary:
      "Specialised LangGraph agents review a diff for style, security and test coverage in parallel. A supervisor graph decides which agents a change needs, merges overlapping findings and streams one review back live.",
    metrics: [
      { k: "3", v: "specialist agents in parallel" },
      { k: "100", v: "real reviewer comments in eval" },
      { k: "MCP", v: "standalone tool servers" },
    ],
    stack: ["LangGraph", "FastAPI", "MCP", "Redis", "Langfuse", "SSE", "Gemini → Groq failover", "Docker Compose"],
    notes: [
      "The supervisor routes each diff (it skips the security agent on docs-only changes), runs the agents in parallel and merges overlapping findings.",
      "Each agent tool-calls its own checker (linter, security-pattern scan, test-coverage check). The tools were later refactored into standalone MCP servers for protocol-based access.",
      "Redis caches full reviews keyed on a normalised diff hash, so an identical diff never hits the LLM twice. Langfuse traces every step, token count and cache hit.",
      "Evaluated against 100 real human reviewer comments from the CodeReviewer dataset with an LLM-as-judge harness. FastAPI, the MCP servers and Redis ship together as one Docker Compose stack.",
    ],
    github: "https://github.com/shiftgamer23/Multi-Agent-Code-Reviewer" as string | undefined,
    live: undefined as string | undefined,
    diagram: {
      width: 1000,
      height: 300,
      nodes: [
        { id: "client", label: "Client", sub: "POST /review", x: 10, y: 122, tone: "neutral" },
        { id: "api", label: "FastAPI", sub: "SSE stream", x: 190, y: 122, tone: "accent" },
        { id: "sup", label: "Supervisor graph", sub: "route + merge", x: 385, y: 122, tone: "accent" },
        { id: "style", label: "Style agent", sub: "linter tool", x: 600, y: 24, tone: "mint" },
        { id: "sec", label: "Security agent", sub: "pattern scan", x: 600, y: 122, tone: "mint" },
        { id: "cov", label: "Coverage agent", sub: "test check", x: 600, y: 220, tone: "mint" },
        { id: "mcp", label: "MCP servers", sub: "tool servers", x: 810, y: 122, tone: "pink" },
        { id: "redis", label: "Redis", sub: "diff-hash cache", x: 190, y: 228, tone: "neutral" },
        { id: "lf", label: "Langfuse", sub: "traces + eval scores", x: 385, y: 228, tone: "neutral" },
      ] as DiagramNode[],
      edges: [
        { from: "client", to: "api" },
        { from: "api", to: "sup" },
        { from: "sup", to: "style" },
        { from: "sup", to: "sec" },
        { from: "sup", to: "cov" },
        { from: "style", to: "mcp" },
        { from: "sec", to: "mcp" },
        { from: "cov", to: "mcp" },
        { from: "api", to: "redis", fromSide: "b", toSide: "t", dashed: true },
        { from: "sup", to: "lf", fromSide: "b", toSide: "t", dashed: true },
      ] as DiagramEdge[],
    },
  },
  {
    id: "deskpilot",
    index: "02",
    title: "DeskPilot",
    kicker: "Agentic support-ticket triage",
    summary:
      "A LangGraph agent that searches past tickets and customer context before routing a ticket. A deterministic confidence gate checks every decision and escalates to a human when the evidence is thin. Tickets can be typed or spoken.",
    metrics: [
      { k: "28.5K", v: "real tickets in the corpus" },
      { k: "84.5%", v: "top-1 retrieval accuracy" },
      { k: "<5s", v: "end-to-end voice reply" },
    ],
    stack: ["LangGraph", "FastAPI", "BM25 + Chroma", "RRF", "Groq / Gemini", "Sarvam STT · TTS", "Postgres", "Redis", "Langfuse", "React"],
    notes: [
      "Hybrid retrieval merges BM25 and MiniLM vectors with Reciprocal Rank Fusion, measured at 84.5% top-1 queue accuracy on a 103-ticket held-out slice.",
      "The confidence gate overrides the model when the cited precedent isn't in the results, retrieval scores fall below a calibrated floor, or a premium customer has a repeat issue.",
      "Voice mode (STT + TTS) answers end to end in under 5 seconds. It reuses the same /tickets pipeline and templates the reply from the decision, so voice adds zero LLM calls.",
      "Eval-driven: caught a change that dropped queue accuracy from 53% to 27% and reverted it. A CPU-only torch build cut the image from 10.4 GB to 2.85 GB.",
    ],
    github: "https://github.com/shiftgamer23/DeskPilot" as string | undefined,
    live: undefined as string | undefined,
    diagram: {
      width: 1000,
      height: 300,
      nodes: [
        { id: "in", label: "Ticket in", sub: "typed or voice (STT)", x: 10, y: 122, tone: "neutral" },
        { id: "api", label: "FastAPI", sub: "/tickets · SSE", x: 200, y: 122, tone: "accent" },
        { id: "agent", label: "LangGraph agent", sub: "tool-calling loop", x: 395, y: 122, tone: "accent" },
        { id: "search", label: "Hybrid search", sub: "BM25 + vector · RRF", x: 605, y: 24, tone: "mint" },
        { id: "ctx", label: "Customer context", sub: "profile + history", x: 605, y: 122, tone: "mint" },
        { id: "gate", label: "Confidence gate", sub: "can force escalation", x: 605, y: 220, tone: "pink" },
        { id: "route", label: "Route to queue", sub: "decision + reply", x: 815, y: 122, tone: "neutral" },
        { id: "human", label: "Escalate", sub: "to a human", x: 815, y: 220, tone: "neutral" },
      ] as DiagramNode[],
      edges: [
        { from: "in", to: "api" },
        { from: "api", to: "agent" },
        { from: "agent", to: "search" },
        { from: "agent", to: "ctx" },
        { from: "agent", to: "gate" },
        { from: "gate", to: "route" },
        { from: "gate", to: "human" },
      ] as DiagramEdge[],
    },
  },
];

export const skillGroups = [
  {
    title: "AI & Agents",
    blurb: "Agents, retrieval and the LLM tooling around them: orchestration, tools, evaluation and tracing.",
    icon: "bot",
    span: "lg:col-span-2 lg:order-1",
    items: ["LangGraph", "LangChain", "RAG", "MCP", "Vector databases", "LLM fine-tuning", "Mistral", "LLaMA", "Prompt engineering", "Langfuse"],
  },
  {
    title: "Backend & Data",
    blurb: "Services, APIs and data pipelines that hold up in production.",
    icon: "server",
    span: "lg:col-span-2 lg:order-3",
    items: ["Python", "FastAPI", "Microservices", "REST APIs", "PySpark", "Databricks", "SQL", "MongoDB", "Redis", "Node.js", "Express"],
  },
  {
    title: "Infrastructure",
    blurb: "Packaging, deploying and running it all.",
    icon: "container",
    span: "lg:order-2",
    items: ["Docker", "Kubernetes", "Helm", "Linux", "Git / GitHub", "SSO"],
  },
  {
    title: "Web",
    blurb: "Interfaces for the systems I build.",
    icon: "globe",
    span: "lg:order-4",
    items: ["React", "Next.js", "Redux", "JavaScript", "Tailwind", "Bootstrap", "Streamlit"],
  },
  {
    title: "Languages & Tools",
    blurb: "The everyday toolkit.",
    icon: "terminal",
    span: "md:col-span-2 lg:col-span-3 lg:order-5",
    items: ["Python", "C++", "C#", "JavaScript", "SQL", "VS Code", "Colab", "Android Studio", "Unity", "AutoCAD"],
  },
];

export const education = [
  {
    school: "Indian Institute of Information Technology Nagpur",
    detail: "B.Tech, Computer Science Engineering",
    period: "2022 – 2026",
    place: "Nagpur, Maharashtra",
    big: "B.Tech",
  },
  {
    school: "MVN Faridabad",
    detail: "12th, CBSE Board",
    period: "2020 – 2022",
    place: "Faridabad, Delhi NCR",
    big: "94%",
  },
  {
    school: "DAV Public School",
    detail: "10th, CBSE Board · District Topper",
    period: "2019 – 2020",
    place: "Himachal Pradesh",
    big: "98%",
  },
];

// Knowledge base for the on-page assistant demo. Retrieval is keyword-based
// until the RAG backend is wired up (see components/AskSiddhant.tsx).
export const knowledge = [
  {
    id: "maersk",
    source: "experience / maersk",
    keywords: ["maersk", "current", "intern", "microservice", "monolith", "langgraph", "agent", "databricks", "pyspark", "crm", "kubernetes", "helm", "work", "now", "job"],
    text: "At A.P. Moller – Maersk (FDE team, since January 2026) I migrated a large Python backend from a monolith to microservices, designed the inter-service APIs, contributed to a LangGraph agent that orchestrates APIs from user queries, built PySpark/Databricks pipelines enriching the sales CRM across 3 countries, and helped set up Kubernetes infrastructure (Helm, SSO) for Langfuse, Redis and graph databases.",
  },
  {
    id: "nhpc",
    source: "experience / nhpc",
    keywords: ["nhpc", "rag", "retrieval", "llm", "mistral", "llama", "fine-tune", "finetune", "streamlit", "workshop", "policy", "documents", "previous"],
    text: "At NHPC (May–July 2025) I built a RAG pipeline over 100+ policy documents that answered queries 40% faster, fine-tuned Mistral and LLaMA on in-house data for a 25% accuracy gain on internal benchmarks, shipped a Streamlit Q&A dashboard with a sub-200 ms SLA, and trained 15+ teammates on RAG and prompt engineering.",
  },
  {
    id: "reviewcrew",
    source: "projects / reviewcrew",
    keywords: ["reviewcrew", "review", "code", "multi-agent", "mcp", "supervisor", "security", "redis", "docker", "langfuse", "project", "projects", "built"],
    text: "ReviewCrew is a multi-agent code reviewer. LangGraph agents for style, security and test coverage run in parallel under a supervisor graph that routes each diff and merges overlapping findings. Its tools were refactored into standalone MCP servers. FastAPI streams the review over SSE, Redis caches reviews by diff hash, Langfuse traces every step, and it was evaluated against 100 real reviewer comments from the CodeReviewer dataset. Code: github.com/shiftgamer23/Multi-Agent-Code-Reviewer",
  },
  {
    id: "deskpilot",
    source: "projects / deskpilot",
    keywords: ["deskpilot", "triage", "ticket", "support", "voice", "stt", "tts", "speech", "escalat", "retrieval", "bm25", "project", "projects", "built"],
    text: "DeskPilot is an agentic support-ticket triage system. A LangGraph agent searches 28,587 past tickets (hybrid BM25 + vector retrieval with Reciprocal Rank Fusion, 84.5% top-1 on a held-out slice) and customer context, then a deterministic confidence gate decides whether to route or escalate to a human. It also takes tickets by voice (STT + TTS), replying end to end in under 5 seconds. Code: github.com/shiftgamer23/DeskPilot",
  },
  {
    id: "skills",
    source: "skills",
    keywords: ["skill", "stack", "tech", "language", "python", "react", "next", "node", "tools", "technologies", "know", "good"],
    text: "Core stack: Python, FastAPI, LangGraph/LangChain, RAG and vector databases, MCP, PySpark/Databricks, Docker and Kubernetes. On the web side: React, Next.js, Redux, Node/Express, MongoDB, SQL and Tailwind. Also C++ and C#.",
  },
  {
    id: "education",
    source: "education",
    keywords: ["education", "college", "university", "iiit", "degree", "btech", "b.tech", "school", "cbse", "study", "graduat", "marks", "topper"],
    text: "I'm finishing a B.Tech in Computer Science at IIIT Nagpur (2022–2026). Before that: 94% in Class 12 (CBSE) and 98% in Class 10, where I was district topper.",
  },
  {
    id: "contact",
    source: "contact",
    keywords: ["contact", "email", "reach", "hire", "talk", "connect", "available", "phone", "linkedin", "github", "resume", "cv"],
    text: "The easiest way to reach me is by email at siddhantroy04@gmail.com. My resume, GitHub and LinkedIn are linked in the contact section at the bottom of this page.",
  },
];

export const suggestions = [
  "What do you do at Maersk?",
  "Tell me about ReviewCrew",
  "Tell me about DeskPilot",
  "What's your tech stack?",
  "How can I reach you?",
];
