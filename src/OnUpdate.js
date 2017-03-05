import React, { Component, PropTypes } from 'react'

class OnUpdate extends Component {
  static contextTypes = {
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.shape({
      location: PropTypes.object.isRequired
    })
  }

  static propTypes = {
    call: React.PropTypes.func.isRequired,
    immediate: React.PropTypes.bool
  }

  call = () => {
    this.props.call(this.context.route.location)
  }

  componentDidMount() {
    this.unlisten = this.context.history.listen(this.call)

    if (this.props.immediate) {
      this.call()
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
