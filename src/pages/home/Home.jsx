import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Pagination from "@mui/material/Pagination"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useProducts from "../../hooks/useProducts"
import electronicsIcon from "../../assets/icons/Electronics.svg"
import fashionIcon from "../../assets/icons/Fashion.svg"
import homeIcon from "../../assets/icons/Home.svg"
import beautyIcon from "../../assets/icons/Beauty.svg"

const categoryList = [
    { key: "categoryElectronics", colorFrom: "#0566d9", colorTo: "#d2bcff", icon: electronicsIcon, size: "30%" },
    { key: "categoryFashion", colorFrom: "#914200", colorTo: "#ffb68b", icon: fashionIcon, size: "40%" },
    { key: "categoryHome", colorFrom: "#6c2bd9", colorTo: "#d2bcff", icon: homeIcon, size: "40%" },
    { key: "categoryBeauty", colorFrom: "#93000a", colorTo: "#ffb4ab", icon: beautyIcon, size: "40%" },
];

const PRODUCTS_PER_PAGE = 4;

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isLoading } = useProducts({ sortBy: "rate", ascending: false });

    const allProducts = data?.response?.data || [];
    const pageCount = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    const currentProducts = allProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(147deg, #6c2bd9 0%, #3e008e 50%, #100d16 100%)",
                    padding: { xs: 3, sm: 4, md: 10 },
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 6,
                }}
            >
                <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: 280 } }}>
                    <Typography sx={{ color: "#dac7ff", fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, fontWeight: "bold" }}>
                        {t("home.heroLine1")}
                    </Typography>
                    <Typography sx={{ color: "#ffb68b", fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, fontWeight: "bold", marginBottom: 2 }}>
                        {t("home.heroLine2")}
                    </Typography>
                    <Typography sx={{ color: "rgba(218,199,255,0.8)", maxWidth: 450, marginBottom: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                        {t("home.heroDescription")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ffb68b",
                                color: "#522300",
                                borderRadius: 8,
                                "&:hover": { backgroundColor: "#ffc9a8" },
                            }}
                            onClick={() => navigate("/products")}
                        >
                            {t("home.shopCollection")}
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.3)",
                                borderRadius: 8,
                                "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
                            }}
                            onClick={() => navigate("/products")}
                        >
                            {t("home.viewAll")}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Categories Section */}
            <Box sx={{ padding: { xs: 3, sm: 4, md: 10 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2, marginBottom: 4 }}>
                    <Box>
                        <Typography variant="h6">{t("home.categoriesTitle")}</Typography>
                        <Typography color="text.secondary">{t("home.categoriesSubtitle")}</Typography>
                    </Box>
                    <Button onClick={() => navigate("/products")}>{t("home.viewAll")}</Button>
                </Box>

                <Box sx={{ display: "flex", gap: { xs: 3, md: 5 }, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
                    {categoryList.map((cat) => (
                        <Box
                            key={cat.key}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                            onClick={() => navigate("/products")}
                        >
                            <Box
                                sx={{
                                    width: { xs: 110, sm: 140, md: 160 },
                                    height: { xs: 110, sm: 140, md: 160 },
                                    borderRadius: "50%",
                                    padding: "8px",
                                    background: `linear-gradient(45deg, ${cat.colorFrom} 0%, ${cat.colorTo} 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        backgroundColor: "background.default",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={cat.icon}
                                        sx={{ width: cat.size, height: cat.size }}
                                    />
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}>
                                {t(`home.${cat.key}`)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Featured Products Section */}
            <Box sx={{ backgroundColor: "background.paper", padding: { xs: 3, sm: 4, md: 10 } }}>
                <Typography variant="h6" sx={{ marginBottom: 4 }}>
                    {t("home.featuredTitle")}
                </Typography>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
                            {currentProducts.map((product) => (
                                <Box
                                    key={product.id}
                                    sx={{
                                        flex: "0 1 260px",
                                        width: { xs: "100%", sm: "auto" },
                                        maxWidth: { xs: 320, sm: 260 },
                                        backgroundColor: "background.default",
                                        borderRadius: 3,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        padding: 2,
                                        cursor: "pointer",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0px 10px 20px -10px rgba(0,0,0,0.4)",
                                        },
                                    }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: 200,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            marginBottom: 2,
                                            backgroundColor: "background.paper",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.image}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                    <Typography>{product.name}</Typography>
                                    <Typography color="primary">{product.price}$</Typography>
                                </Box>
                            ))}
                        </Box>

                        {pageCount > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}