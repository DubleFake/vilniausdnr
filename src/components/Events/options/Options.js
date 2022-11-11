import React, { useState } from "react"

import SearchTab from "./searchTab/SearchTab"

import Box from "@mui/material/Box"

const Options = (props) => {
	const [selectedObjectFilter, setSelectedObjectFilter] = useState("")
	const [selectedMemoryFilter, setSelectedMemoryFilter] = useState("")
	const [selectedPeriodFilter, setSelectedPeriodFilter] = useState("")

	return (
		<Box sx={{ bgcolor: "background.paper", width: 500 }}>
			<SearchTab
				initialObjectsList={props.initialObjectsList}
				setSelectedObject={props.setSelectedObject}
				selectedObject={props.selectedObject}
				selectedObjectFilter={selectedObjectFilter}
				setSelectedObjectFilter={setSelectedObjectFilter}
				selectedMemoryFilter={selectedMemoryFilter}
				setSelectedMemoryFilter={setSelectedMemoryFilter}
				selectedPeriodFilter={selectedPeriodFilter}
				setSelectedPeriodFilter={setSelectedPeriodFilter}
			/>
		</Box>
	)
}

export default Options
