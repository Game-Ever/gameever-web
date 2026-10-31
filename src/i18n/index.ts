import { getCollection, type CollectionEntry } from 'astro:content';

export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const ui = {
  en: {
    'meta.title': 'Game Ever — Game & animation studio',
    'meta.description': 'Game Ever is a game and animation studio from Buenos Aires. Brand games, web games and co-development for Cartoon Network, Warner Music, Devolver Digital, Fiat and Michelin.',
    'nav.work': 'Work', 'nav.services': 'Services', 'nav.studio': 'Studio', 'nav.contact': 'Contact', 'nav.menu': 'Menu',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pause reel', 'reel.play': 'Play reel', 'reel.unmute': 'Unmute reel', 'reel.mute': 'Mute reel', 'reel.restart': 'Restart reel', 'reel.scroll': 'Scroll',
    'statement.lines': ['We dream.', 'We play.', 'We create.'],
    'statement.body': 'Game & animation studio from Buenos Aires since 2010. Brand games, web games and co-development for Cartoon Network, Warner Music, Devolver Digital, Fiat and Michelin.',
    'statement.cta': 'See the work',
    'work.title': 'The work', 'work.count': '{n} projects', 'work.showing': 'Showing {n} of {total}',
    'work.search': 'Search projects or clients', 'work.filter': 'Filter',
    'work.sort.featured': 'Featured', 'work.sort.newest': 'Newest', 'work.sort.az': 'A–Z', 'work.sort': 'Sort projects',
    'work.service': 'Service', 'work.platform': 'Platform', 'work.era': 'Era', 'work.client': 'Client', 'work.allClients': 'All clients',
    'work.clear': 'Clear all', 'work.show': 'Show results', 'work.empty': 'No projects match these filters.', 'work.emptyClear': 'Clear filters',
    'services.1.title': 'Games for brands & the web',
    'services.1.body': 'Advergames, HTML5 browser games and edutainment for brands, agencies and game portals. We handle concept, art, code and launch, and make games people actually want to play.',
    'services.1.tags': ['Advergames', 'HTML5 / web', 'Edutainment', 'iOS & Android', 'Game design'],
    'services.1.cta': 'See brand & web games',
    'services.2.title': 'Co-development & outsourcing',
    'services.2.body': 'Artists, animators and Unity engineers who join your pipeline. Game art, animation, development, porting and trailers for studios and publishers, in a time zone that overlaps with the US and Europe.',
    'services.2.tags': ['2D / 3D game art', 'Animation', 'Unity development', 'Porting', 'Trailers'],
    'services.2.cta': 'See co-dev work',
    'clients.label': 'Trusted by · since 2010',
    'contact.label': 'Contact', 'contact.title': 'Let’s make it', 'contact.titleEm': 'playable.',
    'contact.careers': 'Careers', 'contact.studio': 'Studio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Hours', 'contact.hoursValue': 'Mon–Fri · 10–18 (GMT-3)', 'contact.follow': 'Follow',
    'footer.tagline': 'We dream. We play. We create.',
    'project.allWork': '← All work', 'project.trailer': 'Watch trailer', 'project.client': 'Client', 'project.year': 'Year',
    'project.platforms': 'Platforms', 'project.genre': 'Genre', 'project.role': 'Our role', 'project.services': 'Services',
    'project.videos': 'Videos', 'project.seasons': 'Seasons & campaigns', 'project.gallery': 'Gallery', 'project.credits': 'Credits',
    'project.next': 'Next project →', 'project.cta': 'Want something like this?', 'project.play': 'Play video',
  },
  es: {
    'meta.title': 'Game Ever — Estudio de videojuegos y animación',
    'meta.description': 'Game Ever es un estudio de videojuegos y animación de Buenos Aires. Juegos para marcas, juegos web y co-desarrollo para Cartoon Network, Warner Music, Devolver Digital, Fiat y Michelin.',
    'nav.work': 'Proyectos', 'nav.services': 'Servicios', 'nav.studio': 'Estudio', 'nav.contact': 'Contacto', 'nav.menu': 'Menú',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pausar reel', 'reel.play': 'Reproducir reel', 'reel.unmute': 'Activar sonido', 'reel.mute': 'Silenciar', 'reel.restart': 'Reiniciar reel', 'reel.scroll': 'Bajar',
    'statement.lines': ['We dream.', 'We play.', 'We create.'],
    'statement.body': 'Estudio de videojuegos y animación de Buenos Aires desde 2010. Juegos para marcas, juegos web y co-desarrollo para Cartoon Network, Warner Music, Devolver Digital, Fiat y Michelin.',
    'statement.cta': 'Ver proyectos',
    'work.title': 'Proyectos', 'work.count': '{n} proyectos', 'work.showing': 'Mostrando {n} de {total}',
    'work.search': 'Buscar proyectos o clientes', 'work.filter': 'Filtrar',
    'work.sort.featured': 'Destacados', 'work.sort.newest': 'Más nuevos', 'work.sort.az': 'A–Z', 'work.sort': 'Ordenar proyectos',
    'work.service': 'Servicio', 'work.platform': 'Plataforma', 'work.era': 'Época', 'work.client': 'Cliente', 'work.allClients': 'Todos los clientes',
    'work.clear': 'Borrar todo', 'work.show': 'Ver resultados', 'work.empty': 'Ningún proyecto coincide con estos filtros.', 'work.emptyClear': 'Borrar filtros',
    'services.1.title': 'Juegos para marcas y la web',
    'services.1.body': 'Advergames, juegos HTML5 para navegador y edutainment para marcas, agencias y portales de juegos. Nos ocupamos del concepto, el arte, el código y el lanzamiento, y hacemos juegos que la gente realmente quiere jugar.',
    'services.1.tags': ['Advergames', 'HTML5 / web', 'Edutainment', 'iOS y Android', 'Game design'],
    'services.1.cta': 'Ver juegos para marcas y web',
    'services.2.title': 'Co-desarrollo y outsourcing',
    'services.2.body': 'Artistas, animadores e ingenieros de Unity que se suman a tu pipeline. Arte para juegos, animación, desarrollo, porting y tráilers para estudios y publishers, en un huso horario compatible con EE.UU. y Europa.',
    'services.2.tags': ['Arte 2D / 3D', 'Animación', 'Desarrollo en Unity', 'Porting', 'Tráilers'],
    'services.2.cta': 'Ver trabajos de co-desarrollo',
    'clients.label': 'Confiaron en nosotros · desde 2010',
    'contact.label': 'Contacto', 'contact.title': 'Hagámoslo', 'contact.titleEm': 'jugable.',
    'contact.careers': 'Trabajá con nosotros', 'contact.studio': 'Estudio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Horario', 'contact.hoursValue': 'Lun–Vie · 10–18 (GMT-3)', 'contact.follow': 'Seguinos',
    'footer.tagline': 'We dream. We play. We create.',
    'project.allWork': '← Todos los proyectos', 'project.trailer': 'Ver tráiler', 'project.client': 'Cliente', 'project.year': 'Año',
    'project.platforms': 'Plataformas', 'project.genre': 'Género', 'project.role': 'Nuestro rol', 'project.services': 'Servicios',
    'project.videos': 'Videos', 'project.seasons': 'Temporadas y campañas', 'project.gallery': 'Galería', 'project.credits': 'Créditos',
    'project.next': 'Próximo proyecto →', 'project.cta': '¿Querés algo así?', 'project.play': 'Reproducir video',
  },
} as const;

