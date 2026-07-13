import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/mainlayout"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import Login from "./pages/login/Login"
import Products from "./pages/products/Products"
import Register from "./pages/register/Register"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter"

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
            element: <ProtectedRouter><Products /></ProtectedRouter>
        },
        {
            path: "product/:id",
            element: <ProtectedRouter><ProductDetails /></ProtectedRouter>
        },
        {
            path: "cart",
            element: <ProtectedRouter><Cart /></ProtectedRouter>
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