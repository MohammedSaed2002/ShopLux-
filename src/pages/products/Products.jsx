import React, { useState, useMemo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Pagination from "@mui/material/Pagination"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useProducts from "../../hooks/useProducts"
import useAddToCart from "../../hooks/useAddToCart"

const SORT_OPTIONS = [
    { value: "", sortBy: "", ascending: true, labelKey: "products.sortDefault" },
    { value: "name-asc", sortBy: "name", ascending: true, labelKey: "products.sortNameAsc" },
    { value: "name-desc", sortBy: "name", ascending: false, labelKey: "products.sortNameDesc" },
    { value: "price-asc", sortBy: "price", ascending: true, labelKey: "products.sortPriceAsc" },
    { value: "price-desc", sortBy: "price", ascending: false, labelKey: "products.sortPriceDesc" },
    { value: "rate-asc", sortBy: "rate", ascending: true, labelKey: "products.sortRateAsc" },
    { value: "rate-desc", sortBy: "rate", ascending: false, labelKey: "products.sortRateDesc" },
];

const ITEMS_PER_PAGE = 6;

export default function Products() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate: addToCart } = useAddToCart();

    const [selectedSort, setSelectedSort] = useState("");
    const [search, setSearch] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const currentSortOption = SORT_OPTIONS.find(opt => opt.value === selectedSort) || SORT_OPTIONS[0];

    const { data, isLoading } = useProducts({
        sortBy: currentSortOption.sortBy,
        ascending: currentSortOption.ascending,
    });

    const allProducts = data?.response?.data || [];

    // filter products (search, rating, price) - all done in the browser
    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesRating = product.rate >= minRating;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesSearch && matchesRating && matchesPrice;
        });
    }, [allProducts, search, minRating, priceRange]);

    const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleClearFilters = () => {
        setSearch("");
        setMinRating(0);
        setPriceRange([0, 5000]);
        setSelectedSort("");
        setPage(1);
    };

    const toggleFavorite = (productId) => {
        setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };

    const handleAddToCart = (productId) => {
        addToCart(
            { productId, count: 1 },
            {
                onSuccess: () => {
                    setSnackbar({ open: true, message: t("products.addedToCart"), severity: "success" });
                },
                onError: () => {
                    setSnackbar({ open: true, message: t("products.addToCartError"), severity: "error" });
                },
            }
        );
    };

    if (isLoading) return <CircularProgress sx={{ margin: 4 }} />;

    return (
        <Box sx={{ padding: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2, marginBottom: 3 }}>
                <Box>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
                        {t("products.title")}
                    </Typography>
                    <Typography color="text.secondary">{t("products.subtitle")}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        size="small"
                        placeholder={t("products.searchPlaceholder")}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>{t("products.sortBy")}</InputLabel>
                        <Select
                            value={selectedSort}
                            label={t("products.sortBy")}
                            onChange={(e) => { setSelectedSort(e.target.value); setPage(1); }}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {t(option.labelKey)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {/* Sidebar */}
                <Box sx={{ width: 240, flexShrink: 0 }}>
                    <Typography sx={{ marginBottom: 1 }}>{t("products.ratingTitle")}</Typography>
                    {[4, 3, 0].map((rating) => (
                        <FormControlLabel
                            key={rating}
                            control={
                                <Checkbox
                                    checked={minRating === rating}
                                    onChange={() => { setMinRating(rating); setPage(1); }}
                                />
                            }
                            label={
                                rating === 0 ? (
                                    "All"
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        {rating} <StarIcon fontSize="small" sx={{ color: "#ffb68b" }} /> {t("products.andUp")}
                                    </Box>
                                )
                            }
                        />
                    ))}

                    <Divider sx={{ marginY: 3 }} />

                    <Typography sx={{ marginBottom: 2 }}>{t("products.priceTitle")}</Typography>
                    <Slider
                        value={priceRange}
                        onChange={(e, value) => { setPriceRange(value); setPage(1); }}
                        min={0}
                        max={5000}
                        step={50}
                        valueLabelDisplay="auto"
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="caption">${priceRange[0]}</Typography>
                        <Typography variant="caption">${priceRange[1]}</Typography>
                    </Box>

                    <Button size="small" onClick={handleClearFilters} sx={{ marginTop: 3 }}>
                        {t("products.clearFilters")}
                    </Button>
                </Box>

                {/* Product Grid */}
                <Box sx={{ flex: 1, minWidth: 280 }}>
                    {currentProducts.length === 0 ? (
                        <Typography color="text.secondary">{t("products.noResults")}</Typography>
                    ) : (
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 3 }}>
                            {currentProducts.map((product) => (
                                <Box
                                    key={product.id}
                                    sx={{
                                        backgroundColor: "background.paper",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                        "&:hover": { transform: "translateY(-4px)" },
                                    }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <Box sx={{ position: "relative", height: 220 }}>
                                        <Box
                                            component="img"
                                            src={product.image}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                right: 12,
                                                backgroundColor: "rgba(21,18,27,0.5)",
                                                borderRadius: "50%",
                                                padding: 1,
                                                display: "flex",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(product.id);
                                            }}
                                        >
                                            {favorites[product.id] ? (
                                                <FavoriteIcon sx={{ color: "#ffb68b" }} fontSize="small" />
                                            ) : (
                                                <FavoriteBorderIcon sx={{ color: "#fff" }} fontSize="small" />
                                            )}
                                        </Box>
                                    </Box>

                                    <Box sx={{ padding: 2.5 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <Typography sx={{ fontWeight: 500 }}>{product.name}</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <StarIcon fontSize="small" sx={{ color: "#ffb68b" }} />
                                                <Typography variant="body2" sx={{ color: "#ffb68b" }}>{product.rate}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                                            <Typography sx={{ color: "#ffb68b" }}>{product.price}$</Typography>
                                            <Button
                                                size="small"
                                                startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
                                                sx={{
                                                    backgroundColor: "rgba(255,255,255,0.08)",
                                                    color: "text.primary",
                                                    borderRadius: 2,
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(product.id);
                                                }}
                                            >
                                                {t("products.addToCart")}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {pageCount > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                            <Pagination
                                count={pageCount}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}