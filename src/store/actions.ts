import { createEvent } from "effector";

export const setGameOnEv = createEvent<boolean>()
export const setCurrentTeamEv = createEvent<number>()
export const setRandomLetterEv = createEvent()
export const addToTeamScoreEv = createEvent<{teamIdx: number, score: number}>();
export const setDefaultGameEv = createEvent();

export const setSkipPenaltyEv = createEvent<boolean>();
export const setTargetScoreEv = createEvent<number>();
export const setTimeForRoundEv = createEvent<number>();
export const setTeamsToZero = createEvent();
