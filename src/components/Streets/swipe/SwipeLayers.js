import React from "react"

import { view, objects, objectsTest, map } from "../../../utils/streetsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const SwipeLayers = () => {
	const nowHandler = () => {
		const swipeWidgetFind = view.ui.find("swipeLayers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(objectsTest)
	}

	const historyHandler = () => {
		const swipeWidgetFind = view.ui.find("swipeLayers")
		if (swipeWidgetFind === null) {
			map.add(objectsTest)
			const swipe = new Swipe({
				view: view,
				leadingLayers: [objects],
				trailingLayers: [objectsTest],
				direction: "horizontal", // swipe widget will move from top to bottom of view
				position: 50, // position set to middle of the view (50%)
				id: "swipeLayers",
			})

			view.ui.add(swipe)
		}
	}

	return (
		<ButtonGroup
			sx={{ top: 90, right: window.innerWidth / 2 - 99, mt: 1.5, position: "fixed", zIndex: 2 }} //-99 nes buttongroup plotis ~198
			variant="contained"
		>
			<Button onClick={nowHandler}>
				<Typography variant="button">dabartis</Typography>
			</Button>
			<Button color="secondary" onClick={historyHandler}>
				<Typography variant="button">istorija</Typography>
			</Button>
		</ButtonGroup>
	)
}

export default SwipeLayers
