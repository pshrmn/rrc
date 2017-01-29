import React from 'react'

class Status extend React.Component {
  static contextTypes = {
    router: React.PropTypes.shape({
      isStatic: React.PropTypes.bool,
      context: React.PropTypes.object
    }).isRequired
  }

  static propTypes = {
    status: React.PropTypes.string.isRequired
  }

  componentWillMount() {
    const { isStatic, context } = this.context.router
    if (isStatic) {
      context.status = this.props.status
    }
  }

  render() {
    return null
  }
}

export default Status
