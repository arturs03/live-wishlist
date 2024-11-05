export function groupArray<T>(array: T[], groupSize = 2) {
  let result = []
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize))
  }
  
  return result
}
