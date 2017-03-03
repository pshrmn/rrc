import { Component, PropTypes } from 'react'

class Status extends Component {
  static contextTypes = {
    history: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  static propTypes = {
    code: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.history
    if (staticContext) {
      staticContext.status = this.props.code
    }
  }

  render() {
    return null
  }
}

export default Status
