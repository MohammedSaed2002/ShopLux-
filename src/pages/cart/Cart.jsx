import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "../../components/shared/Container"
import useCartStore from "../../store/cartStore"

export default function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCartStore();

    if (cartItems.length === 0) return (
        <Container>
            <Typography variant="h5" sx={{ textAlign: "center", marginTop: 5 }}>
                Cart is Empty 🛒
            </Typography>
        </Container>
    );

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                    Cart
                </Typography>
                {cartItems.map((item) => (
                    <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                        <img src={item.image} alt={item.name} width={80} height={80} style={{ objectFit: "cover", borderRadius: 8 }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.name || "No Name"}</Typography>
                            <Typography variant="body1">Price: ${item.price}</Typography>
                            <Typography variant="body2">Quantity: {item.quantity}</Typography>
                        </Box>
                        <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
                            Remove
                        </Button>
                    </Box>
                ))}
                <Button variant="contained" color="error" onClick={clearCart} sx={{ marginTop: 2 }}>
                    Clear Cart
                </Button>
            </Box>
        </Container>
    )
}