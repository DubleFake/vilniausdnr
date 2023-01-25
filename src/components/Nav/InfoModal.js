import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

import { ReactComponent as infoIcon } from "../../utils/icons/homeIcons/info.svg"
import { textDict, secondLevelTitles } from "./InfoModalText"

import SvgIcon from "@mui/material/SvgIcon"

function CustomAccordion(props) {
	const { handleLevel, index, text, level, elText, fontSize } = props

	return (
		<Box
			sx={{ width: "100", cursor: "pointer", p: 1, mt: index === 0 ? 1 : 0 }}
			onClick={() => handleLevel(index, text)}
		>
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
	const theme = useTheme()
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
	const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

	const [open, setOpen] = useState(false)
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

	const handleOpen = () => {
		switch (window.location.pathname.split("/")[3]) {
			case undefined:
				handleFirstLevel(0, "about", true)
				break
			case "maps":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(0, "second")
				break
			case "streets":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(1, "second")
				break
			case "persons":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(2, "second")
				break
			case "foto":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(3, "second")
				break
			case "plaques":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(4, "second")
				break
			case "periods":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(5, "second")
				break
			case "events":
				handleFirstLevel(1, "first", true)
				handleSecondLevelSecond(6, "second")
				break
		}
		setOpen(true)
	}
	const handleClose = () => setOpen(false)

	const handleFirstLevel = (index, text, once = false) => {
		setSelectedText(text)
		const tempFirstLevel = [...firstLevel]

		if (tempFirstLevel[index] === false) {
			tempFirstLevel.fill(false)
			setSelectedText(text)
		}

		tempFirstLevel[index] = once ? true : !tempFirstLevel[index]
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
			<SvgIcon
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
			/>

			<Modal
				sx={{ zIndex: 1000 }}
				disableEnforceFocus
				open={open}
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
					<IconButton
						sx={{
							backgroundColor: "#DC2829",
							position: "absolute",
							right: 0,
							mr: 1,
							mt: 1,
							"&:hover": {
								transition: "0.3s",
								backgroundColor: "#941818",
							},
						}}
						aria-label="close"
						onClick={handleClose}
					>
						<CloseIcon sx={{ color: "white" }} />
					</IconButton>

					<Box sx={{ minWidth: "25%", ml: 1, overflowY: "auto" }}>
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

					<Box sx={{ borderRight: "1px solid #D72E30", height: "100%", mr: 1 }} component="div" />

					<Box sx={{ height: "100%", width: "100%", ml: 1, overflowY: "auto" }}>
						{(selectedText.includes("info") ||
							selectedText.includes("how") ||
							selectedText.includes("about") ||
							selectedText.includes("contacts")) && (
							<Typography
								sx={{
									width: "100%",
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
								}}
							>
								{selectedText.includes("info")
									? "Pateikiama informacija"
									: selectedText.includes("how")
									? "Kaip naudotis?"
									: selectedText.includes("about")
									? "Apie projektą"
									: selectedText.includes("contacts")
									? "Kontaktai"
									: ""}
							</Typography>
						)}
						{textDict[selectedText]}
					</Box>
				</Box>
			</Modal>
		</div>
	)
}

export default InfoModal
