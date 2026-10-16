// One-time import: turns legacy/legacy-projects.json into src/content/projects/*.md
// using the curated mapping below (grouping, services, platforms, bilingual copy).
// After the import the Markdown files are the source of truth; edit those, not this script.
// Usage: node scripts/import-legacy.mjs [--force]
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';

const legacy = JSON.parse(await readFile('legacy/legacy-projects.json', 'utf8')).projects;
const L = Object.fromEntries(legacy.map((p) => [p.slug, p]));
const force = process.argv.includes('--force');

const vids = (...slugs) => [...new Set(slugs.flatMap((s) => L[s]?.youtube || []))];
const gallery = (slug) => (L[slug]?.images || []).filter((u) => u !== L[slug]?.cover);
const credits = (...slugs) => [...new Set(slugs.map((s) => L[s]?.credits).filter(Boolean))].join('\n\n');
const entry = (slug, title, year, note) => ({ title, year, videos: L[slug]?.youtube || [], ...(note ? { note } : {}) });

const P = [
  {
    slug: 'lit-killah-the-game', from: ['lit-killah-the-game'], title: 'LIT Killah The Game', client: 'Warner Music Argentina', year: 2020,
    services: ['brand-games'], platforms: ['ios', 'android'], genre: 'Rhythm & music', featured: 1,
    summary: { en: 'Free rhythm game for iOS and Android co-produced with Warner Music Argentina.', es: 'Juego de ritmo gratuito para iOS y Android, coproducido con Warner Music Argentina.' },
    description: {
      en: 'A free rhythm game for iOS and Android, co-produced with Warner Music Argentina, that puts LIT Killah’s music in his fans’ hands. Players play through 50 levels set to the artist’s original tracks, take on challenges inspired by his biggest hits and face friends in head-to-head battles. They can also collect exclusive outfits and build their own levels to share on social media.',
      es: 'Un juego de ritmo gratuito para iOS y Android, coproducido con Warner Music Argentina, que pone la música de LIT Killah en manos de sus fans. Tiene 50 niveles con temas originales del artista, desafíos inspirados en sus mayores hits y batallas contra amigos. Además se pueden coleccionar outfits exclusivos y crear niveles propios para compartir en redes.',
    },
    role: { en: 'Co-production, game design, art, 3D animation, development', es: 'Coproducción, game design, arte, animación 3D, desarrollo' },
    // The legacy page linked to Juanito's store pages by mistake; real store links still to be added.
    links: [],
  },
  {
    slug: 'be-cool-scooby-doo', from: ['bee-cool-scooby-doo-sandwich-tower', 'be-cool-scooby-doo-the-mysterious-mansion'], title: 'Be Cool Scooby-Doo!', client: 'Cartoon Network', year: 2019,
    services: ['brand-games', 'web-games'], platforms: ['web'], genre: 'Casual · Hidden object', featured: 2,
    summary: { en: 'Two browser games for Cartoon Network starring the Scooby-Doo gang.', es: 'Dos juegos de navegador para Cartoon Network con la pandilla de Scooby-Doo.' },
    description: {
      en: 'Two multilingual browser games for Cartoon Network. In Sandwich Tower, Scooby stacks the biggest sandwich he can with the right ingredients. In The Mysterious Mansion, players help the gang find the clues hidden around a haunted house before time runs out.',
      es: 'Dos juegos de navegador multilenguaje para Cartoon Network. En Sandwich Tower, Scooby arma el sándwich más alto posible con los ingredientes correctos. En La Mansión Misteriosa, hay que ayudar a la pandilla a encontrar las pistas escondidas en la casa antes de que se acabe el tiempo.',
    },
    role: { en: 'Game design, 2D art and animation, development', es: 'Game design, arte y animación 2D, desarrollo' },
    entries: [
      entry('bee-cool-scooby-doo-sandwich-tower', 'Sandwich Tower', '2019'),
      entry('be-cool-scooby-doo-the-mysterious-mansion', 'The Mysterious Mansion', '2019'),
    ],
    links: [
      { label: 'Play Sandwich Tower', url: 'https://www.cartoonnetwork.cl/juego/torre-de-emparedados/play' },
      { label: 'Play The Mysterious Mansion', url: 'https://www.cartoonnetwork.cl/juego/la-mansion-misteriosa/play' },
    ],
  },
  {
    slug: 'okhlos', from: ['okhlos'], title: 'Okhlos', client: 'Devolver Digital', year: 2018,
    services: ['codev', 'illustration'], platforms: ['pc'], genre: 'Splash screen art', featured: 3,
    summary: { en: 'Splash screen illustration for Okhlos, published by Devolver Digital.', es: 'Ilustración de splash screen para Okhlos, publicado por Devolver Digital.' },
    description: {
      en: 'Character design and splash screen illustration for Okhlos, the mob-control action game published by Devolver Digital.',
      es: 'Diseño de personajes e ilustración de la splash screen de Okhlos, el juego de acción publicado por Devolver Digital.',
    },
    role: { en: 'Character design, illustration', es: 'Diseño de personajes, ilustración' },
  },
  {
    slug: 'car-driver-xp', from: ['car-driver-xp'], title: 'Car Driver XP', client: 'Michelin', year: 2020,
    services: ['brand-games'], platforms: ['pc', 'web'], genre: 'Racing · Road safety', featured: 4,
    summary: { en: 'Road-safety advergame for Michelin, winner of a CSR communication distinction.', es: 'Advergame de seguridad vial para Michelin, distinguido por su comunicación de RSE.' },
    description: {
      en: 'Young drivers are the group most affected by road accidents. Michelin asked us for an online game to change how they behave behind the wheel: Car Driver XP challenges players to clear driving tests and obstacles to win. The campaign received the 2020 Communicative Social Responsibility (CSR) Distinction.',
      es: 'Los jóvenes son el grupo más afectado por los accidentes de tránsito. Michelin nos pidió un juego online para cambiar su conducta al volante: en Car Driver XP hay que superar pruebas de manejo y obstáculos para ganar. La campaña recibió la Distinción RSC (Responsabilidad Social Comunicativa) 2020.',
    },
    role: { en: 'Game design, 2D art, development', es: 'Game design, arte 2D, desarrollo' },
  },
  {
    slug: 'fiat-race', from: ['fiat-race'], title: 'Fiat Race', client: 'Fiat', year: 2017,
    services: ['brand-games', 'web-games'], platforms: ['web', 'ios', 'android', 'arcade'], genre: 'Racing', featured: 5,
    summary: { en: 'Racing advergame for Fiat on web, mobile and two custom arcade cabinets.', es: 'Advergame de carreras para Fiat en web, mobile y dos máquinas arcade a medida.' },
    description: {
      en: 'Players pick one of Fiat’s most iconic cars (the 500, the 500 Cabriolet or the classic 600) and race across Argentina: the Mar del Plata coast, Patagonia, the Pampas and Buenos Aires. We shipped it on Android, iOS and desktop browsers, plus two arcade cabinets with steering wheel, pedals and seat for the Buenos Aires International Motor Show.',
      es: 'El jugador elige uno de los autos más emblemáticos de Fiat (500, 500 Cabriolet o el clásico 600) y recorre la Argentina: la costa de Mar del Plata, la Patagonia, la llanura pampeana y Buenos Aires. Salió para Android, iOS y navegador, y además fabricamos dos máquinas arcade con volante, pedales y asiento para el Salón Internacional del Automóvil.',
    },
    role: { en: 'Game design, 2D art, development, arcade build', es: 'Game design, arte 2D, desarrollo, armado de arcade' },
  },
  {
    slug: 'lit-killah-bizarrap-flexin', from: ['flexin'], title: 'Flexin’ — LIT Killah x Bizarrap', client: 'Warner Music Argentina', year: 2020,
    services: ['animation-3d', 'music-video'], platforms: ['youtube'], genre: 'Music video', featured: 6,
    summary: { en: '3D music video for LIT Killah and Bizarrap’s hit, with 144M+ views.', es: 'Videoclip 3D del hit de LIT Killah y Bizarrap, con más de 144 millones de vistas.' },
    description: {
      en: 'Argentine trap artist LIT Killah teamed up with Bizarrap for one of 2020’s biggest hits. We made the 3D animated music video, which has passed 144 million views.',
      es: 'LIT Killah se unió a Bizarrap para uno de los hits de 2020. Hicimos el videoclip animado en 3D, que ya superó los 144 millones de reproducciones.',
    },
    role: { en: '3D animation', es: 'Animación 3D' },
  },
  {
    slug: 'necromather', from: ['necromather'], title: 'Necromather', client: 'Legends of Learning', year: 2019,
    services: ['web-games', 'edutainment'], platforms: ['web'], genre: 'Educational · Math', featured: 7,
    summary: { en: 'Curriculum-aligned math game for US classrooms.', es: 'Juego de matemática alineado al currículo escolar de EE.UU.' },
    description: {
      en: 'Legends of Learning builds games that make learning fun and help teachers in hybrid and remote classrooms. Necromather is a curriculum-aligned math game: players use magic and the power of area to stop hordes of monsters attacking their graveyard.',
      es: 'Legends of Learning hace juegos para que aprender sea divertido y para ayudar a docentes en clases híbridas y a distancia. Necromather es un juego de matemática alineado al currículo: hay que usar la magia y el cálculo de áreas para frenar a los monstruos que atacan el cementerio.',
    },
    role: { en: 'Game design, 2D art, development', es: 'Game design, arte 2D, desarrollo' },
  },
  {
    slug: 'juanito-arcade-mayhem', from: ['juanito-arcade-mayhem'], title: 'Juanito Arcade Mayhem', client: 'Original IP', year: 2017,
    services: ['original-ip'], platforms: ['steam', 'ios', 'android'], genre: 'Platformer', featured: 8,
    summary: { en: 'Our own arcade-hopping platformer, on Steam, iOS and Android.', es: 'Nuestro plataformero de arcades, en Steam, iOS y Android.' },
    description: {
      en: 'An arcade-hopping adventure where each level borrows a mechanic from the classic it pays tribute to. Armed only with pajamas and a devastating arsenal, Juanito has to save retro games from an alien invasion. Loved by players and critics, it’s free on iOS and Android and available on Steam.',
      es: 'Una aventura que salta de arcade en arcade: cada nivel toma una mecánica del clásico al que homenajea. En pijama y con un arsenal devastador, Juanito tiene que salvar a los juegos retro de una invasión alienígena. Muy bien recibido por jugadores y crítica; es gratis en iOS y Android y está en Steam.',
    },
    role: { en: 'Original game: design, art, development, publishing', es: 'Juego propio: diseño, arte, desarrollo, publicación' },
    links: [
      { label: 'Steam', url: 'https://store.steampowered.com/app/617440/Arcade_Mayhem_Juanito/' },
      { label: 'App Store', url: 'https://apps.apple.com/ar/app/arcade-mayhem-shooter/id937951287' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=air.com.gameever.juanitoarcade' },
    ],
  },
  {
    slug: 'flying-fishies', from: ['flying-fishies'], title: 'Flying Fishies', client: 'Rookbird Games', year: 2022,
    services: ['codev', 'trailer', 'animation-2d'], platforms: ['android'], genre: 'Game trailer', featured: 9,
    summary: { en: '2D animated launch trailer for Rookbird Games’ mobile game.', es: 'Tráiler animado en 2D para el juego mobile de Rookbird Games.' },
    description: { en: 'A 43-second 2D animated trailer for Flying Fishies, a mobile game by Rookbird Games.', es: 'Tráiler de 43 segundos animado en 2D para Flying Fishies, juego mobile de Rookbird Games.' },
    role: { en: '2D animation, trailer', es: 'Animación 2D, tráiler' },
  },
  {
    slug: 'las-canciones-del-zoo', from: ['las-canciones-del-zoo-7', 'canciones-del-zoo-6', 'las-canciones-del-zoo-5', 'las-canciones-del-zoo-serie', 'a-jugar-las-canciones-del-zoo', 'las-canciones-del-zoo-4', 'las-canciones-del-zoo-3', 'las-canciones-del-zoo-2', 'las-canciones-del-zoo-1'],
    title: 'Las Canciones del Zoo', client: 'El Reino Infantil', year: 2022, years: '2013–2022',
    services: ['animation-3d', 'music-video', 'series'], platforms: ['youtube'], genre: 'Kids music', coverFrom: 'las-canciones-del-zoo-7',
    summary: { en: 'Nine seasons of 3D animated music videos, a series and interactive games for kids.', es: 'Nueve temporadas de videoclips 3D, una serie y juegos interactivos para chicos.' },
    description: {
      en: 'Since 2013 we have animated the world of Las Canciones del Zoo for El Reino Infantil and Leader Entertainment: an Argentine production for kids aged 0 to 6, set in a zoo with no cages, just fun. Seven albums of 3D music videos, a 12-episode series and a line of interactive learning videos.',
      es: 'Desde 2013 animamos el mundo de Las Canciones del Zoo para El Reino Infantil y Leader Entertainment: una producción argentina para chicos de 0 a 6 años, en un zoológico sin jaulas, solo diversión. Siete discos de videoclips 3D, una serie de 12 capítulos y una línea de videos interactivos para aprender.',
    },
    role: { en: '3D animation, lighting, render, VFX, editing', es: 'Animación 3D, iluminación, render, VFX, edición' },
    entries: [
      entry('las-canciones-del-zoo-7', 'Las Canciones del Zoo 7', '2021–2022'),
      entry('canciones-del-zoo-6', 'Las Canciones del Zoo 6', '2020'),
      entry('las-canciones-del-zoo-5', 'Las Canciones del Zoo 5', '2019'),
      entry('las-canciones-del-zoo-serie', { en: 'The series (12 episodes)', es: 'La serie (12 capítulos)' }, '2019'),
      entry('a-jugar-las-canciones-del-zoo', { en: 'A Jugar (interactive videos)', es: 'A Jugar (videos interactivos)' }, '2018–'),
      entry('las-canciones-del-zoo-4', 'Las Canciones del Zoo 4', '2018'),
      entry('las-canciones-del-zoo-3', 'Las Canciones del Zoo 3', '2016'),
      entry('las-canciones-del-zoo-2', 'Las Canciones del Zoo 2', '2014'),
      entry('las-canciones-del-zoo-1', 'Las Canciones del Zoo 1', '2013'),
    ],
  },
  {
    slug: 'wizard-vs-orcs', from: ['wizard-vs-orcs'], title: 'Wizard vs Orcs', client: 'Legends of Learning', year: 2019,
    services: ['web-games', 'edutainment'], platforms: ['web'], genre: 'Educational · Math',
    summary: { en: 'Curriculum-aligned math game: defend the castle from invading orcs.', es: 'Juego de matemática alineado al currículo: defendé el castillo de los orcos.' },
    description: {
      en: 'A curriculum-aligned math game for Legends of Learning, built to engage students and support teachers in hybrid, blended and remote learning. Orcs are invading the castle and you are the only wizard who can stop them.',
      es: 'Un juego de matemática alineado al currículo para Legends of Learning, pensado para enganchar a los alumnos y ayudar a docentes en clases híbridas y a distancia. Los orcos invaden el castillo y sos el único mago capaz de frenarlos.',
    },
    role: { en: 'Game design, 2D art, development', es: 'Game design, arte 2D, desarrollo' },
    links: [{ label: 'Play', url: 'https://games.legendsoflearning.com/game/wizard-vs-orcs/2652' }],
  },
  {
    slug: 'thumb-fighter', from: ['view-all-link'], title: 'Thumb Fighter', client: 'AVIX', year: 2018,
    services: ['codev', 'trailer', 'animation-2d'], platforms: ['ios', 'android'], genre: 'Game trailer',
    summary: { en: 'Animated launch trailer for AVIX’s mobile fighting game.', es: 'Tráiler animado de lanzamiento para el juego de pelea mobile de AVIX.' },
    description: {
      en: 'AVIX asked us for the animated launch trailer of Thumb Fighter (formerly Thumb Fight, China Pulse and Thumb War), the simplest and most fun fighting game in the world: show you have the fastest thumb in town.',
      es: 'AVIX nos pidió el tráiler animado de lanzamiento de Thumb Fighter (antes Thumb Fight, China Pulse y Thumb War), el juego de pelea más simple y divertido del mundo: demostrá que tenés el pulgar más rápido.',
    },
    role: { en: '2D animation, trailer', es: 'Animación 2D, tráiler' },
  },
  {
    slug: 'zoo-games', from: ['zoo-games-fun-puzzles-for-kids'], title: 'Zoo Games: Fun & Puzzles for Kids', client: 'El Reino Infantil', year: 2019,
    services: ['brand-games', 'edutainment'], platforms: ['ios', 'android'], genre: 'Kids · Learning',
    summary: { en: '25+ learning mini-games starring the characters of Las Canciones del Zoo.', es: 'Más de 25 minijuegos para aprender con los personajes de Las Canciones del Zoo.' },
    description: {
      en: 'An adventure starring the characters of Las Canciones del Zoo, with more than 25 mini-games for little ones: puzzles, numbers, colors and shapes, with Tufín the Crazy Fox, Lulú the Duckling and the rest of the zoo. Free on iOS and Android.',
      es: 'Una aventura con los personajes de Las Canciones del Zoo y más de 25 minijuegos para los más chicos: rompecabezas, números, colores y formas, junto a Tufín el Zorro Loco, la Patita Lulú y todo el zoológico. Gratis en iOS y Android.',
    },
    role: { en: 'Game design, 3D art, development', es: 'Game design, arte 3D, desarrollo' },
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/ar/app/juegos-de-canciones-del-zoo/id1480271234' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.gameever.thezoogames' },
    ],
  },
  {
    slug: 'la-granja-de-zenon-a-rodar', from: ['la-granja-de-zenon-a-rodar'], title: 'La Granja de Zenón: A Rodar', client: 'El Reino Infantil', year: 2022,
    services: ['animation-3d', 'music-video'], platforms: ['youtube'], genre: 'Kids music',
    summary: { en: '3D animated music video for La Granja de Zenón.', es: 'Videoclip animado en 3D para La Granja de Zenón.' },
    description: { en: 'A 3D animated music video for La Granja de Zenón, one of El Reino Infantil’s most popular properties.', es: 'Videoclip animado en 3D para La Granja de Zenón, una de las propiedades más populares de El Reino Infantil.' },
    role: { en: '3D animation', es: 'Animación 3D' },
  },
  {
    slug: 'tic-tac-gum', from: ['pinball-tic-tac-gum'], title: 'Tic Tac Gum', client: 'Tic Tac', year: 2017,
    services: ['animation-2d', 'advertising'], platforms: ['tv'], genre: 'TV spot',
    summary: { en: '2D animated TV spot for the launch of Tic Tac Gum.', es: 'Spot de TV animado en 2D para el lanzamiento de Tic Tac Gum.' },
    description: { en: 'Tic Tac, the 40-year-old mint brand, expanded its line with Tic Tac Gum. We animated the 15-second TV spot for the launch.', es: 'Tic Tac, la marca de pastillas con más de 40 años, amplió su línea con Tic Tac Gum. Animamos el spot de TV de 15 segundos para el lanzamiento.' },
    role: { en: '2D animation', es: 'Animación 2D' },
  },
  {
    slug: 'puro-sol', from: ['puro-sol-2022', 'puro-sol-2021-2', 'puro-sol-2020', 'dinos-puro-sol', 'puro-sol-2018', 'puro-sol-2017', 'puro-sol-2016'],
    title: 'Puro Sol', client: 'Puro Sol', year: 2022, years: '2016–2022',
    services: ['animation-3d', 'advertising'], platforms: ['youtube', 'tv'], genre: 'Ad campaigns', coverFrom: 'puro-sol-2022',
    summary: { en: 'Seven years of 3D animated campaigns for Paraguay’s leading juice brand.', es: 'Siete años de campañas animadas en 3D para la marca de jugos líder de Paraguay.' },
    description: {
      en: 'Puro Sol, Paraguay’s leading juice brand, has trusted us with its kids campaigns every year since 2016: toy-car packs, treasure hunts, back-to-school promos and a cast of dinos created for a product launch.',
      es: 'Puro Sol, la marca de jugos líder de Paraguay, nos confía sus campañas infantiles todos los años desde 2016: envases con forma de autito, búsquedas del tesoro, promos de vuelta a clases y unos dinos creados para un lanzamiento.',
    },
    role: { en: 'Character design, 3D animation', es: 'Diseño de personajes, animación 3D' },
    entries: [
      entry('puro-sol-2022', 'Puro Sol 2022', '2022'),
      entry('puro-sol-2021-2', 'Clases virtuales', '2021'),
      entry('puro-sol-2020', 'Códigos secretos · Vitaminas', '2020'),
      entry('dinos-puro-sol', 'Dinos · Espacio · Fruti Mix', '2019'),
      entry('puro-sol-2018', 'Buscatesoros', '2018'),
      entry('puro-sol-2017', 'Six Pack', '2017'),
      entry('puro-sol-2016', 'Autitos · Buscatesoros · Mochilas', '2016'),
    ],
  },
  {
    slug: 'loto-plus', from: ['loto-plus'], title: 'Loto Plus', client: 'Lotería de la Ciudad', year: 2021,
    services: ['animation-3d', 'advertising'], platforms: ['tv'], genre: 'TV spot',
    summary: { en: '3D animated TV spot for Loto Plus.', es: 'Spot de TV animado en 3D para Loto Plus.' },
    description: { en: 'A 25-second 3D animated TV commercial for Loto Plus and Lotería de la Ciudad, from character design and storyboard to lighting and compositing.', es: 'Comercial de TV de 25 segundos animado en 3D para Loto Plus y Lotería de la Ciudad, desde el diseño de personajes y el storyboard hasta la iluminación y la composición.' },
    role: { en: 'Character design, storyboard, 3D animation, VFX', es: 'Diseño de personajes, storyboard, animación 3D, VFX' },
  },
  {
    slug: 'los-palmeras', from: ['los-palmeras'], title: 'Los Palmeras', client: 'El Reino Infantil', year: 2021,
    services: ['animation-3d', 'music-video'], platforms: ['youtube'], genre: 'Kids music',
    summary: { en: '3D animated music videos for the cumbia band Los Palmeras.', es: 'Videoclips animados en 3D para Los Palmeras.' },
    description: { en: 'Thirteen minutes of 3D animated music videos for the legendary cumbia band Los Palmeras, produced with El Reino Infantil.', es: 'Trece minutos de videoclips animados en 3D para la legendaria banda de cumbia Los Palmeras, producidos con El Reino Infantil.' },
    role: { en: 'Character design, 3D animation, VFX', es: 'Diseño de personajes, animación 3D, VFX' },
  },
  {
    slug: 'capitan-coco', from: ['capitan-coco'], title: 'Capitán Coco', client: 'Original IP', year: 2017,
    services: ['original-ip', 'animation-2d', 'series'], platforms: ['youtube'], genre: 'Animated series',
    summary: { en: 'Our own 2D animated comedy about a castaway and his coconut captain.', es: 'Nuestra serie animada 2D sobre un náufrago y su capitán coco.' },
    description: {
      en: 'Will, a 26-year-old guy, and Coco, an ordinary coconut, meet on a deserted island. They spend their days rebuilding their old lives, which always turns into strange, fantastic situations. Will gets into every kind of trouble; Coco acts like a seasoned naval captain.',
      es: 'Will, un pibe de 26 años, y Coco, un coco común y corriente, se encuentran en una isla desierta. Pasan los días recreando su vida anterior, lo que siempre termina en situaciones extrañas y fantásticas. Will se mete en todo tipo de problemas; Coco se comporta como un experimentado capitán de barco.',
    },
    role: { en: 'Original series: writing, design, 2D animation', es: 'Serie propia: guion, diseño, animación 2D' },
  },
  {
    slug: 'unete-a-mi-eko', from: ['unete-a-mi-eko-3-monstruo', 'unete-a-mi-eko-2017', 'unete-a-mi-eko-2014'],
    title: 'Únete a mi Eko', client: 'Enka de Colombia', year: 2019, years: '2014–2019',
    services: ['animation-2d', 'advertising'], platforms: ['youtube'], genre: 'Ad campaigns', coverFrom: 'unete-a-mi-eko-3-monstruo',
    summary: { en: 'Three 2D animated campaigns for Eko, Enka’s recycled-PET brand.', es: 'Tres campañas animadas en 2D para Eko, la marca de PET reciclado de Enka.' },
    description: {
      en: 'Eko is Enka de Colombia’s brand of products made from recycled PET bottles. Across three campaigns we explained recycling, global warming and the Eko process with characters, music and humor.',
      es: 'Eko es la marca de Enka de Colombia para productos hechos con botellas de PET recicladas. En tres campañas explicamos el reciclaje, el calentamiento global y el proceso de Eko con personajes, música y humor.',
    },
    role: { en: 'Character design, 2D animation', es: 'Diseño de personajes, animación 2D' },
    entries: [
      entry('unete-a-mi-eko-3-monstruo', 'Monstruo · Dino', '2019'),
      entry('unete-a-mi-eko-2017', 'Fábrica · Mannequin Challenge · Mundial', '2017'),
      entry('unete-a-mi-eko-2014', 'Qué es Enka · Calentamiento global · DJ Eko', '2014'),
    ],
  },
  {
    slug: 'cargobot', from: ['cargobot'], title: 'Cargobot', client: 'Cargobot', year: 2018,
    services: ['animation-2d', 'advertising'], platforms: ['youtube'], genre: 'Explainer videos',
    summary: { en: 'Three 2D explainer videos for a logistics platform.', es: 'Tres videos explicativos en 2D para una plataforma de logística.' },
    description: { en: 'Cargobot connects shippers and carriers. We made three animated videos to explain how the service works and introduce the brand: simple, effective and good-looking.', es: 'Cargobot conecta a quienes necesitan enviar carga con transportistas. Hicimos tres videos animados para explicar cómo funciona el servicio y presentar la marca: simples, efectivos y lindos.' },
    role: { en: '2D animation', es: 'Animación 2D' },
  },
  {
    slug: 'el-gatito', from: ['el-gatito'], title: 'El Gatito', client: 'Original IP', year: 2013,
    services: ['original-ip'], platforms: ['ios', 'android'], genre: 'Endless runner',
    summary: { en: 'Endless runner based on our award-winning animated miniseries.', es: 'Endless runner basado en nuestra miniserie animada premiada.' },
    description: {
      en: 'Born from our miniseries of the same name, winner of INCAA’s First Federal Animation Contest. Players help the kitten cross an endless desert, collecting fish, using power-ups and dodging dangers. Released on Android, iOS and Facebook with online leaderboards.',
      es: 'Nace de nuestra miniserie homónima, ganadora del Primer Concurso Federal de Animación del INCAA. Hay que ayudar al gatito a cruzar un desierto infinito juntando pescados, usando power-ups y esquivando peligros. Salió para Android, iOS y Facebook con rankings online.',
    },
    role: { en: 'Original game: design, art, development', es: 'Juego propio: diseño, arte, desarrollo' },
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/el-gatito/id907630296' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=air.com.gameever.thekitten' },
    ],
  },
  {
    slug: 'maggie-boo', from: ['maggie-boo-serie', 'maggie-boo-game'], title: 'Maggie Boo', client: 'Original IP', year: 2012, years: '2011–2012',
    services: ['original-ip', 'animation-2d', 'series'], platforms: ['ios', 'android'], genre: 'Series · Endless runner', coverFrom: 'maggie-boo-serie',
    summary: { en: 'Our first original universe: a 2D series and a mobile game about a young witch.', es: 'Nuestro primer universo propio: una serie 2D y un juego mobile sobre una joven bruja.' },
    description: {
      en: 'Maggie is a young witch who keeps getting into strange situations with mythical beings, wizards and creatures, together with her friends Wip and Oku. We created a 13 × 12-minute comedy series and an endless runner where Maggie breaks curses instead of hurting enemies.',
      es: 'Maggie es una joven bruja que siempre termina en situaciones extrañas con seres mitológicos, magos y criaturas, junto a sus amigos Wip y Oku. Creamos una serie de comedia de 13 capítulos de 12 minutos y un endless runner donde Maggie rompe hechizos en vez de lastimar enemigos.',
    },
    role: { en: 'Original IP: series and game', es: 'IP propia: serie y juego' },
    entries: [entry('maggie-boo-serie', { en: 'The series (13 × 12 min)', es: 'La serie (13 × 12 min)' }, '2012'), entry('maggie-boo-game', { en: 'The game', es: 'El juego' }, '2011')],
  },
  {
    slug: 'plusbelle-kids', from: ['plusbelle-kids'], title: 'Plusbelle Kids', client: 'Plusbelle', year: 2017,
    services: ['animation-2d', 'advertising'], platforms: ['tv'], genre: 'TV spots',
    summary: { en: 'Two 2D animated TV spots starring Gaturro.', es: 'Dos spots de TV animados en 2D protagonizados por Gaturro.' },
    description: { en: 'Plusbelle Kids came to us to launch new products with two funny 15-second stories starring Gaturro. Fun baths, quiet moms.', es: 'Plusbelle Kids nos convocó para presentar productos nuevos con dos historias divertidas de 15 segundos protagonizadas por Gaturro. Baños divertidos, mamás tranquilas.' },
    role: { en: '2D animation', es: 'Animación 2D' },
  },
  {
    slug: 'the-real-monster-show', from: ['the-real-monster-show'], title: 'The Real Monster Show', client: 'Liebre Design Boutique', year: 2016,
    services: ['animation-2d', 'series'], platforms: [], genre: 'Animated mini-series',
    summary: { en: '2D animated mini-series about monsters in rehab.', es: 'Miniserie animada en 2D sobre monstruos en rehabilitación.' },
    description: { en: 'Welcome to the Rehabilitation Club, where the living dead and crazy monsters set their instincts aside to fit into society. An overdose of optimism in the scariest world, with monsters who see the glass half full… of blood.', es: 'Bienvenidos al Club de Rehabilitación, donde muertos vivos y monstruos locos dejan de lado sus instintos para integrarse a la sociedad. Una sobredosis de optimismo en el mundo más terrorífico, con monstruos que ven el vaso medio lleno… de sangre.' },
    role: { en: '2D animation', es: 'Animación 2D' },
  },
  // ---------- Hidden: kept with all their information, not published ----------
  { slug: 'sony', from: ['sony'], title: 'Sony', client: 'Sony', year: 2012, services: ['animation-2d', 'advertising'], platforms: ['tv'], genre: 'Commercial', hidden: true,
    summary: { en: '2D animated commercial for Sony.', es: 'Comercial animado en 2D para Sony.' },
    description: { en: 'Two worlds collide to help build a future for the next generations.', es: 'Dos mundos chocan para ayudar a construir un futuro para las próximas generaciones.' } },
  { slug: 'the-kitten', from: ['the-kitten'], title: 'The Kitten', client: 'Original IP', year: 2012, services: ['original-ip', 'animation-2d', 'series'], platforms: ['youtube'], genre: 'Miniseries / short film', hidden: true,
    summary: { en: 'Award-winning animated miniseries (INCAA Federal Animation Contest).', es: 'Miniserie animada premiada (Concurso Federal de Animación del INCAA).' },
    description: { en: 'A street cat from Buenos Aires ends up lost in the Patagonian desert, where he finds the home the city never gave him. Four episodes that also work as a short film; winner of INCAA’s Federal Animation Contest.', es: 'Un gato callejero de Buenos Aires termina perdido en el desierto patagónico, donde encuentra el hogar que la ciudad nunca le dio. Cuatro capítulos que también funcionan como cortometraje; ganadora del Concurso Federal de Animación del INCAA.' } },
  { slug: 'nino-ardilla', from: ['nino-ardilla'], title: 'Niño Ardilla', client: 'Original IP', year: 2012, services: ['original-ip'], platforms: [], genre: 'Endless runner', hidden: true,
    summary: { en: 'Endless runner: collect food before winter arrives.', es: 'Endless runner: juntá comida antes de que llegue el invierno.' },
    description: { en: 'Squirrel Boy has three days to fill his empty cupboard before winter, running through a forest full of traps.', es: 'Niño Ardilla tiene tres días para llenar su alacena antes del invierno, corriendo por un bosque lleno de trampas.' } },
  { slug: 'wt-morgan', from: ['wt-morgan'], title: 'Wt. Morgan', client: 'Wt. Morgan', year: 2016, services: ['animation-2d', 'advertising'], platforms: ['youtube'], genre: 'Commercial', hidden: true,
    summary: { en: '2D animated commercial for a family entertainment venue.', es: 'Comercial animado en 2D para un local de entretenimiento familiar.' },
    description: { en: 'A 30-second spot for Wt. Morgan, a fast-food and playground venue for birthday parties.', es: 'Spot de 30 segundos para Wt. Morgan, un local de comidas rápidas y juegos para cumpleaños.' } },
  { slug: 'split-2015', from: ['split-2015'], title: 'Split', client: 'Pepsico Paraguay', year: 2015, services: ['animation-2d', 'advertising'], platforms: ['tv'], genre: 'TV campaign', hidden: true,
    summary: { en: 'Launch campaign and characters for a new Pepsico soft drink in Paraguay.', es: 'Campaña de lanzamiento y personajes para una gaseosa nueva de Pepsico en Paraguay.' },
    description: { en: 'We developed the full launch campaign for Split, a new Pepsico soft drink in Paraguay, including the pigeon family that gave the brand its identity.', es: 'Desarrollamos toda la campaña de lanzamiento de Split, una gaseosa nueva de Pepsico en Paraguay, incluida la familia de palomas que le dio identidad a la marca.' } },
  { slug: 'basta-de-vivos', from: ['basta-de-vivos'], title: 'Basta de Vivos', client: 'Chevrolet', year: 2017, services: ['animation-2d', 'advertising'], platforms: ['youtube'], genre: 'Digital campaign', hidden: true,
    summary: { en: 'Road-safety campaign for Chevrolet by Commonwealth McCann.', es: 'Campaña de seguridad vial para Chevrolet, de Commonwealth McCann.' },
    description: { en: 'Animation for #BastaDeVivos, Chevrolet’s digital campaign by Commonwealth McCann against unfair “street-smart” behavior in city traffic, for the launch of the new Tracker.', es: 'Animación para #BastaDeVivos, la campaña digital de Chevrolet creada por Commonwealth McCann contra la "viveza criolla" en el tránsito, para el lanzamiento de la nueva Tracker.' } },
];

