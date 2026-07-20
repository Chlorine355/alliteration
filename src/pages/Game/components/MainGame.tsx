import { useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";
import { $game } from "../../../store/store";
import styles from './../Game.module.scss'
import { formatTime, getRandomWord } from "../../../data/helpers";
import { WordCircle } from "./WordCircle";

type PropsType = {
    letter: string;
    roundEndHandler: (history: { word: string; result: boolean }[]) => void;
}

export const MainGame = ({ letter, roundEndHandler }: PropsType) => {
    const game = useUnit($game);
    const time = game.settings.time;
    const teamName = game.teams[game.currentTeamIdx].name;
    const [isPaused, setIsPaused] = useState(false);
    const [timer, setTimer] = useState<number>(time);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [word, setWord] = useState(getRandomWord())
    const [history, setHistory] = useState<{ word: string; result: boolean }[]>([]);
    const [guessed, setGuessed] = useState(0);
    const [skipped, setSkipped] = useState(0);


    useEffect(() => {
        if (!isPaused && timer > 0) {
            timerRef.current = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
    }, [timer, isPaused]);

    const wordPlayedHandler = (result: boolean) => {
        const newHistory = [...history, { word, result }];
        setHistory(newHistory);
        if (result) {
            setGuessed(guessed + 1)
        } else {
            setSkipped(skipped + 1)
        }
        if (timer > 0) setWord(getRandomWord()); else roundEndHandler(newHistory);
    }

    return (
        <div className={styles.game_container}>
            <div className={styles.top}>
                <div>{teamName}</div>
                <div>Буква: {letter.toUpperCase()}</div>
                <div  className={styles.score}>{guessed}</div>
                <div>Отгадано</div>
            </div>

            {!isPaused ?
                <WordCircle word={word} wordPlayedHandler={wordPlayedHandler} key={word} />
                : 'Пауза'}

            <div className={styles.bottom}>
                <div>Пропущено</div>
                <div className={styles.score}>{skipped}</div>
                <div className={styles.time}>
                    <div>{isPaused ? 'Пауза' : timer > 0 ? formatTime(timer) : 'Последнее слово'}</div>
                    <button onClick={() => setIsPaused(!isPaused)}>{isPaused ? 'Продолжить' : 'Пауза'}</button>
                </div>
            </div>
        </div>)
}