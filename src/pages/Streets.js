import React from "react"
import { useTranslation } from "react-i18next"

const Streets = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("nav.streets")}</h2>
}

export default Streets
