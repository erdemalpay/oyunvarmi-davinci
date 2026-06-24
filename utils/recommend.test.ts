import { describe, it, expect } from "vitest";
import { recommend, FinderCriteria } from "./recommend";
import { Game } from "./types/Game";

function game(
  id: number,
  bgg: Partial<NonNullable<Game["bggId"]>> | null,
  extra: Partial<Game> = {},
): Game {
  return {
    _id: id,
    name: `Game ${id}`,
    image: "",
    thumbnail: "",
    expansion: false,
    locations: [2],
    bggId: bgg === null ? undefined : ({
      _id: id,
      name: `Game ${id}`,
      AvgRating: 7,
      AvgWeight: 2,
      Best: [],
      GeekRating: 6,
      MinPlayerAge: 8,
      OverallRank: 100,
      PlayTimeMax: 60,
      PlayTimeMin: 30,
      PlayersMax: 4,
      PlayersMin: 2,
      PlayingTime: 45,
      Recommended: [],
      YearPublished: 2018,
      ...bgg,
    } as Game["bggId"]),
    ...extra,
  };
}

describe("recommend - sert filtre", () => {
  it("bggId olmayan oyunları eler", () => {
    const games = [game(1, null), game(2, { PlayersMin: 2, PlayersMax: 4 })];
    const res = recommend(games, { players: 3 });
    expect(res.map((r) => r.game._id)).toEqual([2]);
  });

  it("kişi sayısı aralık dışındaysa eler", () => {
    const games = [
      game(1, { PlayersMin: 2, PlayersMax: 4 }),
      game(2, { PlayersMin: 1, PlayersMax: 2 }),
    ];
    const res = recommend(games, { players: 4 });
    expect(res.map((r) => r.game._id)).toEqual([1]);
  });

  it("bozuk PlayersMax değerini 12'ye sabitler", () => {
    const games = [game(1, { PlayersMin: 2, PlayersMax: 100 })];
    expect(recommend(games, { players: 12 }).length).toBe(1);
    expect(recommend(games, { players: 13 }).length).toBe(0);
  });

  it("süre kademesini PlayingTime'a göre uygular (toleranslı)", () => {
    const games = [
      game(1, { PlayingTime: 25 }),
      game(2, { PlayingTime: 90 }),
    ];
    expect(recommend(games, { time: ["lt30"] }).map((r) => r.game._id)).toEqual([1]);
    expect(recommend(games, { time: ["60-120"] }).map((r) => r.game._id)).toEqual([2]);
  });

  it("PlayingTime 0 ise ve süre filtresi varsa eler", () => {
    const games = [game(1, { PlayingTime: 0 })];
    expect(recommend(games, { time: ["30-60"] }).length).toBe(0);
  });

  it("zorluk bandını AvgWeight'e göre uygular", () => {
    const games = [
      game(1, { AvgWeight: 1.5 }),
      game(2, { AvgWeight: 2.5 }),
      game(3, { AvgWeight: 3.8 }),
    ];
    expect(recommend(games, { difficulty: ["easy"] }).map((r) => r.game._id)).toEqual([1]);
    expect(recommend(games, { difficulty: ["medium"] }).map((r) => r.game._id)).toEqual([2]);
    expect(recommend(games, { difficulty: ["hard"] }).map((r) => r.game._id)).toEqual([3]);
  });

  it("tür kesişimini uygular", () => {
    const games = [
      game(1, { Subdomains: [5497] }),
      game(2, { Subdomains: [5499] }),
    ];
    const res = recommend(games, { subdomains: [5499] });
    expect(res.map((r) => r.game._id)).toEqual([2]);
  });

  it("tür: Subdomain VEYA Category eşleşmesini uygular", () => {
    const games = [
      game(1, { Subdomains: [5498], Categories: [] }), // Subdomain'de Parti
      game(2, { Subdomains: [5499], Categories: [1030] }), // sadece Category'de Party
      game(3, { Subdomains: [5497], Categories: [9999] }), // hiçbiri
    ];
    const res = recommend(games, { subdomains: [5498], categories: [1030] });
    expect(res.map((r) => r.game._id).sort()).toEqual([1, 2]);
  });
});

describe("recommend - sıralama", () => {
  it("seçilen kişi sayısında Best olanı öne alır", () => {
    const games = [
      game(1, { PlayersMin: 2, PlayersMax: 5, GeekRating: 8, Best: [], Recommended: [] }),
      game(2, { PlayersMin: 2, PlayersMax: 5, GeekRating: 6, Best: [5], Recommended: [] }),
    ];
    const res = recommend(games, { players: 5 });
    expect(res.map((r) => r.game._id)).toEqual([2, 1]);
  });

  it("kişi seçilmediyse GeekRating'e göre sıralar", () => {
    const games = [
      game(1, { GeekRating: 6.5 }),
      game(2, { GeekRating: 7.5 }),
    ];
    const res = recommend(games, {});
    expect(res.map((r) => r.game._id)).toEqual([2, 1]);
  });
});

describe("recommend - neden rozeti", () => {
  it("Best eşleşmesinde bestAt reason döner", () => {
    const games = [game(1, { PlayersMin: 2, PlayersMax: 5, Best: [4] })];
    const res = recommend(games, { players: 4 });
    expect(res[0].reason).toEqual({ kind: "bestAt", players: 4 });
  });
});
