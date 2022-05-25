import React, { useState } from "react"

import { view, objects, swipeObjects, map } from "../../../utils/streetsArcgisItems"

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
	const [swipeCenter, setSwipeCenter] = useState(50)
	const [historyToggle, setHistoryToggle] = useState(false)
	const [selectedSwipeObject, setSelectedSwipeObject] = useState(0)

	const nowHandler = () => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}
		map.remove(swipeObjects[selectedSwipeObject])

    props.setCompareWindow(false)

		setHistoryToggle(false)
	}

	const historyHandler = () => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind === null) {
			map.add(swipeObjects[selectedSwipeObject])

			const swipe = new Swipe({
				view: view,
				leadingLayers: [objects],
				trailingLayers: [swipeObjects[selectedSwipeObject]],
				direction: "horizontal",
				position: 50,
				id: "swipe-layers",
			})

			// swipe.watch("position", (pos) => {
			// 	const posRounded = parseInt(pos * 10) / 10
			// 	console.log(posRounded)
			// 	setSwipeCenter(posRounded)
			// })

			view.ui.add(swipe)
			setHistoryToggle(true)
		}
	}

	const handleSwipeSelect = (event) => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}
		map.remove(swipeObjects[selectedSwipeObject])

		map.add(swipeObjects[event.target.value])
		const swipe = new Swipe({
			view: view,
			leadingLayers: [objects],
			trailingLayers: [swipeObjects[event.target.value]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})

		setSelectedSwipeObject(event.target.value)
		view.ui.add(swipe)
		// setHistoryToggle(true)
	}

	const handleWindow = () => {
		if (!props.compareWindow) {
			const swipeWidgetFind = view.ui.find("swipe-layers")
			if (swipeWidgetFind !== null) {
				view.ui.remove(swipeWidgetFind)
				swipeWidgetFind.destroy()
			}
			map.remove(swipeObjects[selectedSwipeObject])
		} else {
			console.log("first")
			const swipeWidgetFind = view.ui.find("swipe-layers")
			if (swipeWidgetFind === null) {
				console.log("asdasd")

				map.add(swipeObjects[selectedSwipeObject])

				const swipe = new Swipe({
					view: view,
					leadingLayers: [objects],
					trailingLayers: [swipeObjects[selectedSwipeObject]],
					direction: "horizontal",
					position: 50,
					id: "swipe-layers",
				})

				view.ui.add(swipe)
			}
		}

		props.setCompareWindow(!props.compareWindow)
	}

	return (
		<>
			<Grid
				sx={{
					backgroundColor: "yellow",
					width: "100%",
					height: "0%",
					bottom: window.innerHeight - 90,
					position: "relative",
				}}
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
			>
				<ButtonGroup sx={{ mt: 1.5 }} variant="contained">
					<Button color={historyToggle ? "primary" : "secondary"} onClick={nowHandler}>
						<Typography variant="button">dabartis</Typography>
					</Button>
					<Button color={historyToggle ? "secondary" : "primary"} onClick={historyHandler}>
						<Typography variant="button">istorija</Typography>
					</Button>
				</ButtonGroup>
			</Grid>

			{historyToggle && (
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
							width: 150,
							backgroundColor: "white",
						}}
						variant="filled"
						size="small"
						id="swipe-select"
					>
						<InputLabel>Sluoksnis</InputLabel>
						<Select
							value={selectedSwipeObject}
							label="Sluoksnis"
							// defaultValue="0"
							onChange={handleSwipeSelect}
						>
							{swipeObjects.map((object, index) => (
								<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
									{object.title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button
						sx={{
							bottom: 16,
							mt: -7.5,
							width: 150,
							height: 48,
						}}
						variant="contained"
						color="primary"
						onClick={handleWindow}
					>
						<Typography variant="button">Vaizdavimas</Typography>
					</Button>
				</Grid>
			)}
		</>
	)
}

export default CompareLayers
