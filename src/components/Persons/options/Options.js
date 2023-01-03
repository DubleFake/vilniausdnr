import React, { useState } from "react"

import SearchTab from "./searchTab/SearchTab"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const Options = (props) => {
	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))

	return (
		<div style={{ position: "relative" }}>
			{isDownSm && (
				<IconButton
					color="primary"
					aria-label="close"
					size="small"
					onClick={() => {
						props.setVisible(false)
					}}
					sx={{
						mt: 1,
						mr: 1,
						position: "absolute",
						zIndex: 200,
						right: 0,
						left: "auto",
						backgroundColor: "#EBEBEB",
					}}
				>
					<CloseIcon sx={{ fontSize: 25 }} />
				</IconButton>
			)}

			<SearchTab
				initialObjectsList={props.initialObjectsList}
				setSelectedObject={props.setSelectedObject}
				selectedObject={props.selectedObject}
			/>
		</div>
	)
}

export default Options
