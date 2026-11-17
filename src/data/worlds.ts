// The two "Qué hacemos" cards (games and animation): which project and which YouTube video each one shows.
// These projects are left out of the home's "Trabajo seleccionado" so nothing repeats on the home;
// they still appear on the full projects page.
// - start / end (seconds): the stretch of the video that loops; leave end out to loop the whole video.
// - portrait: the video is vertical footage inside a 16:9 frame (black sides); it is zoomed so the vertical
//   part fills the card, and focus (0 = top, 100 = bottom) picks which band of it stays in view.
export interface World { project: string; video: string; start?: number; end?: number; portrait?: boolean; focus?: number }

export const WORLDS: Record<'games' | 'animation', World> = {
  // Gameplay trailer (29 s, vertical): only the gameplay stretch, before the closing title cards.
  games: { project: 'lit-killah-the-game', video: '1zLp4xW5lFo', start: 4, end: 19, portrait: true, focus: 40 },
  // Official music video (3 min 9 s): loops whole, skipping the first seconds.
  animation: { project: 'lit-killah-bizarrap-flexin', video: 'YWdcQfjdzBc', start: 8 },
};

export const WORLD_PROJECTS: string[] = Object.values(WORLDS).map((w) => w.project);
