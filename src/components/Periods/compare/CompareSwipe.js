import React, { useState, useEffect } from "react"

import { map, view, objects, periods } from "../../../utils/periodsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Popover from "@mui/material/Popover"

const CompareSwipe = (props) => {
	const [selectedLeftPeriod, setSelectedLeftPeriod] = useState(0)
	const [selectedRightPeriod, setSelectedRightPeriod] = useState(5)

	const handleLeftSelect = (event) => {
		setSelectedLeftPeriod(event.target.value)
	}

	const handleRightSelect = (event) => {
		setSelectedRightPeriod(event.target.value)
	}

	const handleClickAway = (event) => {
		if (event.target.id !== "swipe-popover") {
			props.setOnce(true)
		}
	}

	let intervalId
	useEffect(() => {
		map.removeAll()

		periods[0]
			.when(() => {
				return periods[0].queryExtent()
			})
			.then((response) => {
				view.constraints.geometry = {
					type: "extent",
					spatialReference: response.extent.spatialReference,
					xmin: response.extent.xmin,
					ymin: response.extent.ymin,
					xmax: response.extent.xmax,
					ymax: response.extent.ymax,
				}
			})

		view.when(() => {
			view.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
		})

		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.addMany([periods[selectedLeftPeriod], periods[selectedRightPeriod]])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [periods[selectedLeftPeriod]],
			trailingLayers: [periods[selectedRightPeriod]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})

		view.ui.add(swipe)

		view.when(() => {
			const swipeSelectLeft = document.getElementById("swipe-select")
			const swipePopover = document.getElementById("swipe-popover")

			swipeSelectLeft.style.left = "0%"
			const swipeHandle = swipe.watch("position", (newPos) => {
				swipeSelectLeft.style.left = `${newPos - 50}%`
				if (swipePopover) {
					swipePopover.style.left = `calc(${newPos}% - 170px)`
				}
			})
			swipe.addHandles(swipeHandle)
		})

		let back = false
		let forwardAgain = false
		if (!props.once) {
			intervalId = setInterval(() => {
				if (swipe.position < 57.5 && !back) {
					swipe.position += 0.1
				} else if (swipe.position > 42.5 && !forwardAgain) {
					back = true
					swipe.position -= 0.1
				} else if (swipe.position < 50) {
					forwardAgain = true
					swipe.position += 0.1
				} else {
					clearInterval(intervalId)
					setTimeout(() => {
						props.setOnce(true)
					}, 2000)
				}
			}, 10)

			return () => {
				clearInterval(intervalId)
				setTimeout(() => {
					props.setOnce(true)
				}, 2000)
			}
		}
	}, [selectedLeftPeriod, selectedRightPeriod])

	useEffect(() => {
		return () => {
			const swipeWidgetFind = view.ui.find("swipe-layers")
			if (swipeWidgetFind !== null) {
				view.ui.remove(swipeWidgetFind)
				swipeWidgetFind.destroy()
			}

			map.removeAll()
			map.add(objects)

			objects
				.when(() => {
					return objects.queryExtent()
				})
				.then((response) => {
					view.constraints.geometry = {
						type: "extent",
						spatialReference: response.extent.spatialReference,
						xmin: response.extent.xmin,
						ymin: response.extent.ymin,
						xmax: response.extent.xmax,
						ymax: response.extent.ymax,
					}
				})
		}
	}, [])

	return (
		<Grid
			sx={{
				backgroundColor: "yellow",
				width: "100%",
				height: "0%",
				position: "relative",
			}}
			container
			direction="row"
			justifyContent="center"
			alignItems="flex-start"
			id="swipe-select"
		>
			<ClickAwayListener mouseEvent="onPointerDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
				<Popover
					sx={{ top: "calc(50% + 50px)", pointerEvents: "none" }}
					id="swipe-popover"
					open={!props.once}
					anchorReference="anchorPosition"
					anchorPosition={{ top: 0, left: 0 }}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<Typography sx={{ m: 1, textTransform: "none", color: "black" }} variant="body1">
						Slinkite juostą ir lyginkite abu žemėlapius
					</Typography>
				</Popover>
			</ClickAwayListener>
			<FormControl
				sx={{
					bottom: 16,
					mt: -7.5,
					mr: 8,
					width: "auto",
					height: "45px",
					backgroundColor: "white",
					boxShadow: 0,
				}}
				variant="outlined"
				size="small"
				id="swipe-select"
			>
				<Select
					value={selectedLeftPeriod}
					onChange={handleLeftSelect}
					renderValue={(value) => (
						<Typography sx={{ color: "#D72E30" }}>
							<Typography sx={{ color: "black", display: "inline" }}>Kairė: </Typography>
							{periods[value].title}
						</Typography>
					)}
					MenuProps={{
						anchorOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
					}}
				>
					{periods.map(
						(object, index) =>
							index !== selectedRightPeriod && (
								<MenuItem
									sx={{
										whiteSpace: "unset",
										"&.Mui-selected": {
											color: "#D72E30",
											backgroundColor: "#F7D5D6",
										},
										justifyContent: "center",
									}}
									key={index}
									value={index}
								>
									{object.title}
								</MenuItem>
							)
					)}
				</Select>
			</FormControl>
			<FormControl
				sx={{
					bottom: 16,
					mt: -7.5,
					ml: 8,
					width: "auto",
					height: "45px",
					backgroundColor: "white",
					boxShadow: 0,
				}}
				variant="outlined"
				size="small"
				id="swipe-select"
			>
				<Select
					value={selectedRightPeriod}
					onChange={handleRightSelect}
					renderValue={(value) => (
						<Typography sx={{ color: "#D72E30" }}>
							<Typography sx={{ color: "black", display: "inline" }}>Dešinė: </Typography>
							{periods[value].title}
						</Typography>
					)}
					MenuProps={{
						anchorOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
					}}
				>
					{periods.map(
						(object, index) =>
							index !== selectedLeftPeriod && (
								<MenuItem
									sx={{
										whiteSpace: "unset",
										"&.Mui-selected": {
											color: "#D72E30",
											backgroundColor: "#F7D5D6",
										},
										justifyContent: "center",
									}}
									key={index}
									value={index}
								>
									{object.title}
								</MenuItem>
							)
					)}
				</Select>
			</FormControl>
		</Grid>
	)
}

export default CompareSwipe
