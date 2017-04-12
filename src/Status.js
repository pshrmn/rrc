import { Component } from 'react'
import PropTypes from 'prop-types';

class Status extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  static propTypes = {
    code: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.router
    if (staticContext) {
      staticContext.status = this.props.code
    }
  }

  render() {
    return null
  }
}

export default Status