const GENRE_ES = {
  'Rhythm & music': 'Ritmo y música', 'Casual · Hidden object': 'Casual · Objetos ocultos', 'Splash screen art': 'Arte de splash screen',
  'Racing · Road safety': 'Carreras · Seguridad vial', Racing: 'Carreras', 'Music video': 'Videoclip', 'Educational · Math': 'Educativo · Matemática',
  Platformer: 'Plataformas', 'Game trailer': 'Tráiler de juego', 'Kids music': 'Música infantil', 'Kids · Learning': 'Infantil · Aprendizaje',
  'TV spot': 'Spot de TV', 'TV spots': 'Spots de TV', 'Ad campaigns': 'Campañas publicitarias', 'Animated series': 'Serie animada',
  'Explainer videos': 'Videos explicativos', 'Endless runner': 'Endless runner', 'Series · Endless runner': 'Serie · Endless runner',
  'Animated mini-series': 'Miniserie animada', Commercial: 'Comercial', 'Miniseries / short film': 'Miniserie / cortometraje',
  'TV campaign': 'Campaña de TV', 'Digital campaign': 'Campaña digital',
};
for (const p of P) {
  if (!GENRE_ES[p.genre]) throw new Error(`Missing Spanish genre for "${p.genre}"`);
  p.genre = { en: p.genre, es: GENRE_ES[p.genre] };
}

