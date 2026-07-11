import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import useProducts from "../../hooks/useProducts"
import useCartStore from "../../store/cartStore"

export default function Products() {

    const { data, isLoading, isError } = useProducts();
    const addToCart = useCartStore((state) => state.addToCart);
    const navigate = useNavigate();

    if (isLoading) return <CircularProgress />;

    return (
        <Box className="products" component="section">
            <Typography component="h1" variant="h2">Products</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ textAlign: 'center' }}>
                {data.response.data.map((product) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                sx={{ width: 200 }}
                            />
                            <CardContent>
                                <Typography component="h3" variant="h3">{product.name}</Typography>
                                <Typography component="span" variant="body1">{product.price}$</Typography>
                            </CardContent>
                        </Card>
                        <Button
                            variant="contained"
                            onClick={() => addToCart({ id: product.id, image: product.image, name: product.name, price: product.price })}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}