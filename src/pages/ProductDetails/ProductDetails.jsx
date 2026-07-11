import React from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useProduct from '../../hooks/useProduct'

export default function ProductDetails() {
    const { id } = useParams();
    const { data, isError, isLoading } = useProduct(id);

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
            </Box>
        </Box>
    )
}