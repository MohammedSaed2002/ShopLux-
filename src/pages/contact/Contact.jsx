import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined"
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined"
import { useTranslation } from "react-i18next"

export default function Contact() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const infoItems = [
        { icon: <EmailOutlinedIcon />, text: "support@shoplux.com" },
        { icon: <PhoneOutlinedIcon />, text: "+970 59 000 0000" },
        { icon: <RoomOutlinedIcon />, text: t("contact.address") },
    ];

    return (
        <Box sx={{ padding: { xs: 3, md: 6 }, maxWidth: 1100, margin: "0 auto" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: 1.5 }}>
                {t("contact.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 640, marginBottom: 5 }}>
                {t("contact.subtitle")}
            </Typography>

            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {/* contact info */}
                <Box sx={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {infoItems.map((item) => (
                        <Box key={item.text} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    backgroundColor: "action.hover",
                                    color: "primary.main",
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Typography>{item.text}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* contact form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        flex: "2 1 420px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                        padding: 4,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    {submitted && (
                        <Alert severity="success">{t("contact.success")}</Alert>
                    )}
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5 }}>
                        <TextField label={t("contact.name")} required />
                        <TextField label={t("contact.email")} type="email" required />
                    </Box>
                    <TextField label={t("contact.subject")} required />
                    <TextField label={t("contact.message")} multiline rows={5} required />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            alignSelf: "flex-start",
                            background: "linear-gradient(135deg, #6c2bd9 0%, #d2bcff 100%)",
                            padding: "10px 28px",
                            borderRadius: 3,
                        }}
                    >
                        {t("contact.send")}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}