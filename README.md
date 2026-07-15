# @datadance/ui

Reusable DataDance app shell, sidebar, and Yuanli-style UI components.

## Install

```bash
npm install github:zaxison/datadance-ui#v0.2.0
```

## Usage

```jsx
import { DDButton, DDSelect, DataDanceShell } from '@datadance/ui';
import '@datadance/ui/styles.css';

export default function App() {
  return (
    <DataDanceShell
      activePath={window.location.pathname}
      onNavigate={(path) => {
        window.history.pushState({}, '', path);
      }}
    >
      <main>
        <DDSelect options={[]} placeholder="请选择" />
        <DDButton>创建</DDButton>
      </main>
    </DataDanceShell>
  );
}
```

## Local Development

This package expects React and React DOM to be provided by the host app. Its
compiled CSS is self-contained and does not require Tailwind in the host app.

```bash
npm install
```

## Exports

- `DataDanceShell`
- `DataDanceAppShell`
- `DataDanceWorkSurface`
- `DataDanceSidebar`
- `defaultMenuConfig`
- `DDPageHeader`, `DDCard`
- `DDButton`, `DDIconButton`
- `DDInput`, `DDSelect`, `DDSwitch`
- `DDCascader`, `DDDatePicker`, `DDTreeSelect`
- `DDTabs`, `DDTable`, `DDTag`, `DDPagination`
- `DDAlert`, `DDModal`, `DDDrawer`
