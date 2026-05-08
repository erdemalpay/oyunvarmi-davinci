import { get } from ".";
import { Game } from "../types/Game";

const getAllGamesQuery = "/shopify/games";

export function getGames(): Promise<Game[]> {
  return get<Game[]>({ path: getAllGamesQuery });
}
