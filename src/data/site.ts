export const site = {
  name: 'Pensiunea Cuibul Viselor',
  shortName: 'Cuibul Viselor',
  alias: 'La Johnny',
  stars: 3,
  description:
    'Pensiune de 3 stele pe malul Cernei, în Băile Herculane: camere și apartamente, restaurant La Johnny, spa, grădină cu foișor și plajă pe râu.',
  phone: '0756 06 33 77',
  phoneHref: 'tel:+40756063377',
  email: 'cuibulviselor@yahoo.com',
  address: {
    street: 'Strada Pecinisca nr. 2',
    city: 'Băile Herculane',
    county: 'Caraș-Severin',
    zip: '325200',
    country: 'România',
  },
  bookingUrl: 'https://www.booking.com/hotel/ro/cuibul-viselor.ro.html',
  mapsQuery: 'Pensiunea Cuibul Viselor, Strada Pecinisca 2, Băile Herculane',
  languages: ['Română', 'Engleză', 'Germană'],
  checkIn: '16:00 – 20:00',
  checkOut: '08:00 – 10:30',
};

export const fullAddress = `${site.address.street}, ${site.address.city}, jud. ${site.address.county}, ${site.address.zip}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const nav = [
  { href: '/camere', label: 'Camere' },
  { href: '/restaurant', label: 'Restaurant' },
  { href: '/facilitati', label: 'Facilități' },
  { href: '/imprejurimi', label: 'Împrejurimi' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/rezervare', label: 'Contact' },
];

export const meals = [
  { name: 'Mic dejun', price: 50 },
  { name: 'Prânz', price: 85 },
  { name: 'Cină', price: 75 },
];

export const bookingSteps = [
  {
    title: 'Trimiteți cererea în scris',
    text: 'Chiar dacă ați vorbit deja la telefon cu noi, trimiteți-ne cererea și pe email. Astfel, toate detaliile rezervării rămân scrise, iar o copie ajunge și la dumneavoastră.',
  },
  {
    title: 'Achitați avansul',
    text: 'Pentru blocarea camerelor vă solicităm un avans de minimum 50% din valoarea sejurului. Avansul este o garanție pentru ambele părți: știți sigur că aveți camerele, iar noi știm că veți veni.',
  },
  {
    title: 'Trimiteți dovada plății',
    text: 'Răspundeți la emailul nostru cu dovada plății avansului (ordinul de plată scanat). După ce primim avansul, camerele sunt rezervate pentru dumneavoastră.',
  },
  {
    title: 'Restul, la sosire',
    text: 'Diferența se achită la recepția pensiunii, la sosire. Păstrați chitanța avansului, cu numele pensiunii, perioada sejurului și numărul de camere.',
  },
];

export const bookingRules = [
  'Avansul pentru rezervare este de minimum 50% din valoarea sejurului.',
  'Dacă avansul nu este achitat în termen de 3 zile, rezervarea nu mai este valabilă.',
  'Avansul nu se returnează dacă renunțarea la rezervare nu este anunțată cu cel puțin 21 de zile înainte de începerea sejurului.',
  'Restul sumei se achită la sosire, la recepția pensiunii.',
];

export const policies = [
  { title: 'Check-in', text: 'Între 16:00 și 20:00. Vă rugăm să ne anunțați în avans ora sosirii. La check-in se prezintă un act de identitate cu fotografie.' },
  { title: 'Check-out', text: 'Între 08:00 și 10:30.' },
  { title: 'Copii', text: 'Copiii de orice vârstă sunt bineveniți. Nu sunt disponibile pătuțuri sau paturi suplimentare.' },
  { title: 'Animale de companie', text: 'Sunt acceptate la cerere. Se pot percepe taxe.' },
  { title: 'Fumat', text: 'Fumatul nu este permis. Toate camerele sunt pentru nefumători.' },
  { title: 'Petreceri', text: 'Pensiunea nu găzduiește petreceri, evenimente private sau petreceri de burlaci.' },
];

export const faq = [
  {
    q: 'Există parcare la pensiune?',
    a: 'Da. Pensiunea are parcare privată, iluminată pe timpul nopții.',
  },
  {
    q: 'Se servește mic dejun?',
    a: 'Da, în restaurantul La Johnny al pensiunii. Micul dejun costă 50 RON de persoană, prânzul 85 RON, iar cina 75 RON.',
  },
  {
    q: 'Există spa?',
    a: 'Da. Pensiunea are mini-piscină, spa și hidromasaj. Serviciile spa se taxează separat: 50 RON pe oră, de persoană.',
  },
  {
    q: 'Pot plăti cu tichete de vacanță?',
    a: 'Da. Acceptăm tichete de vacanță și card de vacanță. În acest caz, suma totală pentru cazare și masă se achită integral cu acestea.',
  },
  {
    q: 'Sunt acceptate animalele de companie?',
    a: 'Da, la cerere. Se pot percepe taxe suplimentare.',
  },
  {
    q: 'Care este programul de check-in și check-out?',
    a: `Check-in între ${site.checkIn}, check-out între ${site.checkOut}.`,
  },
  {
    q: 'Există WiFi?',
    a: 'Da, WiFi gratuit în toată pensiunea.',
  },
  {
    q: 'Ce limbi se vorbesc la recepție?',
    a: 'Română, engleză și germană.',
  },
];
