import React from "react"
import { useTranslation } from "react-i18next"

import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

const LanguageSelect = (props) => {
	const { t, i18n } = useTranslation()

	return (
		<IconButton
			size="large"
			sx={{ mr: 1, color: "#D42323", minWidth: 68 }}
			onClick={() => props.setLanguageOpen(!props.languageOpen)}
		>
			<Typography variant="h4" sx={{ ml: 0.3, mt: 0.3 }}>
				{i18n.language.toUpperCase()}
			</Typography>
		</IconButton>
	)
}

export default LanguageSelect
