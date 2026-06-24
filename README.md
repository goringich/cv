# Igor Kim — portfolio and AI OS

Public portfolio plus the first sellable surface for **AI OS**, a local-first implementation service for Linux developers.

## Routes

- `/` — engineering portfolio;
- `/ai-os` — Russian AI OS offer, pilot scope, acceptance criteria, public proof and contact actions.

## AI OS pilot

- `49 900 ₽` for one Linux workstation and up to three active projects;
- five working days;
- `9 900 ₽` diagnostic, fully credited toward the pilot;
- direct contact: [Telegram](https://t.me/a1gorithms) or `actingsv@gmail.com`;
- no secrets, passwords or tokens in the initial request.

The product is an implementation and acceptance service, not a new model runtime and not a promise of unrestricted autonomy.

Full scope and intake contract: [`docs/ai-os-pilot.md`](docs/ai-os-pilot.md).

## Verification

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm audit --audit-level=low
npm run qa:ai-os
```

Browser acceptance covers desktop `1536×1024` and mobile `390×844`, direct `/ai-os` routing, horizontal overflow, error overlays, console errors and CTA targets.

## Local development

```bash
npm run dev -- --host 127.0.0.1 --port 4175
```

Vercel rewrites `/ai-os` to the Vite entrypoint through `vercel.json`.
