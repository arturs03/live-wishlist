import { readFileSync } from 'fs'
import { ICrawledData } from '@@/shared/types'

export default defineEventHandler((event) => {
  const data: ICrawledData[] = JSON.parse(
    readFileSync('./data/ss.json', 'utf-8')
  )

  if (!data?.length) {
    return []
  }

  return data
})
