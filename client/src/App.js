import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import './app.scss';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Profile from './components/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Seller from './pages/Seller/Seller';
import CartDetails from './components/CheckOut/CartDetails';
import CartSummary from './components/CheckOut/CartSummary';
import ScrollToTop from 'react-scroll-to-top';
import OrderSuccess from './components/CheckOut/OrderSuccess';
import OrderDetail from './components/CheckOut/OrderDetail';
import UserOrders from './components/UserOrders/UserOrders';




const Layout = () => {
  return (
    <div className="app">
      <ScrollToTop smooth color="#ffffff" style={{ background: '#68944f', zIndex: 999 }} />
      <Navbar/>
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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/cartdetails',
        element: <CartDetails />,
      },
      {
        path: '/cartsummary',
        element: <CartSummary />,
      },
      {
        path: '/ordersuccess',
        element: <OrderSuccess />,
      },
      {
        path: '/orderdetail/:id',
        element: <OrderDetail />,
      },
      {
        path: '/becomeaseller',
        element: <Seller />,
      },
      {
        path: '/userorders',
        element: <UserOrders />,
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
