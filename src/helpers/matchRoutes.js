import matchPath from 'react-router/matchPath'

export default function matchRoutes(routes, pathname, parent) {
  let match = null
  let route = null
  const routeLength = routes.length
  let r = 0
  while (match == null && r < routeLength) {
    match = matchPath(pathname, routes[r], parent)
    if (match) {
      route = routes[r]
    }
    r++
  }

  return { match, route }
}
