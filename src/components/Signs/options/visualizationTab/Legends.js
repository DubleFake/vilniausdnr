import React, { useState, useEffect } from "react"

import { ReactComponent as Code1 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta.svg"
import { ReactComponent as Code2 } from "../../../../utils/icons/legendIcons/Atmint_skulptura.svg"
import { ReactComponent as Code3 } from "../../../../utils/icons/legendIcons/Atmint_atminimo_lenta_bareljefas.svg"
import { ReactComponent as Code4 } from "../../../../utils/icons/legendIcons/Atmint_freska.svg"
import { ReactComponent as Code5 } from "../../../../utils/icons/legendIcons/Atmint_pavadinimo_lentele.svg"
import { ReactComponent as Code6 } from "../../../../utils/icons/legendIcons/Atmint_uzrasas.svg"
import { ReactComponent as Code7 } from "../../../../utils/icons/legendIcons/Atmint_vietos_pazymejimas.svg"
import { ReactComponent as Code8 } from "../../../../utils/icons/legendIcons/Atmint_paminklas.svg"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"

const Legends = (props) => {
	const [legendsList, setLegendsList] = useState([])
	const iconList = {
		Code1: Code1,
		Code2: Code2,
		Code3: Code3,
		Code4: Code4,
		Code5: Code5,
		Code6: Code6,
		Code7: Code7,
		Code8: Code8,
	}

	useEffect(() => {
		console.log(props.initialObjectsList[0])
		const tempObjectAlias = []
		for (let field in props.initialObjectsList[0].layer.fields) {
			if (props.initialObjectsList[0].layer.fields[field].name === "TIPAS") {
				for (let code in props.initialObjectsList[0].layer.fields[field].domain.codedValues) {
					const objCodeAlias = {}
					objCodeAlias.alias = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].name
					objCodeAlias.code = props.initialObjectsList[0].layer.fields[field].domain.codedValues[code].code
					tempObjectAlias.push(objCodeAlias)
				}
				setLegendsList(tempObjectAlias)
				console.log(tempObjectAlias)
			}
		}
	}, [])

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				Legenda:
			</Typography>
			<List>
				{legendsList.map((legend) => (
					<>
						<ListItem sx={{ my: 0.3 }} disablePadding key={legend.code}>
							<SvgIcon
								sx={{ ml: 2, mr: 2, fontSize: 35 }}
								component={iconList[`Code${legend.code}`]}
								inheritViewBox
							/>
							<Typography sx={{ mr: 1 }} variant="body2">
								{legend.alias}
							</Typography>
						</ListItem>
						{legend.code !== 8 && <Divider light variant="middle" />}
					</>
				))}
			</List>
		</Box>
	)
}

export default Legends
