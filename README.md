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
// Import types
import { Organization, Project } from '@projsite/types';
import { OrganizationSettings, ProjectSettings } from '@projsite/types';

// Import schemas (if using zod validation)
import { organizationSchema, projectSchema } from '@projsite/types/schemas';
```

## Structure

- `/types` - TypeScript interfaces and types
  - `/common` - Shared types and enums
  - `/organization` - Organization related types
  - `/project` - Project related types
  - `/settings` - Settings interfaces
  - `/validation` - Form validation rules

- `/schemas` - Zod validation schemas
  - `/organization` - Organization schemas
  - `/project` - Project schemas
  - `/ninja-orders` - Ninja order schemas

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

## License

UNLICENSED - Private package 