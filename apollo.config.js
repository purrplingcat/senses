export default function (context) {
  const config = context.$config.apollo
  const wsOrigin = location.origin.replace('http', 'ws')

  return {
    httpEndpoint: config.httpEndpoint || `${location.origin}/graphql`,
    wsEndpoint: config.wsEndpoint || `${wsOrigin}/graphql`
  }
}
