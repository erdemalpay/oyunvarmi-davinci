import { useTranslation } from "react-i18next";

/** Sabit yükseklik/genişlik: tek satır header’da taşma ve layout shift önlenir */
export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const now = i18n.resolvedLanguage?.toLowerCase().startsWith("en")
      ? "en"
      : "tr";
    void i18n.changeLanguage(now === "tr" ? "en" : "tr");
  };

  const currentLang = i18n.resolvedLanguage?.toLowerCase().startsWith("en")
    ? "en"
    : "tr";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="relative box-border bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shrink-0 flex flex-row items-center justify-center gap-[3px] touch-manipulation h-10 w-[56px] sm:h-[44px] sm:w-[62px] p-1 sm:p-[3px]"
      title={
        currentLang === "tr"
          ? t("common.toggleToEnglish")
          : t("common.toggleToTurkish")
      }
      aria-label={t("common.chooseLanguage")}
    >
      <div className="flex items-center justify-center pointer-events-none shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/tr.png"
          alt=""
          width={44}
          height={44}
          className={`h-[22px] w-[22px] sm:h-7 sm:w-7 rounded-full object-cover transition-all duration-200 ${
            currentLang === "tr"
              ? "opacity-100 scale-100"
              : "opacity-40 scale-95"
          }`}
        />
      </div>
      <div className="flex items-center justify-center pointer-events-none shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/abd.png"
          alt=""
          width={44}
          height={44}
          className={`h-[22px] w-[22px] sm:h-7 sm:w-7 rounded-full object-cover transition-all duration-200 ${
            currentLang === "en"
              ? "opacity-100 scale-100"
              : "opacity-40 scale-95"
          }`}
        />
      </div>
    </button>
  );
}
