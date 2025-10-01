import { add } from './add'

describe('add', () => {
  it('should be a function', () => {
    expect(typeof add).toBe('function')
  })

  it('returns 0 for empty string', () => {
    expect(add('')).toBe(0)
  })

  it('returns the number for a single value', () => {
    expect(add('1')).toBe(1)
  })

  it('returns the sum for two comma-separated numbers', () => {
    expect(add('1,5')).toBe(6)
  })
})

  it('supports newlines as delimiters along with commas', () => {
    expect(add('1\n2,3')).toBe(6)
  })

  it('supports a custom delimiter declared in a header line', () => {
    expect(add('//;\n1;2')).toBe(3)
  })

  it('throws when a negative number is provided', () => {
    expect(() => add('1,-2,3')).toThrow('negative numbers not allowed -2')
  })

  it('lists all negatives in the error message', () => {
    expect(() => add('-1,-2,3,-4')).toThrow('negative numbers not allowed -1,-2,-4')
  })
