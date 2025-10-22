import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'bright' | 'light';

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // 从localStorage读取保存的主题
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['dark', 'bright', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // 如果没有保存的主题，检查系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'bright';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'bright' : 'dark';
    changeTheme(nextTheme);
  };

  return {
    theme,
    changeTheme,
    toggleTheme,
  };
};

export default useTheme;
