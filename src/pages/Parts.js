import React from "react"
import { useTranslation } from "react-i18next"

const Parts = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("parts")}</h2>
}

export default Parts
