import { createStore } from "effector";
import { Game } from "./types";
import { setCurrentTeamEv, setGameOnEv, setRandomLetterEv } from "./actions";
import { getRandomLetter } from "../data/helpers";


const defaultGame: Game = {
    teams: [{id: 0, score: 0, name: 'Кошки'}, {id: 1, score: 0, name: 'Мышки'}],
    currentTeamId: 1,
    currentLetter: '',
    isOn: false,
    settings: {targetScore: 30,
    time: 60,
    penaltyForSkip: true,
}

}
const initStore = (): Game => {
    const record = localStorage.getItem('game');
    if (record) return JSON.parse(record);
    return defaultGame;
}

export const $game = createStore<Game>(initStore())
.on(setGameOnEv, (state, payload) => ({...state, isOn: payload}))
.on(setCurrentTeamEv, (state, payload) => ({...state, currentTeamId: payload}))
.on(setRandomLetterEv, (state, _) => ({...state, currentLetter: getRandomLetter()}));


// save as we play
$game.watch((data) => localStorage.setItem('game', JSON.stringify(data)))