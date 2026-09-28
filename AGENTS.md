<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

Project Role

This repository is a learning rebuild of a modern ecommerce application.

The old Prostore tutorial is the feature roadmap only. The current repository architecture, installed packages, framework behavior, and existing code are the implementation source of truth.

Primary goal:

Understand → Inspect → Implement → Verify

Do not blindly copy tutorial-era code.

1. Current Stack

Next.js 16.3.x

React 19.2.x

TypeScript 5

App Router

Tailwind CSS v4

shadcn/ui with Base UI

React Hook Form

Zod 4

Prisma 7

PostgreSQL / Neon

@prisma/adapter-neon

Auth.js / NextAuth 5.0.0-beta.32

@auth/prisma-adapter

bcrypt-ts-edge

UploadThing

ESLint

npm

Node.js 22.x via fnm

2. Developer Environment

Current workflow:

CachyOS
Niri / Wayland
Zsh
tmux
Neovim

Neovim is the primary editor.

The shell uses:

EDITOR=nvim
VISUAL=nvim

Node versions are managed through fnm.

3. Local LLM Stack

Primary tools:

Ollama
Qwen
VectorCode
CodeCompanion
Aider
MiniCPM / vLLM

Primary model:

qwen2.5-agent

Inline model:

qwen2.5-inline

Embedding model:

nomic-embed-text:latest

MiniCPM:

openbmb/MiniCPM5-1B

Ollama:

http://127.0.0.1:11434

MiniCPM/vLLM:

http://127.0.0.1:8000/v1

4. AI Workflow

Use the local AI stack as an engineering assistant, not as an authority.

Preferred workflow:

Task
↓
Read AGENTS.md
↓
Inspect actual repository
↓
Exact search / VectorCode RAG
↓
Qwen Agent reasoning
↓
Smallest correct change
↓
TypeScript
↓
Lint
↓
Run
↓
Git diff

Never invent missing project information.

If the repository context is insufficient, say so or request the missing file.

5. CodeCompanion

Current CodeCompanion workflow:

<leader>cc → Chat
<leader>ci → Inline
<leader>ca → Action palette
<leader>cd → Explain current LSP error

Chat uses:

qwen2.5-agent

Inline uses:

qwen2.5-inline

Use Chat for:

architecture

debugging

multi-file reasoning

repository questions

tracing behavior

Use Inline for:

small edits

focused refactors

quick transformations

Do not use Inline for large architectural changes.

6. Aider

Primary command:

aider-local

Model:

ollama_chat/qwen2.5-agent

Aider automatically reads:

AGENTS.md
context.md

when present.

Repository-map settings are intentionally small for the local model:

AIDER_MAP_TOKENS=1024
AIDER_MAP_REFRESH=files
AIDER_MAP_MULTIPLIER_NO_FILES=1

Before large changes:

git status

After changes:

git diff

Aider must preserve existing architecture and make focused changes.

7. VectorCode RAG

VectorCode is the repository semantic search layer.

Embedding configuration:

OllamaEmbeddingFunction
nomic-embed-text:latest

Useful commands:

llm-rag-config
llm-rag-index .
llm-rag-status
llm-rag-query "your question"

The hybrid query combines:

ripgrep exact search +
VectorCode semantic search +
Qwen Agent analysis

RAG context is repository evidence.

Do not invent facts that are not present in the retrieved context.

When the user explicitly prefixes a request with:

RAG:

use the retrieved repository context as the source of truth for project-specific claims.

8. Project Context

Use:

ai-ctx

to inspect repository structure.

Use:

ai-ctx-copy

when clipboard context is useful.

Do not rely on memory when the actual file can be inspected.

9. Next.js Rules

This is a Next.js 16 App Router project.

Current request-boundary convention:

proxy.ts

not old tutorial-era:

middleware.ts

Do not recreate old middleware.ts patterns unless current project requirements explicitly demand them.

Use current Next.js async APIs.

When working with route/page params, verify the current Next.js 16 API before copying tutorial code.

Prefer official current Next.js documentation or the installed Next.js documentation.

10. Keep Next.js Documentation Close

This project can use:

npx @next/codemod@latest agents-md

to generate/update Next.js documentation guidance.

When framework behavior is uncertain, check the installed Next.js documentation before assuming an API.

Do not trust old tutorial code merely because it used to work.

11. Current Prisma Architecture

Prisma 7 is used.

Current structure:

prisma/
schema.prisma
migrations/

prisma.config.ts

lib/
prisma.ts
generated/prisma/

Use the existing Prisma client architecture.

Do not create a second Prisma client.

Do not casually replace the Neon adapter.

Do not change migrations just to match the tutorial.

Before a schema change:

inspect schema
→ verify field does not already exist
→ modify schema if truly required
→ migrate
→ prisma generate

12. Prisma Data Rules

Use the actual generated Prisma field names.

Do not assume tutorial-era names.

Money/Decimal values must be converted using the project's existing conversion pattern before sending data to client code.

Do not pass non-serializable Prisma values into Client Components.

13. Current Authentication Architecture

Authentication uses:

auth.config.ts
auth.ts
proxy.ts

plus:

app/api/auth/[...nextauth]/route.ts

Auth.js:

Credentials
PrismaAdapter
JWT sessions
bcrypt-ts-edge

Existing authentication is working.

Do not rebuild it unless the lesson requires it.

Do not introduce old NextAuth v4 patterns such as getServerSession() unless existing project code specifically requires them.

Use:

import { auth } from "@/auth";

where appropriate.

14. Auth Split

auth.config.ts is the shared lightweight configuration.

auth.ts contains:

