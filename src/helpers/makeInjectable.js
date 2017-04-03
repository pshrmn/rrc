import React from 'react'
import warning from 'warning'

export default (route) => {
  if (!route.inject) {
    return route
  } else if (!route.component) {
    warning(
      false,
      'The inject property can only be used with the component property of a route'
    )
    return route    
  }
  const routeCopy = Object.assign({}, route, {
    render: (props) => React.createElement(
      route.component,
      { ...props, ...route.inject }
    )
  })
  delete routeCopy.component
  return routeCopy
}
