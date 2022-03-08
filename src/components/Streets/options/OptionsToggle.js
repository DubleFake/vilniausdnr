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
				bgcolor: "secondary.main",
				borderRadius: 0,
				transition: "0.3s",
				"&:hover": {
					bgcolor: "secondary.dark",
				},
			}}
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

export default TableToggle
