/**
 * Shared timing for the mission map (MissionLayer) and its log (MissionLog), so the squad status
 * lines in the log switch exactly when the squads on the map start a new leg.
 * One loop: fade in at the door, then per leg a move and a hold, then fade out at the last waypoint.
 */
export const MISSION = {
  /** Loop length in seconds */
  dur: 26,
  /** Percent of the loop spent fading in at the first waypoint */
  intro: 3,
  /** Percent per leg spent moving and holding */
  move: 16,
  hold: 5,
  squads: [
    { tag: "A", park: 1 },
    { tag: "B", park: 2 },
    { tag: "C", park: 3 },
  ],
} as const;

/** Animation delay of squad `i`: the squads run the same loop a third apart */
export const squadDelay = (i: number) => (-MISSION.dur * i) / MISSION.squads.length;

/** Loop percent where leg `i` (towards waypoint i + 1) starts and where its hold ends */
export function legRange(i: number) {
  const start = MISSION.intro + i * (MISSION.move + MISSION.hold);
  return [start, start + MISSION.move + MISSION.hold] as const;
}

/** Keyframes that show an element only while leg `i` runs */
export function legKeyframes(name: string, i: number) {
  const [a, b] = legRange(i);
  return `@keyframes ${name}{0%,${a - 0.01}%{opacity:0}${a}%,${b - 0.01}%{opacity:1}${b}%,100%{opacity:0}}`;
}

/** Keyframes for the time a squad waits at the first waypoint: the intro and after the last leg */
export function doorKeyframes(name: string, legs: number) {
  const [, end] = legRange(legs - 1);
  return `@keyframes ${name}{0%,${MISSION.intro - 0.01}%{opacity:1}${MISSION.intro}%,${end - 0.01}%{opacity:0}${end}%,100%{opacity:1}}`;
}
