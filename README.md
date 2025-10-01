# String Calculator TDD Kata (TypeScript + Jest)

This project implements a growing `add(numbers: string): number` function using Test-Driven Development (TDD).

## Getting started

- Install dependencies: `npm install`
- Run tests: `npm test`
- Watch tests: `npm run test:watch`

Tests are written in `src/add.test.ts`, and the implementation is in `src/add.ts`.

## Current behavior and test cases

1. Empty input returns 0
   - Test: calling `add("")` returns `0`.
   - Handling: early return when the input string is empty.

2. Single number returns its value
   - Test: `add("1")` returns `1`.
   - Handling: after parsing, if there is only one numeric token, return it directly.

3. Two (or more) comma-separated numbers are summed
   - Test: `add("1,5")` returns `6`.
   - Handling: split by the active delimiter (default `,`), convert to numbers, reduce by summation.

4. Newlines are valid delimiters (in addition to commas)
   - Test: `add("1\n2,3")` returns `6`.
   - Handling: normalize newlines to the active delimiter before splitting, so both `,` and `\n` separate numbers.

5. Support a custom delimiter declared in a header line
   - Test: `add("//;\n1;2")` returns `3`.
   - Handling: if the string starts with `//<delimiter>\n`, parse the custom delimiter and strip the header. Then treat that delimiter as the active separator. Newlines in the body are normalized to this delimiter so they also act as separators.

6. Negative numbers cause an exception listing all negatives
   - Test: `add("1,-2,3")` throws `"negative numbers not allowed -2"`.
   - Test: `add("-1,-2,3,-4")` throws `"negative numbers not allowed -1,-2,-4"`.
   - Handling: after tokenizing and converting to numbers, collect all values `< 0`. If any exist, throw an `Error` with the message `negative numbers not allowed <neg1,neg2,...>` (negatives joined by commas). No sum is returned in this case.

## Implementation notes (src/add.ts)

High-level flow of `add(numbers: string): number`:
- Return `0` immediately for an empty input string.
- Detect an optional custom delimiter header using the pattern `^//(.+)\n`:
  - If present, set that as the active delimiter and remove the header from the working string.
  - If absent, the active delimiter defaults to `,`.
- Replace all `\n` characters in the remaining string with the active delimiter so both line breaks and the delimiter act as separators.
- Split by the active delimiter and filter out empty tokens.
- Convert tokens to numbers.
- If any numbers are negative, throw `Error("negative numbers not allowed <comma-separated-negatives>")`.
- If only one number remains, return it; otherwise, sum and return the total.
