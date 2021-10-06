export default function () {
  const wsOrigin = location.origin.replace('http', 'ws')

  return {
    httpEndpoint: process.env.APOLLO_HTTP || `${location.origin}/graphql`,
    wsEndpoint: process.env.APOLLO_WS || `${wsOrigin}/graphql`
  }
}
