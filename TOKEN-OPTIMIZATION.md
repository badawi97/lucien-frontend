# TOKEN-OPTIMIZATION.md

# Purpose

Reduce AI token consumption while maintaining code quality and architectural consistency.

## General Rules

- Prefer modifying existing files over generating new files.
- Avoid repeating information already present in the repository.
- Avoid generating boilerplate explanations unless requested.
- Keep responses concise and implementation-focused.
- Do not restate requirements that are already obvious from context.

## Code Generation

Before generating code:

1. Search existing patterns.
2. Reuse existing services.
3. Reuse existing DTOs.
4. Reuse existing components.
5. Reuse existing helpers.

Never create duplicate implementations.

## Response Format

Default output:

- Root cause
- Recommended solution
- Final code

Avoid:

- Long tutorials
- Excessive theory
- Generic Angular explanations

Unless explicitly requested.

## Angular Rules

When editing Angular:

- Return only affected files.
- Show only changed code blocks when possible.
- Avoid regenerating entire components.

## Refactoring Rules

Prefer:

- Small focused changes
- Incremental improvements

Avoid:

- Full rewrites
- Unnecessary architectural changes

## API Rules

Before creating:

- New DTO
- New Service
- New Interface

Check whether one already exists.

## Debugging Rules

When fixing bugs:

Provide:

1. Root Cause
2. Fix
3. Verification

Avoid long explanations.

## Documentation Rules

Generate documentation only when:

- User requests it
- Architecture changes
- New feature is introduced

## Cost Awareness

Always optimize for:

- Fewer generated tokens
- Less duplicated output
- Smaller code diffs
- Faster implementation

Assume repository context already exists and avoid repeating it.
