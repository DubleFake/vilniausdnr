import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
	persons,
	biography,
	related_persons,
	related_org,
	related_person_sources,
	related_events,
} from "../../../utils/personsArcgisItems"
import PersonTimeline from "./PersonTimeline"
import PersonRelated from "./PersonRelated"
import PersonGeneral from "./PersonGeneral"
import PersonHeader from "./PersonHeader"

import Grid from "@mui/material/Grid"

const PersonInfo = () => {
	const { globalID } = useParams()

	const [biographyFeatures, setBiographyFeatures] = useState([])

	useEffect(() => {
		setBiographyFeatures([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setBiographyFeatures(response.features)
			})
	}, [globalID])

	return (
		<Grid
			container
			spacing={0}
			sx={{
				maxHeight: window.innerHeight - 90,
				overflowY: "auto",
				overflowX: "hidden",
				width: "calc(100vw - 350px)",
			}}
		>
			<Grid item xs={4}>
				<PersonGeneral biographyFeatures={biographyFeatures} />
			</Grid>

			<Grid item xs={12} sm container>
				<Grid item xs={12}>
					<PersonHeader biographyFeatures={biographyFeatures}/>
				</Grid>
				<Grid item xs={6}>
					<PersonTimeline globalID={globalID} />
				</Grid>
				<Grid item xs={6}>
					<PersonRelated globalID={globalID} />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PersonInfo
