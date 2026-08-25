import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const FAQ_KEYS = [
    { q: "faqShippingQ", a: "faqShippingA" },
    { q: "faqReturnsQ", a: "faqReturnsA" },
    { q: "faqPaymentQ", a: "faqPaymentA" },
]

export default function ShippingFAQ() {
    const { t } = useTranslation()

    return (
        <Box component="section" sx={{ mt: 6, maxWidth: 720 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {t("products.faqTitle")}
            </Typography>

            {FAQ_KEYS.map((item) => (
                <Accordion key={item.q} disableGutters elevation={0} sx={{ border: "1px solid", borderColor: "divider", "&:before": { display: "none" }, mb: 1, borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 600 }}>{t(`products.${item.q}`)}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography color="text.secondary">{t(`products.${item.a}`)}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}