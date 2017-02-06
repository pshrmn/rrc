import React from 'react'
import { matchPath, Route } from 'react-router'
import { getDisplayName } from './helpers'

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
        ...rest
      } = props
      return (
        <Route render={({ location }) => {
          const active = getIsActive(location.pathname, props)
          return React.createElement(component, {
            ...rest,
            className: active ? [className, activeClassName].join(' ') : className,
            style: active ? {...style, ...activeStyle} : style
          })
        }} />
      )
    }
    WhenActive.displayName = `whenActive(${getDisplayName(component)})`
    return WhenActive
  }
}

export default whenActive
