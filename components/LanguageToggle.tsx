import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const active =
    i18n.resolvedLanguage?.toLowerCase().startsWith("en") ? "en" : "tr";

  const base =
    "rounded-full px-2.5 py-1 text-[11px] md:text-xs font-body font-semibold transition-colors";

  return (
    <div
      className="flex items-center rounded-full border border-white/25 bg-black/15 p-0.5 shrink-0"
      role="group"
      aria-label={t("common.chooseLanguage")}
    >
      <button
        type="button"
        aria-pressed={active === "tr"}
        aria-label={t("common.langTr")}
        onClick={() => void i18n.changeLanguage("tr")}
        className={`${base} ${
          active === "tr"
            ? "bg-white text-dv-black-deep"
            : "text-white/85 hover:bg-white/10"
        }`}
      >
        TR
      </button>
      <button
        type="button"
        aria-pressed={active === "en"}
        aria-label={t("common.langEn")}
        onClick={() => void i18n.changeLanguage("en")}
        className={`${base} ${
          active === "en"
            ? "bg-white text-dv-black-deep"
            : "text-white/85 hover:bg-white/10"
        }`}
      >
        EN
      </button>
    </div>
  );
}
