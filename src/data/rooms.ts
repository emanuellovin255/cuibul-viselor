export interface Room {
  slug: string;
  name: string;
  /** Numele pe scurt, pentru carduri și formulare. */
  short: string;
  price: number;
  guests: number;
  size: number;
  beds: string[];
  highlight: string;
  intro: string;
  description: string;
  views: string[];
  features: string[];
  note?: string;
  /** Folderul de poze din src/assets/photos/camere/ */
  folder: string;
}

export const rooms: Room[] = [
  {
    slug: 'camera-royal-jacuzzi',
    name: 'Camera Royal cu jacuzzi',
    short: 'Royal cu jacuzzi',
    price: 550,
    guests: 2,
    size: 30,
    beds: ['1 pat dublu mare'],
    highlight: 'Jacuzzi în cameră',
    intro: 'Cea mai răsfățată cameră a casei, cu jacuzzi chiar în cameră.',
    description:
      'Camera Royal are 30 m², un pat dublu mare și cadă cu hidromasaj chiar în cameră. Are intrare privată și terasă cu vedere spre grădină. Din cameră vedeți munții, râul și curtea interioară, iar izolarea fonică vă asigură liniștea.',
    views: ['Grădină', 'Munte', 'Râu', 'Curte interioară'],
    features: [
      'Cadă cu hidromasaj',
      'Balcon și terasă',
      'Intrare privată',
      'Aer condiționat',
      'TV cu ecran plat',
      'Izolare fonică',
      'Birou și zonă de relaxare',
      'Canapea',
      'Frigider',
      'Uscător de păr',
    ],
    folder: 'camere/royal',
  },
  {
    slug: 'camera-dubla-deluxe',
    name: 'Camera dublă Deluxe',
    short: 'Dublă Deluxe',
    price: 300,
    guests: 2,
    size: 20,
    beds: ['1 pat dublu extra-large'],
    highlight: 'Ideală pentru cupluri',
    intro: 'O cameră caldă, luminoasă, pentru două persoane.',
    description:
      'Camera dublă Deluxe are 20 m², un pat dublu extra-large și baie proprie. Are acces la balcon și terasă, iar din cameră vedeți grădina, munții și râul. Are și birou, zonă de relaxare și canale TV prin satelit.',
    views: ['Grădină', 'Munte', 'Râu', 'Curte interioară'],
    features: [
      'Balcon și terasă',
      'Aer condiționat',
      'TV cu ecran plat, canale prin satelit',
      'Birou și zonă de relaxare',
      'Canapea',
      'Frigider',
      'Uscător de păr',
      'Garderobă',
    ],
    folder: 'camere/deluxe',
  },
  {
    slug: 'camera-familie',
    name: 'Camera de familie 2+1',
    short: 'Familie 2+1',
    price: 450,
    guests: 3,
    size: 25,
    beds: ['1 pat dublu', '1 canapea extensibilă'],
    highlight: 'Loc pentru trei',
    intro: 'Spațiu pentru doi adulți și un copil, cu terasă spre grădină.',
    description:
      'Camera de familie are 25 m², un pat dublu și o canapea extensibilă. Are baie proprie, balcon și terasă spre grădină și munți. Este gândită pentru familiile cu un copil.',
    views: ['Grădină', 'Munte', 'Curte interioară'],
    features: [
      'Balcon și terasă',
      'Canapea extensibilă',
      'Aer condiționat',
      'Încălzire',
      'TV cu ecran plat, canale prin satelit',
      'Birou și zonă de relaxare',
      'Frigider',
      'Uscător de păr',
    ],
    folder: 'camere/familie',
  },
  {
    slug: 'apartament-2-camere',
    name: 'Apartament cu 2 camere',
    short: 'Apartament 2 camere',
    price: 550,
    guests: 4,
    size: 40,
    beds: ['Dormitorul 1: pat dublu mare', 'Dormitorul 2: pat dublu mare'],
    highlight: 'Două dormitoare',
    intro: 'Două dormitoare separate, pentru familii sau prieteni.',
    description:
      'Apartamentul are 40 m² și două dormitoare separate, fiecare cu pat dublu mare. Are zonă de relaxare, balcon și terasă cu vedere spre grădină și munți. Este potrivit pentru o familie sau pentru doi prieteni care vin cu partenerii.',
    views: ['Grădină', 'Munte'],
    features: [
      'Două dormitoare separate',
      'Balcon și terasă',
      'Zonă de relaxare',
      'Aer condiționat',
      'TV cu ecran plat, canale prin satelit',
      'Frigider',
      'Articole de bucătărie',
      'Garderobă',
    ],
    note: 'Apartamentul este la etaj și se ajunge la el pe scări.',
    folder: 'camere/apartament-2-camere',
  },
  {
    slug: 'apartament-vedere-rau',
    name: 'Apartament cu 2 camere și vedere la râu',
    short: 'Apartament vedere la râu',
    price: 600,
    guests: 4,
    size: 40,
    beds: ['2 paturi duble'],
    highlight: 'Vedere spre Cerna',
    intro: 'Balcon deschis spre salcii și spre râul Cerna.',
    description:
      'Apartamentul are 40 m², două camere, balcon și terasă. Din el vedeți râul, munții și grădina, printre salcii. Pentru cei înalți, paturile au peste 2 metri lungime.',
    views: ['Râu', 'Munte', 'Grădină', 'Curte interioară'],
    features: [
      'Vedere la râu',
      'Balcon și terasă',
      'Paturi foarte lungi (peste 2 m)',
      'Aer condiționat',
      'Izolare fonică',
      'TV cu ecran plat, canale prin satelit',
      'Frigider',
      'Articole de bucătărie',
    ],
    folder: 'camere/apartament-vedere-rau',
  },
  {
    slug: 'apartament-3-camere',
    name: 'Apartament cu 3 camere',
    short: 'Apartament 3 camere',
    price: 700,
    guests: 6,
    size: 45,
    beds: ['Dormitorul 1: pat dublu', 'Dormitorul 2: pat dublu mare', 'Dormitorul 3: pat dublu'],
    highlight: 'Până la 6 persoane',
    intro: 'Trei dormitoare, pentru grupuri și familii mari.',
    description:
      'Cel mai mare apartament al pensiunii are 45 m² și trei dormitoare. Are intrare privată, terasă cu vedere spre grădină, zonă de relaxare și baie cu duș și uscător de păr. Aici stați împreună, dar fiecare are dormitorul lui.',
    views: ['Grădină', 'Munte'],
    features: [
      'Trei dormitoare',
      'Intrare privată',
      'Balcon și terasă',
      'Zonă de relaxare',
      'Aer condiționat',
      'TV cu ecran plat, canale prin satelit',
      'Frigider',
      'Uscător de păr',
    ],
    folder: 'camere/apartament-3-camere',
  },
];

/** Dotări prezente în toate camerele (conform Booking.com). */
export const commonAmenities = [
  'Baie proprie',
  'Articole de toaletă gratuite',
  'Lenjerie de pat și prosoape',
  'Aer condiționat',
  'TV cu ecran plat',
  'Frigider',
  'WiFi gratuit',
  'Plasă de țânțari',
];

export const minPrice = Math.min(...rooms.map((r) => r.price));
