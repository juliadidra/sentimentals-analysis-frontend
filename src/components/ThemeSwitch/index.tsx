"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute right-4 top-4">
      {
        theme === "light" ? (
          <button onClick={() => setTheme("dark")}><Moon/></button>
        ) : (
          <button onClick={() => setTheme("light")}><Sun/></button>
        )
      }
    </div>
  );
};

export default ThemeSwitch;
