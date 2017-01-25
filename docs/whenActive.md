# whenActive

Using the `whenActive` higher-order component, you can create a component that can have a class or styles injected into it when its location-specifying prop matches the current location's `pathname`.

### Example

An application might have a a menu that is rendered on all (or many different)  views. Each link in the menu has a location associated with it.

```js
const Menu = () => ()
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
  </nav>
)
```

When the current location matches a link's location, that link should be given the class `active`, which will style it in a way to make it clear to the user that that is the link to the current location. Using the `whenActive` higher-order component, we can create a new `<ActiveLink>` component to do just that.

```js
import { Link } from 'react-router'
import { whenActive } from 'rrc'

const ActiveLink = whenActive({
  className: 'active'
})(Link)
``` 

Then, we would replace the `<Link>` components in our `<Menu>` with `<ActiveLink>`s and they would automatically keep track of whether or not they match the current location.

```js
const Menu = () => ()
  <nav>
    <ActiveLink to='/'>Home</ActiveLink>
    <ActiveLink to='/about'>About</ActiveLink>
    <ActiveLink to='/contact'>Contact</ActiveLink>
  </nav>
)
```

### Usage

The `whenActive` HOC can be configured using an `options` object which is passed to it.

#### `className`

The `className` option allows you to pass a string which should be added to the `className` of the wrapped component when the component's location matches the current location.

```js
const ActiveLink = whenActive({
  className: 'active'
})(Link)

// when the current URL is /foo
<ActiveLink to='/foo' className='link' /> // className = 'link active'
<ActiveLink to='/bar' className='link' /> // className = 'link'
```

#### `style`

The `style` option allows you to pass an object which should be merged with the `style` of the wrapped component when the component's location matches the current location.

```js
const ActiveLink = whenActive({
  style: { color: 'red' }
})(Link)

// when the current URL is /foo
<ActiveLink to='/foo' style={{ color: blue }} /> // style.color = 'red'
<ActiveLink to='/bar' style={{ color: blue }} /> // style.color = 'blue'
```

---
**Note:** The above props are used for styling an active component. The rest of the props are used for determining if a component _is_ active.

#### `pathProp`

The `pathProp` option controls which prop of the wrapped component to get its location from. The default value for this is `to`, which is what the `<Link>` component uses to specify its target location. If you are using a component which uses a different prop to specify its location, you should set that prop value here.

```js
const ActiveButton = whenActive({
  pathProp: 'location'
})(Button)

<ActiveButton location='/one'>Click Me!</ActiveButton>
```

#### `exact`

The `exact` option is used to specify that the active `className` or `style` should only be applied when the location is an exact match. By default the location `/foo` is active when the URL is `/foo/bar`. However, if `exact = true`, then a component with the location `/foo` will only be active when the URL is `/foo`.

```js
const ActiveLink = whenActive({
  exact: true
})(Link)

// when the current URL is /foo/bar
<ActiveLink to='/foo/bar' /> // is active
<ActiveLink to='/foo' /> // is not active
```

#### `strict`

The `strict` option is used to specify that strict matching should be done. By default this value is `false`. When using strict matching, a path that ends with a trailing slash will not match a `location.pathname` that does not.

```js
const ActiveLink = whenActive({
  strict: true
})(Link)

// when the current URL is /foo
<ActiveLink to='/foo' /> // is active
<ActiveLink to='/foo/' /> // is not active
```

#### isActive

You may want to use a more complicated configuration for determining whether or not a component should be active or not. For example, if you have a set of locations and any of them matching means that the component should be active. For cases like this, you can provide your own `isActive` function as an option.

This function will not have access to the other options (i.e., `exact`, `strict`, and `pathProp`). Those are used to configured the default `isActive` function. By providing your own `isActive` function, you can control these values yourself (if you need them).


```js
// This will style a component as active ~50% of the time ;)
const FiftyFifty = whenActive({
  isActive: () => Math.random() > 0.5
})
```
