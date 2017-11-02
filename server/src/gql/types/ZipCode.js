import { GQLBase, Schema, Properties } from 'graphql-lattice'

@Schema(/* GraphQL */`
  type ZipCode {
    primary: Int
    secondary: Int
    string: String
  }
`)
@Properties('primary', 'secondary')
export class ZipCode extends GQLBase {
  get string() {
    let { primary, secondary } = this.getModel()

    return `${primary}-${secondary}`
  }

  constructor(model, requestData) {
    if (typeof model === 'string') {
      let parts = model.split('-')
      model = {
        primary: parts.length ? parts[0] : null,
        secondary: parts.length > 1 ? parts[1] : null
      }
    }

    super(model, requestData)
  }
}

export default ZipCode
