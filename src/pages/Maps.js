import React from "react"
import { useTranslation } from "react-i18next"

const Maps = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("home.maps")}</h2>
}

export default Maps
