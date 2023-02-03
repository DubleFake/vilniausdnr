import React from "react"

import Legends from "./Legends"
import VisualizationSelect from "./VisualizationSelect"

import Grid from "@mui/material/Grid"

const VisualizationTab = (props) => {
	return (
		<Grid sx={{ overflowY: "auto !important", px: 1.5 }} variant="optionsTabs">
			<VisualizationSelect
				visualizationType={props.visualizationType}
				setVisualizationType={props.setVisualizationType}
			/>
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				selectedMemoryFilter={props.selectedMemoryFilter}
				visualizationType={props.visualizationType}
				visibleObjectIcons={props.visibleObjectIcons}
				visibleDeletedIcons={props.visibleDeletedIcons}
				visibleMemoryIcons={props.visibleMemoryIcons}
			/>
		</Grid>
	)
}

export default VisualizationTab
