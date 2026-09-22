import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

// Date of the latest commit, so the site's "Last updated" reflects the deployed content
function lastUpdated() {
  try {
    return execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    return new Date().toISOString()
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths so it works seamlessly on GitHub Pages regardless of repo name
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated()),
  },
})
