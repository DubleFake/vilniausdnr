import React from "react"

import Popper from "@mui/material/Popper"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ClickAwayListener from "@mui/base/ClickAwayListener"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

const InfoTooltip = (props) => {
	return (
		<ClickAwayListener onClickAway={() => props.setOpen(false)}>
			<Popper
				sx={{ position: "relative", zIndex: 9999 }}
				open={props.open}
				anchorEl={props.anchorEl}
				transition
				placement="bottom-end"
				disablePortal={true}
				modifiers={[
					{
						name: "flip",
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: "document",
							padding: 8,
						},
					},
					{
						name: "preventOverflow",
						enabled: true,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: "document",
							padding: 8,
						},
					},
					{
						name: "offset",
						options: {
							offset: [0, 5],
						},
					},
				]}
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps}>
						<Box sx={{ p: 1, bgcolor: "white", borderRadius: 1 }}>
							<div className="triangle_top_info"></div>
							<Typography variant="body2">
								Kaip naudotis?
								<IconButton
									sx={{ p: 0.5, mr: -0.8, mb: -0.5, mt: -0.6 }}
									onClick={() => props.setOpen(false)}
								>
									<CloseIcon sx={{ fontSize: "18px" }} />
								</IconButton>
							</Typography>
						</Box>
					</Fade>
				)}
			</Popper>
		</ClickAwayListener>
	)
}

export default InfoTooltip
