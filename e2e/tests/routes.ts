/**
 * Every exported route of the app, used by the smoke and visual suites.
 * Keep this list in sync with src/app/**\/page.tsx.
 */
export const routes = [
  '/',
  '/Animated',
  '/about',
  '/about/biography',
  '/about/education',
  '/about/experience',
  '/about/info',
  '/about/language',
  '/about/project',
  '/about/skill',
  '/admin',
  '/admin/rbac/resource',
  '/admin/rbac/role',
  '/admin/rbac/role/temp_[id]',
  '/admin/rbac/user',
  '/admin/tuple',
  '/admin/tuple/graph',
  '/admin/tuple/tree',
  '/auth',
  '/blog',
  '/cyberpunk',
  '/glass',
  '/hacker',
] as const;
