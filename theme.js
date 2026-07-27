// ============================================================
// theme.js — Dark / Light toggle with localStorage persistence
// ============================================================
(function() {
  const THEME_KEY = 'app_theme';
  const root = document.documentElement;

  // حمّل الثيم المحفوظ عند البدء
  function applyTheme(theme) {
    root.classList.remove('light','dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
    // حدّث نص الزر
    const btn = document.querySelector('.theme-toggle span.theme-label');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ الوضع الفاتح' : '🌙 الوضع الداكن';
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = (saved === 'dark' || saved === 'light') ? saved : 'light';
    applyTheme(preferred);
  }

  // تبديل الثيم
  window.toggleTheme = function() {
    const current = root.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };

  // تشغيل فوري
  initTheme();

  // إعادة التطبيق بعد تحميل DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  }
})();
