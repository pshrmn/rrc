import { Component, PropTypes } from 'react'

class Status extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  static propTypes = {
    status: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.router
    if (staticContext) {
      staticContext.status = this.props.status
    }
  }

  render() {
    return null
  }
}

export default Status
