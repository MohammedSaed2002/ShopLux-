import Box from "@mui/material/Box"

import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton"
import EmptyState from "./EmptyState"

export default function ProductsGrid({
    products,
    isLoading,
    view,
    favorites,
    onFavorite,
    onAddToCart,
    onOpen,
    isDark,
    onClearFilters,
}) {
    const columns =
        view === "list" ? "1fr" : { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }

    if (isLoading) {
        return (
            <Box sx={{ display: "grid", gridTemplateColumns: columns, gap: 2.5 }}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </Box>
        )
    }

    if (products.length === 0) {
        return <EmptyState onClear={onClearFilters} />
    }

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: columns, gap: 2.5 }}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    view={view}
                    favorite={!!favorites[product.id]}
                    onFavorite={onFavorite}
                    onAddToCart={onAddToCart}
                    onOpen={() => onOpen(product.id)}
                    isDark={isDark}
                />
            ))}
        </Box>
    )
}