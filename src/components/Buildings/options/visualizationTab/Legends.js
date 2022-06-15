import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { objectRenderer } from "../../../../utils/buildingsArcgisItems"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import ColorLensIcon from "@mui/icons-material/ColorLens"

const Legends = (props) => {
	const { t, i18n } = useTranslation()
	// const uniqueValues = objectRenderer.uniqueValueInfos

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				{t("plaques.options.legend") + ":"}
			</Typography>
			{/* <List>
				{uniqueValues.map((legend, i) => (
					<div key={i}>
						<ListItem sx={{ my: 0.3 }} disablePadding>
							<ColorLensIcon sx={{ ml: 2, mr: 2, fontSize: 35, color: legend.symbol.color }} />
							<Typography sx={{ mr: 1 }} variant="body2">
								{props.initialObjectsClasses[0][legend.value - 1].alias}
							</Typography>
						</ListItem>
						{i !== uniqueValues.length - 1 && <Divider light variant="middle" />}
					</div>
				))}
			</List> */}
		</Box>
	)
}

export default Legends
