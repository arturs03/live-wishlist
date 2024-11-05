import Crawler from 'crawler'
import type { ICrawledData } from '@@/shared/types'
import { removeNonNumericCharacters } from '@@/shared/utils'
import { saveFile } from '../utils/file'
import { extractValues } from '../utils/domJquery'

export default defineEventHandler(async (event) => {
  const query = getQuery<{ url: string }>(event)

  const crawler = new Crawler({
    rateLimit: 50,
    callback: (error, res) => {
      if (error) {
        console.log(error)
      }
    },
  })

  const response: ICrawledData[] = await crawler.send({
    url: query.url,
    callback: (error, response) => {
      if (!response && response.statusCode) {
        console.log('Failed to receive body')
      }

      const $ = response.$

      const title = extractValues($, '.msg2')
      const prices = extractValues($, '.msga2-o.pp6')
      const links = extractValues($, '.msga2 a', 'href')
      const images = extractValues($, '.msga2 img', 'src')

      return title.map((val: string, i: number) => {
        const item = {
          title: val,
          link: links[i] ?? '',
          price: prices[i] ?? '',
          img: images[i] ?? '',
          crawlDate: new Date().toISOString(),
        }

        return {
          ...item,
          price: removeNonNumericCharacters(item.price),
          history: [
            {
              crawlDate: item.crawlDate,
              price: removeNonNumericCharacters(item.price),
            },
          ],
        }
      })
    },
  })

  if (!response.length) {
    return
  }

  saveFile('./data/ss.json', response)
})
