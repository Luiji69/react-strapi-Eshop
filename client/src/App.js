import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Nnavbar from "./components/Navbar/Nnavbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import "./app.scss"
import Register from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="app">
      <Nnavbar />
      <Outlet />
      <ToastContainer/>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/products/:id",
        element:<Products/>
      },
      {
        path:"/product/:id",
        element:<Product/>
      },
      {
        path:"/Contact",
        element:<Contact/>
      },
      {
        path:"/Register",
        element:<Register/>
      },
      {
        path:"/Login",
        element:<Login/>
      },
    ]
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
