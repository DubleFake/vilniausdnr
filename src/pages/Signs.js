import React from "react"
import { useTranslation } from "react-i18next"

const Signs = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("signs")}</h2>
}

export default Signs
