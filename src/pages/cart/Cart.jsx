import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import useCart from "../../hooks/useCart"
import useUpdateCartQty from "../../hooks/useUpdateCartQty"
import useRemoveFromCart from "../../hooks/useRemoveFromCart"

export default function Cart() {
    const { data, isLoading } = useCart();
    const { mutate: updateQty } = useUpdateCartQty();
    const { mutate: removeItem } = useRemoveFromCart();

    if (isLoading) return <CircularProgress />

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

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h2" sx={{ marginBottom: 3 }}>
                Cart
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Product Name</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Quantity</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.items?.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell>{item.productName || "No Name"}</TableCell>
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
                                        REMOVE
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {data?.cartTotal !== undefined && (
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                    Cart Total: ${data.cartTotal}
                </Typography>
            )}
        </Box>
    )
}