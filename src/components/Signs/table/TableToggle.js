import React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const TableToggle = (props) => {
	return (
		<ToggleButton
			sx={{
				position: "fixed",
				zIndex: 2,
				height: "20vh",
				top: "calc(40vh + 45px)",
				width: "25px",
				bgcolor: "primary.main",
				borderRadius: 0,
				"&:hover": {
					bgcolor: "primary.main",
				},
			}}
			value="check"
			selected={false}
			onChange={() => {
				props.setVisible(!props.visible)
			}}
		>
			{props.visible ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
		</ToggleButton>
	)
}

export default TableToggle
