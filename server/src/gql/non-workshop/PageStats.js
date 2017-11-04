import { GQLBase, Schema, Properties, resolver } from 'graphql-lattice'
import fs from 'fs'
import path from 'path'

@Schema(/* GraphQL */`
  type PageStats {
    name: String
    modified: String
    accessed: String
    changed: String
    created: String
    modifiedMS: Int
    accessedMS: Int
    changedMS: Int
    createdMS: Int
    size: Int
  }

  type Query {
    getPageStats(page: String): PageStats
    getPagesStats(pages: [String]): [PageStats]
  }
`)
@Properties(
  'modified', 'accessed', 'changed', 'created',
  'modifiedMS', 'accessedMS', 'changedMS', 'createdMS'
)
export class PageStats extends GQLBase {
  @resolver async getPageStats(express, {page}) {
    let result = await PageStats.fetchContent(page);

    if (result)
      return new PageStats(result)

    return null;
  }

  @resolver async getPagesStats(express, {pages}) {
    let promises = []
    let stats

    promises = pages.map(f => PageStats.fetchContent(f))

    stats = (await Promise.all(promises) || [])
      .map(data => (data && new PageStats(data)) || null)

    return stats.length ? stats : null
  }

  static async fetchContent(content) {
    if (!/\.md\s*$/i.test(content)) {
      content += ".md";
    }

    let filePath = global.fromRoot('content', content)
    let statsPromise = new Promise((resolve, reject) => {
      fs.stat(filePath, (error, stats) => {
        if (error)
          return resolve(null);

        return resolve(stats)
      })
    })

    let [stats] = await Promise.all([statsPromise])

    if (stats) {
      return {
        name: path.basename(content, '.md'),
        modified: stats.mtime,
        accessed: stats.atime,
        changed: stats.ctime,
        created: stats.birthtime,
        modifiedMS: Date.parse(stats.mtime),
        accessedMS: Date.parse(stats.atime),
        changedMS: Date.parse(stats.ctime),
        createdMS: Date.parse(stats.birthtime),
        size: stats.size
      }
    }

    return null;
  }
}
