import React, { PropTypes } from 'react'
import ConfigRoute from './ConfigRoute'
import matchPath from 'react-router/matchPath'

class ConfigSwitch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      listen: PropTypes.func.isRequired
    }).isRequired
  }

  static propTypes = {
    routes: PropTypes.array.isRequired
  }

  state = {
    location: null
  }

  componentWillMount() {
    const { router } = this.context

    this.setState({ 
      location: router.location
    })

    // Start listening here so we can <Redirect> on the initial render.
    this.unlisten = router.listen(() => {
      this.setState({
        location: router.location
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { routes } = this.props
    const { location } = this.state

    let match = null
    let route = null
    for (let r=0; match === null && r < routes.length; r++) {
      route = routes[r]
      match = matchPath(location.pathname, route.path, route)
    }
    return match ? <ConfigRoute route={{
      ...route,
      computedMatch: match
    }} /> : null
  }
}

export default ConfigSwitch
