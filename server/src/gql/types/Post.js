import { GQLBase, Schema, Properties, resolver } from 'graphql-lattice'
import { POSTS } from '../../urls'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type Post {
    postId: ID
    userId: ID
    title: String
    body: String
  }

  type Query {
    getAllPosts: [Post]
  }
`)
@Properties(['postId', 'id'], 'title', 'body')
export class Post extends GQLBase {
  @resolver async getAllPosts(requestData) {
    let { data } = await Axios.get(POSTS)
    let posts = data.map(model => new Post(model, requestData))

    return posts
  }
}
