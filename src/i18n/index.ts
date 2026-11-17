import { getCollection, type CollectionEntry } from 'astro:content';

export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const ui = {
  en: {
    'meta.title': 'Game Ever — Game & animation studio',
    'meta.description': 'Game Ever is an independent boutique studio from Buenos Aires making video games and animation: original properties and productions with leading brands, agencies and international publishers.',
    'nav.work': 'Work', 'nav.services': 'Services', 'nav.studio': 'Studio', 'nav.contact': 'Contact', 'nav.menu': 'Menu',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pause reel', 'reel.play': 'Play reel', 'reel.unmute': 'Unmute reel', 'reel.mute': 'Mute reel', 'reel.restart': 'Restart reel', 'reel.scroll': 'Scroll',
    'statement.lines': ['We dare.', 'We create.', 'We play.'],
    // EN copy below is a first draft: the site is written in Spanish first and translated at the end.
    'statement.body': 'Boutique video game and animation studio.',
    'statement.cta': 'See the work',
    'about.label': 'About us', 'about.title': 'From Buenos Aires to the world.',
    'about.p1': 'Since 2010 we have developed our own intellectual properties and productions for leading brands, agencies and international publishers.',
    'about.p2': 'Concept, art, code and animation. One team, from start to finish.',
    'worlds.label': 'What we do', 'worlds.title': 'Video games and animation. One craft.',
    'worlds.p1': 'Games that hook you. Characters with a life of their own. Stories for every screen.',
    'worlds.games': 'Video games', 'worlds.gamesCta': 'See games', 'worlds.anim': 'Animation', 'worlds.animCta': 'See animation',
    'work.label': 'Projects', 'work.title': 'Selected work.',
    'work.intro': 'Original games, brand campaigns and international co-productions.',
    'work.count': '{n} projects', 'work.showing': 'Showing {n} of {total}',
    'work.search': 'Search projects or clients', 'work.filter': 'Filter',
    'work.sort.featured': 'Featured', 'work.sort.newest': 'Newest', 'work.sort.az': 'A–Z', 'work.sort': 'Sort projects',
    'work.service': 'Service', 'work.platform': 'Platform', 'work.era': 'Era', 'work.client': 'Client', 'work.allClients': 'All clients',
    'work.clear': 'Clear all', 'work.show': 'Show results', 'work.empty': 'No projects match these filters.', 'work.emptyClear': 'Clear filters',
    'services.label': 'Services', 'services.title': 'From idea to delivery.',
    'services.sub': 'Three areas of expertise.', 'services.count': '{n} services', 'services.see': 'See projects',
    'services.groups': [
      { title: 'Video games', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames & branded games', 'HTML5 & web games', 'Mobile (iOS & Android)', 'PC & Steam', 'Edutainment', 'Game design & development'] },
      { title: 'Animation', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['2D & 3D animation', 'Character design', 'Series & kids content', 'Music videos & advertising', 'Trailers & cinematics'] },
      { title: 'Co-production', jump: 'codev', items: ['Unity development', '2D & 3D art', 'Game animation', 'Co-development', 'Porting & adaptation'] },
    ],
    'clients.label': 'Clients', 'clients.title': 'In good company.', 'clients.body': 'Leading brands and publishers.',
    'contact.label': 'Contact', 'contact.title': 'Let’s make something', 'contact.titleEm': 'awesome.',
    'contact.intro': 'New projects and partnerships.',
    'contact.direct': 'Direct contact',
    'form.title': 'New project', 'form.name': 'Name', 'form.email': 'Email', 'form.company': 'Company or studio (optional)',
    'form.type': 'Project type', 'form.types': ['Game for a brand', 'Web game / edutainment', 'Co-development / outsourcing', 'Animation', 'Other'],
    'form.message': 'Message', 'form.messageHint': 'Idea, timing and estimated budget.',
    'form.send': 'Send message', 'form.sending': 'Sending…',
    'form.ok': 'Message received. We will reply shortly.',
    'form.error': 'The message could not be sent. Direct contact: info@gameeverstudio.com.',
    'form.mailto': 'The message is ready in the email app.',
    'form.subject': 'New project',
    'contact.careers': 'Careers', 'contact.studio': 'Studio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Hours', 'contact.hoursValue': 'Mon–Fri · 10–18 (GMT-3)', 'contact.follow': 'Social',
    'footer.tagline': 'We dare. We create. We play.',
    'project.allWork': '← All work', 'project.trailer': 'Watch trailer', 'project.client': 'Client', 'project.year': 'Year',
    'project.platforms': 'Platforms', 'project.genre': 'Genre', 'project.role': 'Our role', 'project.services': 'Services',
    'project.videos': 'Videos', 'project.seasons': 'Seasons & campaigns', 'project.gallery': 'Gallery', 'project.credits': 'Credits',
    'project.next': 'Next project →', 'project.cta': 'A similar project?', 'project.play': 'Play video',
  },
  es: {
    'meta.title': 'Game Ever — Estudio de videojuegos y animación',
    'meta.description': 'Game Ever es un estudio boutique independiente de Buenos Aires que crea videojuegos y animación: propiedades propias y producciones con marcas, agencias y publishers internacionales.',
    'nav.work': 'Proyectos', 'nav.services': 'Servicios', 'nav.studio': 'Estudio', 'nav.contact': 'Contacto', 'nav.menu': 'Menú',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pausar reel', 'reel.play': 'Reproducir reel', 'reel.unmute': 'Activar sonido', 'reel.mute': 'Silenciar', 'reel.restart': 'Reiniciar reel', 'reel.scroll': 'Bajar',
    'statement.lines': ['Desafiamos.', 'Creamos.', 'Jugamos.'],
    'statement.body': 'Estudio boutique de videojuegos y animación.',
    'statement.cta': 'Ver proyectos',
    'about.label': 'Nosotros', 'about.title': 'De Buenos Aires al mundo.',
    'about.p1': 'Desde 2010 desarrollamos propiedades intelectuales propias y producciones para marcas líderes, agencias y publishers internacionales.',
    'about.p2': 'Concepto, arte, código y animación. Un solo equipo, de principio a fin.',
    'worlds.label': 'Qué hacemos', 'worlds.title': 'Videojuegos y animación. Un mismo oficio.',
    'worlds.p1': 'Juegos que atrapan. Personajes con vida propia. Historias para cada pantalla.',
    'worlds.games': 'Videojuegos', 'worlds.gamesCta': 'Ver videojuegos', 'worlds.anim': 'Animación', 'worlds.animCta': 'Ver animación',
    'work.label': 'Proyectos', 'work.title': 'Trabajo seleccionado.',
    'work.intro': 'Juegos propios, campañas para marcas y coproducciones internacionales.',
    'work.count': '{n} proyectos', 'work.showing': 'Mostrando {n} de {total}',
    'work.search': 'Buscar proyectos o clientes', 'work.filter': 'Filtrar',
    'work.sort.featured': 'Destacados', 'work.sort.newest': 'Más nuevos', 'work.sort.az': 'A–Z', 'work.sort': 'Ordenar proyectos',
    'work.service': 'Servicio', 'work.platform': 'Plataforma', 'work.era': 'Época', 'work.client': 'Cliente', 'work.allClients': 'Todos los clientes',
    'work.clear': 'Borrar todo', 'work.show': 'Ver resultados', 'work.empty': 'Ningún proyecto coincide con estos filtros.', 'work.emptyClear': 'Borrar filtros',
    'services.label': 'Servicios', 'services.title': 'De la idea a la entrega.',
    'services.sub': 'Tres áreas de especialización.', 'services.count': '{n} servicios', 'services.see': 'Ver proyectos',
    'services.groups': [
      { title: 'Videojuegos', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames y branded games', 'Juegos HTML5 y web', 'Mobile (iOS y Android)', 'PC y Steam', 'Edutainment', 'Game design y desarrollo'] },
      { title: 'Animación', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['Animación 2D y 3D', 'Diseño de personajes', 'Series y contenidos infantiles', 'Videoclips y publicidad', 'Tráilers y cinemáticas'] },
      { title: 'Co-producción', jump: 'codev', items: ['Desarrollo en Unity', 'Arte 2D y 3D', 'Animación para videojuegos', 'Co-desarrollo', 'Porting y adaptación'] },
    ],
    'clients.label': 'Clientes', 'clients.title': 'En buena compañía.', 'clients.body': 'Marcas y publishers de primer nivel.',
    'contact.label': 'Contacto', 'contact.title': 'Hagamos algo increíble', 'contact.titleEm': 'juntos.',
    'contact.intro': 'Nuevos proyectos y alianzas.',
    'contact.direct': 'Contacto directo',
    'form.title': 'Nuevo proyecto', 'form.name': 'Nombre', 'form.email': 'Email', 'form.company': 'Empresa o estudio (opcional)',
    'form.type': 'Tipo de proyecto', 'form.types': ['Juego para una marca', 'Juego web / edutainment', 'Co-desarrollo / outsourcing', 'Animación', 'Otro'],
    'form.message': 'Mensaje', 'form.messageHint': 'Idea, plazos y presupuesto estimado.',
    'form.send': 'Enviar mensaje', 'form.sending': 'Enviando…',
    'form.ok': 'Mensaje recibido. Responderemos a la brevedad.',
    'form.error': 'No se pudo enviar el mensaje. Contacto directo: info@gameeverstudio.com.',
    'form.mailto': 'El mensaje quedó listo en el programa de correo.',
    'form.subject': 'Nuevo proyecto',
    'contact.careers': 'Empleo', 'contact.studio': 'Estudio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Horario', 'contact.hoursValue': 'Lun–Vie · 10–18 (GMT-3)', 'contact.follow': 'Redes',
    'footer.tagline': 'Desafiamos. Creamos. Jugamos.',
    'project.allWork': '← Todos los proyectos', 'project.trailer': 'Ver tráiler', 'project.client': 'Cliente', 'project.year': 'Año',
    'project.platforms': 'Plataformas', 'project.genre': 'Género', 'project.role': 'Nuestro rol', 'project.services': 'Servicios',
    'project.videos': 'Videos', 'project.seasons': 'Temporadas y campañas', 'project.gallery': 'Galería', 'project.credits': 'Créditos',
    'project.next': 'Próximo proyecto →', 'project.cta': '¿Un proyecto similar?', 'project.play': 'Reproducir video',
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

// Plain-text client list (v2 design). Keep in sync with src/data/clients.ts, which has the logos.
export const CLIENTS = ['Cartoon Network', 'Warner Music', 'Devolver Digital', 'Fiat', 'Michelin', 'Boomerang', 'Legends of Learning', 'Chevrolet', 'Leader Entertainment', 'El Reino Infantil', 'Tic Tac', 'Graffiti Games', 'Loto Plus', 'Rookbird Games', 'Tecpetrol', 'AUBASA'];

export const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gameeverstudio/' },
  { label: 'YouTube', url: 'https://www.youtube.com/user/gameeverstudio' },
  { label: 'Instagram', url: 'https://www.instagram.com/gameeverstudio/' },
  { label: 'X', url: 'https://twitter.com/gameeverstudio' },
];

export const REEL_ID = 'qyPSBhVrY08';

