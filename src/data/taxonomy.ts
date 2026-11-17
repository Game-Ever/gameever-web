// Filter vocabularies for projects. The content schema only accepts these keys,
// so a typo in a project file fails the build instead of silently breaking a filter.
export const SERVICES = {
  'brand-games': { en: 'Brand games', es: 'Juegos para marcas' },
  'web-games': { en: 'Web games', es: 'Juegos web' },
  edutainment: { en: 'Edutainment', es: 'Edutainment' },
  codev: { en: 'Co-dev', es: 'Co-desarrollo' },
  'original-ip': { en: 'Original IP', es: 'IP propia' },
  'animation-3d': { en: '3D animation', es: 'Animación 3D' },
  'animation-2d': { en: '2D animation', es: 'Animación 2D' },
  trailer: { en: 'Trailers', es: 'Tráilers' },
  'music-video': { en: 'Music videos', es: 'Videoclips' },
  series: { en: 'Series', es: 'Series' },
  advertising: { en: 'Advertising', es: 'Publicidad' },
  illustration: { en: 'Illustration', es: 'Ilustración' },
} as const;

export const PLATFORMS = {
  web: { en: 'Web', es: 'Web' },
  ios: { en: 'iOS', es: 'iOS' },
  android: { en: 'Android', es: 'Android' },
  steam: { en: 'Steam', es: 'Steam' },
  pc: { en: 'PC', es: 'PC' },
  console: { en: 'Console', es: 'Consola' },
  arcade: { en: 'Arcade', es: 'Arcade' },
  tv: { en: 'TV', es: 'TV' },
  youtube: { en: 'YouTube', es: 'YouTube' },
} as const;

export type ServiceKey = keyof typeof SERVICES;
export type PlatformKey = keyof typeof PLATFORMS;
export const SERVICE_KEYS = Object.keys(SERVICES) as [ServiceKey, ...ServiceKey[]];
export const PLATFORM_KEYS = Object.keys(PLATFORMS) as [PlatformKey, ...PlatformKey[]];

export const eraOf = (year: number) => `${Math.floor(year / 10) * 10}s`;

// The three areas of the studio (same as the Servicios accordions). The projects page filters by
// area; each project's areas are derived from its services and platforms, so no extra field is needed.
export const AREAS = {
  games: { en: 'Video games', es: 'Videojuegos' },
  animation: { en: 'Animation', es: 'Animación' },
  coproduction: { en: 'Co-production', es: 'Co-producción' },
} as const;
export type AreaKey = keyof typeof AREAS;
export const AREA_KEYS = Object.keys(AREAS) as AreaKey[];

const GAME_SERVICES: ServiceKey[] = ['brand-games', 'web-games', 'edutainment'];
const ANIMATION_SERVICES: ServiceKey[] = ['animation-3d', 'animation-2d', 'music-video', 'series', 'advertising', 'trailer'];
const PLAYABLE: PlatformKey[] = ['web', 'ios', 'android', 'steam', 'pc', 'console', 'arcade'];

export function areasOf(services: readonly ServiceKey[], platforms: readonly PlatformKey[]): AreaKey[] {
  const areas: AreaKey[] = [];
  // Original IP counts as a game only when it ships on a playable platform (series don't).
  if (services.some((s) => GAME_SERVICES.includes(s)) || (services.includes('original-ip') && platforms.some((p) => PLAYABLE.includes(p)))) areas.push('games');
  if (services.some((s) => ANIMATION_SERVICES.includes(s))) areas.push('animation');
  if (services.includes('codev')) areas.push('coproduction');
  return areas;
}
