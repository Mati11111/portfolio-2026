import en from "./en.json";
import es from "./es.json";

const dictionaries = { en, es } as const;

export type Locale = keyof typeof dictionaries;

/**
 * Get nested value using dot notation
 * Example: "head.title"
 */
function getNestedValue(obj: any, path?: string) {
  if (!path || typeof path !== "string") return undefined;

  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

export function t(
  locale: string | undefined,
  key: string,
  vars?: Record<string, string | number>,
) {
  const l: Locale =
    locale && locale in dictionaries ? (locale as Locale) : "es";

  const template =
    getNestedValue(dictionaries[l], key) ??
    getNestedValue(dictionaries.es, key) ??
    key;

  if (typeof template !== "string") return key;

  if (!vars) return template;

  return template.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] === undefined ? `{${name}}` : String(vars[name]),
  );
}

export function createTranslator(locale: string | undefined) {
  return function tl(key: string, vars?: Record<string, string | number>) {
    return t(locale, key, vars);
  };
}
