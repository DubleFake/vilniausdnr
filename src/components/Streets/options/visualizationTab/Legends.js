import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { objectRenderer } from "../../../../utils/streetsArcgisItems"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import ColorLensIcon from "@mui/icons-material/ColorLens"

const Legends = (props) => {
	const { t, i18n } = useTranslation()
	const uniqueValues = objectRenderer.uniqueValueInfos
	console.log(uniqueValues)

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				{t("plaques.options.legend") + ":"}
			</Typography>
			<List>
				{uniqueValues.map((legend, i) => (
					<div key={i}>
						<ListItem sx={{ my: 0.3 }} disablePadding>
							<ColorLensIcon sx={{ ml: 2, mr: 2, fontSize: 35, color: legend.symbol.color }} />
							<Typography sx={{ mr: 1 }} variant="body2">
								{legend.value}
							</Typography>
						</ListItem>
						{i !== 13 && <Divider light variant="middle" />}
					</div>
				))}
				{/* {objectLegendsList.map((legend) => (
					<div key={legend.code}>
						{props.visibleObjectIcons.length ? (
							props.visibleObjectIcons.includes(legend.code) && (
								<>
									<ListItem sx={{ my: 0.3 }} disablePadding>
										<SvgIcon
											sx={{ ml: 2, mr: 2, fontSize: 35 }}
											component={objectIconMap[`Code${legend.code}`]}
											inheritViewBox
										/>
										<Typography sx={{ mr: 1 }} variant="body2">
											{legend.alias}
										</Typography>
									</ListItem>
									{legend.code !== props.visibleObjectIcons[props.visibleObjectIcons.length - 1] && (
										<Divider light variant="middle" />
									)}
								</>
							)
						) : (
							<>
								<ListItem sx={{ my: 0.3 }} disablePadding>
									<SvgIcon
										sx={{ ml: 2, mr: 2, fontSize: 35 }}
										component={objectIconMap[`Code${legend.code}`]}
										inheritViewBox
									/>
									<Typography sx={{ mr: 1 }} variant="body2">
										{legend.alias}
									</Typography>
								</ListItem>
								{legend.code !== 8 && <Divider light variant="middle" />}
							</>
						)}
					</div>
				))} */}
			</List>
		</Box>
	)
}

export default Legends
