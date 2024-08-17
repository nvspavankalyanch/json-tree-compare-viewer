import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <Button variant="outline" size="icon" onClick={toggleDarkMode}>
      {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};

export default DarkModeToggle;
