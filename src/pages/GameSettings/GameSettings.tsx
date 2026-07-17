import { Link } from "react-router-dom";
import styles from './GameSettings.module.scss'
import { useUnit } from "effector-react";
import { $game } from "../../store/store";


export const GameSettings = () => {
    const game = useUnit($game);
    const settings = game.settings;
    return <div className={styles.container}>
        <h1>Настройки игры</h1>
        <div className={styles.controls}>
            <div>Цель игры: {settings.targetScore} очков</div>
            <div>Время на раунд: {settings.time} с.</div>
            <div>Штраф за пропуск: {settings.penaltyForSkip ? 'Да' : 'Нет'}</div>

        </div>
        <Link to={'/game'}><button className={styles.btn}>Играть</button></Link>
        <Link to={'/'}><button className={styles.btn}>Назад</button></Link>
    </div>
}