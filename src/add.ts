export function add(numbers: string): number {
  if (numbers === '') return 0
  // Support custom delimiter header: "//<delimiter>\n"
  let working = numbers
  let delimiter = ','
  const customDelimMatch = working.match(/^\/\/(.+)\n/)
  if (customDelimMatch) {
    delimiter = customDelimMatch[1]
    working = working.slice(customDelimMatch[0].length)
  }

  const normalized = working.replace(/\n/g, delimiter)
  const parts = normalized.split(delimiter).filter(Boolean)
  const values = parts.map(Number)
  const negatives = values.filter((n) => n < 0)
  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed ${negatives.join(',')}`)
  }
  if (values.length === 1) return values[0]
  return values.reduce((sum, value) => sum + value, 0)
}
