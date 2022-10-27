import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, maps } from "../../../utils/mapsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareReview = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [mapList, setMapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroup, setSelectedGroup] = useState("")
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

				if (globalID) {
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
							tempMapList.push(mapLayer)
						} else if (response.features[feature].attributes.Tipas === "Map Layer") {
							const mapLayer = new MapImageLayer({
								url: response.features[feature].attributes.Nuoroda,
								title: response.features[feature].attributes.Pavadinimas,
								group: response.features[feature].attributes.Grupe,
								globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
								index: feature,
							})
							tempMapList.push(mapLayer)
						}
					}
				} else {
					const defaultMap = response.features.find((map) => map.attributes.GlobalID_zemelapio === "42e1492a-d5ac-4d09-ac03-90a6efb54d6e")
					navigate(defaultMap.attributes.GlobalID_zemelapio)
				}

				setGroupList([...mapGroupSet])
				setMapList(tempMapList)

				const mapById = tempMapList.find((map) => map.globalid_map === globalID)
				if (mapById) {
					setSelectedGroup(mapById.group)
					setSelectedGroupValue([...mapGroupSet].indexOf(mapById.group))
					setSelectedMapValue(mapById.index)

					map.removeAll()
					map.add(tempMapList[mapById.index])
				}
			})
	}, [globalID])

	const handleGroupChange = (event) => {
    const mapByGroup = mapList.find(map => map.group === groupList[event.target.value])
    navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByGroup.globalid_map}`)

		setSelectedGroup(groupList[event.target.value])
		setSelectedGroupValue(event.target.value)
	}
	const handleMapChange = (event) => {
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByIndex.globalid_map}`)
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
