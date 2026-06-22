import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/products";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <mainlayout />,
    children: [
        {
            index:true,
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