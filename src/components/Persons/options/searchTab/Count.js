import React from "react"
import { useTranslation } from "react-i18next"

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const Count = (props) => {
	const { t, i18n } = useTranslation()

	return (
		<Box sx={{ mt: -2, mb: 1 }}>
			<Typography sx={{ fontWeight: "bold", color: "secondary.main" }} variant="body2" component="span">
				{props.objectCount}
			</Typography>
		</Box>
	)
}

export default Count
