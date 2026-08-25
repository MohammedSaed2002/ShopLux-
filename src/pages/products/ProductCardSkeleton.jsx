import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

export default function ProductCardSkeleton() {
    return (
        <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2.5, overflow: "hidden" }}>
            <Skeleton variant="rectangular" height={230} />

            <Box sx={{ p: 2.25 }}>
                <Skeleton width="85%" height={24} />
                <Skeleton width="40%" height={20} sx={{ mt: 1 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Skeleton width={60} height={28} />
                    <Skeleton width={90} height={32} />
                </Box>
            </Box>
        </Box>
    )
}