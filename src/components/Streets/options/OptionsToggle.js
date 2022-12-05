import React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const OptionsToggle = (props) => {
	return (
		<ToggleButton
			variant="optionsToggle"
			value="check"
			selected={false}
			onChange={() => {
				props.setVisible(!props.visible)
			}}
		>
			{props.visible ? (
				<ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
			) : (
				<ArrowForwardIosIcon sx={{ color: "#FFFFFF" }} />
			)}
		</ToggleButton>
	)
}

export default OptionsToggle
