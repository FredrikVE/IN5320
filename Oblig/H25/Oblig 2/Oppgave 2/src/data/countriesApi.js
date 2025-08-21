import { API_BASE } from "./baseUrl";

// Funksjon som bygger søke URL til API-kall basert på søkeparametere
export function buildCountriesUrl({ page, pageSize, search, continents, order }) {
  const url = new URL(API_BASE);                //Henter BASE_URL
  const searchParameters = url.searchParams;   // Henter objekt for å sette query-parametere (?key=value)

  searchParameters.set("page", page);          // Setter obligatorisk parameter: side
  searchParameters.set("pageSize", pageSize);  // Setter obligatorisk parameter: antall per side

  const q = (search ?? "").trim();                               // Normaliserer søk: tom streng hvis null/undefined, og trimmer mellomrom
  if (q) searchParameters.set("search", q);                                     // Legg bare til ?search= hvis det finnes en verdi

  const conts = Array.isArray(continents) ? continents : [];     // Sikrer at continents alltid er en array
  if (conts.length) searchParameters.set("Continent", conts.join(","));         // Setter ?Continent=a,b,c (NB: feltet er case-sensitivt i API-et)

  const ord = (order ?? "").trim();                              // Normaliserer sorteringsstreng (f.eks. "Population:DESC")
  if (ord) searchParameters.set("order", ord);                                  // Legg bare til ?order= hvis det finnes en verdi

  return url.toString();                                         // Returnerer ferdig URL som streng
}
