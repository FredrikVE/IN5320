const book = {}

// dot notation
book.title = "Towers of Midnight"
console.log(book.title) // "Towers of Midnight"

// dynamic key
let key = "authors"
book.authors = ["Robert Jordan", "Brandon Sanderson"]
console.log(book[key])  // ["Robert Jordan", "Brandon Sanderson"]
