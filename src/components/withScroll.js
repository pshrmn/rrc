import React from 'react'
import ScrollIntoView from './ScrollIntoView'
import { getDisplayName } from '../helpers'

const withScroll = (Component, options = {}) => {
  const {
    propId = (props) => (
      props && props.history && props.history.location && props.history.location.hash
    ),
    alignToTop = true
  } = options
  const WithScroll = (props) => (
    <ScrollIntoView id={propId(props)} alignToTop={alignToTop} >
      <Component {...props} />
    </ScrollIntoView>
  )

  WithScroll.displayName = `withScroll(${getDisplayName(Component)})`

  return WithScroll
}

export default withScroll
