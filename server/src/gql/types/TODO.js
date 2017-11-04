import { GQLBase, Schema, Properties, resolver, mutator } from 'graphql-lattice'
import { TODOS, USERS } from '../../urls'
import { User } from './User'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type TODO {
    toDoId: ID
    user: User
    title: String
    completed: Boolean
  }

  type Query {
    findToDo(id: ID): TODO
    getAllToDos: [TODO]
  }
`)
@Properties('title', 'completed', ['toDoId', 'id'])
export class TODO extends GQLBase {
  async user() {
    let { data } = await Axios.get(`${USERS}/${this.getModel().userId}`)

    return new User(data, this.requestData)
  }

  @resolver async findToDo(requestData, {id}) {
    let { data } = await Axios.get(`${TODOS}/${id}`)

    return new TODO(data, requestData)
  }

  @resolver async getAllToDos(requestData) {
    let { data } = await Axios.get(`${TODOS}`)
    let todos = data.map(todo => new TODO(todo, requestData))

    return todos
  }
}

export default TODO
