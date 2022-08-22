import React from "react"
import { useParams } from "react-router-dom"

import PersonTimeline from "./PersonTimeline"
import Biography from "./Biography"

import Grid from "@mui/material/Grid"

const PersonInfo = (props) => {
	const { globalID } = useParams()

	return (
		<Grid
			container
			spacing={0}
			sx={{
				// maxHeight: window.innerHeight - 90,
				overflowY: "auto",
				width: "calc(100vw - 350px)",
			}}
		>
			<Grid item xs={6}>
				<Biography globalID={globalID} />
			</Grid>
			<Grid item xs={6}>
				<PersonTimeline globalID={globalID} />
			</Grid>
		</Grid>
	)
}

export default PersonInfo
