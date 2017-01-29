export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function removeRouterProps(props) {
  const routerProps = [
    'block',
    'canGo',
    'createHref',
    'entries',
    'go',
    'goBack',
    'goForward',
    'index',
    'length',
    'listen',
    'location',
    'push',
    'replace',
    'staticContext'
  ]
  routerProps.forEach(p => {
    delete props[p]
  })
  return props
}
