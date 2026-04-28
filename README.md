# MovScript UI

Shared design tokens and React UI primitives for MovScript App, Web, and Hub.

## Packages

- `@movscript/tokens`: CSS variables and typed token names.
- `@movscript/ui`: React components and shared component CSS.

## Goals

- Keep MovScript products visually consistent across Electron/Vite and Next.js.
- Support React 18 and React 19 through peer dependencies.
- Support Tailwind CSS 3 and 4 consumers without requiring Tailwind to compile this package's styles.
- Keep business-specific screens, data fetching, routing, and auth outside this repo.

## Usage

Install the package in a consumer app, then import the shared CSS once near the app root:

```tsx
import "@movscript/tokens/theme.css";
import "@movscript/ui/styles.css";
```

Use components from `@movscript/ui`:

```tsx
import { Button, Input } from "@movscript/ui";

export function Example() {
  return (
    <form>
      <Input placeholder="Project name" />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

Agent chat primitives are documented in [docs/agent-ui.md](docs/agent-ui.md).

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
```
