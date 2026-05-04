import { Game } from "./types/Game";

/** Kapak: önce tam `image` (BGG’ye doğrudan; sunucu sıkıştırmaz). Yoksa `thumbnail`. */
export function gameCoverSrc(game: Pick<Game, "image" | "thumbnail">): string {
  return game.image?.trim() || game.thumbnail?.trim() || "";
}
