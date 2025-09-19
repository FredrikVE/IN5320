# README

## 1) Hvordan initialisere et prosjekt?

### a) naviger inn i mappa der du vil at prosjektmappa til DHIS2 prosjektet skal ligge

```bash
cd <navn på mappe der du vil ha prosjekt mappa initialisert>
```

### b) initialiser DHIS2-prosjekt på denne måten

``` bash
d2 app scripts init <ønsket navn på prosjektmappe>
```

### c) innstaller yarn
```bash 
yarn install
```


## 2) Hvordan starte DHIS2 proxy?
```bash
npx dhis-portal --target=https://data.research.dhis2.org/in5320/
```


## 3) Hvordan starte devserver med yarn?

```bash
cd <navn på prosjektmappe>
yarn start
```