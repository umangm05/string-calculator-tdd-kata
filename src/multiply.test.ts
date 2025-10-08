import { multiply } from './multiply'

describe('multiply', () => {
  it('should be a function', () => {
    expect(typeof multiply).toBe('function')
  })

  it('returns 1 for empty string', () => {
    expect(multiply('')).toBe(1)
  })

  it('returns the number for a single value', () => {
    expect(multiply('1')).toBe(1)
  })

  it('returns the product for two comma-separated numbers', () => {
    expect(multiply('1,5')).toBe(5)
  })
})

  it('supports newlines as delimiters along with commas', () => {
    expect(multiply('1\n2,3')).toBe(6)
  })

  it('supports a custom delimiter declared in a header line', () => {
    expect(multiply('//;\n1;2')).toBe(2)
  })

  it('throws when a negative number is provided', () => {
    expect(() => multiply('1,-2,3')).toThrow('negative numbers not allowed -2')
  })

  it('lists all negatives in the error message', () => {
    expect(() => multiply('-1,-2,3,-4')).toThrow('negative numbers not allowed -1,-2,-4')
  })
