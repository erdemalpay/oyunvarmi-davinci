import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "../components/LanguageToggle";
import { TableIcon } from "../icons/TableIcon";
import { getGames } from "../utils/api/game";
import { gameCoverSrc } from "../utils/gameCoverSrc";
import { Game } from "../utils/types/Game";

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await getGames();
  console.log("games", games);
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
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-white text-base md:text-xl">
                    {t("common.appNameShort")}
                  </span>
                  <span className="font-body text-white text-[10px] md:text-xs tracking-[0.08em] uppercase">
                    {t("common.boardGame")}
                  </span>
                </div>
              </a>
            </Link>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  window
                    .open(
                      "https://yervarmi.davinciboardgame.com",
                      "_blank",
                      "noopener,noreferrer",
                    )
                    ?.focus()
                }
                className="shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-body font-semibold px-3 md:px-4 py-2 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <TableIcon />
                <span className="hidden sm:inline">
                  {t("games.spotAvailableLong")}
                </span>
                <span className="sm:hidden">
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
            {neoramaGames?.map((game) => {
              const src = gameCoverSrc(game);
              const bgg = game.bggId;
              const displayName = game.displayName || game.name;
              return (
                <div
                  key={game._id}
                  className="flip-card aspect-square shadow-md"
                  style={
                    {
                      contentVisibility: "auto",
                      containIntrinsicSize: "220px 220px",
                    } as import("react").CSSProperties
                  }
                >
                  <div className="flip-card-inner">
                    {/* ÖN YÜZ */}
                    <div className="flip-card-front bg-dv-bg-2 ring-1 ring-black/5">
                      {src ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={src}
                          alt={displayName}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <span className="text-[10px] text-center font-body text-dv-gray-600 leading-tight">
                            {displayName}
                          </span>
                        </div>
                      )}
                      {/* Alt isim bandı */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-6 pb-2">
                        <span className="text-white text-[10px] md:text-xs font-body font-medium leading-tight line-clamp-2">
                          {displayName}
                        </span>
                      </div>
                    </div>

                    {/* ARKA YÜZ */}
                    <div className="flip-card-back">
                      {/* Arka plan görseli */}
                      {src && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={src}
                          alt={displayName}
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      {/* Koyu overlay */}
                      <div className="absolute inset-0 bg-black/80" />

                      {/* İçerik */}
                      <div className="absolute inset-0 flex flex-col p-2 gap-1.5">
                        {/* Üst: BGG + Da Vinci fiyat badge */}
                        <div className="flex flex-col gap-1">
                          {bgg?.geekRating ? (
                            <div className="flex items-center gap-1 bg-black/60 rounded-full px-1.5 py-0.5 border border-white/10 self-start">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="#FFD166"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <span className="text-white font-body font-bold text-[9px] leading-none drop-shadow">
                                BGG: {bgg.geekRating.toFixed(1)}/10
                              </span>
                            </div>
                          ) : (
                            <div />
                          )}
                          {game.shopifyUrl && game.shopifyPrice && (
                            <Link href={game.shopifyUrl} passHref>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 rounded-full px-1.5 py-0.5 self-start transition-colors"
                              >
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2.5"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="9" cy="21" r="1" />
                                  <circle cx="20" cy="21" r="1" />
                                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                <span className="text-white font-body font-bold text-[9px] leading-none">
                                  Da Vinci{" "}
                                  {Number(game.shopifyPrice).toLocaleString(
                                    "tr-TR",
                                  )}{" "}
                                  ₺
                                </span>
                              </a>
                            </Link>
                          )}
                        </div>

                        {/* Expansion rozeti */}
                        {game.expansion && (
                          <div className="flex justify-center">
                            <span className="text-[8px] text-white/80 font-body font-bold tracking-widest uppercase border border-white/30 rounded px-1.5 py-0.5">
                              EXPANSION
                            </span>
                          </div>
                        )}

                        {/* Boşluk */}
                        <div className="flex-1" />

                        {/* Alt: Oyun adı + istatistikler */}
                        <div>
                          <p className="text-white font-display font-semibold text-[12px] leading-tight mb-2 line-clamp-2 drop-shadow-md">
                            {displayName}
                          </p>
                          {bgg && (
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 bg-black/40 rounded-lg px-2 py-1.5">
                              {/* Oyuncu sayısı */}
                              {bgg.playersMin > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.75)"
                                    strokeWidth="2"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                  </svg>
                                  <span className="text-white font-body text-[11px] leading-none drop-shadow">
                                    {bgg.playersMin === bgg.playersMax
                                      ? `${bgg.playersMin}`
                                      : `${bgg.playersMin}-${bgg.playersMax}`}{" "}
                                    Oyuncu
                                  </span>
                                </div>
                              )}

                              {/* Süre */}
                              {(bgg.playTimeMin > 0 || bgg.playingTime > 0) && (
                                <div className="flex items-center gap-1.5">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.75)"
                                    strokeWidth="2"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                  <span className="text-white font-body text-[11px] leading-none drop-shadow">
                                    {bgg.playTimeMin > 0
                                      ? bgg.playTimeMin === bgg.playTimeMax
                                        ? `${bgg.playTimeMin}`
                                        : `${bgg.playTimeMin}-${bgg.playTimeMax}`
                                      : `${bgg.playingTime}`}{" "}
                                    dk
                                  </span>
                                </div>
                              )}

                              {/* En iyi oyuncu sayısı */}
                              {bgg.best?.length > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="#FFD166"
                                    stroke="#FFD166"
                                    strokeWidth="0.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M2 19h20v2H2v-2zM2 17l3-11 4.5 4.5L12 3l2.5 7.5L19 6l3 11H2z" />
                                  </svg>
                                  <span className="text-white font-body text-[11px] leading-none drop-shadow">
                                    En iyi: {bgg.best.join(", ")}
                                  </span>
                                </div>
                              )}

                              {/* Ağırlık */}
                              {bgg.avgWeight > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.75)"
                                    strokeWidth="2"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle cx="12" cy="5" r="3" />
                                    <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2 21h20l-2.596-11.54A2 2 0 0 0 17.5 8z" />
                                  </svg>
                                  <span className="text-white font-body text-[11px] leading-none drop-shadow">
                                    Ağırlık: {bgg.avgWeight.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
