import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"

export default function ProductsPagination({ pageCount, page, onChange }) {
    if (pageCount <= 1) return null

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination count={pageCount} page={page} onChange={(_, value) => onChange(value)} color="primary" />
        </Box>
    )
}