Prisma
PrismaAdapter
Credentials
bcrypt
JWT
session callbacks

Do not move heavy database/password logic into lightweight request configuration without a concrete reason.

Do not create duplicate Auth.js initialization.

15. Current Session / Cart Architecture

The project uses:

sessionCartId

for guest/session cart tracking.

Cart data can be associated with:

userId

or:

sessionCartId

Current cart logic lives in:

lib/actions/cart.actions.ts

Preserve this architecture.

Do not replace the database cart with a new localStorage cart system.

16. Current Validators

The project uses:

lib/validators.ts

Do not create:

lib/validator.ts

as a duplicate.

Reuse existing Zod schemas.

17. Current UI Architecture

The project uses current shadcn/ui with Base UI.

Do not blindly copy Radix-era tutorial code.

Avoid old:

asChild

patterns when the current component API uses render.

When a navigation element needs button styling, prefer the project's current pattern such as:

<Link className={buttonVariants()}>

Do not force buttons to render links if native button semantics cause warnings.

Inspect the actual component implementation first.

18. Forms

Current forms use:

React Hook Form
Zod
current shadcn/Base UI Field components

Prefer the project's existing Field-based components.

Do not recreate obsolete form primitives just because the tutorial uses them.

19. Server Components

Default to Server Components.

Use:

"use client";

only when needed for:

state

effects

browser APIs

client hooks

interactive behavior

Do not convert entire pages to Client Components unnecessarily.

Prefer:

Server Component
↓
small Client Component

20. Server Actions

Server actions live under:

lib/actions/

Validate input with Zod before database operations.

Preserve existing action patterns.

Do not import private Next.js internals to handle errors.

Do not silently convert unexpected errors into fake validation errors.

21. API Routes

Use Route Handlers when an actual HTTP endpoint is required.

Use Server Actions for internal mutations when that matches the current architecture.

Do not create API endpoints simply because an old tutorial used them.

22. Email

Current email stack:

Resend
react-email

Do not reintroduce removed email packages.

Preserve the existing purchase-receipt/email architecture.

23. Payments

Current project payment method:

Cash on Delivery

Do not reintroduce PayPal, Stripe, or old paymentResult fields unless the current project explicitly requires them.

24. Dependency Rules

Before installing anything:

inspect package.json

check whether it already exists

prefer existing project dependencies

verify current API compatibility

install only what the feature requires

Do not upgrade or downgrade unrelated packages while fixing one issue.

25. File Modification Rule — MANDATORY

Whenever an existing file is modified:

Provide the complete updated file.

Never return partial snippets.

Never use:

// rest of file

Never use:

// existing code

Never say only:

add this import
replace this section

When editing a file, output:

FILE: exact/path/to/file

followed by the entire final copy/paste-ready file.

Preserve unrelated code.

26. No Blind Rewrites

Before creating or modifying a file:

inspect it

inspect related files

determine whether the feature already exists

change only what is necessary

Never rewrite a working file from memory.

If the complete file is unavailable and a safe edit would risk deleting existing functionality, request the file.

27. Tutorial Modernization Rules

The tutorial is allowed to be outdated.

Common modernization areas include:

Next.js 16
React 19
Tailwind v4
Base UI
Prisma 7
Auth.js 5

Examples:

Old tutorial API
↓
Current project API

Never downgrade the project just to match the lesson.

The feature requirement comes from the tutorial.

The implementation comes from the current project.

28. Error Handling Workflow

When an error is reported:

1. Read exact error
2. Identify first relevant application frame
3. Identify responsible file
4. Inspect current implementation
5. Find root cause
6. Make smallest correct fix
7. Verify TypeScript
8. Verify lint
9. Run app
10. Review git diff

Do not immediately change architecture.

Do not immediately downgrade packages.

Do not change unrelated files.

29. Verification

After code changes, normally run:

npx tsc --noEmit
npm run lint
npm run dev

For production validation:

npm run build

For Prisma changes:

npx prisma generate

and a migration only when the schema actually changed.

30. Git Safety

Before risky changes:

git status

Review changes with:

git diff

Keep commits focused.

Do not mix unrelated fixes into the same commit.

31. Security

Never put secrets into:

AGENTS.md
context.md
RAG context
git commits
chat prompts

Never include:

AUTH_SECRET
DATABASE_URL values
API keys
tokens
passwords
private keys

Do not commit .env.

32. Learning Rebuild Mode

When rebuilding the application from scratch, use this order:

1. Initialize Next.js
2. Install project dependencies
3. Configure Tailwind / shadcn
4. Establish folder structure
5. Configure Prisma 7
6. Connect Neon
7. Create schema
8. Seed database
9. Product data access
10. Storefront
11. Product pages
12. Cart
13. Authentication
14. Shipping
15. Payment method
16. Place order
17. Orders
18. Profile
19. Admin
20. UploadThing
21. Email
22. Deployment

At each stage, understand why the code exists before moving on.

33. Lesson Workflow

For each lesson, use:

Goal
↓
Existing architecture
↓
Files to create
↓
Files to modify
↓
Modernization differences
↓
Complete updated files
↓
Why it works
↓
Verification
↓
Checkpoint

If a file is already implemented correctly, say:

NO CHANGE

Do not modify it for the sake of matching the tutorial.

34. Final Engineering Principle

The desired result is not:

"make the old tutorial compile"

The desired result is:

Understand the feature +
Understand the architecture +
Use current APIs +
Make the smallest correct change +
Verify it

Use:

Neovim +
CodeCompanion +
VectorCode +
Qwen Agent +
Aider

as a coordinated local engineering workflow.

The repository remains the source of truth.

<!-- END:nextjs-agent-rules -->
