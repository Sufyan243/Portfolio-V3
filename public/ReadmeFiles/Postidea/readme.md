# PostIdea

**Catches architectural conflicts before you write code**

PostIdea is an AI-powered specification and architecture validation platform that transforms raw product ideas into production-ready technical specifications—while catching contradictions, overengineering, and scaling traps before line 1.

[![License](https://img.shields.io/badge/license-Proprietary-red)]()
[![Python](https://img.shields.io/badge/python-3.11-blue)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green)]()
[![React](https://img.shields.io/badge/React-18.3-blue)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)]()

## The Problem

When you tell an AI coding tool "build me an offline-first realtime app" — those requirements **contradict each other**. Realtime needs persistent connections; offline needs local-first sync. Without conflict resolution infrastructure, you get a broken implementation.

When you choose microservices for 500 users, you're adding 3-6 months of operational overhead with zero benefit.

When you build custom auth on a solo team, you're setting up a breach in month 3.

**PostIdea catches these conflicts before you write code.**

## How It Works

PostIdea runs your product idea through a structured 5-stage pipeline:

### Stage 1: Idea Discovery (Socratic Dialogue)
AI asks targeted questions to extract product constraints:
- Target users and scale expectations
- Realtime requirements (WebSockets, live updates, push notifications)
- Offline needs (service workers, local-first sync)
- Data relationships (simple CRUD vs. complex joins)
- Technical constraints and integrations

**10 turns maximum, 5 turns minimum** — more detail = better spec.

### Stage 1.5: Council Review (4-Agent AI Pipeline)
Automatic review catches issues before spec generation:

1. **Planner** — Extracts project goal, phases, risk areas, required decisions
2. **Architect** — Proposes technical stack with tradeoffs and open questions
3. **Skeptic** — Flags weak assumptions, contradictions, overengineering, missing edge cases
4. **Synthesizer** — Combines outputs into a `spec_seed` for spec generation

**If Skeptic rates severity as HIGH**, you must answer blocking questions before proceeding.

Example blocking issues:
- "Realtime + offline simultaneously — these conflict without sync infrastructure"
- "Microservices for 500 users — 3-6 months of operational overhead with no benefit"
- "Custom auth system on a solo team — high breach risk"

### Stage 2: Specification Generation
AI generates structured FR/NFR document:
- **Functional Requirements**: Minimum 6, maximum 50 (each with acceptance criteria + testable signals)
- **Non-Functional Requirements**: Minimum 4, maximum 20 (each with measurable thresholds)

**Validation rules**:
- Acceptance criteria must follow Given/When/Then pattern
- Testable signals must be specific identifiers (not generic words like "login", "auth")
- Measurable thresholds must contain quantifiable metrics (numbers with units, percentiles)

### Stage 3: Architecture Design (Rules Engine)
ADE generates architecture decisions from constraints:

| Decision | Logic |
|----------|-------|
| `database` | MongoDB if schema_flexible + !relationships_complex; PostgreSQL otherwise |
| `service_structure` | Multi-factor scoring: expected_users ≥50k, team_size ≥8, independent_scaling_needed, domain_boundaries_clear, deployment_velocity=independent, regulatory_isolation_required. Score ≥3 → microservices; score=2 → modular_monolith; else monolith. Regulatory isolation (fintech/payments) can override at any scale. |
| `realtime_layer` | WebSockets if realtime=true; none otherwise |
| `offline_support` | service_worker+indexeddb if offline_mode=true; false otherwise |
| `cache_layer` | Redis if realtime=true OR expected_users ≥10k; none otherwise |
| `auth_strategy` | JWT stateless (default) |
| `file_storage` | S3 if file uploads detected; none otherwise |
| `background_jobs` | Redis queue if expected_users ≥5k; Postgres queue if background jobs detected; none otherwise |
| `infrastructure` | Kubernetes if microservices + expected_users ≥100k; horizontal LB if expected_users ≥50k; single VPS otherwise |

**User overrides allowed** — conflict check runs after each override.

Architecture must be **locked** before proceeding to handoff.

### Stage 4: Handoff Package
Downloadable Markdown package containing:
- All FRs with acceptance criteria and testable signals
- All NFRs with measurable thresholds
- Architecture decisions with rationale
- Mermaid diagram
- Implementation prompt for AI coding tools

### Stage 5: Implementation Verification (3-Layer)

| Layer | Type | What It Checks | Gates Pass? |
|-------|------|----------------|-------------|
| **Layer 1** | Deterministic | All expected paths from architecture present in file tree | ✅ Yes |
| **Layer 2** | Deterministic (CPU) | Each FR's testable signals appear in source code (comments/strings stripped) | ✅ Yes |
| **Layer 3** | LLM Advisory | Semantic audit of diff vs spec — returns implemented/missing/warnings | ❌ No (metadata only) |

**passed=True requires Layer 1 AND Layer 2 to pass.** Layer 3 never affects verdict.

**Prompt injection protection**: Diff wrapped in delimiters, system prompt forbids embedded instructions, response validated against strict schema, injection patterns detected and Layer 3 skipped if found.

## Additional Features

### Risk Scoring (Standalone Tool)

A free, no-signup architecture risk analyzer that catches dangerous patterns before you commit to them. Paste your project description or tech stack and get an instant risk assessment.

**What It Analyzes:**

1. **Overengineering (30% weight)**
   - Microservices chosen for <10k users (adds 3-6 months overhead with no benefit)
   - Kubernetes on solo/2-person teams (operational overhead consumes velocity)
   - Redis caching with no stated caching requirement
   - Multiple databases without clear separation of concern

2. **Contradictions (25% weight)**
   - Realtime + offline-first simultaneously (conflicting sync strategies)
   - Multiple databases without justification
   - Microservices with shared/single database (defeats service isolation)
   - OAuth complexity for internal tools
   - AI features with no data pipeline described
   - Aggressive timeline + high complexity (≤8 weeks with 5+ integrations or distributed arch)
   - Solo team + distributed architecture (microservices/k8s with ≤2 people)

3. **Scalability Traps (20% weight)**
   - Auth with no session invalidation strategy (compromised tokens live forever)
   - Schema flexibility + complex relationships (DB layer rewrite in month 2)
   - AI features with no data strategy (rate limits/costs not budgeted)
   - High integration surface (>5 external services = multiple failure points)

4. **Auth Risk (20% weight)**
   - Custom auth system on solo team (breach risk in month 3)
   - JWT-only without refresh strategy
   - OAuth complexity mismatched to use case
   - No auth mentioned for user-facing app

5. **Vendor Lock-in (5% weight)**
   - High lock-in vendors: Firebase, Supabase, PlanetScale, Vercel, Heroku

**Scoring Logic:**
- Overall score: 0-100 (weighted average of 5 dimensions)
- Danger multiplier: +15 points if 3+ dimensions score ≥50
- Critical floor: If any dimension ≥75, overall cannot be <45

**Output:**
- Overall score (0-100)
- Severity label: CLEAN / LOW RISK / MODERATE / HIGH RISK / DANGEROUS
- Dimension breakdown (5 scores)
- Critical findings (specific issues detected)
- Pre-mortem warnings ("this will break when...")
- Shareable token (7-day expiry)

**Low Information Detection:**
If input contains <2 technical signals (database, architecture, auth, scale, deployment, or named technology), the tool returns a "too vague to score" result instead of guessing.

**API Endpoints:**
- `POST /api/v1/risk/score` — Submit text, get risk analysis (5 req/min)
- `GET /api/v1/risk/score/{token}` — Retrieve saved result (60 req/min)

**Use Cases:**
- Sanity-check your architecture before building
- Review client proposals for red flags
- Validate AI-generated architecture suggestions
- Pre-mortem analysis before committing to a stack

### Project Sharing
- Shareable read-only links with per-token rate limiting
- Share spec, architecture, and verification results
- Revocable tokens

### OAuth Authentication
- Google and GitHub OAuth support
- Email-based account merging (same email across providers = single account)
- HttpOnly JWT cookies + CSRF double-submit protection

### Demo Mode
Offline mode serving fabricated responses from `demo_cache.json` for demos.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | FastAPI 0.111 + Gunicorn (4 workers) | Async API server with worker-level concurrency |
| **Database** | PostgreSQL 15 | JSONB for specs/arch, normalized tables for messages |
| **Cache/Session** | Redis 7 (AOF persistence) | Auth revocation, rate limiting, session storage |
| **Frontend** | React 18.3 + Vite | SPA with Axios CSRF interceptor |
| **AI** | Groq (llama-3.3-70b-versatile) | LLM inference for all AI stages |
| **Reverse Proxy** | Nginx (Alpine) | TLS termination, rate limiting, security headers |
| **Observability** | Prometheus + JSON logs | `/metrics` endpoint (internal only) |
| **Migrations** | Alembic | 19 migrations, head verified at startup |
| **Testing** | pytest + Playwright | Backend unit/integration, frontend E2E |

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Python 3.11+ (for secret generation)
- TLS certificates (mkcert recommended for local dev)

### Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd PostIdea

# 2. Copy and configure environment
cp .env.example .env

# 3. Generate secrets (run twice for JWT_SECRET and CSRF_SECRET)
python -c "import secrets; print(secrets.token_hex(32))"

# 4. Edit .env and fill in:
#    - GROQ_API_KEY (from https://console.groq.com/keys)
#    - JWT_SECRET (generated above)
#    - CSRF_SECRET (generated above, must differ from JWT_SECRET)
#    - POSTGRES_PASSWORD
#    - REDIS_PASSWORD
#    - DATABASE_URL (update with POSTGRES_PASSWORD)
#    - REDIS_URL (update with REDIS_PASSWORD)

# 5. Generate TLS certificates for local development
mkdir -p nginx/certs

# Option A: mkcert (recommended - no browser warnings)
mkcert -install
mkcert -cert-file nginx/certs/fullchain.pem \
       -key-file nginx/certs/privkey.pem \
       localhost 127.0.0.1

# Option B: self-signed (browsers will warn)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/privkey.pem \
  -out nginx/certs/fullchain.pem \
  -subj "/CN=localhost"

# 6. Start all services
docker compose up --build
```

Application available at `https://localhost`

### Production Deployment

Replace self-signed certificates with Let's Encrypt or CA-issued certificates:

```bash
# Using certbot (Let's Encrypt)
certbot certonly --standalone -d yourdomain.com
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/certs/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/certs/
```

Update `.env` for production:
- Set `CORS_ORIGINS` to your production domain (never use `*`)
- Set `DEMO_MODE=false`
- Set `COOKIE_SECURE=true`
- Configure OAuth redirect URIs in Google/GitHub consoles

## Project Structure

```
PostIdea/
├── backend/                    # FastAPI application
│   ├── alembic/               # Database migrations (19 files)
│   ├── app/
│   │   ├── api/v1/            # API versioned endpoints
│   │   ├── core/              # Core utilities (auth, cache, config, metrics, rate limiting, security)
│   │   ├── db/                # Database layer (models, session, audit logging)
│   │   ├── models/            # Pydantic schemas (council, project, risk, spec)
│   │   ├── routers/           # API route handlers (10 routers)
│   │   ├── services/          # Business logic (11 services)
│   │   └── main.py            # FastAPI app + lifespan
│   ├── tests/                 # pytest test suites (10 test files)
│   ├── Dockerfile             # Production image
│   ├── Dockerfile.demo        # Demo mode image
│   └── requirements.txt       # Python dependencies
├── frontend/                  # React SPA
│   ├── public/                # Static assets (landing pages, blog, demos)
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Route pages (9 pages)
│   │   ├── services/api.js    # Axios API client
│   │   ├── App.jsx            # Root component + routing
│   │   └── main.jsx           # React entry point
│   ├── tests/e2e/             # Playwright E2E tests (11 test files)
│   ├── Dockerfile             # Nginx-based frontend image
│   └── package.json           # npm dependencies
├── nginx/
│   ├── certs/                 # TLS certificates (gitignored)
│   └── nginx.conf             # Reverse proxy config
├── docker-compose.yml         # Multi-service orchestration
├── .env.example               # Environment template
└── README.md                  # This file
```

## Configuration

All environment variables are validated at startup. The process crashes immediately if any required value is missing or compromised.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq API key (required unless `DEMO_MODE=true`) | `gsk_...` |
| `JWT_SECRET` | 32-byte hex string for JWT signing | Generate with `python -c "import secrets; print(secrets.token_hex(32))"` |
| `CSRF_SECRET` | 32-byte hex string for CSRF tokens (must differ from JWT_SECRET) | Generate with `python -c "import secrets; print(secrets.token_hex(32))"` |
| `POSTGRES_USER` | PostgreSQL username | `postidea` |
| `POSTGRES_PASSWORD` | PostgreSQL password | (strong password) |
| `POSTGRES_DB` | PostgreSQL database name | `postidea` |
| `DATABASE_URL` | Full asyncpg connection string | `postgresql+asyncpg://postidea:<password>@postgres:5432/postidea` |
| `REDIS_PASSWORD` | Redis auth password | (strong password) |
| `REDIS_URL` | Full Redis connection string | `redis://:<password>@redis:6379/0` |
| `CORS_ORIGINS` | Comma-separated allowed origins (never `*` in production) | `https://localhost` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_EXPIRE_MINUTES` | 60 | Access token lifetime |
| `JWT_REFRESH_WINDOW_MINUTES` | 15 | Token refresh window before expiry |
| `DEMO_MODE` | false | Serve fabricated offline responses |
| `COOKIE_SECURE` | true | Set false only for local HTTP dev |
| `LOG_LEVEL` | INFO | DEBUG / INFO / WARNING / ERROR |
| `AUTH_REVOCATION_FAIL_OPEN` | false | Emergency escape hatch during Redis outage |
| `GITHUB_TOKEN` | (none) | GitHub PAT for verify GitHub loader (increases rate limit) |
| `GOOGLE_CLIENT_ID` | (none) | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | (none) | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | (none) | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | (none) | GitHub OAuth client secret |
| `APP_BASE_URL` | https://localhost | Base URL for OAuth redirects |
| `ADMIN_SECRET` | (none) | Admin panel secret |
| `REDIS_KEY_PREFIX` | sw | Redis key namespace prefix |
| `SPEC_VERSION_RETENTION` | 10 | Max spec versions per project (0 = unlimited) |

## Authentication

PostIdea uses per-user JWT authentication with HttpOnly cookies and CSRF double-submit protection.

### Flow
1. **Login** issues two cookies:
   - `access_token` (HttpOnly, JS-unreadable) — contains JWT
   - `csrf_token` (readable) — sent as `X-CSRF-Token` header on mutating requests

2. **Token lifetime**: `JWT_EXPIRE_MINUTES` (default 60 min) with absolute 8-hour session ceiling

3. **Token refresh**: Axios interceptor automatically calls `POST /auth/refresh` on 401. Refresh only allowed within `JWT_REFRESH_WINDOW_MINUTES` of expiry.

4. **Logout revocation**: Stores token's `jti` claim in Redis with TTL. Revoked tokens rejected on all subsequent requests.

5. **Revocation is fail-closed** by default — if Redis unavailable, authenticated requests return 503. Set `AUTH_REVOCATION_FAIL_OPEN=true` only during confirmed Redis outage.

6. **Brute-force protection**: 5 failed login attempts per email within 5 minutes triggers 15-minute lockout (atomic via Redis Lua script)

7. **Password constraints**: 8–72 characters (bcrypt limit), stored as bcrypt hash

### OAuth Support
- **Google OAuth**: Email-verified accounts only
- **GitHub OAuth**: Primary verified email preferred, falls back to public email
- **Account merging**: Same email across providers links to single account

## Rate Limiting

### Nginx Layer (per-IP)
- `/auth/` — **20 req/min, burst 10**
- `/api/v1/verify/` — 5 req/s, burst 10
- `/api/` — 20 req/s, burst 40
- `/admin/` — 30 req/min, burst 10

### Application Layer (Redis-backed, cross-replica)
- Most API endpoints: 10–60 req/min depending on cost
- Auth refresh: 20 req/min per-IP + 5 req/min per-user

## Testing

### Backend Tests

```bash
cd backend

# Unit tests
pytest

# Integration tests (requires Postgres + Redis)
TEST_DATABASE_URL=postgresql+asyncpg://user:<password>@localhost:5432/test \
TEST_REDIS_URL=redis://:<password>@localhost:6379/1 \
pytest tests/test_integration.py

# Specific test suite
pytest tests/test_risk_engine.py -v
```

### Frontend E2E Tests

```bash
cd frontend

# Install dependencies
npm install

# Run Playwright tests (local development)
npx playwright test

# Run with UI
npx playwright test --ui

# Production smoke test (validates HTTPS/origin security)
npm run test:e2e:production

# Run specific test file
npx playwright test tests/e2e/projects/sharing.spec.js
```

**Production Smoke Testing:**

The E2E suite includes production-specific smoke tests that validate security controls against the live `postidea.app` origin. These tests run **unauthenticated** (guest mode) and focus on infrastructure security, not owner-only features.

**What Production Smoke Tests Validate:**
- All share API endpoints use HTTPS, never HTTP
- Frontend transport guard blocks insecure requests
- Nginx serves correct security headers (HSTS, CSP, X-Frame-Options, etc.)
- HTTP requests redirect to HTTPS
- CSP blocks inline scripts

**Running Production Smoke Tests:**

```bash
# Using npm script (recommended)
npm run test:e2e:production

# Or directly with playwright
PLAYWRIGHT_BASE_URL=https://postidea.app npx playwright test tests/e2e/production-smoke.spec.js --config=playwright.config.production.js
```

**Important**: Production smoke tests do NOT require `ENABLE_TEST_AUTH=true` because they run unauthenticated. They validate infrastructure security, not owner-only features like sharing.

**Test Authentication:**

Standard E2E tests (non-production smoke) require authenticated sessions to test owner-only features. The test suite uses a test-only backend endpoint (`/auth/test-login`) that must be enabled via `ENABLE_TEST_AUTH=true` environment variable.

**IMPORTANT**: `ENABLE_TEST_AUTH` must be `false` in production. Only enable it in test/staging environments.

If tests fail with authentication errors, ensure:
1. Backend has `ENABLE_TEST_AUTH=true` set (for non-production tests only)
2. Backend is running and accessible
3. Test auth endpoint returns 200 OK

## Security

- Nginx enforces HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and strict CSP
- 10MB request body limit at application layer
- Redis uses authentication and AOF persistence
- Docker network isolation for Postgres and Redis
- Known-compromised secrets rejected at startup
- Prompt injection protection in verification layer

## Observability

### Prometheus Metrics (`/metrics`, internal only)
- `specweaver_groq_errors_total` — Groq API errors by stage and error type
- `specweaver_groq_latency_seconds` — Groq API latency by stage
- `specweaver_council_outcomes_total` — Council pipeline outcomes
- `specweaver_redis_errors_total` — Redis operation errors
- `specweaver_auth_events_total` — Auth events (login, logout, refresh, etc.)
- `specweaver_verify_outcomes_total` — Verification outcomes

### Structured Logging
All requests logged as JSON with `X-Request-Id` correlation header.

## License

Proprietary. All rights reserved.

## VS Code Extension (Coming Soon)

PostIdea V2 includes a VS Code extension that verifies AI agent implementations against your task list in real-time.

### How It Works

**Phase 1: Optional Project Connection**
- PostIdea users can connect their project to import architecture decisions
- Non-PostIdea users can start directly with a task list
- Connection is a configuration option, not a requirement

**Phase 2: Task-Based Verification**

At session start:
1. Enter your task list in plain English (e.g., "Add user authentication", "Implement file upload")
2. Extension converts tasks into checkable items
3. As AI agents modify files, extension verifies task completion
4. Surfaces missed requirements with one-click prompts for the agent

**Phase 3: Session Reports**

At session end, get a report showing:
- ✅ Tasks completed
- ⚠️ Tasks partially implemented
- ❌ Tasks missed
- 🔴 Architecture violations (if PostIdea project connected)

**Phase 4: Inline Warnings**

Real-time feedback as you code:
- Task completion indicators in file tree
- Inline warnings for missed requirements
- Quick actions to prompt AI agents with missing context

### Target Users

Developers using agentic coding tools (Cursor, Windsurf, GitHub Copilot Workspace, etc.) who want to:
- Verify AI agents actually completed requested tasks
- Catch missed requirements before code review
- Track implementation progress across sessions
- Ensure architectural consistency (PostIdea users)

### Beta Program

Interested in early access? Email hello@postidea.app with:
- Your primary agentic coding tool
- Typical project size (files/LOC)
- Pain points with current AI coding workflows

## Support

- GitHub Issues: (repository URL)
- Email: hello@postidea.app
- Blog: https://postidea.app/blog/ai-coding-tools-architecture-mistakes.html
