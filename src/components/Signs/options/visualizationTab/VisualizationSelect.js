import React from "react"
import { useTranslation } from "react-i18next"

import {objects, objectRenderer, memoryRenderer} from "../../../../utils/plaquesArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const Visualization = (props) => {
  const { t, i18n } = useTranslation()

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
			<InputLabel id="visualization-select-label">{t("plaques.options.visualizeBy")}</InputLabel>
			<Select
				labelId="visualization-select-label"
				name="visualization-select"
				id="visualization-select"
				value={props.visualizationType}
				label={t("plaques.options.visualizeBy")}
				onChange={handleVisualizationChange}
			>
				<MenuItem value="0">{t("plaques.options.objectType")}</MenuItem>
				<MenuItem value="1">{t("plaques.options.memoryType")}</MenuItem>
			</Select>
		</FormControl>
	)
}

export default Visualization
