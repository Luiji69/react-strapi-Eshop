import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import './app.scss';
import { Route, Navigate } from "react-router-dom";
import AppHeader from "./components/Navbar/Appheader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Profile from './components/Profile/Profile';
import SocialCards from './components/SocialCards/SocialCards';
import { getToken } from './helpers';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

const Layout = () => {
  return (
    <div className="app">
      <AppHeader />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/:id',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path:'/profile',
        element:<Profile />,
      },
      {
        path:'/socialCards',
        element:<SocialCards />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
