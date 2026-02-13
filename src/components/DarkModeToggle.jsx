import { useEffect, useState } from "react";
import ModeSwitchIcon from "@/assets/mode-switcher.svg?url";
import ModeSwitchIconSun from "@/assets/mode-switcher-sun.svg?url";
import IconButton from "@/components/IconButton";

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
    <div onClick={() => setRotateSwitch((prev) => !prev)} className={``}>
      <section
        className={`
      ${darkMode ? "opacity-100 animate-rotateThemeSwitchBack" : "opacity-0 hidden"}
      `}
      >
        <IconButton
          ButtonIcon={ModeSwitchIcon}
          ButtonFunction={toggleDarkMode}
          ButtonAlt={"toggle-darkmode"}
        />
      </section>
      <section
        className={`
        ${rotateSwitch ? "animate-rotateThemeSwitch-back" : ""}
      ${darkMode ? "opacity-0 hidden" : "opacity-100 animate-rotateThemeSwitch"}
      `}
      >
        <IconButton
          ButtonIcon={ModeSwitchIconSun}
          ButtonFunction={toggleDarkMode}
          ButtonAlt={"toggle-darkmode"}
        />
      </section>
    </div>
  );
};

export default DarkModeToggle;
