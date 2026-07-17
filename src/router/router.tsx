import { createBrowserRouter } from 'react-router-dom';

import AppContainer from '../AppContainer';
import { MainMenuPage } from '../pages/MainMenu/MainMenu';
import { Rules } from '../pages/Rules/Rules';
import { TeamSelection } from '../pages/TeamSelection/TeamSelection';
import { GameSettings } from '../pages/GameSettings/GameSettings';
import { Game } from '../pages/Game/Game';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        index: true,
        element: <MainMenuPage />,
      },
      {
        path: '/rules',
        element: <Rules />,
      },
      {
        path: '/teams',
        element: <TeamSelection />,
      },
      {
        path: '/match_settings',
        element: <GameSettings />,
      },
      {  
        path: '/game',
        element: <Game />,
      },
    ],
  },
]);

export default router;
