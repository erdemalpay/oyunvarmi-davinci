export type BggInfo = {
  _id: number;
  name: string;
  avgWeight: number;
  best: number[];
  geekRating: number;
  playTimeMax: number;
  playTimeMin: number;
  playersMax: number;
  playersMin: number;
  playingTime: number;
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
};
