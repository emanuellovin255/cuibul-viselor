/** Scoruri și recenzii publice de pe Booking.com. */
export const rating = {
  score: 9.0,
  label: 'Superb',
  count: 9,
  source: 'Booking.com',
};

export const ratingCategories = [
  { label: 'Curățenie', score: 9.5 },
  { label: 'Confort', score: 9.5 },
  { label: 'Personal', score: 9.0 },
  { label: 'Facilități', score: 8.5 },
  { label: 'Raport calitate/preț', score: 8.5 },
  { label: 'Locație', score: 8.5 },
];

export const reviews = [
  {
    name: 'Valentina',
    country: 'România',
    text: 'A fost totul la superlativ! Camera super curată, lenjeriile de pat și prosoapele sunt impecabile! Mâncarea delicioasă. Grădina, curtea foarte îngrijite. Sigur mai revenim.',
  },
  {
    name: 'Buze',
    country: 'România',
    text: 'Camera ireproșabilă, personalul foarte competent și profesionist, atmosfera foarte prietenoasă și totul foarte curat și ordonat.',
  },
  {
    name: 'Teodora',
    country: 'România',
    text: 'Foarte frumoasă locația, liniște, iar domnul Johnny un om extraordinar.',
  },
];

export const formatScore = (n: number) => n.toFixed(1).replace('.', ',');
