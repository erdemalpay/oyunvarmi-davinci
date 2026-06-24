import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../components/LanguageToggle";
import { GameRequestIcon } from "../icons/GameRequestIcon";
import { TableIcon } from "../icons/TableIcon";
import { getGames } from "../utils/api/game";
import { GameCard } from "../components/GameCard";
import { GameFinderModal } from "../components/GameFinderModal";
import { Game } from "../utils/types/Game";

export const getStaticProps = async () => {
  const games = await getGames();
  games.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return { props: { games }, revalidate: 300 };
};

const Home = ({ games }: { games: Game[] }) => {
  const { t } = useTranslation();
  // Bahçeli şubesi kapatıldı - ilgili kod yorumda bırakıldı
  // const [bahceliGames, setBahceliGames] = useState<Game[]>([]);
  const [neoramaGames, setNeoramaGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState("");
  const [flippedId, setFlippedId] = useState<string | number | null>(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const allNeoramaGames = useMemo(
    () => games?.filter((game) => game.locations.includes(2)) ?? [],
    [games],
  );

  useEffect(() => {
    setFlippedId(null);
  }, [filter]);

  useEffect(() => {
    const filteredList = games?.filter((game) => {
      return game.name
        .replace("İ", "I")
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(filter.toLowerCase().replace(/\s+/g, ""));
    });
    // setBahceliGames(filteredList.filter((game) => game.locations.includes(1)));
    setNeoramaGames(filteredList.filter((game) => game.locations.includes(2)));
  }, [games, filter]);

  return (
    <div>
      <Head>
        <title>{t("games.metaTitle")}</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-full h-screen overflow-hidden flex flex-col bg-[#F7F3ED] relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(45deg, #1F2937 25%, transparent 25%), linear-gradient(-45deg, #1F2937 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1F2937 75%), linear-gradient(-45deg, transparent 75%, #1F2937 75%)",
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
          }}
        />
        <header
          style={{
            position: "relative",
            zIndex: 10,
            background: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
          className="w-full min-h-[64px] md:min-h-[72px] flex items-center px-4 md:px-8 lg:px-12"
        >
          <div className="w-full flex justify-between items-center gap-3">
            <Link href="https://davinciboardgame.com/">
              <a className="flex items-center gap-3 min-w-0">
                <Image
                  src="/images/davinci-logo.png"
                  alt={t("common.logoAlt")}
                  width={56}
                  height={56}
                  className="h-9 md:h-11 w-auto object-contain shrink-0"
                />
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="font-display text-white text-base md:text-xl">
                    {t("common.appNameShort")}
                  </span>
                  <span className="font-body text-white text-[10px] md:text-xs tracking-[0.08em] uppercase">
                    {t("common.boardGame")}
                  </span>
                </div>
              </a>
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setFinderOpen(true)}
                aria-label={t("games.openFinder")}
                className="shrink-0 flex h-10 lg:h-11 items-center justify-center gap-1.5 bg-dv-red hover:bg-dv-red-light text-white text-xs lg:text-sm font-body font-semibold px-3 lg:px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="hidden sm:inline">{t("games.openFinder")}</span>
              </button>
              <Link href="https://talep.kutuoyunual.com/" passHref>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("games.requestGameLong")}
                  className="shrink-0 flex h-10 sm:w-[116px] lg:h-11 lg:w-auto items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs lg:text-sm font-body font-semibold px-2.5 lg:px-5 py-2 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <GameRequestIcon />
                  <span className="hidden lg:inline">
                    {t("games.requestGameLong")}
                  </span>
                  <span className="hidden sm:inline lg:hidden">
                    {t("games.requestGameShort")}
                  </span>
                </a>
              </Link>
              <button
                type="button"
                aria-label={t("games.spotAvailableLong")}
                onClick={() =>
                  window
                    .open(
                      "https://yervarmi.davinciboardgame.com",
                      "_blank",
                      "noopener,noreferrer",
                    )
                    ?.focus()
                }
                className="shrink-0 flex h-10 w-10 sm:w-[116px] lg:h-11 lg:w-auto items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs lg:text-sm font-body font-semibold px-2.5 lg:px-5 py-2 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <TableIcon />
                <span className="hidden lg:inline">
                  {t("games.spotAvailableLong")}
                </span>
                <span className="hidden sm:inline lg:hidden">
                  {t("games.spotAvailableShort")}
                </span>
              </button>
              <LanguageToggle />
            </div>
          </div>
        </header>

        <div className="w-full flex flex-col px-5 md:px-12 lg:px-16 xl:px-24 pt-4 pb-2 relative z-10">
          <h1 className="font-display font-semibold text-dv-black-deep text-xl md:text-2xl leading-tight mb-2">
            {t("games.pageHeading")}
          </h1>
          <input
            placeholder={t("games.searchPlaceholder")}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-2xl px-4 py-2.5 w-full focus:outline-none font-body text-dv-black bg-white/95 border border-black/10 shadow-dv-sm placeholder:text-dv-gray-500 focus:border-dv-red-light text-sm mb-2"
          />
          <p className="font-display text-sm md:text-base font-semibold text-dv-black-deep text-left mb-3">
            {t("games.neoramaCount", { count: neoramaGames.length })}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto relative z-10 px-5 md:px-12 lg:px-16 xl:px-24 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 md:gap-3">
            {neoramaGames?.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                flipped={flippedId === game._id}
                onToggle={() => setFlippedId(flippedId === game._id ? null : game._id)}
              />
            ))}
          </div>
        </div>
      </div>
      <GameFinderModal
        games={allNeoramaGames}
        open={finderOpen}
        onClose={() => setFinderOpen(false)}
      />
    </div>
  );
};

export default Home;
