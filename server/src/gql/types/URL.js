import { GQLBase, Schema, Properties } from 'graphql-lattice'
import NodeURL from 'url'

@Schema(/* GraphQL */`
  type URL {
    protocol: String
    slashes: Boolean
    auth: String
    host: String
    port: Int
    hostname: String
    hash: String
    search: String
    query: String
    queryParams: JSON
    pathname: String
    path: String
    href: String
  }
`)
@Properties(
  'protocol', 'slashes', 'auth', 'host', 'port', 'hostname',
  'hash', 'search', 'query', 'pathname', 'path', 'href'
)
export class URL extends GQLBase {
  constructor(model, requestData) {
    if (typeof model === 'string') {
      model = NodeURL.parse(model)
    }

    super(model, requestData)
  }

  get queryParams() {
    if (!this.getModel().query) return []

    let parts = this.getModel().query.split('&')
    let pairs = parts
      .reduce((p, c) => {
        let [ key, value ] = c
          .split('=')
          .map(v => decodeURIComponent(String(v)))

        if (p[key]) {
          if (!Array.isArray(p[key])) {
            p[key] = [p[key]]
          }

          p[key].push(value)
        }
        else {
          p[key] = value
        }

        return p
      }, {})

      return pairs
  }
}

export default URL
