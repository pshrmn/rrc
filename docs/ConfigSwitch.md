# ConfigSwitch

The `<ConfigSwitch>` component is an alternative approach to React Router's `<Switch>` component. Instead of providing `<Route>` components as children of the `<Switch>` component, `<ConfigSwitch>` takes an arry of route configuration objects through its `routes` prop.

```js
<ConfigSwitch routes={[
  { path: '/', exact: true, component: Home },
  { path: '/about', component: About },
  { component: NoMatch }
]} />
```
