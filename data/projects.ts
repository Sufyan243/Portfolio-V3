export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: "featured" | "secondary" | "archive";
  type: "backend" | "ai" | "frontend" | "fullstack" | "desktop";
  techStack: string[];
  githubUrl: string;
  isPrivate?: boolean;
  liveUrl?: string;
  loomUrl?: string;
  challenges: string[];
  architecture: string[];
  screenshot?: string;
}

export const projects: Project[] = [
  {
    slug: "postidea",
    title: "PostIdea",
    description:
      "AI-powered spec and architecture validation platform. Runs product ideas through a 5-stage pipeline — Socratic discovery, 4-agent council review, spec generation, rules-engine architecture, and implementation verification. Catches contradictions before you write code.",
    longDescription:
      "PostIdea is a full-stack SaaS platform that validates product ideas and architectures before you write a single line of code. It runs ideas through a 5-stage pipeline: Socratic discovery to clarify requirements, a 4-agent council (Product, Tech, UX, Business) that debates and surfaces contradictions, spec generation with structured requirements, rules-engine architecture validation, and implementation verification. Built with FastAPI, React, PostgreSQL, Redis, and Docker. Currently in active development.",
    category: "featured",
    type: "fullstack",
    techStack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker", "Groq", "Python", "TypeScript"],
    githubUrl: "https://github.com/Sufyan243/PostIdea",
    isPrivate: true,
    liveUrl: "https://postidea.app",
    screenshot: "/screenshots/postidea.png",
    challenges: [
      "Designing a 5-stage AI pipeline that maintains context across Socratic discovery, council debate, spec generation, architecture validation, and implementation verification",
      "Building a 4-agent council system where Product, Tech, UX, and Business agents debate and surface contradictions in real-time",
      "Implementing a rules-engine architecture validator that catches logical inconsistencies before code is written",
      "Managing multi-turn AI conversations with context preservation across pipeline stages",
      "Orchestrating async task queues with Redis for long-running AI operations",
    ],
    architecture: [
      "FastAPI async backend with PostgreSQL for persistence and Redis for task queues",
      "5-stage pipeline: Socratic discovery → 4-agent council → spec generation → rules-engine validation → implementation verification",
      "Multi-agent system with specialized agents (Product, Tech, UX, Business) using Groq API",
      "React frontend with real-time pipeline progress tracking",
      "Docker containerized deployment with separate services for API, workers, and database",
    ],
  },
  {
    slug: "terra-debugger",
    title: "Terra Debugger",
    description:
      "A pedagogical Python debugging platform that teaches beginners to think about errors through a structured cognitive process: predict → run → reflect → hint → solution.",
    longDescription:
      "Terra Cognitive Debugger is a full-stack learning platform that guides beginner programmers through a structured cognitive process instead of just showing answers. Code runs in an isolated Docker container with no network access, read-only filesystem, seccomp profile blocking process spawning, 5-second timeout, and 64MB memory limit. A cognitive engine classifies Python errors against a 24-entry taxonomy mapping exception types to concept categories and cognitive skills. It asks a reflection question first, then unlocks three progressive hint tiers sequentially, and only reveals the solution after all hints are exhausted. A Recharts dashboard tracks concept mastery, hint dependency ratio, weakness profile, and metacognitive prediction accuracy over time.",
    category: "featured",
    type: "fullstack",
    techStack: ["FastAPI", "Python 3.11", "React 18", "TypeScript", "PostgreSQL", "Redis", "Docker", "Monaco Editor", "Recharts", "JWT", "SQLAlchemy", "Alembic"],
    githubUrl: "https://github.com/Sufyan243/Debugger",
    isPrivate: false,
    liveUrl: "https://terradebugger.me",
    screenshot: "/screenshots/terra-debugger.png",
    challenges: [
      "Building a rootless Docker-in-Docker sandbox with seccomp, cap_drop=ALL, mutual TLS, and no host socket mounting",
      "Designing a 24-entry cognitive taxonomy that maps Python exception types to concept categories and cognitive skills",
      "Implementing JWT revocation via Redis blacklist with JTI tracking on every protected route",
      "Cross-origin OAuth login using server-side one-time codes stored in Redis with 5-minute TTL",
      "Merging anonymous session data into authenticated user accounts post-login without data loss",
      "Rate limiting with slowapi — execute (30/min), register (5/min), login (10/min)",
    ],
    architecture: [
      "FastAPI async backend with SQLAlchemy + Alembic migrations on PostgreSQL",
      "cognitive/engine.py — pure-Python error parser, 24-entry taxonomy classifier, tiered hint and solution generator",
      "execution/service.py — Docker SDK sandbox runner (network disabled, read-only FS, 64MB RAM, 0.5 CPU, seccomp)",
      "React 18 + Monaco Editor frontend with Recharts progress dashboard",
      "Redis 7 — JWT revocation blacklist, OAuth state tokens, one-time auth codes",
      "GitHub Actions CI/CD — separate deploy workflows for backend and frontend",
    ],
  },
  {
    slug: "smart-exam-seating",
    title: "Smart Exam Seating",
    description:
      "University exam seating optimizer using Graph Coloring and Greedy algorithms to eliminate cheating risk — processes 1000+ students in seconds with color-coded risk reports.",
    longDescription:
      "A full-stack system built for Software Engineering departments that automates exam hall seating using DSA. Students are modeled as graph nodes and same-subject relationships as edges. A greedy graph-coloring algorithm ensures no two students sharing a subject sit adjacent to each other. The system generates color-coded risk reports (SAFE/MEDIUM/HIGH per seat), exports PDF seating charts with university branding, and supports CSV bulk upload with strict roll-number validation in the format YYYY[F/S]-BSE-XXX. Sections are auto-assigned from roll number ranges (A: 001-050, B: 051-100, etc). Multi-hall distribution uses a Priority Queue ordered by available capacity.",
    category: "featured",
    type: "backend",
    techStack: ["Java 17", "Spring Boot 3.2", "React 19", "Vite", "Tailwind CSS", "Apache POI", "iText7", "Maven", "Lombok"],
    githubUrl: "https://github.com/Sufyan243/Smart-Examination-Anti-Cheating-Seating-Optimization-System",
    isPrivate: false,
    screenshot: "/screenshots/Smartexaminationandcheatingoptimiztion.png",
    challenges: [
      "Implementing Graph Coloring with O(n×m) greedy strategy ensuring no same-subject adjacency across a 2D seat grid",
      "4-directional neighbor conflict detection with risk scoring (0 conflicts = SAFE, 1 = MEDIUM, 2+ = HIGH)",
      "Multi-hall student distribution using a Priority Queue ordered by available capacity",
      "CSV validation enforcing YYYY[F/S]-BSE-XXX roll number format, duplicate detection, and max 1000 rows",
      "Color-coded PDF seating chart export with section headers, batch info, and university branding using iText7",
    ],
    architecture: [
      "React 19 + Vite frontend proxied to Spring Boot 3.2 REST API on port 8080",
      "SeatAllocationService — greedy graph-coloring with 4-neighbor conflict checks and queue-based student assignment",
      "RiskDetectionService — per-seat conflict counting mapped to SAFE/MEDIUM/HIGH risk levels",
      "HallManagementService — Priority Queue multi-hall distribution with overflow handling",
      "CSVService — Apache POI parsing with university roll-number format validation",
      "PDFExportService — iText7 color-coded seating chart with section grouping and statistics",
    ],
  },
  {
    slug: "neuromap",
    title: "Neuromap",
    description:
      "JavaFX desktop mind-mapping app with AI-powered idea expansion via Hugging Face, real-time facial emotion detection using OpenCV and FER+ ONNX, and collaborative map sharing.",
    longDescription:
      "Neuromap is a visual thinking tool built on JavaFX 21. Users create idea nodes on an infinite canvas, connect them, and drill into sub-maps for deeper thinking. AI Expansion right-clicks any node and calls the Hugging Face Inference API to generate 5 related concepts, automatically placed and connected around the parent. Emotion Detection uses a webcam continuously analysed via OpenCV and a FER+ ONNX model — when Emotion Colors mode is on, node colors shift in real time to reflect detected mood (joy → gold, anger → red, fear → slate-blue). Maps are saved as JSON and shared with other registered users with view or edit permissions via SQLite.",
    category: "featured",
    type: "ai",
    techStack: ["Java 21", "JavaFX 21", "OpenCV 4.11", "FER+ ONNX", "Hugging Face API", "SQLite", "Gson", "Apache Ant"],
    githubUrl: "https://github.com/Sufyan243/Neuromap",
    isPrivate: false,
    screenshot: "/screenshots/nuero-map.png",
    challenges: [
      "Integrating OpenCV DNN with a FER+ ONNX model for real-time webcam emotion classification into 6 emotion categories",
      "Implementing Memento pattern for deep-copy undo/redo stacks — CanvasState deep-copies node and connection lists before every mutation",
      "Wiring Observer/Listener callbacks so connections stay live during node drag and sub-map navigation",
      "Serializing infinite-canvas state (nodes + connections) to JSON for save/load and cross-user sharing",
      "Isolating AI and webcam I/O in stateless service classes to keep the JavaFX UI thread responsive",
    ],
    architecture: [
      "JavaFX MVC — FXML controllers (Login, Dashboard, ShareDialog) over model layer (IdeaNode, Connection, CanvasState)",
      "NeuromapCanvas — programmatic JavaFX canvas with zoom, pan, drag, context-menu, and sub-map navigation",
      "AIService — Hugging Face text-generation endpoint generating 5 related concepts per node",
      "WebcamFeedService + EmotionAnalyzer — OpenCV Haar Cascade face detection → FER+ ONNX inference → color mapping",
      "DatabaseManager — SQLite with 4 tables: users, nodes, maps, shared_maps (view/edit permissions)",
      "CanvasState Singleton — Memento-based undo/redo with deep-copy snapshots before every mutation",
    ],
  },
  {
    slug: "expense-voyage",
    title: "Expense Voyage",
    description:
      "Full-stack personal finance platform with category-based expense tracking, budget management, Chart.js analytics, and live deployment.",
    longDescription:
      "A comprehensive expense management system built with PHP MVC and MySQL. Users track expenses by category, set monthly budgets, and visualize spending patterns through interactive Chart.js dashboards. Features include recurring expense management, AJAX-powered real-time chart updates without page reloads, session-based authentication with CSRF protection, and a live deployment on shared hosting.",
    category: "featured",
    type: "backend",
    techStack: ["PHP", "MySQL", "JavaScript", "Chart.js", "Bootstrap", "AJAX"],
    githubUrl: "https://github.com/Sufyan243/Expense-Voyage",
    isPrivate: false,
    liveUrl: "https://expensevoyage.webhostmost.com",
    screenshot: "/screenshots/expense-voyage-placeholder.svg",
    challenges: [
      "Designing a normalized MySQL schema for expenses, budgets, categories, and recurring rules",
      "Building real-time Chart.js updates via AJAX without full page reloads",
      "Implementing CSRF token validation on all mutation endpoints",
      "Deploying a PHP MVC app on shared hosting with proper .htaccess front-controller routing",
    ],
    architecture: [
      "Custom PHP MVC framework with front-controller routing via .htaccess",
      "MySQL normalized schema — expenses, budgets, categories, recurring_rules tables",
      "RESTful AJAX endpoints returning JSON for chart and list updates",
      "Chart.js integration for bar, pie, and line spending visualizations",
      "Session-based auth with CSRF token middleware on all POST routes",
    ],
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot",
    description:
      "Context-aware conversational AI with multi-turn dialogue, custom knowledge base retrieval, and streaming responses.",
    longDescription:
      "A conversational AI system with multi-turn context awareness. The bot maintains conversation history across turns, performs semantic search over a custom knowledge base, and streams responses to the frontend. README and full details will be added soon.",
    category: "featured",
    type: "ai",
    techStack: ["Python", "OpenAI API", "LangChain", "FastAPI", "FAISS", "React", "Redis"],
    githubUrl: "https://github.com/Sufyan243/AI-Chatbot",
    isPrivate: true,
    screenshot: "/screenshots/chatbot.png",
    challenges: [
      "Managing multi-turn conversation context without exceeding token limits",
      "Implementing semantic search for knowledge base retrieval",
      "Streaming responses token-by-token to the frontend",
      "Handling API rate limits with fallback strategies",
    ],
    architecture: [
      "FastAPI backend with WebSocket support for real-time streaming",
      "LangChain for prompt engineering and chain management",
      "Vector store for semantic search over knowledge base",
      "React frontend with streaming response rendering",
      "Redis for session management and conversation history",
    ],
  },
  {
    slug: "document-assistant",
    title: "AI Docs Assistant",
    description:
      "Auto-generates always-up-to-date documentation from any codebase — supports JS, Python, Java, Go, TypeScript with CI/CD integration and 85%+ test coverage.",
    longDescription:
      "AI Docs Assistant automatically analyzes source code across multiple languages and generates comprehensive documentation that stays synchronized with the codebase. It extracts function signatures, parameters, return types, complexity metrics, and dependency maps, then exports to Markdown, HTML, or JSON. A GitHub Actions integration keeps docs in sync on every push to main. The tool runs fully locally with no API keys required and maintains 85%+ test coverage across unit, integration, and E2E suites.",
    category: "featured",
    type: "backend",
    techStack: ["Node.js", "JavaScript", "GitHub Actions", "Jest", "ESLint", "Markdown"],
    githubUrl: "https://github.com/Sufyan243/Document_Assistant",
    isPrivate: false,
    screenshot: "/screenshots/document-assistant-placeholder.svg",
    challenges: [
      "Building a language-agnostic parser handling JS, Python, Java, Go, and TypeScript",
      "Extracting complexity metrics and dependency graphs without executing the code",
      "Keeping generated docs synchronized with code changes via GitHub Actions CI/CD",
      "Achieving 85%+ test coverage across unit, integration, and E2E test suites",
    ],
    architecture: [
      "parser.js — file parsing and multi-language detection",
      "analyzer.js — complexity analysis, dependency mapping, TODO/FIXME extraction",
      "generator.js — Markdown / HTML / JSON output with per-file or single-file modes",
      "languageAgnosticEngine.js — unified AST-like parsing across supported languages",
      "GitHub Actions workflow — auto-generates and uploads docs artifact on every push to main",
    ],
  },
  {
    slug: "premium-saas-template",
    title: "Premium SaaS Template",
    description:
      "Conversion-optimized SaaS landing page template with animated scroll effects, dark mode, mobile sticky CTA, exit-intent modals, and client logo sections.",
    longDescription:
      "A conversion-optimized, clean, and modern SaaS landing page template designed with UX hacks and business-ready features to help startups and indie hackers launch faster. Ships with a live chat button, real product screenshot sections, money-back guarantee badge, client logo section, animated scroll effects, sticky mobile CTA, use-case based scroll sections, and exit-intent modal. Fully responsive across mobile, tablet, and desktop with dark mode toggle. Built with Vite and Tailwind CSS — no heavy frameworks. Licensed as a premium template, not open-source.",
    category: "secondary",
    type: "frontend",
    techStack: ["Vite", "Tailwind CSS", "JavaScript", "PostCSS"],
    githubUrl: "https://github.com/Sufyan243/Premium-SaaSTemplate",
    isPrivate: false,
    liveUrl: "https://premium-saa-s-temaplate.vercel.app",
    screenshot: "/screenshots/Saastemplate.png",
    challenges: [
      "Designing conversion-optimized sections (pricing, social proof, use-cases) that serve multiple audience types",
      "Implementing animated scroll effects that are smooth without impacting Lighthouse performance scores",
      "Building a sticky mobile CTA that boosts conversions without obstructing content",
      "Creating an exit-intent modal system that triggers on user behavior patterns",
    ],
    architecture: [
      "Vite build tool with PostCSS and Tailwind CSS for fast development and optimized production builds",
      "Component-based structure under src/components/ for easy customization",
      "Vanilla JavaScript ES Modules — no framework overhead",
      "Dark mode toggle with localStorage persistence",
      "Fully responsive layout with mobile-first Tailwind utilities",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
