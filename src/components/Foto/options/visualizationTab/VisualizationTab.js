import React from "react"

import Legends from "./Legends"
import VisualizationSelect from "./VisualizationSelect"

import Box from "@mui/material/Box"

const VisualizationTab = (props) => {
	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			{/* <VisualizationSelect
				visualizationType={props.visualizationType}
				setVisualizationType={props.setVisualizationType}
			/>
			<Legends
				selectedObjectFilter={props.selectedObjectFilter}
				selectedMemoryFilter={props.selectedMemoryFilter}
				visualizationType={props.visualizationType}
        visibleObjectIcons={props.visibleObjectIcons}
        visibleMemoryIcons={props.visibleMemoryIcons}
			/> */}
		</Box>
	)
}

export default VisualizationTab
