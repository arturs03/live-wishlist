export function removeNonNumericCharacters(input: string) {
  return Number(input.replace(/[^0-9]/g, ''))
}
