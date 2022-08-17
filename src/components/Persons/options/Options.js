import React, { useState } from "react"

import SearchTab from "./searchTab/SearchTab"

import Box from "@mui/material/Box"

const Options = (props) => {

  return (
		<Box sx={{ bgcolor: "background.paper", width: 350 }}>
			<SearchTab
				initialObjectsList={props.initialObjectsList}
				setSelectedObject={props.setSelectedObject}
				selectedObject={props.selectedObject}
			/>
		</Box>
	)
}

export default Options
