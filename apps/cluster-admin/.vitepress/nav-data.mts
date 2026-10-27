// Single source for page slugs and on-screen labels of the Cluster Admin manual
// (labels from carmen-backstage src/i18n th.ts / en.ts). Screen order follows
// carmen-backstage src/components/nav/clusterAdminNav.ts.

export type Lang = 'th' | 'en'
export type Kind = 'guide' | 'screen' | 'info'

export interface PageDef {
  /** path under the app folder (and its en/), no extension */
  slug: string
  kind: Kind
  th: string
  en: string
}

const page = (slug: string, kind: Kind, th: string, en: string): PageDef => ({ slug, kind, th, en })

export const gettingStarted: PageDef[] = [
  page('getting-started/sign-in', 'info', 'เข้าสู่ระบบ', 'Sign In'),
  page('getting-started/choose-cluster', 'info', 'เลือก Cluster', 'Choose a Cluster'),
  page('getting-started/main-screen', 'info', 'รู้จักหน้าจอหลัก', 'The Main Screen'),
  page('glossary', 'info', 'อภิธานศัพท์', 'Glossary'),
  page('getting-help', 'info', 'ติดต่อ support', 'Getting Help'),
]

export const guides: PageDef[] = [
  page('guides/invite-user', 'guide', 'เชิญผู้ใช้เข้าหน่วยธุรกิจ', 'Invite a User to a Business Unit'),
  page('guides/manage-bu-people', 'guide', 'จัดการคนในหน่วยธุรกิจ', 'Manage People in a Business Unit'),
  page('guides/manage-seats', 'guide', 'จัดการที่นั่ง (Seat)', 'Manage Seats'),
  page('guides/licences', 'guide', 'ดูไลเซนส์และวันหมดอายุ', 'Check Licenses and Expiry'),
  page('guides/bu-settings', 'guide', 'ดูค่าตั้งค่าหน่วยธุรกิจ', 'View Business Unit Settings'),
]

export const screens: PageDef[] = [
  page('screens/cluster', 'screen', 'Cluster', 'Cluster'),
  page('screens/business-units', 'screen', 'หน่วยธุรกิจ', 'Business Units'),
  page('screens/business-unit-detail', 'screen', 'หน้าหน่วยธุรกิจ', 'A Business Unit'),
  page('screens/users', 'screen', 'ผู้ใช้งาน', 'Users'),
  page('screens/licences', 'screen', 'ไลเซนส์', 'Licenses'),
  page('screens/profile', 'screen', 'โปรไฟล์', 'Profile'),
]

export const allPages: PageDef[] = [...gettingStarted, ...guides, ...screens]
