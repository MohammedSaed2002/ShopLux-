import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const ITEMS_PER_PAGE = 6
const DEFAULT_PRICE_RANGE = [0, 5000]

export default function useProductsFilters(products) {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get("q") || ""
    const selectedSort = searchParams.get("sort") || ""
    const minRating = Number(searchParams.get("rating")) || 0
    const priceRange = [
        Number(searchParams.get("priceMin")) || DEFAULT_PRICE_RANGE[0],
        Number(searchParams.get("priceMax")) || DEFAULT_PRICE_RANGE[1],
    ]
    const page = Number(searchParams.get("page")) || 1
    const view = searchParams.get("view") || "grid"

    const updateParams = (updates) => {
        const next = new URLSearchParams(searchParams)

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                next.delete(key)
            } else {
                next.set(key, value)
            }
        })

        setSearchParams(next, { replace: true })
    }

    const setSearch = (value) => updateParams({ q: value || null, page: null })
    const setSelectedSort = (value) => updateParams({ sort: value || null, page: null })
    const setMinRating = (value) => updateParams({ rating: value > 0 ? value : null, page: null })
    const setPriceRange = (value) =>
        updateParams({
            priceMin: value[0] !== DEFAULT_PRICE_RANGE[0] ? value[0] : null,
            priceMax: value[1] !== DEFAULT_PRICE_RANGE[1] ? value[1] : null,
            page: null,
        })
    const setPage = (value) => updateParams({ page: value > 1 ? value : null })
    const setView = (value) => updateParams({ view: value !== "grid" ? value : null })

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase()

        return products.filter((product) => {
            const name = product.name || ""

            return (
                name.toLowerCase().includes(query) &&
                product.rate >= minRating &&
                product.price >= priceRange[0] &&
                product.price <= priceRange[1]
            )
        })
    }, [products, search, minRating, priceRange[0], priceRange[1]])

    const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

    const currentProducts = filteredProducts.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    const activeFilterCount =
        (minRating > 0 ? 1 : 0) +
        (priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1] ? 1 : 0) +
        (search.trim() !== "" ? 1 : 0)

    const clearFilters = () => {
        updateParams({ q: null, rating: null, priceMin: null, priceMax: null, page: null })
    }

    return {
        search, setSearch,
        selectedSort, setSelectedSort,
        minRating, setMinRating,
        priceRange, setPriceRange,
        page, setPage,
        view, setView,
        filteredProducts,
        currentProducts,
        pageCount,
        activeFilterCount,
        clearFilters,
    }
}