import { defineConfig, type DefaultTheme } from 'vitepress'
import { miniSearchOptions } from '@manual/theme/search-options.mts'
import { gettingStarted, guides, screens, type Lang, type PageDef } from './nav-data.mts'

const link = (lang: Lang, slug: string) => (lang === 'th' ? `/${slug}` : `/en/${slug}`)
const item = (lang: Lang, p: PageDef) => ({ text: p[lang], link: link(lang, p.slug) })

function sidebar(lang: Lang): DefaultTheme.Sidebar {
  const t = (th: string, en: string) => (lang === 'th' ? th : en)
  return [
    { text: t('เริ่มต้นใช้งาน', 'Getting Started'), items: gettingStarted.map((p) => item(lang, p)) },
    { text: t('ขั้นตอนการทำงาน', 'How-to Guides'), items: guides.map((p) => item(lang, p)) },
    { text: t('คู่มือรายหน้าจอ', 'Screen Reference'), items: screens.map((p) => item(lang, p)) },
  ]
}

export default defineConfig({
  title: 'Carmen Blue คู่มือผู้ดูแล Cluster',
  cleanUrls: true,
  themeConfig: {
    search: { provider: 'local', options: { miniSearch: { options: miniSearchOptions } } },
  },
  locales: {
    root: {
      label: 'ไทย',
      lang: 'th-TH',
      title: 'Carmen Blue คู่มือผู้ดูแล Cluster',
      description: 'คู่มือสำหรับผู้ดูแล Cluster ของเครือโรงแรม',
      themeConfig: {
        sidebar: sidebar('th'),
        outlineTitle: 'ในหน้านี้',
        docFooter: { prev: 'หน้าก่อนหน้า', next: 'หน้าถัดไป' },
        darkModeSwitchLabel: 'ธีม',
        sidebarMenuLabel: 'เมนู',
        returnToTopLabel: 'กลับขึ้นด้านบน',
        langMenuLabel: 'เปลี่ยนภาษา',
        search: {
          provider: 'local',
          options: {
            miniSearch: { options: miniSearchOptions },
            translations: {
              button: { buttonText: 'ค้นหา', buttonAriaLabel: 'ค้นหา' },
              modal: {
                noResultsText: 'ไม่พบผลลัพธ์',
                resetButtonTitle: 'ล้างคำค้นหา',
                footer: { selectText: 'เลือก', navigateText: 'เลื่อน', closeText: 'ปิด' },
              },
            },
          },
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Carmen Blue Cluster Admin Manual',
      description: 'Manual for hotel-group Cluster admins',
      themeConfig: { sidebar: sidebar('en') },
    },
  },
})
