

const stringSearch = (string, searchWords) => {
    return searchWords.map( 
        (i) => string.indexOf(i)
    );
}

const chaos = `
  Chaos needs no allies,
  for it dwells like a poison in every one of us.
`
const words = ["poison", "greed"]

const results = stringSearch(chaos, words)
for (let i = 0; i < results.length; i++) {
    console.log(results[i]);
}