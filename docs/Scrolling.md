# Scrolling

When using [React Router v4](https://github.com/ReactTraining/react-router/tree/v4), you might have noticed that when you navigate, the page does not automatically scroll to the hash portion of the URI.

With the `<ScrollIntoView>` component, you can pass it an `id` value which will identify an element in the page and scroll to it. This uses [`element.scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) to scroll. It supports the `alignToTop` argument because it is widely supported, but not the `scrollIntOViewOptions` because it is currently only supported by Firefox.

### Example

React Router provides its matched components with a `location` prop. This is an object with the current location divided into its `pathname`, `search`, and most importantly `hash` properties. The `hash` value is the element identifier that you should pass to the `<ScrollIntoView>` component.

**Note:** This will not work with a hash history because the hash portion of the URL is being used for routing.

```js
import React from 'react'
import { ScrollIntoView } from 'rrc'

const FAQ = (props) => (
  <div>
    <ScrollIntoView id={props.location.hash} />
    <div id='who'>...</div>
    <div id='what'>...</div>
    <div id='where'>...</div>
    <div id='when'>...</div>
    <div id='why'>...</div>
    <div id='how'>...</div>
  </div>
)
```

## `<ScrollIntoView>`

### Usage

```js
const Foo = (props) => (
  <ScrollIntoView id={props.location.hash}>
    <div>
      <h1>My View</h1>
      <div id='scroll'>Scroll to me!</div>
    </div>
  </ScrollIntoView>
)
 
<Route path='/foo' component={Foo} />
```

#### `id`

The `id` prop is the id of th element in the page that should be scrolled to. The `id` should begin with a `#`, for example `#scroll-to-me`.

```js
<ScrollIntoView id={id} />
```

#### `alignToTop`

By default, `element.scrollIntoView` will align the top of the identified element to the top of the page (or as near as it possibly can). If you would prefer to align the bottom of the identified element with the bottom of the page, set `alignToTop` to `false`.

```js
<ScrollIntoView alignToTop={false} />
```

The component can be used by itself or as a container.

```js
const PageOne = (props) => (
  <div>
    <ScrollIntoView id={props.location.hash} />
    <h1>Page One</h1>
  </div>
)

// or

const PageTwo = (props) => (
  <ScrollIntoView id={props.location.hash}>
    <h1>Page Two</h1>
  </ScrollIntoView>
)
```

## `withScroll`

The `withScroll` function provides a higher order component to wrap your view component. It can take two options, which help it control the props passed to the `<ScrollIntoView>` component.

### Usage

```js
const Foo = (props) => (
  <div>
    <h1>My View</h1>
    <div id='scroll'>Scroll to me!</div>
  </div>
)

<Route path='/foo' component={withScroll(Foo)} />
```

### Options

#### `propId`

If provided, `propId` is a function that will return the `id` of the element which should be scrolled to. The function will be passed the `props` object that is used to render the component. The default `propId` function returns `props.history.location.hash`, which is the location of the hash that is passed by React Router to matched components.

```js
<Route path='/foo' component={withScroll(Foo, { propId: () => '#scroll' })} />
```

#### `alignToTop`

You can specify the scroll alignment with the `alignToTop` option. `true` is the default value while `false` will align the bottom of the scrolled to element with the bottom of the page.

```
<Route path='/foo' component={withScroll(Foo, { alignToTop: false })} />
```
