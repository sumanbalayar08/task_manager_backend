/**
 * @fileoverview Text case conversion utilities
 * Converts various text formats to title case with proper word separation
 */

// Convert various text formats to title case with proper word separation
export function titleNameToCase(inputString: string): string {
  if (!inputString) return ''

  // Step 1: Replace underscores and hyphens with spaces
  const normalized = inputString.replace(/[_-]+/g, ' ')

  // Step 2: Split into tokens:
  // - Words/numbers (continuous alphanumerics)
  // - Special characters separately
  // - Also split camelCase boundaries inside words
  // Regex explained:
  //   [A-Z]?[a-z]+|[A-Z]+(?![a-z])  --> captures words including acronyms and camelCase parts
  //   |\d+                          --> numbers
  //   |[^A-Za-z0-9\s]              --> special chars
  const tokens = normalized.match(/([A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+|[^A-Za-z0-9\s])/g) || []

  // Step 3: Capitalize words/numbers; keep special chars as is
  const parts = tokens.map((token) => {
    if (/^[A-Za-z0-9]+$/.test(token)) {
      const lower = token.toLowerCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    } else {
      // special char - keep as is
      return token
    }
  })

  // Step 4: Join with spaces
  return parts.join(' ')
}
