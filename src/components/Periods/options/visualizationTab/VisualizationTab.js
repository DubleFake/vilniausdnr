import React from "react"

import Legends from "./Legends"

import Box from "@mui/material/Box"

const VisualizationTab = (props) => {
	return (
		<Box sx={{ width: 350, height: "calc(100vh - 135px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				visualizationType={props.visualizationType}
        visibleObjectIcons={props.visibleObjectIcons}
        initialObjectsClasses={props.initialObjectsClasses}
			/>
		</Box>
	)
}

export default VisualizationTab
