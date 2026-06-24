import Link from "next/link";
import type { CSSProperties, KeyboardEvent } from "react";
import { gameCoverSrc } from "../utils/gameCoverSrc";
import { Game } from "../utils/types/Game";

export function GameCard({
  game,
  flipped,
  onToggle,
  reasonLabel,
}: {
  game: Game;
  flipped: boolean;
  onToggle: () => void;
  reasonLabel?: string;
}) {
  const src = gameCoverSrc(game);
  const bgg = game.bggId;
  const displayName = game.displayName || game.name;
  const storeProductUrl = game.onlineStoreUrl ?? game.shopifyUrl;

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`flip-card aspect-square shadow-md cursor-pointer${flipped ? " flipped" : ""}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={handleKey}
      style={
        {
          contentVisibility: "auto",
          containIntrinsicSize: "220px 220px",
        } as CSSProperties
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
          {reasonLabel && (
            <div className="absolute top-1.5 left-1.5 z-10 bg-dv-red text-white text-[9px] font-body font-bold px-1.5 py-0.5 rounded-full shadow">
              {reasonLabel}
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-6 pb-2">
            <span className="text-white text-[10px] md:text-xs font-body font-medium leading-tight line-clamp-2">
              {displayName}
            </span>
          </div>
        </div>

        {/* ARKA YÜZ */}
        <div className="flip-card-back">
          {src && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={displayName}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 flex flex-col p-2 gap-1.5">
            <div className="flex flex-col gap-1">
              {bgg?.GeekRating ? (
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
                    BGG: {bgg.GeekRating.toFixed(1)}/10
                  </span>
                </div>
              ) : (
                <div />
              )}
              {storeProductUrl && game.shopifyPrice && (
                <Link href={storeProductUrl} passHref>
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
                      {Number(game.shopifyPrice).toLocaleString("tr-TR")} ₺
                    </span>
                  </a>
                </Link>
              )}
            </div>

            {game.expansion && (
              <div className="flex justify-center">
                <span className="text-[8px] text-white/80 font-body font-bold tracking-widest uppercase border border-white/30 rounded px-1.5 py-0.5">
                  EXPANSION
                </span>
              </div>
            )}

            <div className="flex-1" />

            <div>
              <p className="text-white font-display font-semibold text-[12px] leading-tight mb-2 line-clamp-2 drop-shadow-md">
                {displayName}
              </p>
              {bgg && (
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 bg-black/40 rounded-lg px-2 py-1.5">
                  {bgg.PlayersMin > 0 && (
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
                        {bgg.PlayersMin === bgg.PlayersMax
                          ? `${bgg.PlayersMin}`
                          : `${bgg.PlayersMin}-${bgg.PlayersMax}`}{" "}
                        Oyuncu
                      </span>
                    </div>
                  )}
                  {(bgg.PlayTimeMin > 0 || bgg.PlayingTime > 0) && (
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
                        {bgg.PlayTimeMin > 0
                          ? bgg.PlayTimeMin === bgg.PlayTimeMax
                            ? `${bgg.PlayTimeMin}`
                            : `${bgg.PlayTimeMin}-${bgg.PlayTimeMax}`
                          : `${bgg.PlayingTime}`}{" "}
                        dk
                      </span>
                    </div>
                  )}
                  {bgg.Best?.length > 0 && (
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
                        En iyi: {bgg.Best.join(", ")}
                      </span>
                    </div>
                  )}
                  {bgg.AvgWeight > 0 && (
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
                        Ağırlık: {bgg.AvgWeight.toFixed(1)}
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
}
