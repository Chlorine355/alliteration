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
import { setGameOnEv, setRandomLetterEv } from "../../store/actions"
import { $game } from "../../store/store"
import { useUnit } from "effector-react";

enum Stages {
    StatsBefore,
    StartButton,
    Game,
    RoundStats,
}

export const Game = () => {
    const [stage, setStage] = useState(Stages.StatsBefore);
    const game = useUnit($game);
    useEffect(() => {
        setGameOnEv(true)
    }, [])

    useEffect(() => {
        if (game.currentTeamId === 0) {
            setRandomLetterEv()
        }
    }, [game.currentTeamId])

    switch (stage) {
        case Stages.StatsBefore:
            return <div></div>
        case Stages.StartButton:
            return <div></div>
        case Stages.Game:
            return <div></div>
        case Stages.RoundStats:
            return <div></div>
    }
}