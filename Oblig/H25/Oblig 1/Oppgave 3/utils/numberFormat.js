//src/utils/numberFormat.js
// no-NO gir mellomrom som tusenskille (f.eks. 10 742 224)
const nf = new Intl.NumberFormat("no-NO");
export const formatPopulation = (n) => nf.format(Number(n || 0));
