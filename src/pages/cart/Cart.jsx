import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import useCart from "../../hooks/useCart"

export default function Cart() {
    const { data, isLoading } = useCart();

    if (isLoading) return <CircularProgress />

    console.log(data);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Cart
            </Typography>
            {data?.items?.map((item) => (
                <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                    <img src={item.product?.image} alt={item.product?.name} width={80} height={80} style={{ objectFit: "cover", borderRadius: 8 }} />
                    <Box>
                        <Typography variant="h6">{item.product?.name || "No Name"}</Typography>
                        <Typography variant="body1">Price: ${item.product?.price}</Typography>
                        <Typography variant="body2">Quantity: {item.count}</Typography>
                    </Box>
                </Box>
            ))}</Box>
    )
}