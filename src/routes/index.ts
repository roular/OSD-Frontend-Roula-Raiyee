import { useRoutes } from 'react-router-dom';

// routes
import config from '../config';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';


// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
