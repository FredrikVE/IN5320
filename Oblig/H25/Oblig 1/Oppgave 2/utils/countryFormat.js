// Formatering for land-visning
export const formatPopulation = (n) =>
  Math.round(Number(n) || 0).toLocaleString("nb-NO")
