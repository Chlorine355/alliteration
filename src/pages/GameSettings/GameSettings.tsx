import { Link } from "react-router-dom";
import styles from './GameSettings.module.scss'
import { useUnit } from "effector-react";
import { $game } from "../../store/store";
import { setSkipPenaltyEv, setTargetScoreEv, setTimeForRoundEv } from "../../store/actions";


export const GameSettings = () => {
    const game = useUnit($game);
    const settings = game.settings;
    return <div className={styles.container}>
        <h1>Настройки игры</h1>
        <div className={styles.controls}>
            <div>
                <span>Цель игры:</span>
                <input type="number" value={settings.targetScore} onChange={(event) => setTargetScoreEv(Number(event.target.value))} />
                <span>очков</span></div>
            <div>
                <span>Время на раунд:</span>
                <input type="number" value={settings.time} onChange={(event) => setTimeForRoundEv(Number(event.target.value))} />
                <span>с.</span>
            </div>
            <div>
                <span>Штраф за пропуск:</span>
                <input type="checkbox" checked={settings.penaltyForSkip} onChange={(event) => setSkipPenaltyEv(event.target.checked)} /></div>
        </div>
        <Link to={'/game'}><button className={styles.btn}>Играть</button></Link>
        <Link to={'/'}><button className={styles.btn}>Назад</button></Link>
    </div>
}