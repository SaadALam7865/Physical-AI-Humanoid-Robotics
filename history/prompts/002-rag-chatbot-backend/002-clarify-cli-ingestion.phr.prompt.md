---
id: 002
title: RAG Chatbot Backend Clarification - CLI Ingestion
stage: clarify
date: 2025-11-30
surface: slash-command
model: sonnet-4.5
feature: 002-rag-chatbot-backend
branch: 002-rag-chatbot-backend
user: uneezaismail
command: /sp.clarify
labels: [rag, cli-script, architecture-decision]
links:
  spec: specs/002-rag-chatbot-backend/spec.md
  previous-phr: history/prompts/002-rag-chatbot-backend/001-spec-rag-chatbot-backend.phr.prompt.md
  ticket: N/A
  adr: N/A
  pr: N/A
files:
  - path: specs/002-rag-chatbot-backend/spec.md
    status: updated
    lines: 296
tests: []
---

## Prompt

```
/sp.clarify
```

## Context Provided by User

User shared existing `.env` file showing:
```
GEMINI_API_KEY="AIzaSyAPSt31-tKCt_J5hQfow9DPPqrTPZXDmpE"
QDRANT_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.XaqhANqHpGwVD_2-erwq6Ikzb-QRijM8HuzhjoFmymE"
QDRANT_URL="https://bf825e1c-d897-4441-806a-25365679a834.eu-west-1-0.aws.cloud.qdrant.io"
```

User clarified: **"Script-only, no API or API endpoints"**

## Response Snapshot

**Ambiguity Identified**: FR-016 specified `POST /api/ingest` endpoint as "admin-only" but no authentication mechanism was defined, creating implementation ambiguity.

**Question Asked**:
"How should the `/api/ingest` endpoint be protected in V1?"
- Option A (Recommended): Static API key in environment variable
- Option B: No authentication (network-level protection)
- Option C: IP whitelist

**User's Decision**: Ingestion should be a **standalone CLI script**, NOT an API endpoint.

### Specification Updates Applied:

1. **Added Clarifications Section**:
```markdown
## Clarifications

### Session 2025-11-29

- Q: How should the `/api/ingest` endpoint be protected in V1? → A: Script-only, no API or API endpoints (ingestion runs as standalone CLI script)
```

2. **Updated FR-016** (Content Ingestion):
   - **Before**: `POST /api/ingest` endpoint returning JSON status
   - **After**: Standalone CLI script (`python -m app.ingest`) with exit codes and stdout logging

3. **Added API Endpoints Note**: Clarified that only query endpoint exists; ingestion is CLI-only

4. **Updated FR-018** (Testing): Added `test_ingest_cli.py` for CLI script validation

5. **Updated User Story 2 Acceptance Scenarios**: All scenarios now reference CLI script execution with proper output expectations

6. **Updated Success Criteria**:
   - SC-003: Mentions "CLI ingestion script" explicitly
   - SC-007: Clarified ingestion triggered via CLI script

7. **Updated Assumption #6**: Changed from "Admin endpoints can use simple API key auth" to "Content ingestion is triggered via CLI script (no API endpoint exposure)"

8. **Updated Out of Scope**: Changed from "triggered manually via `/api/ingest` endpoint" to "triggered manually via CLI script"

### Architectural Impact:

This clarification represents a **significant architectural decision** with multiple implications:

**Security Benefits**:
- No need for admin authentication mechanism
- No API endpoint exposure for ingestion
- Simpler security model (script runs with server-side permissions)

**Operational Benefits**:
- Direct access to filesystem without HTTP layer
- Better progress logging to stdout
- Standard exit codes for automation/CI integration
- Can be run as cron job or triggered by GitHub Actions

**Trade-offs**:
- Cannot trigger ingestion remotely via API call
- Requires server access to execute script
- No programmatic status checking (rely on exit codes)

## Outcome

- ✅ Impact: Critical architectural clarification resolved - ingestion architecture now unambiguous (CLI script, not API endpoint)
- 📝 Changes: 8 sections updated across spec.md for consistency
- 🔒 Security: Simplified security model by removing admin API endpoint
- 🧪 Tests: Added CLI script testing requirement
- 🔁 Next prompts: `/sp.plan` to create implementation plan with CLI script architecture
- 🧠 Reflection: User's clarification avoided unnecessary complexity of API authentication while maintaining all functional requirements. CLI approach aligns better with operational simplicity and security best practices.

## Evaluation Notes (Flywheel)

- Failure modes observed: Initial spec had ambiguous "admin-only" endpoint without auth mechanism - clarification workflow caught this before implementation
- Graders run and results (PASS/FAIL): Manual validation PASS - all references to API ingestion endpoint updated consistently
- Prompt variant (if applicable): Standard `/sp.clarify` workflow with 1 question asked (out of max 5)
- Next experiment (smallest change to try): Proceed to `/sp.plan` to validate that CLI script architecture is properly reflected in implementation plan
