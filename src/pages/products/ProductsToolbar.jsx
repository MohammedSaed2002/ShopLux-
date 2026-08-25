import { useTranslation } from "react-i18next"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"

import SearchIcon from "@mui/icons-material/Search"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewListIcon from "@mui/icons-material/ViewList"

export default function ProductsToolbar({
    search,
    onSearchChange,
    selectedSort,
    onSortChange,
    sortOptions,
    view,
    onViewChange,
    isRTL,
}) {
    const { t } = useTranslation()

    const viewButtons = [
        { value: "grid", icon: <GridViewIcon fontSize="small" />, label: t("products.viewGrid") },
        { value: "list", icon: <ViewListIcon fontSize="small" />, label: t("products.viewList") },
    ]

    const orderedButtons = isRTL ? [...viewButtons].reverse() : viewButtons

    return (
        <Box
            sx={{
                mt: 4,
                mb: 4,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                backgroundColor: "background.paper",
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                alignItems: "center",
            }}
        >
            <TextField
                size="small"
                placeholder={t("products.searchPlaceholder")}
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                sx={{ flex: 1, minWidth: { xs: "100%", sm: 280 } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <FormControl size="small" sx={{ width: { xs: "100%", sm: 220 } }}>
                <InputLabel>{t("products.sortBy")}</InputLabel>

                <Select
                    value={selectedSort}
                    label={t("products.sortBy")}
                    onChange={(event) => onSortChange(event.target.value)}
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {t(option.labelKey)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <ToggleButtonGroup
                dir="ltr"
                size="small"
                value={view}
                exclusive
                onChange={(_, value) => value && onViewChange(value)}
                sx={{
                    display: { xs: "none", sm: "flex" },
                    "& .MuiToggleButton-root.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                    },
                    "& .MuiToggleButton-root.Mui-selected:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                {orderedButtons.map((button) => (
                    <ToggleButton key={button.value} value={button.value} aria-label={button.label}>
                        {button.icon}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    )
}