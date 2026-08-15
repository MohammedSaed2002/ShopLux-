/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MainLayout from "./layout/mainlayout";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";

const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Login = lazy(() => import("./pages/login/Login"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword/ForgotPassword"));
const Products = lazy(() => import("./pages/products/Products"));
const Register = lazy(() => import("./pages/register/Register"));
const ProductDetails = lazy(() => import("./pages/productDetails/ProductDetails"));
const About = lazy(() => import("./pages/about/About"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

const PageFallback = () => (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 8 }}>
        <CircularProgress />
    </Box>
);

const withSuspense = (Component) => (
    <Suspense fallback={<PageFallback />}>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: withSuspense(Home)
        },
        {
            path: "products",
            element: <ProtectedRouter>{withSuspense(Products)}</ProtectedRouter>
        },
        {
            path: "product/:id",
            element: <ProtectedRouter>{withSuspense(ProductDetails)}</ProtectedRouter>
        },
        {
            path: "cart",
            element: <ProtectedRouter>{withSuspense(Cart)}</ProtectedRouter>
        },
        {
            path: "checkout",
            element: <ProtectedRouter>{withSuspense(Checkout)}</ProtectedRouter>
        },
        {
            path: "profile",
            element: <Navigate to="/profile/info" replace />

        },
        {
            path: "profile/:tab",
            element: <ProtectedRouter>{withSuspense(Profile)}</ProtectedRouter>
        },
        {
            path: "login",
            element: withSuspense(Login)
        },
        {
            path: "forgot-password",
            element: withSuspense(ForgotPassword)
        },
        {
            path: "register",
            element: withSuspense(Register)
        },
        {
            path: "about",
            element: withSuspense(About)
        },
        {
            path: "contact",
            element: withSuspense(Contact)
        },
        {
            path: "*",
            element: withSuspense(NotFound)
        }
    ]
  },
]);

export default router;