import React, { PropTypes } from 'react'
import Route from 'react-router/Route'
import matchPath from 'react-router/matchPath'

const ConfigSwitch= ({ routes, location }, { router }) => {
  const { route } = router
  const currentLocation = location || route.location

  let match = null
  let currentRoute = null
  for (let r=0; match === null && r < routes.length; r++) {
    currentRoute = routes[r]
    match = matchPath(currentLocation.pathname, currentRoute, route)
  }
  return match
    ? <Route
        {...currentRoute}
        location={currentLocation}
        computedMatch={match}
      />
    : null
}

ConfigSwitch.propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

ConfigSwitch.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.shape({
      location: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
}

export default ConfigSwitch
