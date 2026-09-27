import { restaurant } from '../lib/continut';
import { photo } from '../lib/photos';

/** Preparatele din restaurant: poza și denumirea, în ordinea din panou. */
export const dishes = restaurant.preparate
  .filter((d) => d.poza)
  .map((d) => {
    const name = d.nume || 'Preparat din bucătăria restaurantului La Johnny';
    return { key: d.poza, src: photo(d.poza), name, alt: `${name} – restaurantul La Johnny` };
  });
