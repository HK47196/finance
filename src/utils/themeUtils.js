/**
 * Applies the selected theme to the document.
 * @param {'light'|'dark'|'system'} theme
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

/**
 * Retrieves the preferred theme from localStorage or defaults to system.
 * @returns {'light'|'dark'|'system'}
 */
export function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  return stored && ['light','dark','system'].includes(stored)
    ? stored
    : 'system';
}

/**
 * Saves the theme preference and applies it.
 * @param {'light'|'dark'|'system'} theme
 */
export function setTheme(theme) {
  if (['light','dark','system'].includes(theme)) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }
}

/**
 * Listens for system theme changes when in 'system' mode.
 */
export function initializeThemeListener() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => {
    if (getPreferredTheme() === 'system') {
      applyTheme('system');
    }
  };
  mq.addEventListener('change', handler);
  applyTheme(getPreferredTheme());
  return () => mq.removeEventListener('change', handler);
}