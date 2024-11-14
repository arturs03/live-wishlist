import Crawler from 'crawler'
import type { ICrawledData } from '@@/shared/types'
// import { saveFile } from '../utils/file'
import { universalParser } from '../utils/parsers'
import { DATA_SOURCES } from '../utils/constants'

export default defineEventHandler(async (event) => {
  const query = getQuery<{ item: string }>(event)

  if (!query.item) {
    throw createError('No item provided')
  }

  const crawler = new Crawler({
    rateLimit: 50,
    callback: (error) => {
      if (error) {
        console.log(error)
      }
    },
  })

  const response: ICrawledData[] = []

  for (let index = 0; index < DATA_SOURCES.length; index++) {
    const source = DATA_SOURCES[index]

    const crawledData = await crawler
      .send({
        url: `${source.url}${encodeURIComponent(query.item)}`,
        callback: (error, response) => {
          const $ = response?.$
          if (!response || !$) {
            console.log('Failed to receive body')

            return
          }

          return universalParser($, source.selectors)
        },
      })
      .catch((e) => {
        console.log('Failed to fetch:', e)
      })

    if (crawledData?.length) {
      response.push(crawledData)
    }
  }

  if (!response?.length) {
    return
  }

  // saveFile('./data/prices.json', response)
})
