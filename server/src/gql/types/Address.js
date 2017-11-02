import { GQLBase, Schema, Properties, resolver } from 'graphql-lattice'
import { ZipCode } from './ZipCode'
import { Geo } from './Geo'

@Schema(/* GraphQL */`
  type Address {
    street: String
    suite: String
    city: String
    zipcode: ZipCode
    geo: Geo
  }
`)
@Properties('street', 'suite', 'city', ['zipcode', ZipCode], ['geo', Geo])
export class Address extends GQLBase {}

export default Address;
