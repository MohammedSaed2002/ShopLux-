import React, { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useProducts from "../../hooks/useProducts"
import useAddToCart from "../../hooks/useAddToCart"

const SORT_OPTIONS = [
    { value: "", sortBy: "", ascending: true, labelKey: "products.sortDefault" },
    { value: "name-asc", sortBy: "name", ascending: true, labelKey: "products.sortNameAsc" },
    { value: "name-desc", sortBy: "name", ascending: false, labelKey: "products.sortNameDesc" },
    { value: "price-asc", sortBy: "price", ascending: true, labelKey: "products.sortPriceAsc" },
    { value: "price-desc", sortBy: "price", ascending: false, labelKey: "products.sortPriceDesc" },
    { value: "rate-asc", sortBy: "rate", ascending: true, labelKey: "products.sortRateAsc" },
    { value: "rate-desc", sortBy: "rate", ascending: false, labelKey: "products.sortRateDesc" },
];

export default function Products() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate: addToCart } = useAddToCart();

    const [selectedSort, setSelectedSort] = useState("");

    const currentOption = SORT_OPTIONS.find(opt => opt.value === selectedSort) || SORT_OPTIONS[0];

    const { data, isLoading, isError } = useProducts({
        sortBy: currentOption.sortBy,
        ascending: currentOption.ascending
    });

    if (isLoading) return <CircularProgress />;

    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
    };

    return (
        <Box className="products" component="section">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Typography component="h1" variant="h2">{t("products.title")}</Typography>

                <FormControl sx={{ minWidth: 220 }} size="small">
                    <InputLabel>{t("products.sortBy")}</InputLabel>
                    <Select
                        value={selectedSort}
                        label={t("products.sortBy")}
                        onChange={handleSortChange}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {t(option.labelKey)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ textAlign: 'center', marginTop: 2 }}>
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
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart({ productId: product.id, count: 1 });
                            }}
                        >
                            {t("products.addToCart")}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}