// Client logos shown on the home page. Logos come from the old site (white background, 300×300).
// Clients without a logo file are shown as a typographic tile; add a logo later by importing it here.
import type { ImageMetadata } from 'astro';
import cartoonNetwork from '../assets/clients/cartoon-network.png';
import boomerang from '../assets/clients/boomerang.png';
import warnerMusic from '../assets/clients/warner-music.png';
import fiat from '../assets/clients/fiat.png';
import michelin from '../assets/clients/michelin.png';
import chevrolet from '../assets/clients/chevrolet.png';
import legendsOfLearning from '../assets/clients/legends-of-learning.png';
import leaderEntertainment from '../assets/clients/leader-entertainment.png';
import elReinoInfantil from '../assets/clients/el-reino-infantil.png';
import graffitiGames from '../assets/clients/graffiti-games.png';
import lotoPlus from '../assets/clients/loto-plus.png';
import tecpetrol from '../assets/clients/tecpetrol.png';
import aubasa from '../assets/clients/aubasa.png';

export interface Client { name: string; logo?: ImageMetadata }

export const CLIENT_LOGOS: Client[] = [
  { name: 'Cartoon Network', logo: cartoonNetwork },
  { name: 'Warner Music', logo: warnerMusic },
  { name: 'Devolver Digital' },
  { name: 'Fiat', logo: fiat },
  { name: 'Michelin', logo: michelin },
  { name: 'Boomerang', logo: boomerang },
  { name: 'Legends of Learning', logo: legendsOfLearning },
  { name: 'Chevrolet', logo: chevrolet },
  { name: 'Leader Entertainment', logo: leaderEntertainment },
  { name: 'El Reino Infantil', logo: elReinoInfantil },
  { name: 'Tic Tac' },
  { name: 'Graffiti Games', logo: graffitiGames },
  { name: 'Loto Plus', logo: lotoPlus },
  { name: 'Rookbird Games' },
  { name: 'Tecpetrol', logo: tecpetrol },
  { name: 'AUBASA', logo: aubasa },
];
