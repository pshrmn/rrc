# ConfigRoute

The `<ConfigRoute>` component is an alternative approach to React Router's `<Route>` component. Instead of providing the configuration values as props of the `<Route>` component, `<ConfigRoute>` takes an object containing configuration values through its `route` prop.

```js
<ConfigRoute route={{ path: '/', exact: true, component: Home }} />
```

#### `route`

An object containing the configuration values for a route. These values are the same as the props that can be passed to a `<Route>` component.

1. `path` - A `path-to-regexp` style string that will be compared with a URL's `pathname`. If no `path` is provided, then the `<ConfigRoute>` will always match.
2. `exact` - Specify that the provided path must match the location's `pathname` exactly. This is `path-to-regexp`'s `end` option, but with a more straightforward name.
3. `strict` - `path-to-regexp`'s strict option, this will enforce that a location's `pathname` must end with a trailing slash if the `path` ends in a trailing slash. This can also be used to specify that a location's `pathname` must not end in a trailing slash if the `path` does not, but in order to do that, `exact` must also be `true`.

Along with the other values, there are three options for specifying what to render when the `<ConfigRoute>` matches the current location:

1. `component` - A React component.
2. `render` - An inline function that will return a React element. This is useful when you want to access variables that are in the parent component's scope without passing them as props.
3. `children` - Similar to `render`, but this will **always** be called, whether or not the `<RouteConfig>` matches the current location.

Only one of those three options should be passed to a `<ConfigRoute>`'s config object. The order of precedence is the same as the order they are listed in above.
