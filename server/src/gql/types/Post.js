import { GQLBase, Schema, Properties, resolver, mutator } from 'graphql-lattice'
import { User } from './User'
import { POSTS, USERS } from '../../urls'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type Post {
    postId: ID
    userId: ID
    title: String
    body: String
    user: User
  }

  type Query {
    findPost(id: ID): Post
    getAllPosts: [Post]
  }

  type Mutation {
    createPost(title: String, body: String, userId: ID): Post
  }
`)
@Properties(['postId', 'id'], 'title', 'body')
export class Post extends GQLBase {
  async user() {
    let { data } = await Axios.get(`${USERS}/${this.model.userId}`)

    return new User(data)
  }

  @resolver async findPost(requestData, {id}) {
    let { data } = await Axios.get(`${POSTS}/${id}`)

    return new Post(data, requestData)
  }

  @resolver async getAllPosts(requestData) {
    let { data } = await Axios.get(POSTS)
    let posts = data.map(model => new Post(model, requestData))

    return posts
  }

  @mutator async createPost(requestData, params) {
    let { data } = await Axios.post(POSTS, params)

    return new Post(data, requestData)
  }
}
