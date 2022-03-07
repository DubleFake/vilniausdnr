import React from "react"
import { useTranslation } from "react-i18next"

const Buildings = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("nav.buildings")}</h2>
}

export default Buildings
