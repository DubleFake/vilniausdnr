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

const SwipeLayers = () => {
	const [swipeCenter, setSwipeCenter] = useState(50)
	const [swipeShowSelect, setSwipeShowSelect] = useState(false)
	const [selectedSwipeObject, setSelectedSwipeObject] = useState(0)

	const nowHandler = () => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(swipeObjects[selectedSwipeObject])
		setSwipeShowSelect(false)
	}

	const historyHandler = () => {
		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind === null) {
			map.add(swipeObjects[selectedSwipeObject])

			const swipe = new Swipe({
				view: view,
				leadingLayers: [objects],
				trailingLayers: [swipeObjects[selectedSwipeObject]],
				direction: "horizontal", // swipe widget will move from top to bottom of view
				position: 50, // position set to middle of the view (50%)
				id: "swipe-layers",
			})

			// swipe.watch("position", (pos) => {
			// 	const posRounded = parseInt(pos * 10) / 10
			// 	console.log(posRounded)
			// 	setSwipeCenter(posRounded)
			// })

			view.ui.add(swipe)
			setSwipeShowSelect(true)
		}
	}

	const handleSwipeSelect = (event) => {
		console.log(event.target.value)

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
			direction: "horizontal", // swipe widget will move from top to bottom of view
			position: 50, // position set to middle of the view (50%)
			id: "swipe-layers",
		})

		setSelectedSwipeObject(event.target.value)
		view.ui.add(swipe)
		// setSwipeShowSelect(true)
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
					<Button color={swipeShowSelect ? "primary" : "secondary"} onClick={nowHandler}>
						<Typography variant="button">dabartis</Typography>
					</Button>
					<Button color={swipeShowSelect ? "secondary" : "primary"} onClick={historyHandler}>
						<Typography variant="button">istorija</Typography>
					</Button>
				</ButtonGroup>

				{/* <Button color="secondary">
				<Typography variant="button">TESTING</Typography>
			</Button> */}
			</Grid>

			{swipeShowSelect && (
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
				</Grid>
			)}
		</>
	)
}

export default SwipeLayers
