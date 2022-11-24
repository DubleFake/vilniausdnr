import React, { useState } from "react"

import SearchTab from "./searchTab/SearchTab"

import Container from "@mui/material/Container"

const Options = (props) => {
	const [selectedObjectFilter, setSelectedObjectFilter] = useState("")
	const [selectedMemoryFilter, setSelectedMemoryFilter] = useState("")
	const [selectedPeriodFilter, setSelectedPeriodFilter] = useState("")

	return (
		<Container variant="optionsDiv">
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
		</Container>
	)
}

export default Options
