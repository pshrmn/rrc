import React, { PropTypes } from 'react'
import Route from 'react-router/Route'
import matchPath from 'react-router/matchPath'
import matchRoutes from './helpers/matchRoutes'
import getDisplayName from './helpers/getDisplayName'


const wrapSwitch = (Wrapper) => {

  const WrappedSwitch = ({ routes, location, ...wrapperProps }, { router }) => {
    const { route:parent } = router
    const currentLocation = location || route.location
    const { match, route } = getMatchAndRoute(routes, currentLocation.pathname, parent)

    // TODO: Should the Wrapper wrap just the route or also null?
    return match
      ? <Wrapper {...wrapperProps}>
          <Route {...route} location={currentLocation} computedMatch={match}/>
        </Wrapper>
      : null
  }

  WrappedSwitch.propTypes = {
    routes: PropTypes.array.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  }

  WrappedSwitch.contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.shape({
        location: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  }


  return WrappedSwitch
}





export default ConfigSwitch
