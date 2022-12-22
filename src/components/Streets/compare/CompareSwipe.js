import React, { useState, useEffect } from "react"

import { map, view, periods } from "../../../utils/streetsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const CompareSwipe = () => {
	const [selectedLeftPeriod, setSelectedLeftPeriod] = useState(0)
	const [selectedRightPeriod, setSelectedRightPeriod] = useState(5)

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
	}, [])

	useEffect(() => {
		view.when(() => {
			const swipeWidgetFind = view.ui.find("swipe-layers")
			const swipeSelectLeft = document.getElementById("swipe-select")
			swipeSelectLeft.style.left = "0%"
			swipeWidgetFind.watch("position", (newPos) => {
				swipeSelectLeft.style.left = `${newPos - 50}%`
			})
		})
	}, [selectedLeftPeriod, selectedRightPeriod])

	useEffect(() => {
		return () => {
			const swipeWidgetFind = view.ui.find("swipe-layers")
			if (swipeWidgetFind !== null) {
				view.ui.remove(swipeWidgetFind)
				swipeWidgetFind.destroy()
			}
		}
	}, [])

	const handleLeftSelect = (event) => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(periods[selectedLeftPeriod])
		map.add(periods[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [periods[event.target.value]],
			trailingLayers: [periods[selectedRightPeriod]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedLeftPeriod(event.target.value)
	}

	const handleRightSelect = (event) => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(periods[selectedRightPeriod])
		map.add(periods[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [periods[selectedLeftPeriod]],
			trailingLayers: [periods[event.target.value]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedRightPeriod(event.target.value)
	}

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
