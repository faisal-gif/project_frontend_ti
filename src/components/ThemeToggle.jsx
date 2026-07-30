'use client'
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  // null sebelum mount → hindari mismatch hydration; ikuti data-theme yang
  // sudah diset skrip inline di <head>.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* localStorage bisa diblok */ }
    setTheme(next);
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      className="btn btn-ghost btn-circle text-white hover:bg-white/30"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
