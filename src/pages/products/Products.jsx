import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

import Box from "@mui/material/Box"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TuneIcon from "@mui/icons-material/Tune"

import useProducts from "../../hooks/useProducts"
import useAddToCart from "../../hooks/useAddToCart"
import useProductsFilters from "../../hooks/useProductsFilters"

import ProductsHeader from "./ProductsHeader"
import ProductCategories from "./ProductCategories"
import ProductsToolbar from "./ProductsToolbar"
import ActiveFiltersChips from "./ActiveFiltersChips"
import ProductFilters from "./ProductFilters"
import ProductsGrid from "./ProductsGrid"
import ProductsPagination from "./ProductsPagination"
import MobileFiltersDrawer from "./MobileFiltersDrawer"
import RecentlyViewed from "./RecentlyViewed"
import ShippingFAQ from "./ShippingFAQ"
import NewsletterSection from "./NewsletterSection"

import beautyIcon from "../../assets/icons/Beauty.svg"
import electronicsIcon from "../../assets/icons/Electronics.svg"
import fashionIcon from "../../assets/icons/Fashion.svg"
import homeIcon from "../../assets/icons/Home.svg"

const SORT_OPTIONS = [
    { value: "", sortBy: "", ascending: true, labelKey: "products.sortDefault" },
    { value: "name-asc", sortBy: "name", ascending: true, labelKey: "products.sortNameAsc" },
    { value: "name-desc", sortBy: "name", ascending: false, labelKey: "products.sortNameDesc" },
    { value: "price-asc", sortBy: "price", ascending: true, labelKey: "products.sortPriceAsc" },
    { value: "price-desc", sortBy: "price", ascending: false, labelKey: "products.sortPriceDesc" },
    { value: "rate-desc", sortBy: "rate", ascending: false, labelKey: "products.sortRateDesc" },
    { value: "rate-asc", sortBy: "rate", ascending: true, labelKey: "products.sortRateAsc" },
]

const CATEGORIES = [
    { key: "electronics", icon: electronicsIcon, available: true },
    { key: "fashion", icon: fashionIcon, available: false },
    { key: "beauty", icon: beautyIcon, available: false },
    { key: "home", icon: homeIcon, available: false },
]

export default function Products() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const theme = useTheme()

    const isDark = theme.palette.mode === "dark"
    const isRTL = i18n.dir() === "rtl"

    const [mobileFilters, setMobileFilters] = useState(false)
    const [favorites, setFavorites] = useState({})
    const [recentlyViewed, setRecentlyViewed] = useState([])
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

    const { mutate: addToCart } = useAddToCart()

    const { selectedSort } = useProductsFilters([])

    const sort = SORT_OPTIONS.find((item) => item.value === selectedSort) || SORT_OPTIONS[0]

    const { data, isLoading } = useProducts({ sortBy: sort.sortBy, ascending: sort.ascending, limit: 100 })
    const products = data?.response?.data || []

    const filters = useProductsFilters(products)

    const handleCategory = (category) => {
        if (category.available) {
            navigate("/products")
            return
        }
        navigate(`/products/coming-soon/${category.key}`)
    }

    const toggleFavorite = (id) => {
        setFavorites((previous) => ({ ...previous, [id]: !previous[id] }))
    }

    const handleAddToCart = (event, productId) => {
        event.stopPropagation()

        addToCart(
            { productId, count: 1 },
            {
                onSuccess: () => setSnackbar({ open: true, message: t("products.addedToCart"), severity: "success" }),
                onError: () => setSnackbar({ open: true, message: t("products.addToCartError"), severity: "error" }),
            }
        )
    }

    const handleOpenProduct = (id) => {
        const product = products.find((item) => item.id === id)

        if (product) {
            setRecentlyViewed((previous) =>
                [product, ...previous.filter((item) => item.id !== id)].slice(0, 4)
            )
        }

        navigate(`/product/${id}`)
    }

    const filterProps = {
        minRating: filters.minRating,
        priceRange: filters.priceRange,
        onRatingChange: filters.setMinRating,
        onPriceChange: filters.setPriceRange,
        onClear: filters.clearFilters,
    }

    return (
        <Box
            component="main"
            dir={isRTL ? "rtl" : "ltr"}
            sx={{ maxWidth: 1440, mx: "auto", px: { xs: 2, sm: 3, md: 5, lg: 6 }, py: { xs: 4, md: 6 } }}
        >
            <ProductsHeader />

            <ProductCategories categories={CATEGORIES} onSelect={handleCategory} isDark={isDark} />

            <ProductsToolbar
                search={filters.search}
                onSearchChange={filters.setSearch}
                selectedSort={filters.selectedSort}
                onSortChange={filters.setSelectedSort}
                sortOptions={SORT_OPTIONS}
                view={filters.view}
                onViewChange={filters.setView}
                isRTL={isRTL}
            />

            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <ProductFilters {...filterProps} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<TuneIcon />}
                            onClick={() => setMobileFilters(true)}
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                        >
                            {t("products.filters")}{filters.activeFilterCount > 0 ? ` (${filters.activeFilterCount})` : ""}
                        </Button>

                        <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: "none", md: "block" } }}>
                            {t("products.allProducts")}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {t("products.productCount", { count: filters.filteredProducts.length })}
                        </Typography>
                    </Box>

                    <ActiveFiltersChips
                        search={filters.search}
                        minRating={filters.minRating}
                        priceRange={filters.priceRange}
                        onRemoveSearch={() => filters.setSearch("")}
                        onRemoveRating={() => filters.setMinRating(0)}
                        onRemovePrice={() => filters.setPriceRange([0, 5000])}
                        onClearAll={filters.clearFilters}
                    />

                    <ProductsGrid
                        products={filters.currentProducts}
                        isLoading={isLoading}
                        view={filters.view}
                        favorites={favorites}
                        onFavorite={toggleFavorite}
                        onAddToCart={handleAddToCart}
                        onOpen={handleOpenProduct}
                        isDark={isDark}
                        onClearFilters={filters.clearFilters}
                    />

                    <ProductsPagination pageCount={filters.pageCount} page={filters.page} onChange={filters.setPage} />
                </Box>
            </Box>

            <RecentlyViewed products={recentlyViewed} onOpen={handleOpenProduct} />

            <ShippingFAQ />

            <NewsletterSection />

            <MobileFiltersDrawer open={mobileFilters} onClose={() => setMobileFilters(false)} isRTL={isRTL} {...filterProps} />

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
                <Alert severity={snackbar.severity} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}