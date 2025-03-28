import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import all components */
import About from './components/About';
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';

/**  Auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
      path : '*',
      element : <About></About>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
      path : '/password',
      element : <ProtectRoute><Password / ></ProtectRoute>
  },
  {
      path : '/profile',
      element : <AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
      path : '/recovery',
      element : <Recovery></Recovery>
  },
  {
      path : '/reset',
      element : <Reset></Reset>
  },
  {
      path : '/search',
      element : <Search></Search>
  },
  {
      path : '*',
      element : <PageNotFound></PageNotFound>
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
