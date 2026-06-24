export type BggInfo = {
  _id: number;
  name: string;
  AvgRating: number;
  AvgWeight: number;
  Best: number[];
  GeekRating: number;
  MinPlayerAge: number;
  OverallRank: number;
  PlayTimeMax: number;
  PlayTimeMin: number;
  PlayersMax: number;
  PlayersMin: number;
  PlayingTime: number;
  Recommended: number[];
  Subdomains?: number[];
  Categories?: number[];
  YearPublished: number;
};

export type Game = {
  _id: number;
  name: string;
  displayName?: string;
  image: string;
  thumbnail: string;
  expansion: boolean;
  locations: number[];
  bggId?: BggInfo;
  narrationDurationPoint?: number;
  shortDescription?: string;
  metaUpdatedAt?: string;
  shopifyPrice?: string | null;
  shopifyUrl?: string | null;
  onlineStoreUrl?: string | null;
  davinciGame?: boolean;
};
