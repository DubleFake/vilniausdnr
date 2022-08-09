import React from "react"
import { useParams } from "react-router-dom"

import PersonTimeline from "./PersonTimeline"
import Biography from "./Biography"

import Box from "@mui/material/Box"

const PersonInfo = (props) => {
	const { globalID } = useParams()

	return (
		<>
			<Biography globalID={globalID} />
			<PersonTimeline globalID={globalID} />
		</>
	)
}

export default PersonInfo
