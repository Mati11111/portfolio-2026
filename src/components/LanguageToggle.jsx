import { useState } from "react";
import TranslateIcon from "@/assets/translate.svg?url";
import TranslateSwitch from "@/assets/translate-switch.svg?url";
import TranslateIconArrows from "@/assets/translate-arrows.svg?url";
import IconButton from "@/components/IconButton";

const LanguageToggle = () => {
  const [languageChanged, setLanguageChanged] = useState(false);
  const [languageChanging, setLanguageChanging] = useState(false);

  const toggleLanguage = () => {
    if (languageChanging) return;

    setLanguageChanging(true);

    setTimeout(() => {
      setLanguageChanging(false);
      setLanguageChanged((prev) => !prev);

      const currentPath = window.location.pathname;
      const isEnglish = currentPath.startsWith("/en");

      let newPath;

      if (isEnglish) {
        newPath = currentPath.replace(/^\/en/, "") || "/es";
      } else {
        newPath = `/en${currentPath === "/es" ? "" : currentPath}`;
      }
      localStorage.setItem("savedLang", isEnglish ? "es" : "en");
      window.location.href = newPath;
    }, 300);
  };

  return (
    <div className="relative w-12 h-12">
      <section
        className={`${languageChanging ? "hidden" : ""} absolute inset-0 flex items-center justify-center`}
      >
        <IconButton
          ButtonIcon={languageChanged ? TranslateSwitch : TranslateIcon}
          CustomStyle={`w-12 h-12 animate-showIconTranslate
          `}
          ButtonFunction={toggleLanguage}
        />
      </section>

      <section
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10
        ${languageChanging ? "animate-rotateThemeSwitchBack" : ""}`}
      >
        <IconButton ButtonIcon={TranslateIconArrows} CustomStyle="w-12 h-12" />
      </section>
    </div>
  );
};

export default LanguageToggle;
