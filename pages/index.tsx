import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getGames } from "../utils/api/game";
import { gameCoverSrc } from "../utils/gameCoverSrc";
import { Game } from "../utils/types/Game";
import { LanguageToggle } from "../components/LanguageToggle";
import { TableIcon } from "../icons/TableIcon";

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await getGames();
  games.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return { props: { games } };
};

const Home = ({ games }: { games: Game[] }) => {
  const { t } = useTranslation();
  // Bahçeli şubesi kapatıldı - ilgili kod yorumda bırakıldı
  // const [bahceliGames, setBahceliGames] = useState<Game[]>([]);
  const [neoramaGames, setNeoramaGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState("");

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
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 opacity-[0.035] bg-[url('/images/davinci-logo-bg.png')] bg-repeat bg-[length:150px_150px] md:bg-[length:185px_185px] [filter:grayscale(1)_sepia(1)_hue-rotate(320deg)_saturate(16%)_brightness(1.14)]" />
        </div>
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
            <a
              href="https://davinciboardgame.com/"
              className="flex items-center gap-3 min-w-0"
            >
              <Image
                src="/images/davinci-logo.png"
                alt={t("common.logoAlt")}
                width={56}
                height={56}
                className="h-9 md:h-11 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-white text-base md:text-xl">
                  {t("common.appNameShort")}
                </span>
                <span className="font-body text-white text-[10px] md:text-xs tracking-[0.08em] uppercase">
                  {t("common.boardGame")}
                </span>
              </div>
            </a>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <LanguageToggle />
            <button
              type="button"
              onClick={() =>
                open &&
                open(
                  "https://yervarmi.davinciboardgame.com",
                  "_blank",
                )?.focus()
              }
              className="shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-body font-semibold px-3 md:px-4 py-2 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <TableIcon />
              <span className="hidden sm:inline">
                {t("games.spotAvailableLong")}
              </span>
              <span className="sm:hidden">{t("games.spotAvailableShort")}</span>
            </button>
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
            {neoramaGames?.map((game) => {
              const src = gameCoverSrc(game);
              return (
              <div
                key={game._id}
                className="relative group aspect-square overflow-hidden rounded-xl bg-dv-bg-2 shadow-md ring-1 ring-black/5"
                style={
                  {
                    contentVisibility: "auto",
                    containIntrinsicSize: "220px 220px",
                  } as import("react").CSSProperties
                }
              >
                {src ? (
                  // doğrudan BGG; Next `/_next/image` yok — kalite için `game.image`
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt={game.displayName || game.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <span className="text-[10px] text-center font-body text-dv-gray-600 leading-tight">
                      {game.displayName || game.name}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-1.5">
                  <span className="text-white text-[10px] md:text-xs font-body font-medium leading-tight line-clamp-3">
                    {game.displayName || game.name}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
