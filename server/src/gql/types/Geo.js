import { GQLBase, Schema, Properties } from 'graphql-lattice'

@Schema(/* GraphQL */`
  type Geo {
    latitude: Float,
    longitude: Float
  }
`)
@Properties(['latitude', 'lat'], ['longitude', 'lng'], 'lat', 'lng')
export class Geo extends GQLBase {}

export default Geo
