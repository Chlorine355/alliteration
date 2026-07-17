import { createStore } from "effector";
import { Game } from "./types";


const defaultGame: Game = {
    teams: [{id: 1, score: 0, name: 'Кошки'}, {id: 2, score: 0, name: 'Мышки'}],
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

export const $game = createStore<Game>(initStore());


// save as we play
$game.watch((data) => localStorage.setItem('game', JSON.stringify(data)))