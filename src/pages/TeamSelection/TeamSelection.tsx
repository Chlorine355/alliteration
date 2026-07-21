import { Link } from 'react-router-dom'
import styles from './TeamSelection.module.scss'
import { $game } from '../../store/store';
import { useUnit } from 'effector-react';
import { addTeamEv, deleteTeamEv, setTeamNameEv } from '../../store/actions';

export const TeamSelection = () => {
    const game = useUnit($game);
    const teams = game?.teams ?? [];
    return <div className={styles.container}>
        <h1>Команды</h1>
        <div className={styles.teams}>
            {teams.map((team, idx) =>
                <div className={styles.team}>
                    <input
                    key={idx}
                    value={team.name}
                    onChange={(event) => setTeamNameEv({ idx, name: event.target.value })}
                    placeholder='Введите название команды'
                    />
                    {teams.length > 2 && <span onClick={() => deleteTeamEv(idx)}>✕</span>}
                </div>)}
            {teams.length < 6 && <button className='wide' onClick={() => addTeamEv()}>Добавить</button>}
        </div>
        <Link to={'/match_settings'}><button className={'wide blue'} disabled={teams.some((team) => !team.name)}>Далее</button></Link>
        <Link to={'/'}><button className={'wide'}>Назад</button></Link>
    </div>
}