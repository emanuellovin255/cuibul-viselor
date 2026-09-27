import { facilitati } from '../lib/continut';
import { icon } from '../lib/icons';

export const facilities = facilitati.facilitati.map((f) => ({ icon: icon(f.icon), title: f.titlu, text: f.text }));
