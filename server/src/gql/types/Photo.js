import { GQLBase, Schema, Properties, resolver, mutator } from 'graphql-lattice'
import { PHOTOS, ALBUMS } from '../../urls'
import { Album } from './Album'
import { URL } from './URL'

import Axios from 'axios'

@Schema(/* GraphQL */`
  type Photo {
    photoId: ID
    album: Album
    title: String
    url: URL
    thumbnailUrl: URL
  }

  type Query {
    findPhoto(id: ID): Photo
    getAllPhotos: [Photo]
  }

  type Mutation {
    createPhoto(
      albumId: ID,
      title: String,
      url: String,
      thumbnailUrl: String
    ): Photo
  }
`)
@Properties('title', ['url', URL], ['thumbnailUrl', URL], ['photoId', 'id'])
export class Photo extends GQLBase {
  async album() {
    let { data } = await Axios.get(`${ALBUMS}/${this.getModel().id}`)

    return new Album(data, this.requestData)
  }

  @resolver async findPhoto(requestData, {id}) {
    let { data } = await Axios.get(`${PHOTOS}/${id}`)

    return new Photo(data, requestData)
  }

  @resolver async getAllPhotos(requestData) {
    let { data } = await Axios.get(`${PHOTOS}`)
    let photos = data.map(photo => new Photo(photo, requestData))

    return photos
  }

  @mutator async createPhoto(requestData, photoModel) {
    let { data } = await Axios.post(`${PHOTOS}`, photoModel)

    return new Photo(data, requestData)
  }
}

export default Photo
