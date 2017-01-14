import React from 'react'
import { Route } from 'react-router'
import { getDisplayName } from '../helpers'

// const ActiveLink = whenActive({ className: 'active' })(Link)
const whenActive = (options = {}) => {
  const {
    exact = false,
    pathProp = 'to',
    className:activeClassName,
    style:activeStyle
  } = options

  return (component) => {
    const WhenActive = ({ className = '', style = {}, ...rest}) => {
      const path = rest[pathProp]
      return React.createElement(Route, {
        path: typeof path === 'object' ? path.pathname : path,
        children: ({ match }) => {
          const isActive = !!match
          const isExact = match && match.isExact
          const active = exact ? isExact && isActive : isActive
          return React.createElement(component, {
            className: active ? [className, activeClassName].join(' ') : className,
            style: active ? {...style, ...activeStyle} : style,
            ...rest
          })
        }
      })
    }
    WhenActive.displayName = `whenActive(${getDisplayName(component)})`
    return WhenActive
  }
}

export default whenActive
