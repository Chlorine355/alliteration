import { createStore } from "effector";
import { Game } from "./types";
import { addTeamEv, addToTeamScoreEv, deleteTeamEv, setCurrentTeamEv, setDefaultGameEv, setFixedLetterEv, setGameOnEv, setRandomLetterEv, setSkipPenaltyEv, setTargetScoreEv, setTeamNameEv, setTeamsToZero, setTimeForRoundEv } from "./actions";
import { getRandomLetter } from "../data/helpers";


const getDefaultGame = () => {
    return {
        teams: [{ score: 0, name: 'Кошки' }, { score: 0, name: 'Мышки' }],
        currentTeamIdx: 0,
        currentLetter: 'п',
        isOn: false,
        settings: {
            targetScore: 30,
            time: 90,
            penaltyForSkip: false,
            fixedLetter: '',
        }
    }
}

const initStore = (): Game => {
    const record = localStorage.getItem('game');
    if (record) return JSON.parse(record);
    return getDefaultGame();
}

export const $game = createStore<Game>(initStore())
    .on(setGameOnEv, (state, payload) => ({ ...state, isOn: payload }))

    .on(setCurrentTeamEv, (state, payload) => ({ ...state, currentTeamIdx: payload }))
    .on(setRandomLetterEv, (state, _) => ({ ...state, currentLetter: getRandomLetter() }))
    .on(addToTeamScoreEv, (state, payload) => {
        const teamsCopy = state.teams.slice()
        teamsCopy[payload.teamIdx].score = teamsCopy[payload.teamIdx].score + payload.score;
        return { ...state, teams: teamsCopy }
    })
    .on(setSkipPenaltyEv, (state, payload) => ({ ...state, settings: { ...state.settings, penaltyForSkip: payload } }))
    .on(setTimeForRoundEv, (state, payload) => ({ ...state, settings: { ...state.settings, time: payload } }))
    .on(setFixedLetterEv, (state, payload) => ({ ...state, settings: { ...state.settings, fixedLetter: payload } }))
    .on(setTargetScoreEv, (state, payload) => ({ ...state, settings: { ...state.settings, targetScore: payload } }))
    .on(setTeamsToZero, (state) => ({ ...state, currentTeamIdx: 0, teams: state.teams.map((team) => ({ ...team, score: 0 })) }))
    .on(setTeamNameEv, (state, { idx, name }) => {
        return {
            ...state, teams: state.teams.map((team, teamIdx) => {
                if (idx === teamIdx) {
                    return { score: team.score, name }
                } else {
                    return team
                }
            })
        }
    })
    .on(addTeamEv, (state) => ({ ...state, teams: [...state.teams, { name: '', score: 0 }] }))
    .on(deleteTeamEv, (state, payload) => ({ ...state, teams: state.teams.toSpliced(payload, 1) }))


    .on(setDefaultGameEv, () => getDefaultGame());


// save as we play
$game.watch((data) => localStorage.setItem('game', JSON.stringify(data)))
