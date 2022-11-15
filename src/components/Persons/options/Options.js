import React, { useState } from "react"

import SearchTab from "./searchTab/SearchTab"

const Options = (props) => {
	return (
		<SearchTab
			initialObjectsList={props.initialObjectsList}
			setSelectedObject={props.setSelectedObject}
			selectedObject={props.selectedObject}
		/>
	)
}

export default Options
