import React, { PropTypes } from 'react'
import Route from 'react-router/Route'
import matchPath from 'react-router/matchPath'

class ConfigSwitch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      listen: PropTypes.func.isRequired
    }).isRequired
  }

  static propTypes = {
    routes: PropTypes.array.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      router: this.router
    }
  }

  state = {
    location: null
  }

  componentWillMount() {
    const { router } = this.context

    // make a copy of context.router that re-assigns location using
    // the one provided by the props (if provided)
    this.router = {
      ...router,
      location: this.props.location || router.location
    }

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

  componentWillReceiveProps(nextProps) {
    Object.assign(
      this.router,
      { location: nextProps.location ? nextProps.location : state.location }
    )
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { routes } = this.props
    const location = this.props.location || this.state.location

    let match = null
    let route = null
    for (let r=0; match === null && r < routes.length; r++) {
      route = routes[r]
      match = matchPath(location.pathname, route.path, route)
    }
    return match ? <Route {...route} computedMatch={match} /> : null
  }
}

export default ConfigSwitch
