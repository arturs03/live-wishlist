import reduce from 'lodash/reduce'
import type { ICrawledData } from '@@/shared/types'

export default function (arr1: ICrawledData[], arr2: ICrawledData[]) {
  const combined = [...arr1, ...arr2]

  return reduce(
    combined,
    (acc: ICrawledData[], item: ICrawledData) => {
      const existing = acc.find((obj) => obj.link === item.link)

      if (existing) {
        // If URL exists, push data to the history array
        if (!existing.history) {
          existing.history = existing.history
        }

        existing.history.push({ price: item.price, crawlDate: item.crawlDate })
      } else {
        // If URL does not exist, add the item directly
        acc.push({ ...item })
      }

      return acc
    },
    []
  )
}
