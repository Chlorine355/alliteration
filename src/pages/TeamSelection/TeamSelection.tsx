import { Link } from 'react-router-dom'
import styles from './TeamSelection.module.scss'
import { $game } from '../../store/store';
import { useUnit } from 'effector-react';

export const TeamSelection = () => {
    const game = useUnit($game);
    const teams = game?.teams ?? [];
    return <div className={styles.container}>
        <h1>Команды</h1>
        <div className={styles.teams}>
        {teams.map((team) => <div key={team.name}>{team.name}</div>)}
        </div>
        <Link to={'/match_settings'}><button className={'wide blue'}>Далее</button></Link>
        <Link to={'/'}><button className={'wide'}>Назад</button></Link>
    </div>
}