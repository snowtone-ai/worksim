# WorkSim Cα Image Generation Guide

Purpose: Generate consistent high-quality task-pre background images for WorkSim.

## Global Rules

- 16:9
- realistic but slightly game-like
- Japanese workplace context
- clean and professional
- no readable text
- no real logos
- no brand names
- no watermark
- no famous people
- no close-up faces
- enough empty area for UI overlay
- not a stock-photo advertisement

## Base Prompt

Create a high-quality realistic workplace background image for a career simulation game.

Scene:
[INDUSTRY] industry, [ROLE] role, [SITUATION] situation.

Style:
realistic but slightly game-like, clean, modern, immersive, professional, cinematic lighting, high detail, Japanese workplace context, natural atmosphere.

Composition:
16:9 wide background, enough empty space for UI text overlay, no readable text, no logos, no brand names, no watermark, no close-up faces.

Mood:
calm, focused, realistic, slightly aspirational but not fantasy.

Camera:
wide-angle, eye-level, workplace environment, depth of field, natural lighting.

Important:
Do not include any text inside the image.
Do not include real company logos.
Do not include famous people.
Do not make it look like a stock photo advertisement.

Negative prompt:
readable text, logo, brand name, watermark, celebrity, distorted hands, distorted face, low quality, blurry, stock photo advertisement, fantasy, cyberpunk, anime, manga, unrealistic office, fake letters

Metadata fields:
- imagePrompt
- negativePrompt
- composition
- overlaySafeArea
- mood
- industryVisualTokens

Future 3D fields:
- environmentType
- spatialAnchors
- interactableObjects
- cameraHint
- soundscapeHint
