import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getGames } from "../utils/api/game";
import { Game } from "../utils/types/Game";
import Image from "next/image";
import titleBackground from "../public/title-background.png";
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
      <div className="w-full h-screen flex flex-col bg-[#FBEEE2]">
        <div className="flex w-full h-16">
          <div className="relative w-full">
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <div className="text-light-brown text-2xl h-full relative font-germania">
              <div className="flex justify-center items-center h-full">
                Da Vinci Board Game Cafe
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 mx-1 lg:mx-20 h-3/5">
          <div className="text-lg lg:text-4xl font-merriweather mb-4">
            <input
              placeholder="Bu oyun var mı..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className=" rounded-xl px-6 py-4 border-gray-200 w-full focus:outline-none text-dark-brown"
            ></input>
          </div>
          <div className="flex justify-center text-light-brown text-center min-h-full">
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
            <div className="flex flex-col w-full overflow-y-auto">
              <div className="text-lg font-bold lg:text-3xl bg-dark-brown font-germania">
                <h1>Neorama ({neoramaGames.length})</h1>
              </div>
              <div className="flex flex-col text-center text-lg font-merriweather text-black">
                {neoramaGames?.map((game) => (
                  <h2
                    className="border-b-2 border-dark-brown py-2"
                    key={game._id}
                  >
                    {game.displayName || game.name}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 lg:text-xl text-sm flex items-center">
            <Button
              className="bg-light-brown text-dark-brown"
              borderstyles="border-light-brown"
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
