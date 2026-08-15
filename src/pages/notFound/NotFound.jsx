import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function NotFound() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: { xs: 3, md: 6 },
            }}
        >
            <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: 72, color: "primary.main", marginBottom: 2 }} />
            <Typography sx={{ fontSize: { xs: "3rem", md: "4rem" }, fontWeight: 800, color: "primary.main", lineHeight: 1 }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
                {t("notFound.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 420, marginBottom: 4 }}>
                {t("notFound.subtitle")}
            </Typography>
            <Button
                onClick={() => navigate("/")}
                variant="contained"
                sx={{
                    background: "linear-gradient(135deg, #6c2bd9 0%, #d2bcff 100%)",
                    padding: "10px 32px",
                    borderRadius: 3,
                }}
            >
                {t("notFound.backHome")}
            </Button>
        </Box>
    )
}