import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ScrollIntoView extends Component {

  static defaultProps = {
    alignToTop: true
  }

  static propTypes = {
    alignToTop: PropTypes.bool,
    children: PropTypes.node,
    id: PropTypes.string
  }

  componentDidMount() {
    this.scroll()
  }

  componentDidUpdate() {
    this.scroll()
  }

  scroll() {
    const { id, alignToTop } = this.props
    if (!id) {
      return
    }

    const element = document.querySelector(id)
    if (element && element.scrollIntoView) {
      setTimeout(() => {
        element.scrollIntoView(alignToTop)
      }, 0)
    }
  }

  render() {
    return this.props.children ? this.props.children : null;
  }
}
