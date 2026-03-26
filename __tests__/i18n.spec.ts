import { describe, expect, it } from "vitest";
import { NextIntlConfig } from "../src/i18n/config";

function keys(obj: Record<string, unknown>) {
  return Object.keys(obj).sort();
}

async function loadMessages(locale: string, ns: string) {
  const mod = (await import(`../messages/${locale}/${ns}.json`)) as {
    default: Record<string, string>;
  };
  return mod.default;
}

describe("i18n messages", () => {
  it("namespaces have consistent keys across locales", async () => {
    const locales = NextIntlConfig.locales;
    const base = NextIntlConfig.defaultLocale ?? locales[0];

    for (const ns of NextIntlConfig.namespaces) {
      const baseCatalog = await loadMessages(base, ns);
      const baseKeys = keys(baseCatalog);
      for (const l of locales) {
        const k = keys(await loadMessages(l, ns));
        const onlyInBase = baseKeys.filter((x) => !k.includes(x));
        const onlyInOther = k.filter((x) => !baseKeys.includes(x));
        const msg = [
          onlyInBase.length
            ? `Missing in ${l}/${ns}: ${onlyInBase.join(", ")}`
            : "",
          onlyInOther.length
            ? `Extra in ${l}/${ns}: ${onlyInOther.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join(" | ");
        expect(onlyInBase.length === 0 && onlyInOther.length === 0, msg).toBe(
          true,
        );
      }
    }
  });
});
