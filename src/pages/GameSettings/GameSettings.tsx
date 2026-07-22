import { Link } from "react-router-dom";
import styles from './GameSettings.module.scss'
import { useUnit } from "effector-react";
import { $game } from "../../store/store";
import { setFixedLetterEv, setSkipPenaltyEv, setTargetScoreEv, setTeamsToZero, setTimeForRoundEv } from "../../store/actions";
import { useEffect } from "react";
import { LETTERS } from "../../data/letters";


export const GameSettings = () => {
    const game = useUnit($game);
    const settings = game.settings;
    // reset team scores if exited from game
    useEffect(() => { setTeamsToZero() }, [])
    return <div className={styles.container}>
        <h1>Настройки игры</h1>
        <div className={styles.controls}>
            <div>
                <span>Цель игры:</span>
                <input type="number" value={settings.targetScore} onChange={(event) => setTargetScoreEv(Number(event.target.value))} />
                <span>очков</span>
            </div>
            <div>
                <span>Время на раунд:</span>
                <input type="number" value={settings.time} onChange={(event) => setTimeForRoundEv(Number(event.target.value))} />
                <span>с.</span>
            </div>
            <div>
                <span>Штраф за пропуск:</span>
                <input type="checkbox" checked={settings.penaltyForSkip} onChange={(event) => setSkipPenaltyEv(event.target.checked)} />
            </div>
            <div>
                <span>Постоянная буква:</span>
                <select value={settings.fixedLetter} onChange={(event) => setFixedLetterEv(event.target.value)}>
                    <option value="">Нет</option>
                    {Array.from(LETTERS).map((letter) => <option value={letter}>{letter}</option>)}
                </select>
            </div>

        </div>
        <Link to={'/game'}><button className={'wide blue'}>Играть</button></Link>
        <Link to={'/teams'}><button className={'wide'}>Назад</button></Link>
    </div>
}