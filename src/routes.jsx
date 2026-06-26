import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/mainlayout"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/login/Login"
import Products from "./pages/products/Products"
import Register from "./pages/register/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "products",
            element: <Products />
        },
        {
            path: "cart",
            element: <Cart />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        }
        ]
  },
]);

export default router;