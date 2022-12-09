import React from "react"
import { useTranslation } from "react-i18next"

import { objectRenderer, memoryRenderer } from "../../../../utils/plaquesArcgisItems"

import { ReactComponent as Atmint_atminimo_lenta } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta.svg"
import { ReactComponent as Atmint_skulptura } from "../../../../utils/icons/legendIcons/Atmint_skulptura.svg"
import { ReactComponent as Atmint_atminimo_lenta_bareljefas } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas.svg"
import { ReactComponent as Atmint_freska } from "../../../../utils/icons/legendIcons/Atmint_freska.svg"
import { ReactComponent as Atmint_pavadinimo_lentele } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele.svg"
import { ReactComponent as Atmint_uzrasas } from "../../../../utils/icons/legendIcons/Atmint_uzrasas.svg"
import { ReactComponent as Atmint_vietos_pazymejimas } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas.svg"
import { ReactComponent as Atmint_paminklas } from "../../../../utils/icons/legendIcons/Atmint_paminklas.svg"

import { ReactComponent as Atmint_asmuo } from "../../../../utils/icons/legendIcons/Atmint_asmuo.svg"
import { ReactComponent as Atmint_asmenu_grupe } from "../../../../utils/icons/legendIcons/Atmint_asmenu_grupe.svg"
import { ReactComponent as Atmint_abstraktus } from "../../../../utils/icons/legendIcons/Atmint_abstraktus.svg"
import { ReactComponent as Atmint_organizacija } from "../../../../utils/icons/legendIcons/Atmint_organizacija.svg"
import { ReactComponent as Atmint_istoriniai_ivykiai } from "../../../../utils/icons/legendIcons/Atmint_istoriniai_ivykiai.svg"
import { ReactComponent as Atmint_palaidojimo_vieta } from "../../../../utils/icons/legendIcons/Atmint_palaidojimo_vieta.svg"
import { ReactComponent as Atmint_meninis_simbolis } from "../../../../utils/icons/legendIcons/Atmint_meninis_simbolis.svg"
import { ReactComponent as Atmint_istorinis_statinys } from "../../../../utils/icons/legendIcons/Atmint_istorinis_statinys.svg"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

const objectIconList = [
	Atmint_atminimo_lenta,
	Atmint_skulptura,
	Atmint_atminimo_lenta_bareljefas,
	Atmint_freska,
	Atmint_pavadinimo_lentele,
	Atmint_uzrasas,
	Atmint_vietos_pazymejimas,
	Atmint_paminklas,
]
const memoryIconList = [
	Atmint_asmuo,
	Atmint_asmenu_grupe,
	Atmint_abstraktus,
	Atmint_organizacija,
	Atmint_istoriniai_ivykiai,
	Atmint_palaidojimo_vieta,
	Atmint_meninis_simbolis,
	Atmint_istorinis_statinys,
]

const Legends = (props) => {
	const { t, i18n } = useTranslation()

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				{t("plaques.options.legend") + ":"}
			</Typography>
			<List>
				{props.visualizationType === "0"
					? objectRenderer.uniqueValueInfos.map((value) => (
							<div key={value.value}>
								{props.visibleObjectIcons.length ? (
									props.visibleObjectIcons.includes(+value.value) && (
										<>
											<ListItem sx={{ my: 0.3 }} disablePadding>
												<SvgIcon
													sx={{ ml: 2, mr: 2, fontSize: 35 }}
													component={objectIconList[+value.value - 1]}
													inheritViewBox
												/>
												<Typography sx={{ mr: 1 }} variant="body2">
													{t(`plaques.options.objects.${value.value}`)}
												</Typography>
											</ListItem>
											{+value.value !== props.visibleObjectIcons[props.visibleObjectIcons.length - 1] && (
												<Divider light variant="middle" />
											)}
										</>
									)
								) : (
									<>
										<ListItem sx={{ my: 0.3 }} disablePadding>
											<SvgIcon
												sx={{ ml: 2, mr: 2, fontSize: 35 }}
												component={objectIconList[+value.value - 1]}
												inheritViewBox
											/>
											<Typography sx={{ mr: 1 }} variant="body2">
												{t(`plaques.options.objects.${value.value}`)}
											</Typography>
										</ListItem>
										{+value.value !== objectRenderer.uniqueValueInfos.length && (
											<Divider light variant="middle" />
										)}
									</>
								)}
							</div>
					  ))
					: memoryRenderer.uniqueValueInfos.map((value) => (
							<div key={value.value}>
								{props.visibleMemoryIcons.length ? (
									props.visibleMemoryIcons.includes(+value.value) && (
										<>
											<ListItem sx={{ my: 0.3 }} disablePadding>
												<SvgIcon
													sx={{ ml: 2, mr: 2, fontSize: 35 }}
													component={memoryIconList[+value.value - 1]}
													inheritViewBox
												/>
												<Typography sx={{ mr: 1 }} variant="body2">
													{t(`plaques.options.memories.${value.value}`)}
												</Typography>
											</ListItem>
											{+value.value !== props.visibleMemoryIcons[props.visibleMemoryIcons.length - 1] && (
												<Divider light variant="middle" />
											)}
										</>
									)
								) : (
									<>
										<ListItem sx={{ my: 0.3 }} disablePadding>
											<SvgIcon
												sx={{ ml: 2, mr: 2, fontSize: 35 }}
												component={memoryIconList[+value.value - 1]}
												inheritViewBox
											/>
											<Typography sx={{ mr: 1 }} variant="body2">
												{t(`plaques.options.memories.${value.value}`)}
											</Typography>
										</ListItem>
										{+value.value !== memoryRenderer.uniqueValueInfos.length && (
											<Divider light variant="middle" />
										)}
									</>
								)}
							</div>
					  ))}
			</List>
		</Box>
	)
}

export default Legends
