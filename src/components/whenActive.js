import React from 'react'
import { matchPath, withRouter } from 'react-router'
import { getDisplayName } from '../helpers'

// const ActiveLink = whenActive({ className: 'active' })(Link)
// const ExactActiveLink = whenActive({ className: 'active', exact: true })(Link)
const whenActive = (options = {}) => {
  const {
    exact = false,
    strict = false,
    pathProp = 'to',
    className:activeClassName,
    style:activeStyle,
    isActive:getIsActive = (pathname, props) => {
      const match = matchPath(pathname, props[pathProp], { exact, strict })
      const active = !!match
      return exact ? active && match.isExact : active
    }
  } = options

  return (component) => {
    const WhenActive = (props) => {
      const {
        className = '',
        style = {},
        history,
        match:undefMatch,
        ...rest
      } = props
      const active = getIsActive(history.location.pathname, props)
      return React.createElement(component, {
        className: active ? [className, activeClassName].join(' ') : className,
        style: active ? {...style, ...activeStyle} : style,
        ...rest
      })
    }
    WhenActive.displayName = `whenActive(${getDisplayName(component)})`
    return withRouter(WhenActive)
  }
}

export default whenActive
