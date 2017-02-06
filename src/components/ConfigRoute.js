import React from 'react'
import Route from 'react-router/Route'

class ConfigRoute extends React.Component {
  render() {
    return <Route {...this.props.route} />
  }
}

export default ConfigRoute
