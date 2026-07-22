/*
Game flow
0) isOn -> true

0) if team 1 is current, reselect letter
1) show stat screen with the current coming-up team
2) show start button
3) for the time + last word, show words
4) show stat, write to store, change current team
5) -> 1
*/

import { useEffect, useState } from "react"
import { addToTeamScoreEv, setCurrentTeamEv, setDefaultGameEv, setGameOnEv, setRandomLetterEv } from "../../store/actions"
import { $game } from "../../store/store"
import { useUnit } from "effector-react";
import styles from './Game.module.scss';
import { MainGame } from "./components/MainGame";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

enum Stages {
    StatsBefore,
    Game,
    RoundStats,
    Victory,
}

export const Game = () => {
    const navigate = useNavigate()
    const [stage, setStage] = useState(Stages.StatsBefore);
    const [history, setHistory] = useState<{ word: string; result: boolean }[]>([]);
    const game = useUnit($game);
    const isPenaltyForSkip = game.settings.penaltyForSkip;
    useEffect(() => {
        setGameOnEv(true)
    }, [])

    const flipHistoryRecord = (index: number) => {
        setHistory((history) => history.map((record, idx) => ({...record, result: idx === index ? !record.result : record.result})))
    }

    useEffect(() => {
        if (game.currentTeamIdx === 0) {
            setRandomLetterEv()
        }
    }, [game.currentTeamIdx])

    const roundEndHandler = (history: { word: string; result: boolean }[]) => {
        setHistory(history)
        setStage(Stages.RoundStats)
    }

    const computeScore = (records: { word: string; result: boolean }[]) => {
        let score = 0;
        for (const record of records) {
            score += record.result ? 1 : isPenaltyForSkip ? -1 : 0;
        }
        return score;
    }

    const nextTeamHandler = () => {     
        const currentScore = computeScore(history);
        const scores = game.teams.map((team, index) => team.score + (index === game.currentTeamIdx ? currentScore : 0)).toSorted((team1, team2) => team2 - team1);
        addToTeamScoreEv({ teamIdx: game.currentTeamIdx, score: currentScore })
        setCurrentTeamEv((game.currentTeamIdx + 1) % game.teams.length)
        // if last team, check wins
        if (game.currentTeamIdx === game.teams.length - 1) {
            // scores[0] is top
            // if >= than required and top, victory
            if ((scores[0] >= game.settings.targetScore) && (scores[0] > scores[1])) {
                setStage(Stages.Victory)
                return;
            }
        }
        setStage(Stages.StatsBefore)
        setHistory([])
    }

    const exitHandler = () => {
        setDefaultGameEv();
        navigate('/')
    }

    switch (stage) {
        case Stages.StatsBefore:
            return <div className={clsx(styles.game_container, styles.padding_bottom)}>
                <div className={styles.top}>
                    <div className={styles.teams_header}>
                        <span>Рейтинг команд </span>
                        <span>👑{game.settings.targetScore}</span>
                    </div>
                    <div className={styles.teams}>
                        {game.teams.toSorted((team1, team2) => team2.score - team1.score).map((team) => <div key={team.name} className={styles.team}>
                        <span>{team.name}</span> <span>{team.score}</span>
                        </div>)}
                    </div>
                </div>

                <div className={styles.centered_column}>
                    Следующая команда: {game.teams[game.currentTeamIdx].name}
                    <div>Буква: <b>{(game.settings.fixedLetter || game.currentLetter).toUpperCase()}</b></div>
                </div>

                <button className={"wide blue"} onClick={() => setStage(Stages.Game)}>
                    Поехали!
                </button>
            </div>
        case Stages.Game:
            return <MainGame roundEndHandler={roundEndHandler} letter={game.settings.fixedLetter || game.currentLetter} />
        case Stages.RoundStats:
            return (
                <div className={clsx(styles.game_container, styles.padding_bottom)}>
                    <div className={styles.top}>Результат {game.teams[game.currentTeamIdx].name}: {computeScore(history)}</div>
                    <div className={clsx(styles.centered_column, styles.results)}>
                        {history.map((record, idx) => 
                        <div key={record.word} className={styles.result}>
                            <span>{record.word}</span>
                            <span onClick={() => flipHistoryRecord(idx)}>{record.result ? '👍' : '👎'}</span>
                        </div>)}
                    </div>
                    <button onClick={nextTeamHandler} className={'wide blue'}>Передать ход</button>
                </div>
            )
        case Stages.Victory:
            return <div className={styles.container}>
                <h2>Победа!</h2>
                <div className={clsx(styles.centered_column, styles.final_results)}>
                    {
                        game.teams.toSorted((team1, team2) => team2.score - team1.score).map((team) =>
                            <div key={team.name} className={styles.team}>
                                <span>{team.name}</span>
                                <span>{team.score}</span>
                            </div>
                        )
                    }
                </div>
                <button onClick={exitHandler} className={'wide blue'}>В меню</button></div>
    }
}