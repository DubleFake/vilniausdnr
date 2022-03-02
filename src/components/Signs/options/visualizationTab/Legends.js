import React, { useState, useEffect } from "react"

import { ReactComponent as ObjectCode1 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta.svg"
import { ReactComponent as ObjectCode2 } from "../../../../utils/icons/legendIcons/Atmint_skulptura.svg"
import { ReactComponent as ObjectCode3 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas.svg"
import { ReactComponent as ObjectCode4 } from "../../../../utils/icons/legendIcons/Atmint_freska.svg"
import { ReactComponent as ObjectCode5 } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele.svg"
import { ReactComponent as ObjectCode6 } from "../../../../utils/icons/legendIcons/Atmint_uzrasas.svg"
import { ReactComponent as ObjectCode7 } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas.svg"
import { ReactComponent as ObjectCode8 } from "../../../../utils/icons/legendIcons/Atmint_paminklas.svg"

import { ReactComponent as MemoryCode1 } from "../../../../utils/icons/legendIcons/Atmint_asmuo.svg"
import { ReactComponent as MemoryCode2 } from "../../../../utils/icons/legendIcons/Atmint_asmenu_grupe.svg"
import { ReactComponent as MemoryCode3 } from "../../../../utils/icons/legendIcons/Atmint_abstraktus.svg"
import { ReactComponent as MemoryCode4 } from "../../../../utils/icons/legendIcons/Atmint_organizacija.svg"
import { ReactComponent as MemoryCode5 } from "../../../../utils/icons/legendIcons/Atmint_istoriniai_ivykiai.svg"
import { ReactComponent as MemoryCode6 } from "../../../../utils/icons/legendIcons/Atmint_palaidojimo_vieta.svg"
import { ReactComponent as MemoryCode7 } from "../../../../utils/icons/legendIcons/Atmint_meninis_simbolis.svg"
import { ReactComponent as MemoryCode8 } from "../../../../utils/icons/legendIcons/Atmint_istorinis_statinys.svg"

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

const memoryIconCode = {
	Code1: MemoryCode1,
	Code2: MemoryCode2,
	Code3: MemoryCode3,
	Code4: MemoryCode4,
	Code5: MemoryCode5,
	Code6: MemoryCode6,
	Code7: MemoryCode7,
	Code8: MemoryCode8,
}

const Legends = (props) => {
	const [objectLegendsList, setObjectLegendList] = useState([])
	const [memoryLegendsList, setMemoryLegendList] = useState([])

	useEffect(() => {
		for (let field in props.initialObjectsList[0].layer.fields) {
			if (props.initialObjectsList[0].layer.fields[field].name === "TIPAS") {
				const tempObjectAlias = []
				for (let code in props.initialObjectsList[0].layer.fields[field].domain.codedValues) {
					const objCodeAlias = {}
					objCodeAlias.alias = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].name
					objCodeAlias.code = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].code
					tempObjectAlias.push(objCodeAlias)
				}
				setObjectLegendList(tempObjectAlias)
			} else if (props.initialObjectsList[0].layer.fields[field].name === "ATMINT_TIP") {
				const tempObjectAlias = []
				for (let code in props.initialObjectsList[0].layer.fields[field].domain.codedValues) {
					const objCodeAlias = {}
					objCodeAlias.alias = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].name
					objCodeAlias.code = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].code
					tempObjectAlias.push(objCodeAlias)
				}
				setMemoryLegendList(tempObjectAlias)
			}
		}
	}, [])

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				Sutartiniai ženklai:
			</Typography>
			<List>
				{props.visualizationType === "0"
					? objectLegendsList.map((legend) => (
							<div key={legend.code}>
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
							</div>
					  ))
					: memoryLegendsList.map((legend) => (
							<div key={legend.code}>
								<ListItem sx={{ my: 0.3 }} disablePadding>
									<SvgIcon
										sx={{ ml: 2, mr: 2, fontSize: 35 }}
										component={memoryIconCode[`Code${legend.code}`]}
										inheritViewBox
									/>
									<Typography sx={{ mr: 1 }} variant="body2">
										{legend.alias}
									</Typography>
								</ListItem>
								{legend.code !== 8 && <Divider light variant="middle" />}
							</div>
					  ))}
			</List>
		</Box>
	)
}

export default Legends
