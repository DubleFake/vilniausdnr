import React from "react"

import {objects, objectRenderer, memoryRenderer} from "../../../../utils/signsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const Visualization = (props) => {
	const handleVisualizationChange = (event) => {
		props.setVisualizationType(event.target.value)
    if (event.target.value === "0") {
      objects.renderer = objectRenderer
    } else {
      objects.renderer = memoryRenderer
    }
	}

	return (
		<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
			<InputLabel id="visualization-select-label">Vaizduoti pagal</InputLabel>
			<Select
				labelId="visualization-select-label"
				name="visualization-select"
				id="visualization-select"
				value={props.visualizationType}
				label="Vaizduoti pagal"
				onChange={handleVisualizationChange}
			>
				<MenuItem value="0">Objekto tipą</MenuItem>
				<MenuItem value="1">Atminimo tipą</MenuItem>
			</Select>
		</FormControl>
	)
}

export default Visualization
