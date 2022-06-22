import React, { useState, useEffect } from "react"

import { map, map2, view, view2, objects, periods } from "../../../utils/periodsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

const CompareWindow = (props) => {
	const [selectedLeftPeriod, setSelectedLeftPeriod] = useState(0)
	const [selectedRightPeriod, setSelectedRightPeriod] = useState(5)

	useEffect(() => {
		map.removeAll()
		map2.removeAll()

		view
			.when(() => {
				view.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
				view2.goTo({ target: periods[0].fullExtent.center, zoom: 4 })
			})
			.then(() => {
				// limitMapExtent(view)
			})

		map.add(periods[0])
		map2.add(periods[5])

		props.setToggleCompareWindow(true)
	}, [])

	useEffect(() => {
		return () => {
			props.setToggleCompareWindow(false)

			map.removeAll()
			map2.removeAll()
			map.add(objects)
		}
	}, [])

	const handleLeftSelect = (event) => {
		map.remove(periods[selectedLeftPeriod])
		map.add(periods[event.target.value])

		setSelectedLeftPeriod(event.target.value)
	}

	const handleRightSelect = (event) => {
		map2.remove(periods[selectedRightPeriod])
		map2.add(periods[event.target.value])

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

export default CompareWindow
