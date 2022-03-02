import React from "react"

import Legends from "./Legends"
import Visualization from "./VisualizationSelect"

import Box from "@mui/material/Box"

const VisualizationTab = (props) => {
	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			<Visualization
				visualizationType={props.visualizationType}
				setVisualizationType={props.setVisualizationType}
			/>
			<Legends
				initialObjectsList={props.initialObjectsList}
				selectedObjectFilter={props.selectedObjectFilter}
				selectedMemoryFilter={props.selectedMemoryFilter}
				visualizationType={props.visualizationType}
			/>
		</Box>
	)
}

export default VisualizationTab
