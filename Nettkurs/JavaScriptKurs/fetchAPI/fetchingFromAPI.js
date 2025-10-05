const path = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=Norway"
fetch(path)
  .then(response => response.json())
  .then(console.log)