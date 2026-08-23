import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import AboutHero from "../../components/about/AboutHero"
import AboutStats from "../../components/about/AboutStats"
import OurStory from "../../components/about/OurStory"
import WhyChoose from "../../components/about/WhyChoose"
import OurValues from "../../components/about/OurValues"
import Operations from "../../components/about/Operations"
import AboutCTA from "../../components/about/AboutCTA"

export default function About() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()

    const isRTL = i18n.dir() === "rtl"

    return (
        <>
            <AboutHero
                t={t}
                navigate={navigate}
                isRTL={isRTL}
            />

            <AboutStats
                t={t}
                isRTL={isRTL}
            />

            <OurStory
                t={t}
                isRTL={isRTL}
            />

            <WhyChoose
                t={t}
            />

            <OurValues
                t={t}
                isRTL={isRTL}
            />

            <Operations
                t={t}
                isRTL={isRTL}
            />

            <AboutCTA
                t={t}
                navigate={navigate}
                isRTL={isRTL}
            />
        </>
    )
}