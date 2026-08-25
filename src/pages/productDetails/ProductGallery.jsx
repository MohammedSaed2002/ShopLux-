import Box from "@mui/material/Box"

export default function ProductGallery({ images, mainImage, onSelect }) {
    return (
        <Box sx={{ flex: "1 1 400px", maxWidth: 560 }}>
            <Box
                sx={{
                    aspectRatio: "1 / 1",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box component="img" src={mainImage} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>

            {images.length > 1 && (
                <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
                    {images.map((img, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={img}
                            onClick={() => onSelect(img)}
                            sx={{
                                width: 70,
                                height: 70,
                                objectFit: "cover",
                                borderRadius: 1.5,
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: mainImage === img ? "primary.main" : "transparent",
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}