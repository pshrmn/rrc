# wrapSwitch [\<\>](https://github.com/pshrmn/rrc/blob/master/src/wrapSwitch.js#L5 "Source code")

`wrapSwitch` is a higher-order component that lets you provide a component that will be wrapped around the `<Route>` that the switch matches.

### Arguments

#### Component

A component that should be rendered around the matched `<Route>`.

### Props of the returned component

#### `routes` and `location`

The `route` and `location` props are the same props as the [`<ConfigSwitch>`](ConfigSwitch.md)'s `routes` and `location` props.

#### `getKey(match, route, location)`

By default, `match.url` will be used as the key that is passed to the `<Route>` element. If you want to use a different property as the key, you can pass a `getKey` function to the component. The function will be given the computed `match` object, the matched `route` object, and the `location` that was used to match the route as arguments. The function should return a string that will be a unique key.

#### Additional Props

Any additional props will be passed to the wrapper component.

### Why?

The main use case for this is animation. For example, the `react-transition-group` package provides a `<CSSTransitionGroup>` component that continues to render children that have been removed until an exit duration time has passed. This relies on its direct children having a unique `key` prop that can be used to determine which children are entering, exiting, and staying.

With React Router's `<Switch>` component, you can animate navigation by placing a `<CSSTransitionGroup>` around a `<Switch>` and passing the `<Switch>` a unique key. This will render a different `<Switch>` every time the location changes. What key should we use? Your first instinct is probably to use a property of the `location` object as the key. For non-nested routes, this is sufficient. However, problems occur if you have nested routes. Imagine that you have the following route setup:

```js
const App = ({ location }) => (
  <CSSTransitionGroup name='fade'>
    <Switch key={location.pathname} location={location}>
      <Route exact path='/' component={Home}/>
      <Route path='/user' component={User}/>
    </Switch>
  </CSSTransitionGroup>
)

const User = ({ match, location }) => (
  <CSSTransitionGroup name='slide'>
    <Switch key={location.pathname} location={location}>
      <Route exact path={match.url} component={Users}/>
      <Route path={`${match.url}/:username`} component={Profile}/>
    </Switch>
  </CSSTransitionGroup>
)
```

You want the `<App>`'s transitions to occur when you go between one of the `/user` pages and the home page (`/`). However, when going from one user page to another (`/user/alpha` to `/user/omega`), you only want the `<User>` component's transition to occur. Unfortunately, because you are using the `location.pathname` as the key, this will be different when navigating between different user pages.

What would be a better solution? The `match` object only includes the matched part of the pathname on its `match.url` property. This means that all of our `/user` pages would have the same key and transitions between them wouldn't cause a transition in the `<App>`. The question, then, is how do we access the `match` object? With the `<Switch>` component, we cannot access it to set the key on the `<Switch>` because the `match` object is created inside of the `<Switch>`.

Instead, we need to render whichever component gets the unique key _after_ we have computed the `match`. Because the component with the `key` prop has to be a direct child of a `<CSSTransitionGroup>`, this means that we will need a way to render a `<CSSTransitionGroup>` inside of our `<Switch>`. Then, instead of adding the key to our `<Switch>`, our wrapped switch we will automatically add a key to the matched route element it creates.

```js
import { CSSTransitionGroup } from 'react-transition-group'
import { wrapSwitch } from 'rrc'

const CSSTransitionSwitch = wrapSwitch(CSSTransitionGroup)

const App = ({ location }) => (
  <CSSTransitionSwitch
    name='fade'
    location={location}
    routes={[
      { path: '/', exact: true, component: Home },
      { path: '/user', component: User }
    ]}
  />
)

const User = ({ match, location }) => (
  <CSSTransitionSwitch
    name='slide'
    location={location}
    routes={[
      { path: match.url, exact: true, component: Users },
      { path: `${match.url}/:username`, component: Profile }
    ]}
  />
)
```
