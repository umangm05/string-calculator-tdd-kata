# String Calculator TDD Kata (TypeScript + Jest) - Multiplication Version

This project implements a growing `multiply(numbers: string): number` function using Test-Driven Development (TDD).

## Getting started

- Install dependencies: `npm install`
- Run tests: `npm test`
- Watch tests: `npm run test:watch`

Tests are written in `src/multiply.test.ts`, and the implementation is in `src/multiply.ts`.

## Current behavior and test cases

1. Empty input returns 1
   - Test: calling `multiply("")` returns `1`.
   - Handling: early return when the input string is empty (multiplicative identity).

2. Single number returns its value
   - Test: `multiply("1")` returns `1`.
   - Handling: after parsing, if there is only one numeric token, return it directly.

3. Two (or more) comma-separated numbers are multiplied
   - Test: `multiply("1,5")` returns `5`.
   - Handling: split by the active delimiter (default `,`), convert to numbers, reduce by multiplication.

4. Newlines are valid delimiters (in addition to commas)
   - Test: `multiply("1\n2,3")` returns `6`.
   - Handling: normalize newlines to the active delimiter before splitting, so both `,` and `\n` separate numbers.

5. Support a custom delimiter declared in a header line
   - Test: `multiply("//;\n1;2")` returns `2`.
   - Handling: if the string starts with `//<delimiter>\n`, parse the custom delimiter and strip the header. Then treat that delimiter as the active separator. Newlines in the body are normalized to this delimiter so they also act as separators.

6. Negative numbers cause an exception listing all negatives
   - Test: `multiply("1,-2,3")` throws `"negative numbers not allowed -2"`.
   - Test: `multiply("-1,-2,3,-4")` throws `"negative numbers not allowed -1,-2,-4"`.
   - Handling: after tokenizing and converting to numbers, collect all values `< 0`. If any exist, throw an `Error` with the message `negative numbers not allowed <neg1,neg2,...>` (negatives joined by commas). No product is returned in this case.

## Implementation notes (src/multiply.ts)

High-level flow of `multiply(numbers: string): number`:
- Return `1` immediately for an empty input string (multiplicative identity).
- Detect an optional custom delimiter header using the pattern `^//(.+)\n`:
  - If present, set that as the active delimiter and remove the header from the working string.
  - If absent, the active delimiter defaults to `,`.
- Replace all `\n` characters in the remaining string with the active delimiter so both line breaks and the delimiter act as separators.
- Split by the active delimiter and filter out empty tokens.
- Convert tokens to numbers.
- If any numbers are negative, throw `Error("negative numbers not allowed <comma-separated-negatives>")`.
- Multiply all numbers together and return the product.

## Differences from Addition Version

- Empty input returns `1` instead of `0` (multiplicative vs additive identity)
- Numbers are multiplied instead of summed
- No filtering of numbers > 1000 (all numbers are included in the product)
- No support for multiple delimiters or multi-character delimiters (simplified version)

This README reflects the current feature set covered by tests in `src/multiply.test.ts`. The implementation focuses on core multiplication functionality with delimiter support and negative number validation.
