import React, { PropTypes } from 'react'
import { matchPath } from 'react-router'
import { getDisplayName } from './helpers'

const whenActive = (options = {}) => {
  const {
    exact = false,
    strict = false,
    pathProp = 'to',
    className:activeClassName,
    style:activeStyle,
    isActive:getIsActive = (pathname, props) => {
      const match = matchPath(pathname, { path: props[pathProp], exact, strict })
      return !!match
    }
  } = options

  return (component) => {
    const WhenActive = (props, { router }) => {
      const {
        className = '',
        style = {},
        ...rest
      } = props
      const { route } = router
      const location = route.location
      const active = getIsActive(location.pathname, props)
      
      return React.createElement(component, {
        ...rest,
        className: active ? [className, activeClassName].join(' ') : className,
        style: active ? {...style, ...activeStyle} : style
      })
    }

    WhenActive.contextTypes = {
      router: PropTypes.shape({
        route: PropTypes.shape({
          location: PropTypes.object.isRequired
        }).isRequired
      }).isRequired
    }

    WhenActive.displayName = `whenActive(${getDisplayName(component)})`
    
    return WhenActive
  }
}

export default whenActive
