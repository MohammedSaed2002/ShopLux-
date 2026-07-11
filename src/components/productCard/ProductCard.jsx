import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import useCartStore from "../../store/cartStore"

export default function ProductCard({ id, image, name, price, rate }) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Card sx={{ width: 250 }}>
            <CardMedia
                component="img"
                height="200"
                image={image}
                alt={name || "product"}
            />
            <CardContent>
                <Typography variant="h6">
                    {name || "No Name"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Price: ${price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rate: {rate} ⭐
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 1 }}
                    onClick={() => addToCart({ id, image, name, price, rate })}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    )
}