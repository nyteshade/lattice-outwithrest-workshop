import { GQLBase, Properties, Schema, resolver } from 'graphql-lattice'
import { Address } from './Address'
import { Company } from './Company'
import { USERS } from '../../urls'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type User {
    userId: ID
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }

  type Query {
    findUser(id: ID): User
    getAllUsers: [User]
  }
`)
@Properties(
  ['userId', 'id'], ['address', Address], ['company', Company],
  'name', 'username', 'email', 'phone', 'website'
)
export class User extends GQLBase {
  @resolver async findUser(requestData, {id}) {
    let { data } = await Axios.get(`${USERS}/${id}`)

    return new User(data, requestData)
  }

  @resolver async getAllUsers(requestData) {
    let { data } = await Axios.get(`${USERS}`)
    let users = data.map(model => new User(model, requestData))

    return users
  }
}

export default User
