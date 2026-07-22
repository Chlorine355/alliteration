import { Link, useNavigate } from 'react-router-dom'
import styles from './MainMenu.module.scss'
import { $game } from '../../store/store'
import { useUnit } from 'effector-react';
import { setDefaultGameEv } from '../../store/actions';
import { useState } from 'react';

export const MainMenuPage = () => {
    const game = useUnit($game);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const startNewGame = () => {
        setDefaultGameEv();
        navigate('/teams')
    }
    
    const handleNewGameClick = () => {
        if (game.isOn) {
            setIsModalOpen(true);
        } else {
            startNewGame();
        }
    }

    return (
        <div className={styles.container}>
            <dialog open={isModalOpen} className={styles.modal}>
                <div>Начать новую игру?</div>
                <div>Прогресс сохранённой игры будет потерян.</div>
                <div className={styles.modal_buttons}>
                    <button onClick={() => setIsModalOpen(false)}>
                        Отмена
                    </button>
                    <button onClick={startNewGame} className='blue'>
                        Начать
                    </button>
                </div>
            </dialog>
            <h1>Аллитерация</h1>
            <div className={styles.buttons}>
                <Link to={'/game'}><button className={'wide blue'} disabled={!game?.isOn}>Продолжить</button></Link>
                <button className={'wide blue'} onClick={handleNewGameClick}>Новая игра</button>
                <Link to={'/rules'}><button className={'wide blue'}>Правила</button></Link>
            </div>
        </div>
    )
}
