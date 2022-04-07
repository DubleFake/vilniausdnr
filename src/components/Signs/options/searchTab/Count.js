import React from "react"
import { useTranslation } from "react-i18next"

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const Count = (props) => {
	const { t, i18n } = useTranslation()

	return (
		<Box sx={{ ml: 1 }}>
			<Typography sx={{ float: "left" }} variant="body2">
				{t("plaques.options.count")}: {props.objectCount}
			</Typography>
		</Box>
	)
}

export default Count
