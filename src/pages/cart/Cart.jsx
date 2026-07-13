import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import useCart from "../../hooks/useCart"

export default function Cart() {
    const { data, isLoading } = useCart();

    if (isLoading) return <CircularProgress />

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Cart
            </Typography>
            {data?.items?.map((item) => (
                <Box key={item.productId} sx={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                    <Box>
                        <Typography variant="h6">{item.productName || "No Name"}</Typography>
                        <Typography variant="body1">Price: ${item.price}</Typography>
                        <Typography variant="body2">Quantity: {item.count}</Typography>
                        <Typography variant="body2">Total: ${item.totalPrice}</Typography>
                    </Box>
                </Box>
            ))}
            {data?.cartTotal !== undefined && (
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                    Cart Total: ${data.cartTotal}
                </Typography>
            )}
        </Box>
    )
}