// Single source for page slugs and on-screen labels (from carmen-backstage src/i18n th.ts / en.ts).
// Screen Reference order follows carmen-backstage src/components/nav/platformNav.ts.

export type Lang = 'th' | 'en'
export type Kind = 'guide' | 'screen' | 'info'

export interface PageDef {
  /** path under site/ (and site/en/), no extension */
  slug: string
  kind: Kind
  th: string
  en: string
}

export interface GroupDef {
  th: string
  en: string
  items: PageDef[]
}

const screen = (slug: string, th: string, en: string): PageDef => ({ slug: `screens/${slug}`, kind: 'screen', th, en })

export const gettingStarted: PageDef[] = [
  { slug: 'getting-started/login', kind: 'info', th: 'เข้าสู่ระบบ', en: 'Sign In' },
  { slug: 'getting-started/main-screen', kind: 'info', th: 'รู้จักหน้าจอหลัก', en: 'The Main Screen' },
  { slug: 'getting-started/common-actions', kind: 'info', th: 'การใช้งานทั่วไป', en: 'Common Actions' },
  { slug: 'glossary', kind: 'info', th: 'อภิธานศัพท์', en: 'Glossary' },
]

export const guides: PageDef[] = [
  { slug: 'guides/setup-hotel', kind: 'guide', th: 'ตั้งค่าโรงแรมใหม่', en: 'Set Up a New Hotel' },
  { slug: 'guides/add-user', kind: 'guide', th: 'เพิ่มผู้ใช้', en: 'Add a User' },
  { slug: 'guides/manage-license', kind: 'guide', th: 'จัดการ License', en: 'Manage a License' },
]

// Dashboard and Profile sit outside the sidebar groups.
export const dashboard: PageDef = screen('dashboard', 'Dashboard', 'Dashboard')
export const profile: PageDef = screen('profile', 'โปรไฟล์', 'Profile')

export const screenGroups: GroupDef[] = [
  {
    th: 'องค์กร', en: 'Organization',
    items: [
      screen('organization/clusters', 'Clusters', 'Clusters'),
      screen('organization/business-units', 'หน่วยธุรกิจ', 'Business Units'),
      screen('organization/tenant-migrations', 'Tenant Migrations', 'Tenant Migrations'),
      screen('organization/tenant-seeds', 'Tenant Seed Data', 'Tenant Seed Data'),
      screen('organization/data-import', 'นำเข้าข้อมูล', 'Data Import'),
      screen('organization/users', 'ผู้ใช้งาน', 'Users'),
    ],
  },
  {
    th: 'จัดการใบอนุญาต', en: 'License Management',
    items: [
      screen('license/licenses', 'ไลเซนส์', 'Licenses'),
      screen('license/license-feature-groups', 'กลุ่มสิทธิ์ license', 'License Feature Groups'),
      screen('license/license-features', 'ฟีเจอร์ที่ขายได้', 'License Features'),
    ],
  },
  {
    th: 'เนื้อหา', en: 'Content',
    items: [
      screen('content/report-templates', 'เทมเพลตรายงาน', 'Report Templates'),
      screen('content/form-groups', 'กลุ่มฟอร์ม', 'Form Groups'),
      screen('content/dashboard-templates', 'แม่แบบแดชบอร์ด', 'Dashboard Templates'),
      screen('content/news', 'ข่าวสาร', 'News'),
      screen('content/broadcasts', 'ประกาศ', 'Broadcasts'),
    ],
  },
  {
    th: 'การวิเคราะห์', en: 'Analytics',
    items: [
      screen('analytics/usage-analytics', 'สถิติการใช้งาน', 'Usage Analytics'),
      screen('analytics/activity-events', 'บันทึกกิจกรรม', 'Activity Events'),
    ],
  },
  {
    th: 'งานตามเวลา', en: 'Scheduling',
    items: [screen('scheduling/scheduled-jobs', 'งานตามเวลา', 'Scheduled Jobs')],
  },
  {
    th: 'Platform', en: 'Platform',
    items: [
      screen('platform/platform-config', 'ตั้งค่า', 'Platform Config'),
      screen('platform/email-settings', 'ตั้งค่าอีเมล', 'Email Settings'),
      screen('platform/applications', 'แอปพลิเคชัน', 'Applications'),
      screen('platform/platform-roles', 'บทบาท', 'Platform Roles'),
      screen('platform/platform-users', 'ผู้ใช้', 'Platform Users'),
      screen('platform/super-admins', 'ผู้ดูแลระบบสูงสุด', 'Super Admins'),
      screen('platform/feature-flags', 'สวิตช์ฟีเจอร์', 'Feature Flags'),
    ],
  },
  {
    th: 'ฐานข้อมูล', en: 'Database',
    items: [
      screen('database/platform-migrations', 'Migration แพลตฟอร์ม', 'Platform Migrations'),
      screen('database/sql-workbench', 'SQL Workbench', 'SQL Workbench'),
      screen('database/database-pools', 'Database Pools', 'Database Pools'),
    ],
  },
]

export const allPages: PageDef[] = [
  ...gettingStarted,
  ...guides,
  dashboard,
  profile,
  ...screenGroups.flatMap((g) => g.items),
]
