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
import heroImage from "../../assets/heroImage.svg"

const categoryList = [
    { key: "categoryElectronics", colorFrom: "#0566d9", colorTo: "#d2bcff", icon: electronicsIcon, size: "30%", enabled: true },
    { key: "categoryFashion", colorFrom: "#914200", colorTo: "#ffb68b", icon: fashionIcon, size: "40%", enabled: false },
    { key: "categoryHome", colorFrom: "#6c2bd9", colorTo: "#d2bcff", icon: homeIcon, size: "40%", enabled: false },
    { key: "categoryBeauty", colorFrom: "#93000a", colorTo: "#ffb4ab", icon: beautyIcon, size: "40%", enabled: false },
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
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: { xs: "auto", md: "670px" },
                    background:
                        "linear-gradient(135deg,#6E2BFF 0%,#4700B8 45%,#16081F 100%)",
                    px: { xs: 3, sm: 5, md: 8, lg: 10 },
                    py: { xs: 6, md: 8 },
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(circle, rgba(255,255,255,.65) 1.3px, transparent 1.3px)",
                        backgroundSize: "90px 90px",
                        opacity: .35,
                        pointerEvents: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: "1280px",
                        mx: "auto",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 480px",
                            lg: "1fr 592px",
                        },
                        alignItems: "center",
                        gap: { xs: 6, md: 8 },
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 460,
                            order: { xs: 1, md: 1 },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "1.9rem",
                                    md: "2.1rem",
                                },
                                lineHeight: 1.3,
                            }}
                        >
                            {t("home.heroLine1")}
                        </Typography>
                        <Typography
                            sx={{
                                color: "#FFB07C",
                                fontWeight: 600,
                                fontSize: {
                                    xs: "1.6rem",
                                    sm: "1.9rem",
                                    md: "2.1rem",
                                },
                                lineHeight: 1.3,
                                mb: 2,
                            }}
                        >
                            {t("home.heroLine2")}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,.78)",
                                fontSize: "14px",
                                lineHeight: 1.8,
                                mb: 4,
                                maxWidth: 400,
                                mx: { xs: "auto", md: 0 },
                            }}
                        >
                            {t("home.heroDescription")}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: { xs: "center", md: "flex-start" },
                                flexWrap: "wrap",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: 150,
                                    height: 44,
                                    borderRadius: "50px",
                                    background: "#FFB07C",
                                    color: "#432100",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "14px",
                                    "&:hover": {
                                        background: "#ffc199",
                                    },
                                }}
                            >
                                {t("home.shopCollection")}
                            </Button>
                            <Button
                                onClick={() => navigate("/products")}
                                sx={{
                                    width: 150,
                                    height: 44,
                                    borderRadius: "50px",
                                    background: "rgba(255,255,255,.08)",
                                    border: "1px solid rgba(255,255,255,.15)",
                                    color: "#fff",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    fontSize: "14px",
                                    "&:hover": {
                                        background: "rgba(255,255,255,.15)",
                                        borderColor: "#fff",
                                    },
                                }}
                            >
                                {t("home.viewAll")}
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            order: { xs: 2, md: 2 },
                            display: "flex",
                            justifyContent: { xs: "center", md: "flex-end" },
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: 440,
                                    md: 480,
                                    lg: 592,
                                },
                                height: {
                                    xs: 340,
                                    sm: 360,
                                    md: 400,
                                    lg: 448,
                                },
                                borderRadius: "4px",
                                overflow: "hidden",
                                background:
                                    "radial-gradient(circle at center,#6a2430 0%,#1d1117 85%)",
                                boxShadow: "0 30px 70px rgba(0,0,0,.55)",
                            }}
                        >
                            <Box
                                component="img"
                                src={heroImage}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center 30%",
                                    display: "block",
                                    transform: "scale(1.12)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

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
                                cursor: cat.enabled ? "pointer" : "default",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                            onClick={() => {
                                if (cat.enabled) {
                                    navigate("/products");
                                }
                            }}
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