import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useCart from "../../hooks/useCart"
import useUpdateCartQty from "../../hooks/useUpdateCartQty"
import useRemoveFromCart from "../../hooks/useRemoveFromCart"
import useClearCart from "../../hooks/useClearCart"

export default function Cart() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading } = useCart();
    const { mutate: updateQty } = useUpdateCartQty();
    const { mutate: removeItem } = useRemoveFromCart();
    const { mutate: clearCart, isPending: isClearing } = useClearCart();

    if (isLoading) return <CircularProgress />

    const isEmpty = !data?.items || data.items.length === 0;

    const handleIncrease = (item) => {
        updateQty({ productId: item.productId, count: item.count + 1 });
    };

    const handleDecrease = (item) => {
        if (item.count <= 1) return;
        updateQty({ productId: item.productId, count: item.count - 1 });
    };

    const handleRemove = (productId) => {
        removeItem(productId);
    };

    const handleClearCart = () => {
        clearCart();
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
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <Typography variant="h2">
                    {t("cart.title")}
                </Typography>
                <Button
                    variant="outlined"
                    color="error"
                    disabled={isClearing}
                    onClick={handleClearCart}
                >
                    {t("cart.clearCart")}
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>{t("cart.productName")}</strong></TableCell>
                            <TableCell><strong>{t("cart.price")}</strong></TableCell>
                            <TableCell><strong>{t("cart.quantity")}</strong></TableCell>
                            <TableCell><strong>{t("cart.total")}</strong></TableCell>
                            <TableCell><strong>{t("cart.actions")}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell>{item.productName || t("cart.noName")}</TableCell>
                                <TableCell>{item.price}$</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <IconButton onClick={() => handleDecrease(item)} size="small">
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton onClick={() => handleIncrease(item)} size="small">
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>{item.totalPrice}$</TableCell>
                                <TableCell>
                                    <Typography
                                        component="span"
                                        sx={{ color: "error.main", cursor: "pointer", fontWeight: "bold" }}
                                        onClick={() => handleRemove(item.productId)}
                                    >
                                        {t("cart.remove")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {data?.cartTotal !== undefined && (
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                    {t("cart.cartTotal")}: ${data.cartTotal}
                </Typography>
            )}

            <Button
                variant="contained"
                sx={{ marginTop: 3 }}
                onClick={() => navigate("/checkout")}
            >
                {t("cart.checkoutButton")}
            </Button>
        </Box>
    )
}