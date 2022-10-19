import React, { useState, useEffect } from "react"

import { map, maps } from "../../../utils/mapsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareReview = (props) => {
	const [mapList, setMapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroup, setSelectedGroup] = useState("")
	const [selectedMap, setSelectedMap] = useState("")
	const [selectedGroupValue, setSelectedGroupValue] = useState("")
	const [selectedMapValue, setSelectedMapValue] = useState("")

	useEffect(() => {
		maps
			.queryFeatures({
				where: "1=1",
				outFields: ["*"],
			})
			.then((response) => {
				const tempMapList = []
				const mapGroupSet = new Set()
				let tempSelectedMapValue
				for (let feature in response.features) {
					mapGroupSet.add(response.features[feature].attributes.Grupe)

					if (response.features[feature].attributes.Tipas === "Tile Layer") {
						const mapLayer = new TileLayer({
							url: response.features[feature].attributes.Nuoroda,
							title: response.features[feature].attributes.Pavadinimas,
							group: response.features[feature].attributes.Grupe,
							globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
						})
						tempMapList.push(mapLayer)
					} else if (response.features[feature].attributes.Tipas === "Map Layer") {
						const mapLayer = new MapImageLayer({
							url: response.features[feature].attributes.Nuoroda,
							title: response.features[feature].attributes.Pavadinimas,
							group: response.features[feature].attributes.Grupe,
							globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
						})
						tempMapList.push(mapLayer)
					}

					if (response.features[feature].attributes.Pavadinimas === "Sentinel RGB") {
						tempSelectedMapValue = feature
					}
				}
				setGroupList([...mapGroupSet])
				setMapList(tempMapList)

				setSelectedGroup("Stambaus mastelio žemėlapiai")
				setSelectedGroupValue([...mapGroupSet].indexOf("Stambaus mastelio žemėlapiai"))
				setSelectedMap(tempMapList[tempSelectedMapValue])
				setSelectedMapValue(tempSelectedMapValue)
			})
	}, [])

	useEffect(() => {
		// console.log(selectedMap)
		map.removeAll()
		map.add(selectedMap)
	}, [selectedMap])

	const handleGroupChange = (event) => {
		setSelectedGroup(groupList[event.target.value])
		setSelectedGroupValue(event.target.value)
	}
	const handleMapChange = (event) => {
		setSelectedMap(mapList[event.target.value])
		setSelectedMapValue(event.target.value)
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
					zIndex: 2,
				}}
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
			>
				<FormControl
					sx={{
						mt: 1.5,
						width: "auto",
						minWidth: 125,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Grupė</InputLabel>
					<Select label="Grupe" value={selectedGroupValue} onChange={handleGroupChange}>
						{groupList.map((group, index) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
								{group}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
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
						mt: -8,
						width: "auto",
						minWidth: 125,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Žemėlapis</InputLabel>
					<Select label="Zemelapis" value={selectedMapValue} onChange={handleMapChange}>
						{mapList.map((map, index) =>
							map.group === selectedGroup ? (
								<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
									{map.title}
								</MenuItem>
							) : null
						)}
					</Select>
				</FormControl>
			</Grid>
		</>
	)
}

export default CompareReview
