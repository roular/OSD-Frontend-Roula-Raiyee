import { lazy } from 'react';

import MinimalLayout from '../layout/MinimalLayout';
import LoginForm from '../pages/auth/forms/login-form';

// login 
const Login = lazy(() => import('../pages/auth/login'));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/auth',
    element: <MinimalLayout />,
    children: [
        {
            path: '/auth',
            element: <Login />,
            children: [
                {
                    path: '/auth/login',
                    element: <LoginForm />,
                },
            ]
        }
    ]
};

export default AuthenticationRoutes;
