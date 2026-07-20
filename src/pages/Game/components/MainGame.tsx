import { useStoreMap } from "effector-react";
import { useEffect, useRef, useState } from "react";
import { $game } from "../../../store/store";
import styles from './../Game.module.scss'
import { getRandomWord } from "../../../data/helpers";

type PropsType = {
    letter: string;
    roundEndHandler: (history: { word: string; result: boolean }[]) => void;
}

export const MainGame = ({ letter, roundEndHandler }: PropsType) => {
    const time = useStoreMap({ store: $game, keys: [], fn: (store) => store.settings.time });
    const [isPaused, setIsPaused] = useState(false);
    const [timer, setTimer] = useState<number>(time);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [word, setWord] = useState(getRandomWord())
    const [history, setHistory] = useState<{ word: string; result: boolean }[]>([]);


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
        if (timer > 0) setWord(getRandomWord()); else roundEndHandler(newHistory);
    }

    return (
        <div className={styles.container}>
            <div>Буква: {letter.toUpperCase()}</div>
            <button onClick={() => setIsPaused(!isPaused)}>Пауза</button>
            <div>{word}</div>
            <button onClick={() => wordPlayedHandler(true)}>Угадано</button>
            <button onClick={() => wordPlayedHandler(false)}>Пропустить</button>
            <div>{timer > 0 ? timer : 'Последнее слово'}</div>
        </div>)
}