type Key = keyof (typeof ui)['en'];

export function useT(lang: Lang) {
  return <K extends Key>(key: K, vars: Record<string, string | number> = {}) => {
    const value = ui[lang][key] as (typeof ui)['en'][K];
    return (typeof value === 'string'
      // Placeholders without a value are kept, so client-side scripts can fill them later.
      ? value.replace(/\{(\w+)\}/g, (m, v) => (v in vars ? String(vars[v]) : m))
      : value) as (typeof ui)['en'][K];
  };
}

/** Picks the right language from a plain string or an { en, es } object. */
export const tr = (value: string | { en: string; es: string } | undefined, lang: Lang) =>
  value === undefined ? '' : typeof value === 'string' ? value : value[lang];

/** Our own games and series use "Original IP" as client; show it translated. */
export const ORIGINAL_IP = 'Original IP';
export const clientName = (client: string, lang: Lang) =>
  client === ORIGINAL_IP ? (lang === 'es' ? 'IP propia' : 'Original IP') : client;

export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));

// The site can be served from a sub-path (e.g. GitHub Pages: /gameever-web/), so every
// internal link goes through withBase().
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const withBase = (path = '') => BASE + path.replace(/^\//, '');

export const url = (lang: Lang, path = '') => withBase(`${lang}/${path ? path.replace(/^\/|\/$/g, '') + '/' : ''}`);

/** Published projects in "Featured" order: curated ones first, then newest. */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.hidden);
  return all.sort((a, b) => {
    const fa = a.data.featured ?? Infinity, fb = b.data.featured ?? Infinity;
    return fa !== fb ? fa - fb : b.data.year - a.data.year || a.data.title.localeCompare(b.data.title);
  });
}
export type Project = CollectionEntry<'projects'>;

export const CLIENTS = ['Cartoon Network', 'Warner Music', 'Devolver Digital', 'Fiat', 'Michelin', 'Chevrolet', 'Legends of Learning', 'Leader Entertainment', 'El Reino Infantil', 'Tic Tac', 'Tecpetrol', 'Rookbird Games'];

export const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gameeverstudio/' },
  { label: 'YouTube', url: 'https://www.youtube.com/user/gameeverstudio' },
  { label: 'Instagram', url: 'https://www.instagram.com/gameeverstudio/' },
  { label: 'X', url: 'https://twitter.com/gameeverstudio' },
];

export const REEL_ID = 'qyPSBhVrY08';

