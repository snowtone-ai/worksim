# WorkSim Cα Quality Gate

## Scenario Quality

- playable from selection to result
- realistic workplace context
- at least 5 decision scenes
- every scene contains a trade-off
- every choice has feedback
- every choice has score dimensions
- every choice has behavior and analytics tags
- not a quiz
- avoids deterministic career judgment
- source limitations are honest

## UI Quality

- selection does not break with 50 cards
- normal mode is deprecated; immersive mode is required for playable scenarios
- non-immersive roles must not expose a play CTA
- task-pre supports background image metadata
- result works for v1 and v2

## Data Quality

- events can represent choice behavior
- analytics tags are present
- individual data not exposed to companies by default

## Technical Quality

- pnpm lint
- pnpm build
- pnpm test
