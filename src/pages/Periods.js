import React from "react"
import { useTranslation } from "react-i18next"

const Periods = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("home.periods")}</h2>
}

export default Periods
