import React from "react"

import Legends from "./Legends"

import Grid from "@mui/material/Grid"

const VisualizationTab = (props) => {
	return (
		<Grid variant="optionsTabs">
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				visualizationType={props.visualizationType}
        visibleObjectIcons={props.visibleObjectIcons}
        initialObjectsClasses={props.initialObjectsClasses}
			/>
		</Grid>
	)
}

export default VisualizationTab
