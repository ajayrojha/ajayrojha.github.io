import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'site_theme';
const THEME_COLORS = { light: '#f6f2ea', dark: '#1f1e1c' };

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function savedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

// Switches between the soft dark and warm light themes. Until the visitor
// chooses, the site follows the device's light/dark setting.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => savedTheme() || systemTheme());

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  // Keep following the device setting while no explicit choice is saved
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: light)');
    if (!query) return undefined;
    const onChange = () => {
      if (!savedTheme()) setTheme(systemTheme());
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice just won't persist
    }
    setTheme(next);
  };

  const nextLabel = theme === 'light' ? 'Dark' : 'Light';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel.toLowerCase()} theme`}
      title={`Switch to ${nextLabel.toLowerCase()} theme`}
    >
      {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
      {nextLabel}
    </button>
  );
}
