import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { miniSearchOptions } from '../search-options.mts'

// Functions in themeConfig are dropped when VitePress serializes site data to the browser,
// so the search tokenizer is attached here on the client instead.
export default {
  extends: DefaultTheme,
  enhanceApp({ siteData }) {
    const apply = (themeConfig: any) => {
      const search = themeConfig?.search
      if (search?.provider === 'local') {
        search.options = { ...search.options, miniSearch: { ...search.options?.miniSearch, options: miniSearchOptions } }
      }
    }
    apply(siteData.value.themeConfig)
    for (const l of Object.values(siteData.value.locales ?? {})) apply((l as any).themeConfig)
  },
} satisfies Theme
