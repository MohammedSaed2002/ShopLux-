import { useState } from "react"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

export default function Newsletter({
    t,
    isDark,
    isRTL,
    onMessage,
}) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            onMessage(
                t("home.newsletterError"),
                "error"
            )

            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setEmail("")

            onMessage(
                t("home.newsletterSuccess"),
                "success"
            )
        }, 900)
    }

    return (
        <Box
            component="section"
            sx={{
                width: "100%",

                px: {
                    xs: 2.5,
                    sm: 4,
                    md: 6,
                    lg: 8,
                },

                py: {
                    xs: 7,
                    sm: 8,
                    md: 9,
                },

                backgroundColor: isDark
                    ? "#100817"
                    : "#FAF8FF",

                direction: isRTL
                    ? "rtl"
                    : "ltr",
            }}
        >
            <Box
                sx={{
                    maxWidth: "780px",
                    mx: "auto",

                    textAlign: "center",
                }}
            >

                <Box
                    sx={{
                        width: 64,
                        height: 64,

                        mx: "auto",
                        mb: 3,

                        borderRadius: "50%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: isDark
                            ? "rgba(255,176,124,0.10)"
                            : "rgba(110,43,255,0.08)",

                        color: isDark
                            ? "#FFB07C"
                            : "#6E2BFF",
                    }}
                >
                    <MarkEmailReadOutlinedIcon
                        sx={{
                            fontSize: 30,
                        }}
                    />
                </Box>

                <Typography
                    component="h2"
                    sx={{
                        color: isDark
                            ? "#FFFFFF"
                            : "#24113F",

                        fontSize: {
                            xs: "1.7rem",
                            sm: "2rem",
                            md: "2.3rem",
                        },

                        fontWeight: 800,

                        lineHeight: 1.25,

                        mb: 1.5,
                    }}
                >
                    {t("home.newsletterTitle")}
                </Typography>

                <Typography
                    sx={{
                        color: isDark
                            ? "rgba(255,255,255,0.60)"
                            : "rgba(36,17,63,0.60)",

                        fontSize: {
                            xs: "13px",
                            sm: "14px",
                        },

                        lineHeight: 1.8,

                        maxWidth: 480,

                        mx: "auto",

                        mb: 4,
                    }}
                >
                    {t("home.newsletterSubtitle")}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",

                        alignItems: "center",

                        maxWidth: 460,

                        mx: "auto",

                        backgroundColor: isDark
                            ? "#1B1024"
                            : "#FAF8FF",

                        border: isDark
                            ? "1px solid rgba(255,255,255,0.10)"
                            : "1px solid rgba(36,17,63,0.10)",

                        borderRadius: "50px",

                        p: "6px",

                        gap: "6px",

                        boxShadow: isDark
                            ? "0 12px 30px rgba(0,0,0,0.25)"
                            : "0 12px 30px rgba(36,17,63,0.08)",

                        transition:
                            "border-color 0.2s ease",

                        "&:focus-within": {
                            borderColor: isDark
                                ? "rgba(255,176,124,0.45)"
                                : "rgba(110,43,255,0.35)",
                        },
                    }}
                >
                    <TextField
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        placeholder={t(
                            "home.newsletterPlaceholder"
                        )}
                        required
                        fullWidth
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        inputProps={{
                            dir: isRTL
                                ? "rtl"
                                : "ltr",

                            style: {
                                textAlign: isRTL
                                    ? "right"
                                    : "left",
                            },
                        }}
                        sx={{
                            px: 2,

                            "& .MuiInputBase-input":
                                {
                                    color: isDark
                                        ? "#FFFFFF"
                                        : "#24113F",

                                    fontSize: "14px",

                                    "&::placeholder":
                                        {
                                            color: isDark
                                                ? "rgba(255,255,255,0.40)"
                                                : "rgba(36,17,63,0.40)",

                                            opacity: 1,
                                        },
                                },
                        }}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        endIcon={
                            <SendRoundedIcon fontSize="small" />
                        }
                        sx={{
                            flexShrink: 0,

                            height: 46,

                            px: {
                                xs: 2.5,
                                sm: 3.2,
                            },

                            borderRadius: "50px",

                            backgroundColor: isDark
                                ? "#FFB07C"
                                : "#6E2BFF",

                            color: isDark
                                ? "#432100"
                                : "#FFFFFF",

                            fontWeight: 700,

                            fontSize: "13px",

                            textTransform: "none",

                            whiteSpace: "nowrap",

                            "&:hover": {
                                backgroundColor:
                                    isDark
                                        ? "#FFC095"
                                        : "#5D20E8",
                            },

                            "&.Mui-disabled":
                                {
                                    backgroundColor:
                                        isDark
                                            ? "rgba(255,176,124,0.35)"
                                            : "rgba(110,43,255,0.35)",

                                    color: isDark
                                        ? "rgba(67,33,0,0.6)"
                                        : "#FFFFFF",
                                },
                        }}
                    >
                        {loading
                            ? t(
                                  "home.newsletterSending"
                              )
                            : t(
                                  "home.newsletterButton"
                              )}
                    </Button>
                </Box>

                <Typography
                    sx={{
                        mt: 2.5,

                        color: isDark
                            ? "rgba(255,255,255,0.40)"
                            : "rgba(36,17,63,0.45)",

                        fontSize: "11.5px",
                    }}
                >
                    {t(
                        "home.newsletterPrivacy"
                    )}
                </Typography>
            </Box>
        </Box>
    )
}