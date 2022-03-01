import React, { useState, useEffect } from "react"
import { view, objects } from "../../../../utils/signsArcgisItems"

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

const viewHandles = []

const Legends = (props) => {
	const [legendsList, setLegendsList] = useState([])
	const iconMap = {
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
			}
		}

		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

		view.whenLayerView(objects).then((objectsView) => {
			viewHandles.push(
				objectsView.watch("filter", (newFilter) => {
					console.log(newFilter.where.split(" "))
				})
			)
		})
	}, [])

	return (
		<Box sx={{ width: 350, bgcolor: "background.paper" }}>
			<Typography sx={{ m: 1, mb: 0 }} variant="subtitle1">
				Žymėjimas:
			</Typography>
			<List>
				{legendsList.map((legend) => (
					<div key={legend.code}>
						<ListItem sx={{ my: 0.3 }} disablePadding>
							<SvgIcon
								sx={{ ml: 2, mr: 2, fontSize: 35 }}
								component={iconMap[`Code${legend.code}`]}
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