// ---------- tiny YAML writer (JSON scalars are valid YAML) ----------
const y = (v, ind = '') => {
  if (Array.isArray(v)) {
    if (!v.length) return ' []';
    return '\n' + v.map((x) => (typeof x === 'object' ? `${ind}- ${y(x, ind + '  ').trimStart()}` : `${ind}- ${JSON.stringify(x)}`)).join('\n');
  }
  if (v && typeof v === 'object') {
    return '\n' + Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => `${ind}${k}:${typeof x === 'object' ? y(x, ind + '  ') : ' ' + JSON.stringify(x)}`).join('\n');
  }
  return ' ' + JSON.stringify(v);
};

await mkdir('src/content/projects', { recursive: true });
let written = 0;
for (const p of P) {
  const file = `src/content/projects/${p.slug}.md`;
  if (!force) { try { await access(file); continue; } catch {} }
  const main = L[p.coverFrom || p.from[0]];
  const data = {
    title: p.title,
    client: p.client,
    year: p.year,
    years: p.years,
    services: p.services,
    platforms: p.platforms,
    genre: p.genre,
    featured: p.featured,
    hidden: p.hidden || undefined,
    cover: main.cover,
    summary: p.summary,
    description: p.description,
    role: p.role,
    videos: p.entries ? undefined : vids(...p.from),
    entries: p.entries,
    links: p.links?.length ? p.links : undefined,
    gallery: p.from.length === 1 && gallery(p.from[0]).length ? gallery(p.from[0]) : undefined,
    credits: credits(...p.from) || undefined,
    legacySlugs: p.from,
  };
  const fm = Object.entries(data).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}:${y(v, '  ')}`).join('\n');
  await writeFile(file, `---\n${fm}\n---\n`);
  written++;
}
const covered = new Set(P.flatMap((p) => p.from));
const missing = legacy.filter((p) => !covered.has(p.slug)).map((p) => p.slug);
console.log(`Wrote ${written} files. Legacy projects not mapped: ${missing.length ? missing.join(', ') : 'none'}`);
