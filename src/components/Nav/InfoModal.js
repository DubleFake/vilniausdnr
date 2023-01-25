import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Collapse from "@mui/material/Collapse"

import { ReactComponent as infoIcon } from "../../utils/icons/homeIcons/info.svg"
import { textDict, secondLevelTitles } from "./InfoModalText"

import SvgIcon from "@mui/material/SvgIcon"

function CustomAccordion(props) {
	const { handleLevel, index, text, level, elText, fontSize } = props

	return (
		<Box sx={{ width: "100", cursor: "pointer", p: 1 }} onClick={() => handleLevel(index, text)}>
			<Typography
				sx={{
					width: "100%",
					color: level[index] ? "#D72E30" : "white",
					fontSize: fontSize,
					fontWeight: 400,
				}}
			>
				{elText}
			</Typography>
		</Box>
	)
}

CustomAccordion.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
}

const InfoModal = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const theme = useTheme()
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
	const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

	const [firstLevel, setFirstLevel] = useState([true, false, false])
	const [secondLevelSecond, setSecondLevelSecond] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	])
	const [secondLevelThird, setSecondLevelThird] = useState([false, false])
	const [selectedText, setSelectedText] = useState("about")

	const handleFirstLevel = (index, text) => {
		setSelectedText("none")

		const tempFirstLevel = [...firstLevel]
		if (tempFirstLevel[index] === false) {
			tempFirstLevel.fill(false)
			setSelectedText(text)
		}
		tempFirstLevel[index] = !tempFirstLevel[index]
		setFirstLevel(tempFirstLevel)

		const tempSecondLevelSecond = [...secondLevelSecond]
		tempSecondLevelSecond.fill(false)
		setSecondLevelSecond(tempSecondLevelSecond)
		const tempSecondLevelThird = [...secondLevelThird]
		tempSecondLevelThird.fill(false)
		setSecondLevelThird(tempSecondLevelThird)
	}

	const handleSecondLevelSecond = (index, text) => {
		setSelectedText(text)

		const tempSecondLevelSecond = [...secondLevelSecond]
		if (tempSecondLevelSecond[index] === false) {
			tempSecondLevelSecond.fill(false)
		}
		tempSecondLevelSecond[index] = !tempSecondLevelSecond[index]
		setSecondLevelSecond(tempSecondLevelSecond)

		const tempSecondLevelThird = [...secondLevelThird]
		tempSecondLevelThird.fill(false)
		setSecondLevelThird(tempSecondLevelThird)
	}

	const handleSecondLevelThird = (index, text) => {
		setSelectedText(text)

		const tempSecondLevelThird = [...secondLevelThird]
		if (tempSecondLevelThird[index] === false) {
			tempSecondLevelThird.fill(false)
		}
		tempSecondLevelThird[index] = !tempSecondLevelThird[index]
		setSecondLevelThird(tempSecondLevelThird)
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
				open={true}
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
						display: "flex",
					}}
				>
					<Box sx={{ minWidth: "25%", my: 1, ml: 1, overflowY: "auto" }}>
						<CustomAccordion
							handleLevel={handleFirstLevel}
							index={0}
							text={"about"}
							level={firstLevel}
							elText={"Apie projektą"}
							fontSize={"18px"}
						/>

						<CustomAccordion
							handleLevel={handleFirstLevel}
							index={1}
							text={"first"}
							level={firstLevel}
							elText={"Portalas"}
							fontSize={"18px"}
						/>
						<Collapse sx={{ ml: 1 }} in={firstLevel[1] === true}>
							{secondLevelTitles.map((title, index) => (
								<div key={index}>
									<CustomAccordion
										handleLevel={handleSecondLevelSecond}
										index={index}
										text={"second"}
										level={secondLevelSecond}
										elText={title[0]}
										fontSize={"16px"}
									/>
									<Collapse sx={{ ml: 1 }} in={secondLevelSecond[index] === true}>
										<CustomAccordion
											handleLevel={handleSecondLevelThird}
											index={0}
											text={title[1]}
											level={secondLevelThird}
											elText={"Pateikiama informacija"}
											fontSize={"14px"}
										/>
										<CustomAccordion
											handleLevel={handleSecondLevelThird}
											index={1}
											text={title[2]}
											level={secondLevelThird}
											elText={"Kaip naudotis?"}
											fontSize={"14px"}
										/>
									</Collapse>
								</div>
							))}
						</Collapse>

						<CustomAccordion
							handleLevel={handleFirstLevel}
							index={2}
							text={"contacts"}
							level={firstLevel}
							elText={"Kontaktai"}
							fontSize={"18px"}
						/>
					</Box>

					<Box sx={{ borderRight: "1px solid #D72E30", height: "92%", mx: 1, mt: "3%" }} component="div" />

					<Box sx={{ height: "100%", width: "100%", mt: 2, mx: 1 }}>{textDict[selectedText]}</Box>
				</Box>
			</Modal>
		</div>
	)
}

export default InfoModal
