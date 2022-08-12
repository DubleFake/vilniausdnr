import React from "react"
import { useTranslation } from "react-i18next"

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const Count = (props) => {
	const { t, i18n } = useTranslation()

	return (
		<Box sx={{ ml: 1, float: "left" }}>
			<Typography variant="body2" component="span">
				{t("plaques.options.count")}:
				<Typography sx={{ color: "secondary.main" }} variant="body2" component="span">
					{" "}
					{props.objectCount}
				</Typography>
			</Typography>
		</Box>
	)
}

export default Count
