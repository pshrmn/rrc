# ConfigRoute

The `<ConfigRoute>` component is an alternative approach to React Router's `<Route>` component. Instead of providing the configuration values as props of the `<Route>` component, `<ConfigRoute>` takes an object containing configuration values through its `route` prop.

```js
<ConfigRoute route={{ path: '/', exact: true, component: Home }} />
```
