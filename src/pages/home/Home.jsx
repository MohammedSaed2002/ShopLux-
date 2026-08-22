import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

import useProducts from "../../hooks/useProducts"
import useAddToCart from "../../hooks/useAddToCart"

import Hero from "../../components/home/Hero"
import TrustBar from "../../components/home/TrustBar"
import Categories from "../../components/home/Categories"
import FeaturedProducts from "../../components/home/FeaturedProducts"
import BestSellers from "../../components/home/BestSellers"
import PromoBanner from "../../components/home/PromoBanner"
import Testimonials from "../../components/home/Testimonials"
import Statistics from "../../components/home/Statistics"
import Newsletter from "../../components/home/Newsletter"

export default function Home() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"
    const isRTL = i18n.dir() === "rtl"

    const [favorites, setFavorites] = useState({})

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    })

    const { mutate: addToCart } = useAddToCart()

    const { data, isLoading } = useProducts({
        sortBy: "rate",
        ascending: false,
    })

    const featuredProducts = useMemo(() => {
        const products = data?.response?.data || []

        return products.slice(0, 4)
    }, [data])

    const toggleFavorite = (productId) => {
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }))
    }

    const handleAddToCart = (productId) => {
        addToCart(
            {
                productId,
                count: 1,
            },
            {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: t("products.addedToCart"),
                        severity: "success",
                    })
                },

                onError: () => {
                    setSnackbar({
                        open: true,
                        message: t("products.addToCartError"),
                        severity: "error",
                    })
                },
            }
        )
    }

    const handleNewsletterMessage = (
        message,
        severity
    ) => {
        setSnackbar({
            open: true,
            message,
            severity,
        })
    }

    const closeSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }))
    }

    return (
        <Box>
            <Hero
                t={t}
                navigate={navigate}
                isDark={isDark}
                isRTL={isRTL}
            />

            <TrustBar
                t={t}
                isDark={isDark}
                isRTL={isRTL}
            />

            <Categories
                t={t}
                navigate={navigate}
                isDark={isDark}
                isRTL={isRTL}
            />

            <FeaturedProducts
                t={t}
                navigate={navigate}
                isDark={isDark}
                isRTL={isRTL}
                featuredProducts={featuredProducts}
                isLoading={isLoading}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleAddToCart={handleAddToCart}
            />

            <BestSellers
                t={t}
                navigate={navigate}
                isDark={isDark}
                isRTL={isRTL}
                featuredProducts={featuredProducts}
                isLoading={isLoading}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleAddToCart={handleAddToCart}
            />

            <PromoBanner
                t={t}
                navigate={navigate}
                isDark={isDark}
                isRTL={isRTL}
            />

            <Testimonials
                t={t}
                isDark={isDark}
                isRTL={isRTL}
            />

            <Statistics
                t={t}
                isDark={isDark}
                isRTL={isRTL}
            />

            <Newsletter
                t={t}
                isDark={isDark}
                isRTL={isRTL}
                onMessage={handleNewsletterMessage}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity={snackbar.severity}
                    sx={{
                        width: "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}