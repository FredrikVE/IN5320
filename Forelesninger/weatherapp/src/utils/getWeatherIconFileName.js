// src/utils/getWeatherIconFileName.js
export function getWeatherIconFileName(description) {
  if (!description) return 'unknown.png';

  const normalized = String(description)
    .toLowerCase()
    .replace(/_/g, '')       // fjern underscore (clearsky_day -> clearskyday)
    .replace(/\s+/g, '')     // fjern whitespace
    .trim();

  // Suffix: d = day, n = night, m = polartwilight
  let suffix = '';
  if (normalized.endsWith('day')) suffix = 'd';
  else if (normalized.endsWith('night')) suffix = 'n';
  else if (normalized.endsWith('polartwilight')) suffix = 'm';

  const baseKey = normalized
    .replace(/day$/, '')
    .replace(/night$/, '')
    .replace(/polartwilight$/, '');

  // Samme mapping som i Kotlin-koden din (nynorsk, bokmål, engelsk)
  const map = {
    // Nynorsk
    'klårvêr': '01',
    'lettskya': '02',
    'delvisskya': '03',
    'skya': '04',
    'letteregnbyer': '40',
    'regnbyer': '05',
    'kraftigeregnbyer': '41',
    'letteregnbyerogtorevêr': '24',
    'regnbyerogtorevêr': '06',
    'kraftigeregnbyerogtorevêr': '25',
    'lettesluddbyer': '42',
    'sluddbyer': '07',
    'kraftigesluddbyer': '43',
    'lettesluddbyerogtorevêr': '26',
    'sluddbyerogtorevêr': '20',
    'kraftigesluddbyerogtorevêr': '27',
    'lettesnøbyer': '44',
    'snøbyer': '08',
    'kraftigesnøbyer': '45',
    'lettesnøbyerogtorevêr': '28',
    'snøbyerogtorevêr': '21',
    'kraftigesnøbyerogtorevêr': '29',
    'lettreng': '46',
    'regn': '09',
    'kraftigregn': '10',
    'lettrengogtorevêr': '30',
    'regnogtorevêr': '22',
    'kraftigregnogtorevêr': '11',
    'lettsludd': '47',
    'sludd': '12',
    'kraftigsludd': '48',
    'lettsluddogtorevêr': '31',
    'sluddogtorevêr': '23',
    'kraftigsluddogtorevêr': '32',
    'lettsnø': '49',
    'snø': '13',
    'kraftigsnø': '50',
    'lettsnøogtorevêr': '33',
    'snøogtorevêr': '14',
    'kraftigsnøogtorevêr': '34',
    'skodde': '15',

    // Bokmål
    'klarvær': '01',
    'lettskyet': '02',
    'delvisskyet': '03',
    'skyet': '04',
    'letteregnbyger': '40',
    'regnbyger': '05',
    'kraftigeregnbyger': '41',
    'letteregnbygerogtorden': '24',
    'regnbygerogtorden': '06',
    'kraftigeregnbygerogtorden': '25',
    'lettesluddbyger': '42',
    'sluddbyger': '07',
    'kraftigesluddbyger': '43',
    'lettesluddbygerogtorden': '26',
    'sluddbygerogtorden': '20',
    'kraftigesluddbygerogtorden': '27',
    'lettesnøbyger': '44',
    'snøbyger': '08',
    'kraftigesnøbyger': '45',
    'lettesnøbygerogtorden': '28',
    'snøbygerogtorden': '21',
    'kraftigesnøbygerogtorden': '29',
  
    'lettrengogtorden': '30',
    'regnogtorden': '22',
    'kraftigregnogtorden': '11',

    'lettsluddogtorden': '31',
    'sluddogtorden': '23',
    'kraftigsluddogtorden': '32',
    
    'lettsnøogtorden': '33',
    'snøogtorden': '14',
    'kraftigsnøogtorden': '34',
    'tåke': '15',

    // Engelsk (nye symbol_code-baser)
    'clearsky': '01',
    'fair': '02',
    'partlycloudy': '03',
    'cloudy': '04',
    'lightrainshowers': '40',
    'rainshowers': '05',
    'heavyrainshowers': '41',
    'lightrainshowersandthunder': '24',
    'rainshowersandthunder': '06',
    'heavyrainshowersandthunder': '25',
    'lightsleetshowers': '42',
    'sleetshowers': '07',
    'heavysleetshowers': '43',
    'lightsleetshowersandthunder': '26',
    'sleetshowersandthunder': '20',
    'heavysleetshowersandthunder': '27',
    'lightsnowshowers': '44',
    'snowshowers': '08',
    'heavysnowshowers': '45',
    'lightsnowshowersandthunder': '28',
    'snowshowersandthunder': '21',
    'heavysnowshowersandthunder': '29',
    'lightrain': '46',
    'rain': '09',
    'heavyrain': '10',
    'lightrainandthunder': '30',
    'rainandthunder': '22',
    'heavyrainandthunder': '11',
    'lightsleet': '47',
    'sleet': '12',
    'heavysleet': '48',
    'lightsleetandthunder': '31',
    'sleetandthunder': '23',
    'heavysleetandthunder': '32',
    'lightsnow': '49',
    'snow': '13',
    'heavysnow': '50',
    'lightsnowandthunder': '33',
    'snowandthunder': '14',
    'heavysnowandthunder': '34',
    'fog': '15',
  };

  const code = map[baseKey] ?? 'unknown';
  const fileName = suffix ? `${code}${suffix}.png` : `${code}.png`;
  return fileName;
}

// Hjelper som lager full URL mot public/met-icons/200/
export function getWeatherIconUrl(description) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}met-icons/200/${getWeatherIconFileName(description)}`;
}
