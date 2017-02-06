# ConfigSwitch

The `<ConfigSwitch>` component is an alternative approach to React Router's `<Switch>` component. Instead of providing `<Route>` components as children of the `<Switch>` component, `<ConfigSwitch>` takes an arry of route configuration objects through its `routes` prop.

```js
<ConfigSwitch routes={[
  { path: '/', exact: true, component: Home },
  { path: '/about', component: About },
  { component: NoMatch }
]} />
```

#### `routes`

An array of route configuration objects (see [<ConfigRoute>](ConfigRoute.md)). The array will be iterated over and only the first object that matches the location will be rendered. If no route matches the `location`, then `null` will be rendered.

#### `location`

A `location` object can be passed to a `<ConfigSwitch>`. This will take precedence over the actual `location`. This is useful with animation to ensure that the `<ConfigSwitch>` that is leaving is rendering based on the previous location.

```js
<CSSTransitionGroup>
  <Switch
    key={location.pathname}
    location={location}
    routes={[
      { path: '/', exact: true, component: Home },
      { path: '/about', component: About },
      { component: NoMatch }
    ]}
  />
</CSSTransitionGroup>
```
