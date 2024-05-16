/* eslint-disable react/jsx-no-undef */
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const routerData = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
    isAuth: false,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    isAuth: false,
  },
  {
    id: 2,
    path: '/signup',
    label: 'SignUp',
    element: <SignUp />,
    isAuth: false,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: router.element,
      isAuth: router.isAuth,
    };
  })
);
