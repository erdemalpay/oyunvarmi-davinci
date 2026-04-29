import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getGames } from "../utils/api/game";
import { Game } from "../utils/types/Game";
import { Button } from "../components/Button";
import { TableIcon } from "../icons/TableIcon";

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await getGames();
  games.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return { props: { games } };
};

const Home = ({ games }: { games: Game[] }) => {
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
        <title>{`Da Vinci'de bu oyun var mı?`}</title>
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
      <div className="w-full h-screen overflow-hidden flex flex-col bg-dv-section-2 relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 opacity-[0.035] bg-[url('/images/davinci-logo-bg.png')] bg-repeat bg-[length:150px_150px] md:bg-[length:185px_185px] [filter:grayscale(1)_sepia(1)_hue-rotate(320deg)_saturate(16%)_brightness(1.14)]" />
        </div>
        <div className="flex w-full h-[82px] md:h-[92px] relative z-10">
          <div className="relative w-full overflow-hidden border-b border-black/10 shadow-dv-sm bg-[linear-gradient(180deg,#111827_0%,#1F2937_100%)]">
            <div className="h-full relative px-4">
              <div className="flex justify-center items-center h-full gap-3">
                <Image
                  src="/images/davinci-logo.png"
                  alt="Da Vinci Logo"
                  width={56}
                  height={56}
                  className="h-10 md:h-12 w-auto object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-white text-lg md:text-xl">
                    Da Vinci
                  </span>
                  <span className="font-body text-white/75 text-xs md:text-sm tracking-[0.08em] uppercase">
                    Board Game Cafe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl self-center flex-1 min-h-0 flex flex-col mt-6 md:mt-8 px-2 md:px-6 lg:px-10 pb-4 md:pb-6 relative z-10">
          <h1 className="font-display font-semibold text-dv-black-deep text-2xl md:text-4xl leading-[1.1] mb-3">
            Da Vinci&apos;de bu oyun var mı?
          </h1>
          <p className="font-body text-sm md:text-base text-dv-gray-600 mb-5">
            Oyun adını yazarak Neorama envanterinde olup olmadığını hızlıca
            kontrol et.
          </p>
          <div className="mb-5">
            <input
              placeholder="Bu oyun var mı..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-2xl px-5 md:px-6 py-3.5 md:py-4 w-full focus:outline-none font-body text-dv-black bg-white/95 border border-black/10 shadow-dv-sm placeholder:text-dv-gray-500 focus:border-dv-red-light"
            ></input>
          </div>
          <div className="flex justify-center text-white text-center mt-4 min-h-0 flex-1">
            {/* Bahçeli şubesi kapatıldı - UI kodu yorumda bırakıldı
            <div className="flex flex-col w-[48%] overflow-y-auto">
              <div className="text-lg font-bold lg:text-3xl bg-dark-brown font-germania">
                <h1>Bahçeli ({bahceliGames.length})</h1>
              </div>
              <div className="flex flex-col text-center text-lg font-merriweather text-black">
                {bahceliGames?.map((game) => (
                  <h2
                    className="py-2 border-dark-brown border-b-2"
                    key={game._id}
                  >
                    {game.displayName || game.name}
                  </h2> 
                ))}
              </div>
            </div>
            */}
            <div className="flex flex-col w-full h-full overflow-y-auto rounded-2xl border border-black/10 bg-white/95 shadow-dv-md">
              <div className="text-lg font-semibold lg:text-2xl bg-dv-bg-2 text-dv-black-deep font-display rounded-t-2xl py-3 md:py-4 border-b border-black/10">
                <h1>Neorama ({neoramaGames.length})</h1>
              </div>
              <div className="flex flex-col text-center text-[15px] md:text-[17px] font-body text-dv-black leading-relaxed">
                {neoramaGames?.map((game) => (
                  <h2
                    className="border-b border-black/10 py-2.5 px-3 md:px-4"
                    key={game._id}
                  >
                    {game.displayName || game.name}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-5 lg:text-base text-sm flex items-center">
            <Button
              className="bg-dv-section-3 text-dv-black-deep border border-black/10 shadow-[0_8px_22px_rgba(31,41,55,0.12)] hover:bg-dv-bg-2 hover:text-dv-red-dark hover:shadow-[0_10px_24px_rgba(31,41,55,0.15)]"
              Icon={TableIcon}
              onClick={() =>
                open &&
                open("https://yervarmi.davinciboardgame.com", "_blank")?.focus()
              }
            >
              {"Oyunu bulduk. Peki yer var mı?"}
              <span className="hidden lg:flex">
                {"(yervarmi.davinciboardgame.com)"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
