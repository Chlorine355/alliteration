import { useStoreMap, useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";
import { $game } from "../../../store/store";
import styles from './../Game.module.scss'
import { formatTime, getRandomWord } from "../../../data/helpers";

type PropsType = {
    letter: string;
    roundEndHandler: (history: { word: string; result: boolean }[]) => void;
}

export const MainGame = ({ letter, roundEndHandler }: PropsType) => {
    const game = useUnit($game);
    const time = game.settings.time;
    const teamName = game.teams[game.currentTeamId].name;
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
                <div>{guessed}</div>
                <div>Отгадано</div>
                <div>Буква: {letter.toUpperCase()}</div>
            </div>

            <button onClick={() => wordPlayedHandler(true)}>Угадано</button>
            <div>{word}</div>
            <button onClick={() => wordPlayedHandler(false)}>Пропустить</button>

            <div className={styles.bottom}>
                <div>{skipped}</div>
                <div>Пропущено</div>
                <div>{timer > 0 ? formatTime(timer) : 'Последнее слово'}</div>
                <button onClick={() => setIsPaused(!isPaused)}>{isPaused ? 'Продолжить' : 'Пауза'}</button>
            </div>
        </div>)
}