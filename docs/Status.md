# Status

The `<Status>` component modifies the `context` object that is passed to a `<StaticRouter>`, setting the `status` property using the `code` prop.

This component does not render anything and will have no effect when rendered inside of other routers.

### Example

```js
const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Rotue path='/about' component={About} />
    <Route component={NoMatch} />
  </Switch>
)

const NoMatch = () => (
  <div>
    <h1>Page not found</h1>
    <Status code='404' />
  </div>
)
```

Then, on the server, you would check if the `context` object has a `status` property set, which you can use to set the status of the response.

```js
// server
function handleRequest(req, res) {
  const context = {}
  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
      >
      <App />
    </StaticRouter>
  )
  if (context.status === '404') {
    res.status(404)
  }
  res.send(html)
}
```

On the client side, when rendering `<App>` inside of a `<BrowserRouter>` or `<HashRouter>`, the `<Status>` will have no effet.

```js
// client
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```
