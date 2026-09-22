// __LAST_UPDATED__ is injected at build time by vite.config.js (latest git commit date)
export const LAST_UPDATED_ISO = __LAST_UPDATED__;

export const LAST_UPDATED_LABEL = new Date(LAST_UPDATED_ISO).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
