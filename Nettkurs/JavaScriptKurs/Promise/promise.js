const fetchData = new Promise((resolve) => {
  setTimeout((data) => {
    resolve(data);
  }, 2000, "Dataen er klar!");
});

console.log("Venter på data...");

fetchData.then(result => console.log(result));

