## rr-component

This module contains a number of components that can be used in conjuction with [React Router v4](https://github.com/ReactTraining/react-router/tree/v4).

#### Installation

```
npm install --save rr-component
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
