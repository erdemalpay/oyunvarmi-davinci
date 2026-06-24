/**
 * BGG Subdomains id -> i18n anahtarı. id->isim eşlemesi bilinen oyunlarla
 * doğrulandı (Brass=Strateji, Camel Up=Aile, BANG/Codenames/Dixit=Parti,
 * Hive/Azul=Soyut). Savaş(4667) ve Customizable(4665) Neorama'da çok az
 * (10/3) olduğu için ilk sürümde gösterilmez.
 *
 * categoryIds: BGG'nin Subdomains alanı bazı oyunları kaçırıyor (örn. Sushi
 * Go! Subdomain'de Parti değil ama Category'de "Party Game"). Tür filtresi
 * Subdomain VEYA bu Category'lere bakar. Karşılığı olan üç tür:
 *   Parti  -> 1030 (Party Game)        +17 oyun
 *   Soyut  -> 1009 (Abstract Strategy) +12 oyun
 *   Çocuk  -> 1041 (Children's Game)   +11 oyun
 * Strateji/Aile/Tematik'in BGG'de tek bir karşılık kategorisi yok.
 */
export interface SubdomainOption {
  id: number;
  labelKey: string;
  categoryIds?: number[];
}

export const SUBDOMAIN_OPTIONS: SubdomainOption[] = [
  { id: 5497, labelKey: "games.finder.subdomain.strategy" },
  { id: 5499, labelKey: "games.finder.subdomain.family" },
  { id: 5498, labelKey: "games.finder.subdomain.party", categoryIds: [1030] },
  { id: 5496, labelKey: "games.finder.subdomain.thematic" },
  { id: 4666, labelKey: "games.finder.subdomain.abstract", categoryIds: [1009] },
  { id: 4664, labelKey: "games.finder.subdomain.children", categoryIds: [1041] },
];
