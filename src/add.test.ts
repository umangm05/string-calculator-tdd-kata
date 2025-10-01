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
