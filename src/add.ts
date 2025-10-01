export function add(numbers: string): number {
  if (numbers === '') return 0
  const parts = numbers.split(',').filter(Boolean)
  return parts.map(Number).reduce((sum, value) => sum + value, 0)
}
