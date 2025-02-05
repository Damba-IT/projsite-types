# Changelog

## [0.1.0] - 2025-02-05

### Breaking Changes
- Removed root exports - use explicit imports from `/types` or `/schemas` instead
- Old: `import { Project } from '@projsite/types'`
- New: `import type { Project } from '@projsite/types/types'`

### Added
- Separate entry points for types and schemas
- Better tree-shaking support
- Clearer separation between runtime and type-only imports 