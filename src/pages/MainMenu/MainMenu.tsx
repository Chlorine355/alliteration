import { Link } from 'react-router-dom'
import styles from './MainMenu.module.scss'
import { $game } from '../../store/store'
import { useUnit } from 'effector-react';

export const MainMenuPage = () => {
    const game = useUnit($game);
    return (
    <div className={styles.container}>
        <h1>Аллитерация</h1>
        <div className={styles.buttons}>
            <Link to={'/game'}><button className={styles.btn} disabled={!game?.isOn}>Продолжить</button></Link>
            <Link to={'/teams'}><button className={styles.btn}>Новая игра</button></Link>
            <Link to={'/rules'}><button className={styles.btn}>Правила</button></Link>
        </div>
    </div>
    )
}