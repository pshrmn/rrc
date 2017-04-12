import React from 'react'
import PropTypes from 'prop-types';
import Route from 'react-router/Route'
import matchRoutes from './helpers/matchRoutes'
import makeInjectable from './helpers/makeInjectable'

const ConfigSwitch= ({ routes, location }, { router }) => {
  const { route:parent } = router
  const currentLocation = location || parent.location
  const { match, route } = matchRoutes(routes, currentLocation.pathname, parent)
  const routeProps = match ? makeInjectable(route) : route
  return match ? <Route {...routeProps} location={currentLocation} computedMatch={match}/> : null
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
