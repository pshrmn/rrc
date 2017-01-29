import React from 'react'
import { matchPath, withRouter } from 'react-router'
import { getDisplayName, removeRouterProps } from '../helpers'

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
        location,
        ...rest
      } = props
      const active = getIsActive(location.pathname, props)
      return React.createElement(component, {
        ...removeRouterProps(rest),
        className: active ? [className, activeClassName].join(' ') : className,
        style: active ? {...style, ...activeStyle} : style
      })
    }
    WhenActive.displayName = `whenActive(${getDisplayName(component)})`
    return withRouter(WhenActive)
  }
}

export default whenActive
