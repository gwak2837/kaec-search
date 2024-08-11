export function toggleFacetFilters(
  facetFiltersGroup: string[][] | null,
  newFacetKey: string,
  newFacetValue: string,
) {
  if (!facetFiltersGroup) {
    return JSON.stringify([[`${newFacetKey}:${newFacetValue}`]])
  }

  let found = false
  const result = []

  for (const facetFilters of facetFiltersGroup) {
    const newFacetFilters = []

    for (const facetFilter of facetFilters) {
      const [facetKey, facetValue] = splitFirst(facetFilter, ':')

      if (facetKey === newFacetKey && facetValue === newFacetValue) {
        found = true
        continue
      }

      newFacetFilters.push(`${facetKey}:${facetValue}`)
    }

    if (newFacetFilters.length > 0) {
      result.push(newFacetFilters)
    }
  }

  if (!found) {
    let inserted = false

    for (const filters of result) {
      if (filters[0].startsWith(`${newFacetKey}:`)) {
        filters.push(`${newFacetKey}:${newFacetValue}`)
        inserted = true
      }
    }

    if (!inserted) {
      result.push([`${newFacetKey}:${newFacetValue}`])
    }
  }

  if (result.length === 0 || (result.length === 1 && result[0].length === 0)) {
    return ''
  }

  return JSON.stringify(result)
}

export function parseFacetFilters(facetFiltersString?: string) {
  const jsonString = facetFiltersString?.replace(/^facetFilters=/, '')

  if (!jsonString) {
    return null
  }

  try {
    return JSON.parse(jsonString) as string[][]
  } catch (error) {
    return null
  }
}

function splitFirst(input: string, separator: string) {
  const index = input.indexOf(separator)

  if (index === -1) {
    return [input]
  }

  return [input.slice(0, index), input.slice(index + 1)]
}
