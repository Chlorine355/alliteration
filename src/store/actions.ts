import { createEvent } from "effector";

export const setGameOnEv = createEvent<boolean>()
export const setCurrentTeamEv = createEvent<number>()
export const setRandomLetterEv = createEvent()
