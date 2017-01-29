import React from 'react'

class OnUpdate extends React.Component {
  static contextTypes = {
    router: React.PropTypes.shape({
      listen: React.PropTypes.func.isRequired
    }).isRequired
  }

  static propTypes = {
    call: React.PropTypes.func.isRequired,
    immediate: React.PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.call = this.call.bind(this)
  }

  render() {
    return null
  }

  componentDidMount() {
    this.unlisten = this.context.router.listen(this.call)
    if (this.props.immediate) {
      this.call()
    }
  }

  call() {
    this.props.call(this.context.router.location)
  }

  comonentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }
}

export default OnUpdate
