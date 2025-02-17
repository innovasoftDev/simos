'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

type CompProps = {};

export default function ThemeToggle({}: CompProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <MoonIcon className="h-[1.2rem] w-[1.2rem] hidden transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
