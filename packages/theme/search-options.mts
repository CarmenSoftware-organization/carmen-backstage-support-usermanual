// Thai has no spaces between words, so MiniSearch's default tokenizer cannot match mid-word queries.
// Intl.Segmenter splits Thai into words; Latin text is still split on spaces and punctuation.
// Used by the build (indexing, in config.mts) and by the browser (queries, in theme/index.ts).
const segmenter = new Intl.Segmenter('th', { granularity: 'word' })

export function tokenize(text: string): string[] {
  const out: string[] = []
  for (const s of segmenter.segment(text)) if (s.isWordLike) out.push(s.segment)
  return out
}

export const miniSearchOptions = { tokenize }
