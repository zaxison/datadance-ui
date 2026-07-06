# @datadance/ui

Reusable DataDance app shell, sidebar, and Yuanli-style UI components.

## Install

```bash
npm install github:zaxison/datadance-ui#v0.1.0
```

## Usage

```jsx
import { DataDanceShell } from '@datadance/ui';
import '@datadance/ui/styles.css';

export default function App() {
  return (
    <DataDanceShell
      activePath={window.location.pathname}
      onNavigate={(path) => {
        window.history.pushState({}, '', path);
      }}
    >
      <main>Your page content</main>
    </DataDanceShell>
  );
}
```

## Local Development

This package expects React and React DOM to be provided by the host app.

```bash
npm install
```

## Exports

- `DataDanceShell`
- `DataDanceAppShell`
- `DataDanceWorkSurface`
- `DataDanceSidebar`
- `defaultMenuConfig`

