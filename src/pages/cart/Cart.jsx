import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useCart from "../../hooks/useCart"
import useUpdateCartQty from "../../hooks/useUpdateCartQty"
import useRemoveFromCart from "../../hooks/useRemoveFromCart"
import useClearCart from "../../hooks/useClearCart"
import useProducts from "../../hooks/useProducts"

export default function Cart() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading } = useCart();
    const { data: productsData } = useProducts();
    const { mutate: updateQty } = useUpdateCartQty();
    const { mutate: removeItem } = useRemoveFromCart();
    const { mutate: clearCart, isPending: isClearing } = useClearCart();

    if (isLoading) return <CircularProgress sx={{ margin: 4 }} />

    const isEmpty = !data?.items || data.items.length === 0;

    const handleIncrease = (item) => {
        updateQty({ productId: item.productId, count: item.count + 1 });
    };

    const handleDecrease = (item) => {
        if (item.count <= 1) return;
        updateQty({ productId: item.productId, count: item.count - 1 });
    };

    if (isEmpty) {
        return (
            <Box sx={{ padding: 4, textAlign: "center", marginTop: 6 }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: "text.secondary", marginBottom: 2 }} />
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                    {t("cart.emptyTitle")}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                    {t("cart.emptySubtitle")}
                </Typography>
                <Button variant="contained" onClick={() => navigate("/products")}>
                    {t("products.title")}
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: { xs: 3, md: 6 } }}>
            <Typography variant="h4" sx={{ marginBottom: 0.5 }}>
                {t("cart.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: 4 }}>
                {t("cart.subtitle")}
            </Typography>

            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {/* items list */}
                <Box sx={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {data.items.map((item) => {
                        const matchedProduct = productsData?.response?.data?.find(p => p.id === item.productId);

                        return (
                            <Box
                                key={item.productId}
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    alignItems: "center",
                                    padding: 3,
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    backgroundColor: "background.paper",
                                }}
                            >
                                {matchedProduct ? (
                                    <Box
                                        component="img"
                                        src={matchedProduct.image}
                                        sx={{ width: 100, height: 100, borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 2,
                                            backgroundColor: "background.default",
                                            flexShrink: 0,
                                        }}
                                    />
                                )}

                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="h6">
                                            {item.productName || t("cart.noName")}
                                        </Typography>
                                        <IconButton onClick={() => removeItem(item.productId)}>
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Typography>{item.price}$</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 8 }}>
                                                <IconButton size="small" onClick={() => handleDecrease(item)}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ minWidth: 20, textAlign: "center" }}>{item.count}</Typography>
                                                <IconButton size="small" onClick={() => handleIncrease(item)}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        <Box sx={{ textAlign: "right" }}>
                                            <Typography variant="caption" color="text.secondary">SUBTOTAL</Typography>
                                            <Typography color="primary" sx={{ fontWeight: "bold" }}>
                                                {item.totalPrice}$
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}

                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                        <Button onClick={() => navigate("/products")}>
                            {t("cart.continueShopping")}
                        </Button>
                        <Button color="error" disabled={isClearing} onClick={() => clearCart()}>
                            {t("cart.clearCart")}
                        </Button>
                    </Box>
                </Box>

                {/* order summary */}
                <Box sx={{ flex: "1 1 300px" }}>
                    <Box
                        sx={{
                            padding: 4,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 3 }}>
                            {t("cart.orderSummary")}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1.5 }}>
                            <Typography color="text.secondary">{t("cart.subtotal")}</Typography>
                            <Typography>{data.cartTotal}$</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <Typography color="text.secondary">{t("cart.shipping")}</Typography>
                            <Typography sx={{ color: "#ffb68b", fontWeight: "bold" }}>{t("cart.free")}</Typography>
                        </Box>

                        <Divider sx={{ marginBottom: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                            <Typography variant="h6">{t("cart.total")}</Typography>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                                {data.cartTotal}$
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                background: "linear-gradient(135deg, #6c2bd9 0%, #0566d9 100%)",
                                padding: 1.8,
                                borderRadius: 3,
                                marginBottom: 3,
                            }}
                            onClick={() => navigate("/checkout")}
                        >
                            {t("cart.proceedToCheckout")}
                        </Button>

                        <Box
                            sx={{
                                padding: 2.5,
                                borderRadius: 2,
                                backgroundColor: "background.default",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                                <LockOutlinedIcon fontSize="small" color="disabled" />
                                <Typography variant="caption" color="text.secondary">
                                    {t("cart.secureCheckout")}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                {t("cart.secureNote")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}