import React, { Component, PropTypes } from 'react'

class OnUpdate extends Component {
  static contextTypes = {
    route: PropTypes.shape({
      location: PropTypes.object.isRequired
    })
  }

  static propTypes = {
    call: React.PropTypes.func.isRequired,
    immediate: React.PropTypes.bool
  }

  call() {
    this.props.call(this.context.route.location)
  }

  componentDidMount() {
    if (this.props.immediate) {
      this.call()
    }
  }

  componentDidUpdate() {
    this.call()
  }

  render() {
    return null
  }

}

export default OnUpdate
