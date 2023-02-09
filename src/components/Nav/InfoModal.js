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
import ToggleButton from "@mui/material/ToggleButton"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

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
					"&:hover": {
						transition: "0.3s",
						color: "#941818",
					},
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
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))

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
	const [renderBlock, setRenderBlock] = useState()
	const [toggleSidebar, setToggleSidebar] = useState(false)

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

		let tempRenderBlock
		if (tempFirstLevel.every((el) => el === false)) {
			tempRenderBlock = (
				<>
					{/* <Typography
						sx={{
							color: "white",
							fontSize: "18px",
							fontWeight: 400,
							mt: 2,
						}}
					>
						Apie projektą
					</Typography> */}
					<Box sx={{ ml: 3 }}>{textDict["about"]}</Box>

					{secondLevelTitles.map((title) => (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
									ml: 1,
								}}
							>
								{title[0]}
							</Typography>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Pateikiama informacija
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[1]]}</Box>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Kaip naudotis?
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[2]]}</Box>
						</>
					))}

					<Typography
						sx={{
							color: "white",
							fontSize: "18px",
							fontWeight: 400,
							mt: 2,
						}}
					></Typography>
					<Box sx={{ ml: 2 }}>{textDict["contacts"]}</Box>
				</>
			)
		} else if (text === "about" || text === "contacts") {
			tempRenderBlock = (
				<>
					{text === "about" && (
						<>
							{/* <Typography
								sx={{
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
								}}
							>
								Apie projektą
							</Typography> */}
							<Box sx={{ ml: 3 }}>{textDict[text]}</Box>
						</>
					)}

					{text === "contacts" && (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
								}}
							></Typography>
							<Box sx={{ ml: 3 }}>{textDict[text]}</Box>
						</>
					)}
				</>
			)
		} else {
			tempRenderBlock = (
				<>
					{secondLevelTitles.map((title) => (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
									ml: 1,
								}}
							>
								{title[0]}
							</Typography>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Pateikiama informacija
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[1]]}</Box>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Kaip naudotis?
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[2]]}</Box>
						</>
					))}
				</>
			)
		}
		setRenderBlock(tempRenderBlock)

		const tempSecondLevelSecond = [...secondLevelSecond]
		tempSecondLevelSecond.fill(false)
		setSecondLevelSecond(tempSecondLevelSecond)
		const tempSecondLevelThird = [...secondLevelThird]
		tempSecondLevelThird.fill(false)
		setSecondLevelThird(tempSecondLevelThird)

		if (text === "about" || text === "contacts") {
			setToggleSidebar(false)
		}
	}

	const handleSecondLevelSecond = (index, text) => {
		const tempSecondLevelSecond = [...secondLevelSecond]
		if (tempSecondLevelSecond[index] === false) {
			tempSecondLevelSecond.fill(false)
		}
		tempSecondLevelSecond[index] = !tempSecondLevelSecond[index]
		setSecondLevelSecond(tempSecondLevelSecond)

		let tempRenderBlock
		if (tempSecondLevelSecond.every((el) => el === false)) {
			tempRenderBlock = (
				<>
					{secondLevelTitles.map((title) => (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "18px",
									fontWeight: 400,
									mt: 2,
									ml: 1,
								}}
							>
								{title[0]}
							</Typography>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Pateikiama informacija
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[1]]}</Box>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Kaip naudotis?
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[title[2]]}</Box>
						</>
					))}
				</>
			)
		} else {
			tempRenderBlock = (
				<>
					<Typography
						sx={{
							width: "100%",
							color: "white",
							fontSize: "18px",
							fontWeight: 400,
							mt: 2,
							ml: 2,
						}}
					>
						Pateikiama informacija
					</Typography>
					<Box sx={{ ml: 3 }}>{textDict[secondLevelTitles[index][1]]}</Box>

					<Typography
						sx={{
							width: "100%",
							color: "white",
							fontSize: "18px",
							fontWeight: 400,
							mt: 2,
							ml: 2,
						}}
					>
						Kaip naudotis?
					</Typography>
					<Box sx={{ ml: 3 }}>{textDict[secondLevelTitles[index][2]]}</Box>
				</>
			)
		}

		setRenderBlock(tempRenderBlock)
		setSelectedText(text)

		const tempSecondLevelThird = [...secondLevelThird]
		tempSecondLevelThird.fill(false)
		setSecondLevelThird(tempSecondLevelThird)

		setToggleSidebar(false)
	}

	const handleSecondLevelThird = (index, text) => {
		setSelectedText(text)

		const tempSecondLevelThird = [...secondLevelThird]
		if (tempSecondLevelThird[index] === false) {
			tempSecondLevelThird.fill(false)
		}

		let tempRenderBlock
		if (tempSecondLevelThird.every((el) => el === false)) {
			tempRenderBlock = (
				<>
					{text.includes("info") && (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Pateikiama informacija
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[text]}</Box>
						</>
					)}
					{text.includes("how") && (
						<>
							<Typography
								sx={{
									color: "white",
									fontSize: "16px",
									fontWeight: 400,
									mt: 2,
									ml: 2,
								}}
							>
								Kaip naudotis?
							</Typography>
							<Box sx={{ ml: 3 }}>{textDict[text]}</Box>
						</>
					)}
				</>
			)
		} else {
			const secondLevelIndex = secondLevelSecond.findIndex((el) => el === true)
			tempRenderBlock = (
				<>
					<Typography
						sx={{
							color: "white",
							fontSize: "16px",
							fontWeight: 400,
							mt: 2,
							ml: 2,
						}}
					>
						Pateikiama informacija
					</Typography>
					<Box sx={{ ml: 3 }}>{textDict[secondLevelTitles[secondLevelIndex][1]]}</Box>

					<Typography
						sx={{
							color: "white",
							fontSize: "16px",
							fontWeight: 400,
							mt: 2,
							ml: 2,
						}}
					>
						Kaip naudotis?
					</Typography>
					<Box sx={{ ml: 3 }}>{textDict[secondLevelTitles[secondLevelIndex][2]]}</Box>
				</>
			)
		}

		setRenderBlock(tempRenderBlock)

		tempSecondLevelThird[index] = !tempSecondLevelThird[index]
		setSecondLevelThird(tempSecondLevelThird)

		setToggleSidebar(false)
	}

	// useEffect(() => {
	// 	if (window.location.pathname === "/vilniausdnrtest/lt") {
	// 		setOpen(true)
	// 	}
	// }, [])

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
					"& .st0_info": {
						fill: "#DC2829",
						stroke: "none",
					},
					"& .st1_info": {
						fill: "none",
					},
					"&:hover": {
						"& .st0_info": { transition: "0.3s", fill: "#941818" },
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
						width: isDownSm ? "99%" : "85%",
						height: "80%",
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

					{isDownSm ? (
						<>
							<Collapse in={toggleSidebar} orientation="horizontal">
								<Box
									sx={{
										maxWidth: "90%",
										ml: 1,
										overflowY: "auto",
									}}
								>
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
										elText={"Kaip naudotis portalu"}
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
							</Collapse>

							<Box
								sx={{ borderRight: "1px solid #D72E30", height: "100%", mr: toggleSidebar ? -3 : 0 }}
								component="div"
							/>
							<ToggleButton
								sx={{}}
								variant="sidebarToggle"
								value="check"
								selected={false}
								onChange={() => {
									setToggleSidebar(!toggleSidebar)
								}}
							>
								{toggleSidebar ? (
									<ArrowBackIosNewIcon sx={{ color: "#FFFFFF" }} />
								) : (
									<ArrowForwardIosIcon sx={{ color: "#FFFFFF" }} />
								)}
							</ToggleButton>

							<Box
								sx={{
									height: "100%",
									overflowY: "auto",
									overflowX: "hidden",
									width: toggleSidebar ? "30%" : "100%",
									"& .aboutBox": {
										width: "100%",
									},
									"& .helpGif": {
										width: "100%",
									},
									"& .helpGifTall": {
										width: "70%",
									},
								}}
							>
								<Box sx={{ mr: 1 }}>{renderBlock}</Box>
							</Box>
						</>
					) : (
						<>
							<Box sx={{ minWidth: "17%", maxWidth: "17%", ml: 1, overflowY: "auto" }}>
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
									elText={"Kaip naudotis portalu"}
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
							<Box sx={{ height: "100%", overflowY: "auto", overflowX: "hidden", ml: 1, width: "100%" }}>
								<Box sx={{ mr: 1 }}>{renderBlock}</Box>
							</Box>
						</>
					)}
				</Box>
			</Modal>
		</div>
	)
}

export default InfoModal
