import { GQLBase, Schema, Properties, resolver } from 'graphql-lattice'
import { PageStats } from './PageStats'
import fs from 'fs'
import path from 'path'

@Schema(/* GraphQL */`
  type Page {
    name: String
    content: String
    length: Int
    stats: PageStats
  }

  type Query {
    getPage(content: String): Page
    getPages(contents: [String]): [Page]
    getNamedPages(contents: [String]): JSON
  }
`)
@Properties('name', 'content', 'length', 'stats')
export class Page extends GQLBase {
  static async fetchContent(content) {
    if (!/\.md\s*$/i.test(content)) {
      content += ".md";
    }

    let filePath = global.fromRoot('content', content)
    let markdownPromise = new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, buffer) => {
        if (error)
          return resolve(null);

        return resolve(buffer.toString())
      })
    })

    let statsPromise = PageStats.fetchContent(content)

    let [markdown, stats] = await Promise.all([markdownPromise, statsPromise])

    if (markdown || stats) {
      return {
        name: path.basename(content, '.md'),
        content: markdown || null,
        length: (markdown && markdown.length) || null,
        stats: stats || null
      }
    }

    return null;
  }

  @resolver async getPage(requestData, {content}) {
    let result = await Page.fetchContent(content);

    if (result)
      return new Page(result)

    return null;
  }

  @resolver async getPages(requestData, {contents}) {
    let promises = []
    let pages

    promises = contents.map(f => Page.fetchContent(f))

    pages = (await Promise.all(promises) || [])
      .map(data => (data && new Page(data)) || null)

    return pages.length ? pages : null
  }

  @resolver async getNamedPages(requestData, {contents}) {
    let promises = []
    let pages

    promises = contents.map(f => Page.fetchContent(f))

    pages = (await Promise.all(promises) || [])
      .map(data => data || null)
      .reduce((p,c) => { if (c) { p[c.name] = c } return p }, {})

    return pages
  }
}
