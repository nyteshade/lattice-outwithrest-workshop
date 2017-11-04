import { GQLBase, Schema, Properties, resolver, mutator } from 'graphql-lattice'
import { ALBUMS, USERS } from '../../urls'
import { User } from './User'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type Album {
    albumId: ID
    user: User
    title: String
  }

  type Query {
    findAlbum(id: ID): TODO
    getAllAlbums: [TODO]
  }

  type Mutation {
    createAlbum(title: String, userId: ID): Album
  }
`)
@Properties('title', ['albumId', 'id'])
export class Album extends GQLBase {
  async user() {
    let { data } = await Axios.get(`${USERS}/${this.getModel().userId}`)

    return new User(data, this.requestData)
  }

  @resolver async findAlbums(requestData, {id}) {
    let { data } = await Axios.get(`${ALBUMS}/${id}`)

    return new Album(data, requestData)
  }

  @resolver async getAllAlbums(requestData) {
    let { data } = await Axios.get(`${ALBUMS}`)
    let albums = data.map(album => new Album(album, requestData))

    return albums
  }

  @mutator async createAlbum(requestData, albumModelData) {
    let { data } = await Axios.post(`${ALBUMS}`, albumModelData)

    return new Album(data, requestData)
  }
}

export default Album
