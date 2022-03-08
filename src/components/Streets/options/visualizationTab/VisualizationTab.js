import React from "react"

import Legends from "./Legends"

import Box from "@mui/material/Box"

const VisualizationTab = (props) => {
	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				visualizationType={props.visualizationType}
        visibleObjectIcons={props.visibleObjectIcons}
			/>
		</Box>
	)
}

export default VisualizationTab
