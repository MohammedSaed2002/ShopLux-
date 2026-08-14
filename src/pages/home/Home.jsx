import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Pagination from "@mui/material/Pagination"
import Avatar from "@mui/material/Avatar"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"
import StarIcon from "@mui/icons-material/Star"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
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
    const bestSellers = allProducts.slice(0, 4);
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

            {/* trust strip */}
            <Box
                sx={{
                    backgroundColor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    padding: { xs: 3, md: "20px 40px" },
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: { xs: 3, md: 6 },
                }}
            >
                {[
                    { icon: <LocalShippingOutlinedIcon />, title: t("home.trustShipping"), text: t("home.trustShippingDesc") },
                    { icon: <VerifiedUserOutlinedIcon />, title: t("home.trustPayment"), text: t("home.trustPaymentDesc") },
                    { icon: <CachedOutlinedIcon />, title: t("home.trustReturns"), text: t("home.trustReturnsDesc") },
                    { icon: <SupportAgentOutlinedIcon />, title: t("home.trustSupport"), text: t("home.trustSupportDesc") },
                ].map((item) => (
                    <Box key={item.title} sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 220 }}>
                        <Box sx={{ color: "primary.main", display: "flex" }}>{item.icon}</Box>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.text}</Typography>
                        </Box>
                    </Box>
                ))}
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

            {/* best sellers */}
            {!isLoading && bestSellers.length > 0 && (
                <Box sx={{ padding: { xs: 3, sm: 4, md: 10 }, backgroundColor: "background.paper" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2, marginBottom: 4 }}>
                        <Box>
                            <Typography variant="h6">{t("home.bestSellersTitle")}</Typography>
                            <Typography color="text.secondary">{t("home.bestSellersSubtitle")}</Typography>
                        </Box>
                        <Button onClick={() => navigate("/products")}>{t("home.viewAll")}</Button>
                    </Box>

                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
                        {bestSellers.map((product, index) => (
                            <Box
                                key={product.id}
                                sx={{
                                    position: "relative",
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
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 1,
                                        backgroundColor: "#FFB07C",
                                        color: "#432100",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        padding: "2px 10px",
                                        borderRadius: "50px",
                                    }}
                                >
                                    #{index + 1} {t("home.bestSellersBadge")}
                                </Box>
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
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                </Box>
                                <Typography>{product.name}</Typography>
                                <Typography color="primary">{product.price}$</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {/* promo banner */}
            <Box
                sx={{
                    margin: { xs: 3, sm: 4, md: 10 },
                    padding: { xs: 4, md: 6 },
                    borderRadius: 4,
                    background: "linear-gradient(120deg, #4700B8 0%, #6E2BFF 55%, #a06bff 100%)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 3,
                }}
            >
                <Box sx={{ maxWidth: 480 }}>
                    <Typography sx={{ color: "#FFB07C", fontWeight: 700, fontSize: "13px", letterSpacing: 1, marginBottom: 1 }}>
                        {t("home.promoTag")}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, marginBottom: 1 }}>
                        {t("home.promoTitle")}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,.78)" }}>
                        {t("home.promoDescription")}
                    </Typography>
                </Box>
                <Button
                    onClick={() => navigate("/products")}
                    sx={{
                        height: 48,
                        padding: "0 32px",
                        borderRadius: "50px",
                        background: "#FFB07C",
                        color: "#432100",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "15px",
                        whiteSpace: "nowrap",
                        "&:hover": { background: "#ffc199" },
                    }}
                >
                    {t("home.promoButton")}
                </Button>
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

            {/* testimonials */}
            <Box sx={{ padding: { xs: 3, sm: 4, md: 10 } }}>
                <Box sx={{ textAlign: "center", marginBottom: 5 }}>
                    <Typography variant="h6">{t("home.testimonialsTitle")}</Typography>
                    <Typography color="text.secondary">{t("home.testimonialsSubtitle")}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                    {[1, 2, 3].map((n) => (
                        <Box
                            key={n}
                            sx={{
                                flex: "1 1 300px",
                                maxWidth: 360,
                                padding: 3,
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                backgroundColor: "background.paper",
                            }}
                        >
                            <FormatQuoteIcon sx={{ color: "primary.main", opacity: 0.5, fontSize: 32, marginBottom: 1 }} />
                            <Box sx={{ display: "flex", gap: 0.3, marginBottom: 1.5 }}>
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} sx={{ fontSize: 18, color: "#FFB07C" }} />
                                ))}
                            </Box>
                            <Typography color="text.secondary" sx={{ marginBottom: 2.5, minHeight: 72 }}>
                                {t(`home.testimonial${n}Text`)}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar sx={{ bgcolor: "primary.main", width: 38, height: 38, fontSize: 15 }}>
                                    {t(`home.testimonial${n}Name`).charAt(0)}
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                        {t(`home.testimonial${n}Name`)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {t(`home.testimonial${n}Role`)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* stats */}
            <Box
                sx={{
                    background: "linear-gradient(120deg, #16081F 0%, #4700B8 100%)",
                    padding: { xs: 4, md: "48px 40px" },
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: { xs: 4, md: 8 },
                    textAlign: "center",
                }}
            >
                {[
                    { value: t("home.statsCustomersValue"), label: t("home.statsCustomersLabel") },
                    { value: t("home.statsProductsValue"), label: t("home.statsProductsLabel") },
                    { value: t("home.statsCountriesValue"), label: t("home.statsCountriesLabel") },
                    { value: t("home.statsRatingValue"), label: t("home.statsRatingLabel") },
                ].map((stat) => (
                    <Box key={stat.label} sx={{ minWidth: 130 }}>
                        <Typography sx={{ color: "#FFB07C", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                            {stat.value}
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,.75)", fontSize: "14px" }}>
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}