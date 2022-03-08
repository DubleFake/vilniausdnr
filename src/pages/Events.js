import React from "react"
import { useTranslation } from "react-i18next"

const Events = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("home.events")}</h2>
}

export default Events
