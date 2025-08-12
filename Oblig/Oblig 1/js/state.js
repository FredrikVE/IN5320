// Enkel “store” uten rammeverk
export const state = {
  items: [],          // { name, population|null, ratePerSec|null }
  searchWord: "",     // gjeldende søkeord
  tickTimerId: null,  // setInterval id
};

// Dom-referanser holdes samlet for enkel testing
export const els = {
  addForm: document.getElementById("addForm"),
  countryInput: document.getElementById("countryInput"),
  searchInput: document.getElementById("searchInput"),
  list: document.getElementById("countryList"),
  emptyHint: document.getElementById("emptyHint"),
  status: document.getElementById("status"),
  optPopulation: document.getElementById("optPopulation"),
  optTick: document.getElementById("optTick"),
};
