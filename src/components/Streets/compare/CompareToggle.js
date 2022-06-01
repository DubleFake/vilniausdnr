import React, { useState } from "react"
import { Routes, Route, Outlet, useNavigate } from "react-router-dom"

import { view, objects, swipeObjects, map, map2 } from "../../../utils/streetsArcgisItems"
import CompareTimeline from "../compare/CompareTimeline"

import * as watchUtils from "@arcgis/core/core/watchUtils"
import Swipe from "@arcgis/core/widgets/Swipe"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareLayers = (props) => {
	const [historyToggle, setHistoryToggle] = useState(false)
	// const [selectedSwipeObject, setSelectedSwipeObject] = useState(0)

	const navigate = useNavigate()

	// const nowHandler = () => {
	// 	const swipeWidgetFind = view.ui.find("swipe-layers")
	// 	if (swipeWidgetFind !== null) {
	// 		view.ui.remove(swipeWidgetFind)
	// 		swipeWidgetFind.destroy()
	// 	}
	// 	map.remove(swipeObjects[selectedSwipeObject])

	// 	props.setCompareWindow(false)

	// 	setHistoryToggle(false)
	// }

	// const historyHandler = () => {
	// 	const swipeWidgetFind = view.ui.find("swipe-layers")
	// 	if (swipeWidgetFind === null) {
	// 		map.add(swipeObjects[selectedSwipeObject])

	// 		const swipe = new Swipe({
	// 			view: view,
	// 			leadingLayers: [objects],
	// 			trailingLayers: [swipeObjects[selectedSwipeObject]],
	// 			direction: "horizontal",
	// 			position: 50,
	// 			id: "swipe-layers",
	// 		})

	// 		// swipe.watch("position", (pos) => {
	// 		// 	const posRounded = parseInt(pos * 10) / 10
	// 		// 	console.log(posRounded)
	// 		// 	setSwipeCenter(posRounded)
	// 		// })

	// 		view.ui.add(swipe)
	// 		setHistoryToggle(true)
	// 	}
	// }

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

	// const handleWindow = () => {
	// 	if (!props.compareWindow) {
	// 		const swipeWidgetFind = view.ui.find("swipe-layers")
	// 		if (swipeWidgetFind !== null) {
	// 			view.ui.remove(swipeWidgetFind)
	// 			swipeWidgetFind.destroy()
	// 		}
	// 		map.remove(swipeObjects[selectedSwipeObject])
	// 		map2.add(swipeObjects[selectedSwipeObject])
	// 	} else {
	// 		console.log("first")
	// 		const swipeWidgetFind = view.ui.find("swipe-layers")
	// 		if (swipeWidgetFind === null) {
	// 			console.log("asdasd")

	// 			map.add(swipeObjects[selectedSwipeObject])

	// 			const swipe = new Swipe({
	// 				view: view,
	// 				leadingLayers: [objects],
	// 				trailingLayers: [swipeObjects[selectedSwipeObject]],
	// 				direction: "horizontal",
	// 				position: 50,
	// 				id: "swipe-layers",
	// 			})

	// 			view.ui.add(swipe)
	// 		}
	// 	}

	// 	props.setCompareWindow(!props.compareWindow)
	// }

	return (
		<>
			<Grid
				sx={{
					backgroundColor: "yellow",
					width: "100%",
					height: "0%",
					bottom: window.innerHeight - 90,
					position: "relative",
					zIndex: 2,
				}}
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
			>
				<ButtonGroup sx={{ mt: 1.5 }} variant="contained">
					<Button
						color={historyToggle ? "primary" : "secondary"}
						onClick={() => {
							setHistoryToggle(false)
              map.removeAll()
              map.add(objects)
							navigate("")
						}}
					>
						<Typography variant="button">dabartis</Typography>
					</Button>
					<Button
						color={historyToggle ? "secondary" : "primary"}
						onClick={() => {
							setHistoryToggle(true)
              map.removeAll()
							navigate("compare/timeline")
						}}
					>
						<Typography variant="button">istorija</Typography>
					</Button>
				</ButtonGroup>
				{historyToggle && (
					<FormControl
						sx={{
							// bottom: 16,
							// mt: -7.5,
							width: 170,
							backgroundColor: "white",
						}}
						variant="filled"
						size="small"
						id="swipe-select"
					>
						<InputLabel>Vaizdavimas</InputLabel>
						<Select
							label="Sluoksnis"
							defaultValue="0"
							onChange={(event) => {
								console.log(event.target.value)
								navigate("compare/timeline")
							}}
						>
							<MenuItem sx={{ whiteSpace: "unset" }} key={0} value={0}>
								Laiko juosta
							</MenuItem>
							<MenuItem sx={{ whiteSpace: "unset" }} key={1} value={1}>
								Slenkanti juosta
							</MenuItem>
							<MenuItem sx={{ whiteSpace: "unset" }} key={2} value={2}>
								Langai
							</MenuItem>
						</Select>
					</FormControl>
				)}
			</Grid>
			{/* <Outlet /> */}
			<Routes>
				<Route path="compare/timeline" element={<CompareTimeline />} />
			</Routes>
		</>
	)
}

export default CompareLayers
