import { get } from ".";
import { Game } from "../types/Game";

const getAllGamesQuery = "/games";

export function getGames(): Promise<Game[]> {
  return get<Game[]>({ path: getAllGamesQuery });
}
