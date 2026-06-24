import { Game } from "./types/Game";

export type Difficulty = "easy" | "medium" | "hard";
export type TimeBucket = "lt30" | "30-60" | "60-120" | "gt120";

export interface FinderCriteria {
  players?: number;
  /** Seçilen süre kademeleri — herhangi birine uyması yeter */
  time?: TimeBucket[];
  /** Seçilen zorluk bantları — herhangi birine uyması yeter */
  difficulty?: Difficulty[];
  /** Seçilen türlerin BGG Subdomain id'leri */
  subdomains?: number[];
  /** Seçilen türlerin BGG Category id'leri (Subdomain'i kaçıranları yakalar) */
  categories?: number[];
}

export type RecommendReason =
  | { kind: "bestAt"; players: number }
  | { kind: "time"; minutes: number }
  | { kind: "difficulty"; difficulty: Difficulty };

export interface Recommendation {
  game: Game;
  score: number;
  reason?: RecommendReason;
}

type Bgg = NonNullable<Game["bggId"]>;

const MAX_SANE_PLAYERS = 12;

function effectiveMaxPlayers(bgg: Bgg): number {
  return bgg.PlayersMax > MAX_SANE_PLAYERS ? MAX_SANE_PLAYERS : bgg.PlayersMax;
}

function matchesPlayers(bgg: Bgg, n: number): boolean {
  const max = effectiveMaxPlayers(bgg);
  if (bgg.PlayersMin <= 0 || max <= 0) return false;
  return bgg.PlayersMin <= n && n <= max;
}

function inBucket(t: number, bucket: TimeBucket): boolean {
  switch (bucket) {
    case "lt30":
      return t <= 35;
    case "30-60":
      return t >= 20 && t <= 70;
    case "60-120":
      return t >= 50 && t <= 130;
    case "gt120":
      return t >= 110;
  }
}

// Seçilen kademelerden herhangi birine uyuyorsa
function matchesTime(bgg: Bgg, buckets: TimeBucket[]): boolean {
  const t = bgg.PlayingTime;
  if (!t || t <= 0) return false; // doğrulanamaz -> ele
  return buckets.some((b) => inBucket(t, b));
}

function bandOf(w: number): Difficulty {
  if (w <= 2.0) return "easy";
  if (w <= 3.0) return "medium";
  return "hard";
}

// Seçilen zorluklardan herhangi birine uyuyorsa
function matchesDifficulty(bgg: Bgg, diffs: Difficulty[]): boolean {
  const w = bgg.AvgWeight;
  if (!w || w <= 0) return false; // doğrulanamaz -> ele
  return diffs.some((d) => bandOf(w) === d);
}

/** Tür eşleşmesi: oyunun Subdomain'i VEYA Category'si seçilenlerle kesişiyorsa. */
function matchesGenre(bgg: Bgg, subs?: number[], cats?: number[]): boolean {
  if (subs && (bgg.Subdomains || []).some((s) => subs.includes(s))) return true;
  if (cats && (bgg.Categories || []).some((c) => cats.includes(c))) return true;
  return false;
}

function scoreGame(bgg: Bgg, players?: number): number {
  let score = 0;
  if (players !== undefined) {
    if ((bgg.Best || []).includes(players)) score += 100;
    if ((bgg.Recommended || []).includes(players)) score += 20;
  }
  return score + (bgg.GeekRating || 0);
}

function pickReason(bgg: Bgg, c: FinderCriteria): RecommendReason | undefined {
  if (c.players !== undefined && (bgg.Best || []).includes(c.players)) {
    return { kind: "bestAt", players: c.players };
  }
  if (c.time !== undefined && c.time.length > 0 && bgg.PlayingTime > 0) {
    return { kind: "time", minutes: bgg.PlayingTime };
  }
  if (c.difficulty !== undefined && c.difficulty.length > 0 && bgg.AvgWeight > 0) {
    return { kind: "difficulty", difficulty: c.difficulty[0] };
  }
  return undefined;
}

export function recommend(games: Game[], c: FinderCriteria): Recommendation[] {
  const subs = c.subdomains && c.subdomains.length > 0 ? c.subdomains : undefined;
  const cats = c.categories && c.categories.length > 0 ? c.categories : undefined;
  const genreFilter = subs || cats;
  const out: Recommendation[] = [];

  for (const g of games) {
    const bgg = g.bggId;
    if (!bgg) continue; // doğrulanamaz -> ele

    if (c.players !== undefined && !matchesPlayers(bgg, c.players)) continue;
    if (c.time !== undefined && c.time.length > 0 && !matchesTime(bgg, c.time)) continue;
    if (c.difficulty !== undefined && c.difficulty.length > 0 && !matchesDifficulty(bgg, c.difficulty)) continue;
    if (genreFilter && !matchesGenre(bgg, subs, cats)) continue;

    out.push({
      game: g,
      score: scoreGame(bgg, c.players),
      reason: pickReason(bgg, c),
    });
  }

  out.sort((a, b) => {
    const aDv = a.game.davinciGame ? 1 : 0;
    const bDv = b.game.davinciGame ? 1 : 0;
    if (aDv !== bDv) return bDv - aDv;
    return b.score - a.score;
  });
  return out;
}
