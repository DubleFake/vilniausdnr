import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"

import { ReactComponent as infoIcon } from "../../utils/icons/homeIcons/info.svg"

import SvgIcon from "@mui/material/SvgIcon"

const InfoModal = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const theme = useTheme()
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
	const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

	const [expanded, setExpanded] = React.useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	useEffect(() => {
		if (window.location.pathname === "/vilniausdnr/lt") {
			setOpen(true)
		}
	}, [])

	return (
		<div>
			{/* <SvgIcon
				component={infoIcon}
				inheritViewBox
				sx={{
					mt: 0.75,
					mr: 1,
					fontSize: 52,
					cursor: "pointer",
					// "&:hover": {
					// 	transition: "0.3s",
					// 	color: "#941818",
					// },
					"& .st0": {
						fill: "#DC2829",
						stroke: "none",
					},
					"& .st1": {
						fill: "none",
					},
				}}
				onClick={handleOpen}
			/> */}

			<Modal
				sx={{ zIndex: 1000 }}
				disableEnforceFocus
				open={false}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "60%",
						height: "65%",
						bgcolor: "rgb(18, 18, 18)",
						border: "2px solid #000",
						boxShadow: 24,
						overflow: "hidden",
					}}
				>
					<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
						<Grid item xs={4}>
							<Accordion
								disableGutters
								elevation={0}
								square
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}
							>
								<AccordionSummary>
									<Typography sx={{ width: "100%" }}>Apie projektą</Typography>
								</AccordionSummary>
							</Accordion>
							<Accordion
								disableGutters
								elevation={0}
								square
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}
							>
								<AccordionSummary>
									<Typography sx={{ width: "100%" }}>Portalas</Typography>
								</AccordionSummary>
							</Accordion>
							<Accordion
								disableGutters
								elevation={0}
								square
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}
							>
								<AccordionSummary>
									<Typography sx={{ width: "100%" }}>Kontaktai</Typography>
								</AccordionSummary>
							</Accordion>
						</Grid>
						<Grid item xs={8}></Grid>
					</Grid>
				</Box>
			</Modal>
		</div>
	)
}

export default InfoModal
