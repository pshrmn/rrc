## rrc = react router components

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/rrc/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/rrc

This module contains a number of components that can be used in conjuction with [React Router v4](https://github.com/ReactTraining/react-router/tree/master). They are a somewhat random assortment of solutions to situations that I have either personally needed a component for or have seen others need a component for.

### Installation

```
npm install --save rrc
```

#### UMD

You can also use the UMD version of `rrc`. This is useful if you are putting together a code snippet.

```html
<script src="https://unpkg.com/rrc@0.10.0/umd/rrc.min.js"></script>
```

**Note:** The UMD builds are slightly bloated because they have to include React Router's `<Route>` component and `matchPath` function. This is because if you use the UMD build of `react-router-dom` instead of `react-router`, the `ReactRouter` global will not exist and `rrc`'s imports will fail. The bloat is less than the extra data required to download the `react-router` build and this approach requires one less `<script>` tag.

### Components

Read about the various components that are provided in the [docs](docs/README.md)

These include:

#### `<ConfigSwitch>` and `wrapSwitch` 

These both provide an alternative approach to React Router's `<Switch>` component. Intead of passing child elements to the `<Switch>`, both `<ConfigSwitch>` and the component returned by the `wrapSwitch` HOC take an array of route objects via the `routes` prop.

```js
<ConfigSwitch routes={[
  { path: '/', exact: true, component: Home },
  { path: '/about' component: About }
]}/>
```

`wrapSwitch` in particular is useful for animations. It allows you to specify a component that will be used to wrap the matched route, providing better support for nested animations than is available with `<Switch>`

```js
import { CSSTransitionGroup } from 'react-transition-group'

const CSSSwitch = wrapSwitch(CSSTransitionGroup)

const App = () => (
  <CSSSwitch
    transitionName='slide'
    component='div'
    routes={[
      { path: '/', exact: true, component: Home },
      { path: '/about' component: About }
    ]}
  />
)
```

#### `<Status>`

If you are doing server side rendering, the `<Status>` component offers an easy way to "render" a status. For example, if you have a "404" component that renders when no routes match, you can include a `<Status>` element inside of its render method so that your server can send the correct status code with the response.

```js
const NoMatch = () => (
  <div>
    <Status code='404' />
    <h1>404</h1>
    <p>The page you were looking for was not found</p>
  </div>
)
```

The `<Status>` component will set a property on the `context` object that you pass to the `<StaticRouter>`, so all that you have to do is check the context object's `status` property.

```js
const context = {}
const markup = renderToString(
  <StaticRouter context={context}>
    <App />
  </StaticRouter>
)

if (context.status === '404') {
  // ...
}
```

#### `whenActive`

The `whenActive` higher-order component creates `<NavLink>`-like components. While a `<NavLink>` can only create `<a>`s, the component returned by `whenActive` can render anything that you'd like.

```js
// a button that can navigate
const Button = ({ to, ...rest}, { router }) => (
  <button
    type='button'
    onClick={(e) => {
      e.preventDefault()
      router.history.push(to)
    }}
    {...rest}
  />
)

const ActiveButton = whenActive({ className: 'i-am-active' })(Button)

// usage
const Controls = () => (
  <div>
    <ActiveButton to='/'>Home</ActiveButton>
    <ActiveButton to='/form'>Form</ActiveButton>
  </div>
)
```

This can also be used in place of the `<NavLink>` so that you don't have to specify the same "active" props for every location-aware link.

```js
// with NavLink
const Links = () => (
  <div>
    <NavLink to='/one' activeClassName='the-active-class'>One</NavLink>
    <NavLink to='/two' activeClassName='the-active-class'>Two</NavLink>
    <NavLink to='/three' activeClassName='the-active-class'>Three</NavLink>
  </div>
)

// with whenActive
const ActiveLink = whenActive({ className: 'the-active-class' })(Link)
const Links = () => (
  <div>
    <ActiveLink to='/one'>One</ActiveLink>
    <ActiveLink to='/two'>Two</ActiveLink>
    <ActiveLink to='/three'>Three</ActiveLink>
  </div>
)
```

### Related Projects:

* [`qhistory`](https://github.com/pshrmn/qhistory) - Add query object support to location objects
* [`react-router-test-context`](https://github.com/pshrmn/react-router-test-context) - Simulate the `context.router` object. This can be useful if you are doing shallow testing of a component that needs to access React Router's context variables. Typically, though, you should just render your component inside of a `<MemoryRouter>`.
