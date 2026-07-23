import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Chip from "@mui/material/Chip"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"
import useProfile from "../../hooks/useProfile"

export default function Profile() {
    const { t } = useTranslation();
    const { data, isLoading } = useProfile();
    const { tab } = useParams();
    const navigate = useNavigate();

    if (isLoading) return <CircularProgress />

    const isOrdersTab = tab === "order";

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h2" sx={{ marginBottom: 3 }}>
                {t("profile.title")}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
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

            {!isOrdersTab && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("profile.fullName")}
                        </Typography>
                        <Typography variant="body1">
                            {data?.fullName || t("profile.notProvided")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("profile.email")}
                        </Typography>
                        <Typography variant="body1">
                            {data?.email || t("profile.notProvided")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("profile.phoneNumber")}
                        </Typography>
                        <Typography variant="body1">
                            {data?.phoneNumber || t("profile.notProvided")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            {t("profile.city")}
                        </Typography>
                        <Typography variant="body1">
                            {data?.city || t("profile.notProvided")}
                        </Typography>
                    </Box>
                </Box>
            )}

            {isOrdersTab && (
                <TableContainer>
                    {data?.orders?.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>{t("profile.orderId")}</strong></TableCell>
                                    <TableCell><strong>{t("profile.amountPaid")}</strong></TableCell>
                                    <TableCell><strong>{t("profile.paymentStatus")}</strong></TableCell>
                                    <TableCell><strong>{t("profile.status")}</strong></TableCell>
                                    <TableCell><strong>{t("profile.orderDate")}</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>#{order.id}</TableCell>
                                        <TableCell>${order.amountPaid}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={order.paymentStatus === "unpaid" ? t("profile.unpaid") : (order.paymentStatus || "-")}
                                                color={order.paymentStatus === "unpaid" ? "warning" : "success"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={order.status} color="primary" size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(order.orderDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            {t("profile.noOrders")}
                        </Typography>
                    )}
                </TableContainer>
            )}
        </Box>
    )
}