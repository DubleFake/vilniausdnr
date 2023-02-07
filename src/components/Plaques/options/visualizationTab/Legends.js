import React from "react"
import { useTranslation } from "react-i18next"

import { objectRenderer, memoryRenderer } from "../../../../utils/plaquesArcgisItems"

import { ReactComponent as Atmint_atminimo_lenta } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta.svg"
import { ReactComponent as Atmint_atminimo_lenta_gray } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_gray.svg"
import { ReactComponent as Atmint_skulptura } from "../../../../utils/icons/legendIcons/Atmint_skulptura.svg"
import { ReactComponent as Atmint_skulptura_gray } from "../../../../utils/icons/legendIcons/Atmint_skulptura_gray.svg"
import { ReactComponent as Atmint_atminimo_lenta_bareljefas } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas.svg"
import { ReactComponent as Atmint_atminimo_lenta_bareljefas_gray } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas_gray.svg"
import { ReactComponent as Atmint_freska } from "../../../../utils/icons/legendIcons/Atmint_freska.svg"
import { ReactComponent as Atmint_freska_gray } from "../../../../utils/icons/legendIcons/Atmint_freska_gray.svg"
import { ReactComponent as Atmint_pavadinimo_lentele } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele.svg"
import { ReactComponent as Atmint_pavadinimo_lentele_gray } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele_gray.svg"
import { ReactComponent as Atmint_uzrasas } from "../../../../utils/icons/legendIcons/Atmint_uzrasas.svg"
import { ReactComponent as Atmint_uzrasas_gray } from "../../../../utils/icons/legendIcons/Atmint_uzrasas_gray.svg"
import { ReactComponent as Atmint_vietos_pazymejimas } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas.svg"
import { ReactComponent as Atmint_vietos_pazymejimas_gray } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas_gray.svg"
import { ReactComponent as Atmint_paminklas } from "../../../../utils/icons/legendIcons/Atmint_paminklas.svg"
import { ReactComponent as Atmint_paminklas_gray } from "../../../../utils/icons/legendIcons/Atmint_paminklas_gray.svg"

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
const deletedObjectIconList = [
	Atmint_atminimo_lenta_gray,
	Atmint_skulptura_gray,
	Atmint_atminimo_lenta_bareljefas_gray,
	Atmint_freska_gray,
	Atmint_pavadinimo_lentele_gray,
	Atmint_uzrasas_gray,
	Atmint_vietos_pazymejimas_gray,
	Atmint_paminklas_gray,
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
		<Box>
			<Typography sx={{ mt: 1, mb: 0 }} variant="subtitle1">
				{t("plaques.options.legend") + ":"}
			</Typography>
			<List sx={{ mx: 2 }}>
				{props.visualizationType === "0"
					? props.visibleObjectIcons.length > 0 &&
					  props.visibleObjectIcons.map((obj, index) => (
							<Box key={index}>
								{index !== 0 && <Divider light variant="middle" />}
								<ListItem sx={{ my: 1 }} disablePadding>
									<SvgIcon sx={{ fontSize: 35 }} component={objectIconList[obj.code - 1]} inheritViewBox />
									<Typography sx={{ ml: 1 }} variant="body2">
										{obj.name}
									</Typography>
								</ListItem>

								{props.visibleDeletedIcons.some((icon) => icon === obj.code) && (
									<>
										<Divider light variant="middle" />
										<ListItem sx={{ my: 1 }} disablePadding>
											<SvgIcon
												sx={{ fontSize: 35 }}
												component={deletedObjectIconList[obj.code - 1]}
												inheritViewBox
											/>
											<Typography sx={{ ml: 1 }} variant="body2">
												{obj.name} (pašalintas objektas) 
											</Typography>
										</ListItem>
									</>
								)}
							</Box>
					  ))
					: props.visibleMemoryIcons.length > 0 &&
					  props.visibleMemoryIcons.map((obj, index) => (
							<Box key={index}>
								<ListItem sx={{ my: 1 }} disablePadding>
									<SvgIcon sx={{ fontSize: 35 }} component={memoryIconList[obj.code - 1]} inheritViewBox />
									<Typography sx={{ ml: 1 }} variant="body2">
										{obj.name}
									</Typography>
								</ListItem>
								{index + 1 !== props.visibleMemoryIcons.length && <Divider light variant="middle" />}
							</Box>
					  ))}
			</List>
		</Box>
	)
}

export default Legends
