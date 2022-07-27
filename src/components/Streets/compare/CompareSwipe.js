import React, { useState, useEffect } from "react"

import { map, view, view2, objects, periods } from "../../../utils/streetsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

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

		view
			.when(() => {
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

	// const handleSwipeSelect = (event) => {
	// 	if (!props.compareWindow) {
	// 		const swipeWidgetFind = view.ui.find("swipe-layers")
	// 		if (swipeWidgetFind !== null) {
	// 			view.ui.remove(swipeWidgetFind)
	// 			swipeWidgetFind.destroy()
	// 		}
	// 		map.remove(swipeObjects[selectedSwipeObject])

	// 		map.add(swipeObjects[event.target.value])
	// 		const swipe = new Swipe({
	// 			view: view,
	// 			leadingLayers: [objects],
	// 			trailingLayers: [swipeObjects[event.target.value]],
	// 			direction: "horizontal",
	// 			position: 50,
	// 			id: "swipe-layers",
	// 		})
	// 		view.ui.add(swipe)
	// 		// setHistoryToggle(true)
	// 	} else {
	// 		map2.remove(swipeObjects[selectedSwipeObject])
	// 		map2.add(swipeObjects[event.target.value])
	// 	}

	// 	setSelectedSwipeObject(event.target.value)
	// }

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
		>
			<FormControl
				sx={{
					bottom: 16,
					mt: -7.5,
					mr: 2,
					width: 150,
					backgroundColor: "white",
				}}
				variant="filled"
				size="small"
				id="swipe-select"
			>
				<InputLabel>Kairys sluoksnis</InputLabel>
				<Select
					value={selectedLeftPeriod}
					label="Sluoksnis"
					// defaultValue="0"
					onChange={handleLeftSelect}
				>
					{periods.map(
						(object, index) =>
							index !== selectedRightPeriod && (
								<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
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
					ml: 2,
					width: 150,
					backgroundColor: "white",
				}}
				variant="filled"
				size="small"
				id="swipe-select"
			>
				<InputLabel>Dešinys sluoksnis</InputLabel>
				<Select
					value={selectedRightPeriod}
					label="Sluoksnis"
					// defaultValue="0"
					onChange={handleRightSelect}
				>
					{periods.map(
						(object, index) =>
							index !== selectedLeftPeriod && (
								<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
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
