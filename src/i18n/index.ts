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
    'statement.body': 'An independent boutique studio making video games and animation.',
    'statement.cta': 'See the work',
    'about.label': 'About us', 'about.title': 'From Buenos Aires to the world.',
    'about.p1': 'Founded in 2010, Game Ever is an independent video game and animation studio. We develop our own intellectual properties and produce projects with leading brands, agencies and international publishers.',
    'about.p2': 'We create from scratch. We produce from start to finish. We know what it takes to turn big ideas into big productions.',
    'worlds.label': 'What we do', 'worlds.title': 'Two worlds. One passion for creating.',
    'worlds.p1': 'Games that entertain. Characters that come to life. Stories that reach every screen.',
    'worlds.p2': 'From interactive entertainment to animation, we explore different ways to create and tell stories.',
    'worlds.games': 'Video games', 'worlds.gamesCta': 'See games', 'worlds.anim': 'Animation', 'worlds.animCta': 'See animation',
    'work.label': 'Projects', 'work.title': 'From our ideas to the world.',
    'work.intro': 'Original properties, productions for brands and co-productions with international partners. Every project is a new chance to make something different.',
    'work.count': '{n} projects', 'work.showing': 'Showing {n} of {total}',
    'work.search': 'Search projects or clients', 'work.filter': 'Filter',
    'work.sort.featured': 'Featured', 'work.sort.newest': 'Newest', 'work.sort.az': 'A–Z', 'work.sort': 'Sort projects',
    'work.service': 'Service', 'work.platform': 'Platform', 'work.era': 'Era', 'work.client': 'Client', 'work.allClients': 'All clients',
    'work.clear': 'Clear all', 'work.show': 'Show results', 'work.empty': 'No projects match these filters.', 'work.emptyClear': 'Clear filters',
    'services.label': 'Services', 'services.title': 'Big ideas. Teams ready to make them real.',
    'services.sub': 'Three areas, endless possibilities.', 'services.count': '{n} services', 'services.see': 'See projects',
    'services.groups': [
      { title: 'Video games', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames & branded games', 'HTML5 & web games', 'Mobile (iOS & Android)', 'PC & Steam', 'Edutainment', 'Game design & development'] },
      { title: 'Animation', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['2D & 3D animation', 'Character design', 'Series & kids content', 'Music videos & advertising', 'Trailers & cinematics'] },
      { title: 'Co-production', jump: 'codev', items: ['Unity development', '2D & 3D art', 'Game animation', 'Co-development', 'Porting & adaptation'] },
    ],
    'clients.label': 'Clients', 'clients.title': 'In good company.', 'clients.body': 'Big names, big challenges and many shared projects.',
    'contact.label': 'Contact', 'contact.title': 'Let’s make something', 'contact.titleEm': 'awesome.',
    'contact.intro': 'Looking for a studio for your next project? Let’s talk.',
    'contact.direct': 'Or write to us directly',
    'form.title': 'Tell us about your project', 'form.name': 'Name', 'form.email': 'Email', 'form.company': 'Company or studio (optional)',
    'form.type': 'What do you need?', 'form.types': ['A game for my brand', 'Web game / edutainment', 'Co-development / outsourcing', 'Animation', 'Something else'],
    'form.message': 'Message', 'form.messageHint': 'The idea, timing and a rough budget if you have one.',
    'form.send': 'Send message', 'form.sending': 'Sending…',
    'form.ok': 'Thanks! Your message is in. We’ll get back to you soon.',
    'form.error': 'We couldn’t send it. Please write to info@gameeverstudio.com.',
    'form.mailto': 'Your email app opened with the message ready to send.',
    'form.subject': 'New project',
    'contact.careers': 'Careers', 'contact.studio': 'Studio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Hours', 'contact.hoursValue': 'Mon–Fri · 10–18 (GMT-3)', 'contact.follow': 'Follow',
    'footer.tagline': 'We dare. We create. We play.',
    'project.allWork': '← All work', 'project.trailer': 'Watch trailer', 'project.client': 'Client', 'project.year': 'Year',
    'project.platforms': 'Platforms', 'project.genre': 'Genre', 'project.role': 'Our role', 'project.services': 'Services',
    'project.videos': 'Videos', 'project.seasons': 'Seasons & campaigns', 'project.gallery': 'Gallery', 'project.credits': 'Credits',
    'project.next': 'Next project →', 'project.cta': 'Want something like this?', 'project.play': 'Play video',
  },
  es: {
    'meta.title': 'Game Ever — Estudio de videojuegos y animación',
    'meta.description': 'Game Ever es un estudio boutique independiente de Buenos Aires que crea videojuegos y animación: propiedades propias y producciones con marcas, agencias y publishers internacionales.',
    'nav.work': 'Proyectos', 'nav.services': 'Servicios', 'nav.studio': 'Estudio', 'nav.contact': 'Contacto', 'nav.menu': 'Menú',
    'reel.label': 'Demo reel 2024', 'reel.pause': 'Pausar reel', 'reel.play': 'Reproducir reel', 'reel.unmute': 'Activar sonido', 'reel.mute': 'Silenciar', 'reel.restart': 'Reiniciar reel', 'reel.scroll': 'Bajar',
    'statement.lines': ['Desafiamos.', 'Creamos.', 'Jugamos.'],
    'statement.body': 'Un estudio boutique independiente que crea videojuegos y animación.',
    'statement.cta': 'Ver proyectos',
    'about.label': 'Nosotros', 'about.title': 'De Buenos Aires al mundo.',
    'about.p1': 'Fundado en 2010, Game Ever es un estudio independiente de videojuegos y animación. Desarrollamos propiedades intelectuales propias y producimos proyectos junto a marcas líderes, agencias y publishers internacionales.',
    'about.p2': 'Creamos desde cero. Producimos de principio a fin. Sabemos lo que hace falta para transformar grandes ideas en grandes producciones.',
    'worlds.label': 'Qué hacemos', 'worlds.title': 'Dos mundos. Una misma pasión por crear.',
    'worlds.p1': 'Videojuegos que entretienen. Personajes que cobran vida. Historias que llegan a distintas pantallas.',
    'worlds.p2': 'Del entretenimiento interactivo a la animación, exploramos diferentes formas de crear y contar historias.',
    'worlds.games': 'Videojuegos', 'worlds.gamesCta': 'Ver videojuegos', 'worlds.anim': 'Animación', 'worlds.animCta': 'Ver animación',
    'work.label': 'Proyectos', 'work.title': 'De nuestras ideas al mundo.',
    'work.intro': 'Propiedades originales, producciones para marcas y coproducciones con socios internacionales. Cada proyecto es una nueva oportunidad para hacer algo diferente.',
    'work.count': '{n} proyectos', 'work.showing': 'Mostrando {n} de {total}',
    'work.search': 'Buscar proyectos o clientes', 'work.filter': 'Filtrar',
    'work.sort.featured': 'Destacados', 'work.sort.newest': 'Más nuevos', 'work.sort.az': 'A–Z', 'work.sort': 'Ordenar proyectos',
    'work.service': 'Servicio', 'work.platform': 'Plataforma', 'work.era': 'Época', 'work.client': 'Cliente', 'work.allClients': 'Todos los clientes',
    'work.clear': 'Borrar todo', 'work.show': 'Ver resultados', 'work.empty': 'Ningún proyecto coincide con estos filtros.', 'work.emptyClear': 'Borrar filtros',
    'services.label': 'Servicios', 'services.title': 'Ideas grandes. Equipos preparados para hacerlas realidad.',
    'services.sub': 'Tres áreas, múltiples posibilidades.', 'services.count': '{n} servicios', 'services.see': 'Ver proyectos',
    'services.groups': [
      { title: 'Videojuegos', jump: 'brand-games,web-games,edutainment,original-ip', items: ['Advergames y branded games', 'Juegos HTML5 y web', 'Mobile (iOS y Android)', 'PC y Steam', 'Edutainment', 'Game design y desarrollo'] },
      { title: 'Animación', jump: 'animation-3d,animation-2d,music-video,series,advertising,trailer', items: ['Animación 2D y 3D', 'Diseño de personajes', 'Series y contenidos infantiles', 'Videoclips y publicidad', 'Tráilers y cinemáticas'] },
      { title: 'Co-producción', jump: 'codev', items: ['Desarrollo en Unity', 'Arte 2D y 3D', 'Animación para videojuegos', 'Co-desarrollo', 'Porting y adaptación'] },
    ],
    'clients.label': 'Clientes', 'clients.title': 'En buena compañía.', 'clients.body': 'Grandes nombres, grandes desafíos y muchos proyectos compartidos.',
    'contact.label': 'Contacto', 'contact.title': 'Hagamos algo increíble', 'contact.titleEm': 'juntos.',
    'contact.intro': '¿Buscás un estudio para tu próximo proyecto? Hablemos.',
    'contact.direct': 'O escribinos directo',
    'form.title': 'Contanos tu proyecto', 'form.name': 'Nombre', 'form.email': 'Email', 'form.company': 'Empresa o estudio (opcional)',
    'form.type': '¿Qué necesitás?', 'form.types': ['Un juego para mi marca', 'Juego web / edutainment', 'Co-desarrollo / outsourcing', 'Animación', 'Otra cosa'],
    'form.message': 'Mensaje', 'form.messageHint': 'La idea, los plazos y un presupuesto aproximado si lo tenés.',
    'form.send': 'Enviar mensaje', 'form.sending': 'Enviando…',
    'form.ok': '¡Gracias! Ya nos llegó tu mensaje. Te respondemos a la brevedad.',
    'form.error': 'No se pudo enviar. Escribinos directo a info@gameeverstudio.com.',
    'form.mailto': 'Se abrió tu programa de correo con el mensaje listo para enviar.',
    'form.subject': 'Nuevo proyecto',
    'contact.careers': 'Trabajá con nosotros', 'contact.studio': 'Estudio', 'contact.studioValue': 'Belgrano, Buenos Aires, Argentina',
    'contact.hours': 'Horario', 'contact.hoursValue': 'Lun–Vie · 10–18 (GMT-3)', 'contact.follow': 'Seguinos',
    'footer.tagline': 'Desafiamos. Creamos. Jugamos.',
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

// Plain-text client list (v2 design). Keep in sync with src/data/clients.ts, which has the logos.
export const CLIENTS = ['Cartoon Network', 'Warner Music', 'Devolver Digital', 'Fiat', 'Michelin', 'Boomerang', 'Legends of Learning', 'Chevrolet', 'Leader Entertainment', 'El Reino Infantil', 'Tic Tac', 'Graffiti Games', 'Loto Plus', 'Rookbird Games', 'Tecpetrol', 'AUBASA'];

export const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/gameeverstudio/' },
  { label: 'YouTube', url: 'https://www.youtube.com/user/gameeverstudio' },
  { label: 'Instagram', url: 'https://www.instagram.com/gameeverstudio/' },
  { label: 'X', url: 'https://twitter.com/gameeverstudio' },
];

export const REEL_ID = 'qyPSBhVrY08';

