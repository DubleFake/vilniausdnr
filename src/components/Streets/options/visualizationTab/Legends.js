import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as ObjectCode1 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta.svg"
import { ReactComponent as ObjectCode2 } from "../../../../utils/icons/legendIcons/Atmint_skulptura.svg"
import { ReactComponent as ObjectCode3 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas.svg"
import { ReactComponent as ObjectCode4 } from "../../../../utils/icons/legendIcons/Atmint_freska.svg"
import { ReactComponent as ObjectCode5 } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele.svg"
import { ReactComponent as ObjectCode6 } from "../../../../utils/icons/legendIcons/Atmint_uzrasas.svg"
import { ReactComponent as ObjectCode7 } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas.svg"
import { ReactComponent as ObjectCode8 } from "../../../../utils/icons/legendIcons/Atmint_paminklas.svg"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

const objectIconMap = {
	Code1: ObjectCode1,
	Code2: ObjectCode2,
	Code3: ObjectCode3,
	Code4: ObjectCode4,
	Code5: ObjectCode5,
	Code6: ObjectCode6,
	Code7: ObjectCode7,
	Code8: ObjectCode8,
}

const Legends = (props) => {
	const { t, i18n } = useTranslation()

	const objectLegendsList = [
		{
			alias: t("plaques.options.objects.plaquePerson"),
			code: 1,
		},
		{
			alias: t("plaques.options.objects.sculpture"),
			code: 2,
		},
		{
			alias: t("plaques.options.objects.plaqueOther"),
			code: 3,
		},
		{
			alias: t("plaques.options.objects.mural"),
			code: 4,
		},
		{
			alias: t("plaques.options.objects.plaqueTitle"),
			code: 5,
		},
		{
			alias: t("plaques.options.objects.sign"),
			code: 6,
		},
		{
			alias: t("plaques.options.objects.marker"),
			code: 7,
		},
		{
			alias: t("plaques.options.objects.monument"),
			code: 8,
		},
	]

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				{t("plaques.options.legend") + ":"}
			</Typography>
			<List>
				{objectLegendsList.map((legend) => (
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
				))}
			</List>
		</Box>
	)
}

export default Legends
