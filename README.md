# @projsite/types

Shared TypeScript types and schemas for Projsite applications.

## Installation

Add to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@projsite/types": "github:damba-it/projsite-types#master"
  }
}
```

Or install using npm:

```bash
npm install damba-it/projsite-types#master
```

Or using yarn:

```bash
yarn add damba-it/projsite-types#master
```

## Usage

```typescript
// Import domain types
import type { Organization, Project } from '@projsite/types/types';

// Import schemas and their types
import { createOrganizationSchema, type CreateOrganization } from '@projsite/types/schemas';
import { createProjectSchema, type CreateProject } from '@projsite/types/schemas';
```

## Structure

- `/types` - TypeScript interfaces and types
  - `common.ts` - Base types, enums, and shared interfaces
  - `organization.ts` - Organization related types
  - `project.ts` - Project related types
  - `ninja-order.ts` - Order related types

- `/schemas` - Zod validation schemas
  - `organizations.ts` - Organization schemas
  - `projects.ts` - Project schemas
  - `ninja-orders.ts` - Order schemas

## Development

```bash
# Install dependencies
npm install

# Development with watch mode
npm run dev

# Type checking
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

## Requirements

- Node.js >= 18
- TypeScript >= 5.0
- Zod >= 3.0 (peer dependency)
- MongoDB >= 6.0 (peer dependency)

## License

UNLICENSED - Private package 