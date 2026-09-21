import { photos } from '../lib/photos';

/** Numele preparatelor din folderul src/assets/photos/preparate/, în ordinea fișierelor. */
const names = [
  'Mic dejun cu ochiuri, cașcaval și legume',
  'Ciorbă de burtă, în castron de lut',
  'Ciorbă servită în vas de lut, cu pâine de casă',
  'Cârnați la cuptor în vas de lut, cu murături',
  'Tocăniță cu mămăligă, ou și brânză',
  'Tocăniță cu mămăligă, ou și cașcaval ras',
  'Gulaș cu mămăligă și cașcaval',
  'Pui la tigaie cu legume și mămăligă',
  'File cu sos alb și cartofi natur',
  'Păstrăv la grătar cu mămăligă',
  'Desert de casă, cu frișcă și caramel',
];

export const dishes = photos('preparate').map((src, i) => ({
  src,
  name: names[i] ?? 'Preparat din bucătăria restaurantului La Johnny',
  alt: `${names[i] ?? 'Preparat'} – restaurantul La Johnny`,
}));
