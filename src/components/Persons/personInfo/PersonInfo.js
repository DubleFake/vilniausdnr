import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { persons } from "../../../utils/personsArcgisItems"
import PersonTimeline from "./PersonTimeline"
import PersonRelated from "./PersonRelated"
import PersonGeneral from "./PersonGeneral"
import PersonHeader from "./PersonHeader"
import TooltipPlaceholder from "../../../utils/misc/TooltipPlaceholder"
import EmptyPlaceholder from "../../../utils/misc/EmptyPlaceholder"

import Grid from "@mui/material/Grid"

const PersonInfo = (props) => {
	const { globalID } = useParams()

	const [biographyFeatures, setBiographyFeatures] = useState([])
	const [displayTooltip, setDisplayTooltip] = useState(true)
	const [displayEmpty, setDisplayEmpty] = useState(true)

	useEffect(() => {
		setBiographyFeatures([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
				setDisplayEmpty(false)
				setDisplayTooltip(false)
			})
	}, [globalID])

	useEffect(() => {
		return () => {
			setDisplayEmpty(true)
			setBiographyFeatures([])
		}
	}, [])

	return (
		<Grid container spacing={0} variant="mainGrid">
			{displayEmpty ? (
				<>
					<TooltipPlaceholder
						display={displayTooltip}
						text={`"Įamžintos asmenybės" titulinis puslapis dar kuriamas, prašome pasirinkti konkrečią asmenybę iš
							sąrašo kairėje.`}
						setDisplayTooltip={setDisplayTooltip}
					/>
					<EmptyPlaceholder
						display={displayEmpty}
						text={"Pasirinkite konkrečią asmenybę iš sąrašo kairėje"}
					/>
				</>
			) : (
				<>
					<Grid item xs={4}>
						<PersonGeneral biographyFeatures={biographyFeatures} />
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs={12}>
							<PersonHeader biographyFeatures={biographyFeatures} />
						</Grid>
						<Grid item xs={6}>
							<PersonTimeline globalID={globalID} />
						</Grid>
						<Grid item xs={6}>
							<PersonRelated globalID={globalID} />
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	)
}

export default PersonInfo
