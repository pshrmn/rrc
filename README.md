## rr-components

This module contains a number of components that can be used in conjuction with [React Router v4](https://github.com/ReactTraining/react-router/tree/v4).

#### Note

v4 of React Router is still in alpha, so any breaking changes to it might also break these components.

#### Installation

```
npm install --save rr-components
```

#### Usage

```js
import React from 'react'
import { ScrollIntoView } from 'rr-components'

const FAQ = ({ location }) => (
  <div>
    <ScrollIntoView id={location.hash} />
    <Questions />
    <Answers />
  </div>
)
```
