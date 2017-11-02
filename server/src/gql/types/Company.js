import { GQLBase, Schema, Properties } from 'graphql-lattice'

@Schema(/* GraphQL */`
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }
`)
@Properties('name', 'catchPhrase', 'bs')
export class Company extends GQLBase {}

export default Company
