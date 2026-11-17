import { getCollection, type CollectionEntry } from 'astro:content';

export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const ui = {
  en: {
    'meta.title': 'Game Ever — Game & animation studio',
    'meta.description': 'Game Ever is an independent boutique studio from Buenos Aires making video games and animation: original properties and productions with leading brands, agencies and international publishers.',
    'nav.work': 'Work', 'nav.services': 'Services', 'nav.studio': 'Studio', 'nav.contact': 'Contact', 'nav.menu': 'Menu',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pause reel', 'reel.play': 'Play reel', 'reel.unmute': 'Unmute reel', 'reel.mute': 'Mute reel', 'reel.restart': 'Restart reel', 'reel.scroll': 'Scroll',
    'statement.lines': ['We dream.', 'We create.', 'We play.'],
    // EN copy below is a first draft: the site is written in Spanish first and translated at the end.
    'statement.body': 'Boutique video game and animation studio.',
    'statement.cta': 'See the work',
    'about.label': 'About us', 'about.title': 'From Buenos Aires to the world.',
    'about.p1': 'Since 2010 we have developed our own intellectual properties and productions for leading brands, agencies and international publishers.',
    'about.p2': 'Concept, art, code and animation. One team, from start to finish.',
    'worlds.label': 'What we do', 'worlds.title': ['Video games', 'and animation.'],
    'worlds.p1': 'Games that hook you. Memorable characters. Stories for every screen.',
    'worlds.games': 'Video games', 'worlds.gamesCta': 'See games', 'worlds.anim': 'Animation', 'worlds.animCta': 'See animation',
    'work.label': 'Projects', 'work.title': 'Selected work.', 'work.all': 'See all projects', 'work.allTitle': 'All projects.',
    'work.intro': 'Original games, brand campaigns and international co-productions.',
    'work.count': '{n} projects', 'work.showing': 'Showing {n} of {total}',
    'work.search': 'Search projects or clients', 'work.filter': 'Filter',
    'work.sort.featured': 'Featured', 'work.sort.newest': 'Newest', 'work.sort.az': 'A–Z', 'work.sort': 'Sort projects',
    'work.service': 'Service', 'work.platform': 'Platform', 'work.era': 'Era', 'work.client': 'Client', 'work.allClients': 'All clients',
    'work.clear': 'Clear all', 'work.show': 'Show results', 'work.empty': 'No projects match these filters.', 'work.emptyClear': 'Clear filters',
    'services.label': 'Services', 'services.title': ['From idea', 'to delivery.'],
    'services.sub': 'Three areas of expertise.', 'services.count': '{n} services', 'services.see': 'See projects',
    'services.groups': [
      { title: 'Video games', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames & branded games', 'HTML5 & web games', 'Mobile (iOS & Android)', 'PC & Steam', 'Edutainment', 'Game design & development'] },
      { title: 'Animation', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['2D & 3D animation', 'Character design', 'Series & kids content', 'Music videos & advertising', 'Trailers & cinematics'] },
      { title: 'Co-production', jump: 'codev', items: ['Unity development', '2D & 3D art', 'Game animation', 'Co-development', 'Porting & adaptation'] },
    ],
    'clients.label': 'Clients', 'clients.title': 'In good company.',
    'contact.label': 'Contact', 'contact.title': 'Let’s make something', 'contact.titleEm': 'awesome.',
    'form.title': 'Let’s get started.', 'form.name': 'Name', 'form.email': 'Email', 'form.message': 'Message',
    'form.send': 'Send message', 'form.sending': 'Sending…',
    'form.ok': 'Message received. We will reply shortly.',
    'form.error': 'The message could not be sent. Direct contact: info@gameeverstudio.com.',
    'form.mailto': 'The message is ready in the email app.',
    'form.subject': 'New project',
    'contact.careers': 'Careers', 'contact.studio': 'Studio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Hours', 'contact.hoursValue': 'Mon–Fri · 10–18 (GMT-3)', 'contact.follow': 'Social',
    'footer.version': 'Version', 'footer.rights': 'All rights reserved.',
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
    'statement.lines': ['Soñamos.', 'Creamos.', 'Jugamos.'],
    'statement.body': 'Estudio boutique de videojuegos y animación.',
    'statement.cta': 'Ver proyectos',
    'about.label': 'Nosotros', 'about.title': 'De Buenos Aires al mundo.',
    'about.p1': 'Desde 2010 desarrollamos propiedades intelectuales propias y producciones para marcas líderes, agencias y publishers internacionales.',
    'about.p2': 'Concepto, arte, código y animación. Un solo equipo, de principio a fin.',
    'worlds.label': 'Qué hacemos', 'worlds.title': ['Videojuegos', 'y animación.'],
    'worlds.p1': 'Juegos que atrapan. Personajes memorables. Historias para cada pantalla.',
    'worlds.games': 'Videojuegos', 'worlds.gamesCta': 'Ver videojuegos', 'worlds.anim': 'Animación', 'worlds.animCta': 'Ver animación',
    'work.label': 'Proyectos', 'work.title': 'Trabajo seleccionado.', 'work.all': 'Ver todos los proyectos', 'work.allTitle': 'Todos los proyectos.',
    'work.intro': 'Juegos propios, campañas para marcas y coproducciones internacionales.',
    'work.count': '{n} proyectos', 'work.showing': 'Mostrando {n} de {total}',
    'work.search': 'Buscar proyectos o clientes', 'work.filter': 'Filtrar',
    'work.sort.featured': 'Destacados', 'work.sort.newest': 'Más nuevos', 'work.sort.az': 'A–Z', 'work.sort': 'Ordenar proyectos',
    'work.service': 'Servicio', 'work.platform': 'Plataforma', 'work.era': 'Época', 'work.client': 'Cliente', 'work.allClients': 'Todos los clientes',
    'work.clear': 'Borrar todo', 'work.show': 'Ver resultados', 'work.empty': 'Ningún proyecto coincide con estos filtros.', 'work.emptyClear': 'Borrar filtros',
    'services.label': 'Servicios', 'services.title': ['De la idea', 'a la entrega.'],
    'services.sub': 'Tres áreas de especialización.', 'services.count': '{n} servicios', 'services.see': 'Ver proyectos',
    'services.groups': [
      { title: 'Videojuegos', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames y branded games', 'Juegos HTML5 y web', 'Mobile (iOS y Android)', 'PC y Steam', 'Edutainment', 'Game design y desarrollo'] },
      { title: 'Animación', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['Animación 2D y 3D', 'Diseño de personajes', 'Series y contenidos infantiles', 'Videoclips y publicidad', 'Tráilers y cinemáticas'] },
      { title: 'Co-producción', jump: 'codev', items: ['Desarrollo en Unity', 'Arte 2D y 3D', 'Animación para videojuegos', 'Co-desarrollo', 'Porting y adaptación'] },
    ],
    'clients.label': 'Clientes', 'clients.title': 'En buena compañía.',
    'contact.label': 'Contacto', 'contact.title': 'Hagamos algo increíble', 'contact.titleEm': 'juntos.',
    'form.title': 'Empecemos.', 'form.name': 'Nombre', 'form.email': 'Email', 'form.message': 'Mensaje',
    'form.send': 'Enviar mensaje', 'form.sending': 'Enviando…',
    'form.ok': 'Mensaje recibido. Responderemos a la brevedad.',
    'form.error': 'No se pudo enviar el mensaje. Contacto directo: info@gameeverstudio.com.',
    'form.mailto': 'El mensaje quedó listo en el programa de correo.',
    'form.subject': 'Nuevo proyecto',
    'contact.careers': 'Empleo', 'contact.studio': 'Estudio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Horario', 'contact.hoursValue': 'Lun–Vie · 10–18 (GMT-3)', 'contact.follow': 'Redes',
    'footer.version': 'Versión', 'footer.rights': 'Todos los derechos reservados.',
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

// `icon` is an SVG path for a 24×24 viewBox (draw with fill-rule="evenodd").
export const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gameeverstudio/', icon: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21H9z' },
  { label: 'YouTube', url: 'https://www.youtube.com/user/gameeverstudio', icon: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z' },
  { label: 'Instagram', url: 'https://www.instagram.com/gameeverstudio/', icon: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.3 5.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z' },
  { label: 'X', url: 'https://twitter.com/gameeverstudio', icon: 'M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.7 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z' },
];

export const REEL_ID = 'qyPSBhVrY08';

