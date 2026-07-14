import React from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useProduct from '../../hooks/useProduct'
import useAddToCart from '../../hooks/useAddToCart'

export default function ProductDetails() {
    const { id } = useParams();
    const { data, isLoading } = useProduct(id);
    const { mutate: addToCart } = useAddToCart();

    if (isLoading) return <CircularProgress />

    return (
        <Box sx={{ padding: 4, display: 'flex', gap: 4 }}>
            <img
                src={data.response.image}
                alt="product"
                width={300}
                height={300}
                style={{ objectFit: 'cover', borderRadius: 8 }}
            />
            <Box>
                <Typography variant="h4">
                    {data.response.name || "No Name"}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
                    Price: {data.response.price}$
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    Rate: {data.response.rate} ⭐
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {data.response.description || "No Description"}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => addToCart({ productId: data.response.id, count: 1 })}
                >
                    Add to Cart
                </Button>
            </Box>
        </Box>
    )
}