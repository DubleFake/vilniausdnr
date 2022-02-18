import React from "react"
import { useTranslation } from "react-i18next"

const Persons = () => {
	const { t, i18n } = useTranslation()

	return <h2>{t("persons")}</h2>
}

export default Persons
