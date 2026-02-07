import { useEffect, useState } from "react";
import ModeSwitchIcon from "@/assets/mode-switcher.svg?url";
import ModeSwitchIconSun from "@/assets/mode-switcher-sun.svg?url";
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [rotateSwitch, setRotateSwitch] = useState(false);
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.body.style.transition = "color 0.1s, background-color 0.3s";

    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="p-2 cursor-pointer group"
    >
      <div className="relative w-8 h-8">
        <img
          src={ModeSwitchIconSun}
          alt="Theme switch"
          className={`
        absolute inset-0 m-auto h-12 w-12
        animate-rotateThemeSwitchBack
        group-hover:animate-rotateThemeSwitch transition-all duration-300 ease-in-out
        ${darkMode ? "opacity-0" : "opacity-100"}
      `}
        />
        <img
          src={ModeSwitchIcon}
          alt="Theme switch"
          onClick={() => setRotateSwitch((prev) => !prev)}
          className={`absolute inset-0 m-auto h-6 w-6
          transition-all duration-300 ease-in-out
          -rotate-90
          ${rotateSwitch ? "animate-rotateThemeSwitch" : "animate-rotateThemeSwitchBack"}
          ${darkMode ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
