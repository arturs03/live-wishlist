import { readFileSync, existsSync } from 'fs'
import type { ICrawledData } from '@@/shared/types'

export default defineEventHandler(() => {
  const path = './data/prices.json'
  const fileData = existsSync(path) && readFileSync(path, 'utf-8')

  if (!fileData) {
    return []
  }

  console.log(fileData)

  const data: ICrawledData[] = JSON.parse(fileData) ?? []

  return data
})
