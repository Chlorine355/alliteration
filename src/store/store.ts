import { createStore } from "effector";
import { Game } from "./types";
import { addToTeamScoreEv, setCurrentTeamEv, setDefaultGameEv, setGameOnEv, setRandomLetterEv, setSkipPenaltyEv, setTargetScoreEv, setTeamsToZero, setTimeForRoundEv } from "./actions";
import { getRandomLetter } from "../data/helpers";


const getDefaultGame = () => {
    return {
    teams: [{score: 0, name: 'Кошки'}, {score: 0, name: 'Мышки'}],
    currentTeamIdx: 0,
    currentLetter: 'п',
    isOn: false,
    settings: {targetScore: 30,
    time: 90,
    penaltyForSkip: true,
    }
}
}

const initStore = (): Game => {
    const record = localStorage.getItem('game');
    if (record) return JSON.parse(record);
    return getDefaultGame();
}

export const $game = createStore<Game>(initStore())
.on(setGameOnEv, (state, payload) => ({...state, isOn: payload}))

.on(setCurrentTeamEv, (state, payload) => ({...state, currentTeamIdx: payload}))
.on(setRandomLetterEv, (state, _) => ({...state, currentLetter: getRandomLetter()}))
.on(addToTeamScoreEv, (state, payload) => {
    const teamsCopy = state.teams.slice()
    teamsCopy[payload.teamIdx].score = teamsCopy[payload.teamIdx].score + payload.score;
    return {...state, teams: teamsCopy}
})
.on(setSkipPenaltyEv, (state, payload) => ({...state, settings: {...state.settings, penaltyForSkip: payload}}))
.on(setTimeForRoundEv, (state, payload) => ({...state, settings: {...state.settings, time: payload}}))
.on(setTargetScoreEv, (state, payload) => ({...state, settings: {...state.settings, targetScore: payload}}))
.on(setTeamsToZero, (state) => ({...state, teams: state.teams.map((team) => ({...team, score: 0}))}))

.on(setDefaultGameEv, () => getDefaultGame());


// save as we play
$game.watch((data) => localStorage.setItem('game', JSON.stringify(data)))
