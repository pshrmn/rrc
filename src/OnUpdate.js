import React, { Component, PropTypes } from 'react'

class OnUpdate extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        listen: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
      }).isRequired
    }).isRequired
  }

  static propTypes = {
    call: React.PropTypes.func.isRequired,
    immediate: React.PropTypes.bool
  }

  call = (location) => {
    this.props.call(location)
  }

  componentDidMount() {
    const { history } = this.context.router
    this.unlisten = history.listen(this.call)

    if (this.props.immediate) {
      this.call(history.location)
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    return null
  }

}

export default OnUpdate
