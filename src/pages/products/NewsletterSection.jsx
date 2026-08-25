import { useState } from "react"
import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function NewsletterSection() {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!email.trim()) return
        setSubmitted(true)
        setEmail("")
    }

    return (
        <Box
            component="section"
            sx={{
                mt: 6,
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {t("products.newsletterTitle")}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 480, mx: "auto" }}>
                {t("products.newsletterSubtitle")}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}
            >
                <TextField
                    size="small"
                    type="email"
                    placeholder={t("products.newsletterPlaceholder")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{ minWidth: 260 }}
                />

                <Button type="submit" variant="contained" sx={{ borderRadius: 1.5, px: 3 }}>
                    {t("products.newsletterButton")}
                </Button>
            </Box>

            {submitted && (
                <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                    {t("products.newsletterSuccess")}
                </Typography>
            )}
        </Box>
    )
}