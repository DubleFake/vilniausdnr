import React, { useState, useEffect } from "react"

import { map, map2, view, view2, maps } from "../../../utils/mapsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareWindow = (props) => {
	const [selectedLeftPeriod, setSelectedLeftPeriod] = useState(8)
	const [selectedRightPeriod, setSelectedRightPeriod] = useState(7)
  const [periods, setPeriods] = useState([])

	useEffect(() => {
		map.removeAll()
		map2.removeAll()
    const tempPeriods = []

		maps
			.queryFeatures({
				where: "1=1",
				outFields: ["*"],
			})
			.then((response) => {
				const mapGroupSet = new Set()

				for (let feature in response.features) {
					mapGroupSet.add(response.features[feature].attributes.Grupe)

					if (response.features[feature].attributes.Tipas === "Tile Layer") {
						const mapLayer = new TileLayer({
							url: response.features[feature].attributes.Nuoroda,
							title: response.features[feature].attributes.Pavadinimas,
							group: response.features[feature].attributes.Grupe,
							globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
							index: feature,
						})
						tempPeriods.push(mapLayer)
					} else if (response.features[feature].attributes.Tipas === "Map Layer") {
						const mapLayer = new MapImageLayer({
							url: response.features[feature].attributes.Nuoroda,
							title: response.features[feature].attributes.Pavadinimas,
							group: response.features[feature].attributes.Grupe,
							globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
							index: feature,
						})
						tempPeriods.push(mapLayer)
					}
				}

				// setGroupList([...mapGroupSet])
				setPeriods(tempPeriods)
    
        map.add(tempPeriods[8])
        map2.add(tempPeriods[7])
        props.setToggleCompareWindow(true)
			})

	}, [])

	useEffect(() => {
		return () => {
			props.setToggleCompareWindow(false)

			map.removeAll()
			map2.removeAll()
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
