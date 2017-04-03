# ConfigSwitch [\<\>](https://github.com/pshrmn/rrc/blob/master/src/ConfigSwitch.js#L5 "Source code")

The `<ConfigSwitch>` component is an alternative approach to React Router's `<Switch>` component. Instead of providing `<Route>` components as children of the `<Switch>` component, `<ConfigSwitch>` takes an arry of route configuration objects through its `routes` prop.

```js
import { ConfigSwitch } from 'rrc'

<ConfigSwitch routes={[
  { path: '/', exact: true, component: Home },
  { path: '/about', component: About },
  { component: NoMatch }
]} />
```

#### `routes`

An array of route configuration objects. A route configuration object can take the same properties as a `<Route>` component has as props. You can see what these are in the [`<Route>` documentation](https://reacttraining.com/react-router/web/api/Route).

Additionally, a `route` object can be provided an `inject` property. This would be an object whose properties should be passed as props to the `route.component`. **Note:** This can only be used with the `component` property, not `render` or `children`.

```js
{ path: '/user', component: User, inject: { username: 'Anonymouse', id:  101 }}
```

The array will be iterated over and only the first object that matches the location will be rendered. If no route matches the `location`, then `null` will be rendered.

#### `location`

A `location` object can be passed to a `<ConfigSwitch>`. This will take precedence over the actual `location`. This is useful with animation to ensure that the `<ConfigSwitch>` that is leaving is rendering based on the previous location.

```js
// ConfigSwitch can always be renamed on import :)
import Switch from 'rrc/ConfigSwitch'

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
