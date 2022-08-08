import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import DashBoard from '../pages/Dashboard/index';

// sample page routing
// const SamplePage = lazy(() => import('views/sample-page'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashBoard />
        },
    ]
};

export default MainRoutes;
