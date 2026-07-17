import { createStore } from "effector";
import { Game } from "./types";


const initStore = () => {
    const record = localStorage.getItem('game');
    if (record) return JSON.parse(record);
    return null;
}

export const $game = createStore<Game | null>(initStore());


// save as we play
$game.watch((data) => localStorage.setItem('game', JSON.stringify(data)))