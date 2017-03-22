## RRC = React Router Components

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/rrc/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/rrc

This module contains a number of components that can be used in conjuction with [React Router v4](https://github.com/ReactTraining/react-router/tree/v4).

#### Installation

```
npm install --save rrc
```

#### Components

Read about the various components that are provided in the [docs](docs/README.md)

### Related Projects:

* [`qhistory`](https://github.com/pshrmn/qhistory) - Add query object support to location objects
* [`react-router-test-context`](https://github.com/pshrmn/react-router-test-context) - Simulate the `context.router` object. This can be useful if you are doing shallow testing of a component that needs to access React Router's context variables. Typically, though, you should just render your component inside of a `<MemoryRouter>`.
