import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import TooltipPlaceholder from "../utils/misc/TooltipPlaceholder"

const Parts = () => {
	const { t, i18n } = useTranslation()
  const [displayTooltip, setDisplayTooltip] = useState(true)

	return (
		<>
			<TooltipPlaceholder
				display={displayTooltip}
        text={`Atsiprašome, ši skiltis šiuo metu vis dar yra kuriama, nepasiekiamas joks jos funkcionalumas ir duomenys.`}
				setDisplayTooltip={setDisplayTooltip}
			/>
			<h2>{t("home.parts")}</h2>
		</>
	)
}

export default Parts
