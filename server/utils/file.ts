import { existsSync, writeFileSync, readFileSync, statSync } from 'fs'
import type { ICrawledData } from '@@/shared/types'
import mergeArrays from './mergeArrays'

export function saveFile(path: string, newData: ICrawledData[]) {
  try {
    if (!existsSync(path) || !statSync(path).size) {
      writeFileSync(path, JSON.stringify(newData, null, 2), 'utf-8')
      console.log('File created with initial data')
    } else {
      const fileData: ICrawledData[] = JSON.parse(readFileSync(path, 'utf-8'))
      const updatedFileData = mergeArrays(fileData, newData)

      writeFileSync(path, JSON.stringify(updatedFileData, null, 2), 'utf-8')
      console.log('File updated successfully')
    }
  } catch (error: any) {
    console.error('Error updating file:', error.message)
  }
}
