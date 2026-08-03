import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"
import useProfile from "../../hooks/useProfile"

export default function Profile() {
    const { t } = useTranslation();
    const { data, isLoading } = useProfile();
    const { tab } = useParams();
    const navigate = useNavigate();

    if (isLoading) return <CircularProgress sx={{ margin: 4 }} />

    const isOrdersTab = tab === "order";
    const firstLetter = data?.fullName?.[0]?.toUpperCase() || "?";

    return (
        <Box sx={{ padding: { xs: 3, md: 6 }, maxWidth: 900, margin: "0 auto" }}>

            {/* header */}
            <Box sx={{ textAlign: "center", marginBottom: 5 }}>
                <Avatar
                    sx={{
                        width: 130,
                        height: 130,
                        margin: "0 auto 16px",
                        fontSize: 48,
                        background: "linear-gradient(45deg, #d2bcff 0%, #adc6ff 100%)",
                        color: "#100d16",
                        border: "4px solid rgba(210,188,255,0.2)",
                    }}
                >
                    {firstLetter}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {data?.fullName || t("profile.notProvided")}
                </Typography>
            </Box>

            {/* tab buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 5 }}>
                <Button
                    variant={!isOrdersTab ? "contained" : "outlined"}
                    onClick={() => navigate("/profile/info")}
                >
                    {t("profile.infoTab")}
                </Button>
                <Button
                    variant={isOrdersTab ? "contained" : "outlined"}
                    onClick={() => navigate("/profile/order")}
                >
                    {t("profile.ordersTab")}
                </Button>
            </Box>

            {/* info tab */}
            {!isOrdersTab && (
                <Box
                    sx={{
                        padding: 5,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        {t("profile.accountSettings")}
                    </Typography>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">{t("profile.fullName")}</Typography>
                            <Typography>{data?.fullName || t("profile.notProvided")}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">{t("profile.email")}</Typography>
                            <Typography>{data?.email || t("profile.notProvided")}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">{t("profile.phoneNumber")}</Typography>
                            <Typography>{data?.phoneNumber || t("profile.notProvided")}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">{t("profile.city")}</Typography>
                            <Typography>{data?.city || t("profile.notProvided")}</Typography>
                        </Box>
                    </Box>
                </Box>
            )}

            {/* orders tab */}
            {isOrdersTab && (
                <Box>
                    <Typography variant="h6" sx={{ marginBottom: 3 }}>
                        {t("profile.orderHistory")}
                    </Typography>

                    {data?.orders?.length > 0 ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {data.orders.map((order) => (
                                <Box
                                    key={order.id}
                                    sx={{
                                        padding: 3,
                                        borderRadius: 3,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">{t("profile.orderId")}</Typography>
                                            <Typography variant="h6">#{order.id}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {t("profile.orderDate")} {new Date(order.orderDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={order.status}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3, paddingTop: 2, borderTop: "1px solid", borderColor: "divider" }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">{t("profile.amountPaid")}</Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    background: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)",
                                                    backgroundClip: "text",
                                                    WebkitBackgroundClip: "text",
                                                    color: "transparent",
                                                }}
                                            >
                                                ${order.amountPaid}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={order.paymentStatus === "unpaid" ? t("profile.unpaid") : (order.paymentStatus || "-")}
                                            color={order.paymentStatus === "unpaid" ? "warning" : "success"}
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography color="text.secondary">{t("profile.noOrders")}</Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}