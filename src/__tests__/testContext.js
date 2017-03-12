// This creates a context object that mimics the context object
// React Router creates. Doing this allows us to not have to actually
// render everything inside of a <Router>.

const createDefaultMatch = () => ({ path: '/', url: '/', isExact: true, params: {}})
const createDefaultLocation = () => ({ pathname: '/', search: ''})

const createDefaultHistory = (location) => ({
  action: 'POP',
  location: location || createDefaultLocation(),
  listeners: [],
  listen: function(fn) {
    this.listeners.push(fn)
    return () => {
      this.listeners = this.listeners.filter(func => func !== fn)
    }
  },
  push: function(location) { this.notifyListeners(location) },
  replace: function(location) { this.notifyListeners(location) },
  notifyListeners: function(loc) {
    this.listeners.forEach(fn => { fn(loc) })
  },
  createHref: (loc) => {
    if (typeof loc === 'string') {
      return loc
    } else {
      return loc.pathname + (loc.search || '') + (loc.hash || '')
    }
  }
})

const createRouterContext = ({ history, match, location, staticContext }) => {
  if (!match) {
    match = createDefaultMatch()
  }

  if (!location) {
    location = createDefaultLocation() 
  }

  if (!history) {
    history = createDefaultHistory(location)
  }

  return {
    router: {
      history,
      route: {
        match,
        location
      },
      staticContext
    }
  }
}

export default createRouterContext
