import { Link } from 'react-router-dom'
import styles from './MainMenu.module.scss'
import { $game } from '../../store/store'
import { useUnit } from 'effector-react';
import { setDefaultGameEv } from '../../store/actions';

export const MainMenuPage = () => {
    const game = useUnit($game);
    
    return (
    <div className={styles.container}>
        <h1>Аллитерация</h1>
        <div className={styles.buttons}>
            <Link to={'/game'}><button className={'wide blue'} disabled={!game?.isOn}>Продолжить</button></Link>
            <Link to={'/teams'} onClick={() => {setDefaultGameEv()}}><button className={'wide blue'}>Новая игра</button></Link>
            <Link to={'/rules'}><button className={'wide blue'}>Правила</button></Link>
        </div>
    </div>
    )
}