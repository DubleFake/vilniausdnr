import React from "react"

import Legends from "./Legends"

const VisualizationTab = (props) => {
	return <Legends initialObjectsList={props.initialObjectsList} selectedObjectFilter={props.selectedObjectFilter} />
}

export default VisualizationTab
