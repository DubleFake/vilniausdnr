import React from "react"
import { useParams } from "react-router-dom"

import PersonTimeline from "./PersonTimeline"

import Grid from "@mui/material/Grid"

const PersonInfo = (props) => {
	const { globalID } = useParams()

	return (
		<>
			<PersonTimeline globalID={globalID} />
			<PersonTimeline globalID={globalID} />
		</>
	)
}

export default PersonInfo
