import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, view, maps } from "../../../utils/mapsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareSwipe = () => {
	const { globalIDLeft, globalIDRight } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [selectedLeftMap, setSelectedLeftMap] = useState(8)
	const [selectedRightMap, setSelectedRightMap] = useState(7)
	const [mapsList, setMapsList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroupLeft, setSelectedGroupLeft] = useState("")
	const [selectedGroupValueLeft, setSelectedGroupValueLeft] = useState("")
	const [selectedGroupRight, setSelectedGroupRight] = useState("")
	const [selectedGroupValueRight, setSelectedGroupValueRight] = useState("")

	useEffect(() => {
		map.removeAll()
		const tempMaps = []

		maps
			.queryFeatures({
				where: "1=1",
				outFields: ["*"],
			})
			.then((response) => {
				const mapGroupSet = new Set()

				if (globalIDLeft && globalIDRight) {
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
							tempMaps.push(mapLayer)
						} else if (response.features[feature].attributes.Tipas === "Map Layer") {
							const mapLayer = new MapImageLayer({
								url: response.features[feature].attributes.Nuoroda,
								title: response.features[feature].attributes.Pavadinimas,
								group: response.features[feature].attributes.Grupe,
								globalid_map: response.features[feature].attributes.GlobalID_zemelapio,
								index: feature,
							})
							tempMaps.push(mapLayer)
						}
					}
				} else {
					const defaultMapLeft = response.features.find(
						(map) => map.attributes.Pavadinimas === "Sentinel RGB"
					)
					const defaultMapRight = response.features.find(
						(map) => map.attributes.Pavadinimas === "Sentinel NIR"
					)
					navigate(
						`${defaultMapLeft.attributes.GlobalID_zemelapio}/${defaultMapRight.attributes.GlobalID_zemelapio}`
					)
				}
				console.log(globalIDLeft, globalIDRight)

				setGroupList([...mapGroupSet])
				setMapsList(tempMaps)

				const mapByIdLeft = tempMaps.find((map) => map.globalid_map === globalIDLeft)
				const mapByIdRight = tempMaps.find((map) => map.globalid_map === globalIDRight)

				setSelectedGroupLeft(mapByIdLeft.group)
				setSelectedGroupValueLeft([...mapGroupSet].indexOf(mapByIdLeft.group))
				setSelectedLeftMap(mapByIdLeft.index)
				setSelectedGroupRight(mapByIdRight.group)
				setSelectedGroupValueRight([...mapGroupSet].indexOf(mapByIdRight.group))
				setSelectedRightMap(mapByIdRight.index)

				const swipeWidgetFind = view.ui.find("swipe-layers")
				if (swipeWidgetFind !== null) {
					view.ui.remove(swipeWidgetFind)
					swipeWidgetFind.destroy()
				}

				map.addMany([tempMaps[mapByIdLeft.index], tempMaps[mapByIdRight.index]])

				const swipe = new Swipe({
					view: view,
					leadingLayers: [tempMaps[mapByIdLeft.index]],
					trailingLayers: [tempMaps[mapByIdRight.index]],
					direction: "horizontal",
					position: 50,
					id: "swipe-layers",
				})

				view.ui.add(swipe)
			})
	}, [globalIDLeft, globalIDRight])

	useEffect(() => {
		return () => {
			const swipeWidgetFind = view.ui.find("swipe-layers")
			if (swipeWidgetFind !== null) {
				view.ui.remove(swipeWidgetFind)
				swipeWidgetFind.destroy()
			}

			map.removeAll()
		}
	}, [])

	const handleLeftSelect = (event) => {
    const mapByIndex = mapsList.find((map) => map.index === String(event.target.value))
    navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${mapByIndex.globalid_map}/${globalIDRight}`)

		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(mapsList[selectedLeftMap])
		map.add(mapsList[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [mapsList[event.target.value]],
			trailingLayers: [mapsList[selectedRightMap]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedLeftMap(event.target.value)
	}

	const handleRightSelect = (event) => {
    const mapByIndex = mapsList.find((map) => map.index === String(event.target.value))
    navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${globalIDLeft}/${mapByIndex.globalid_map}`)

		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(mapsList[selectedRightMap])
		map.add(mapsList[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [mapsList[selectedLeftMap]],
			trailingLayers: [mapsList[event.target.value]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedRightMap(event.target.value)
	}

	const handleGroupChangeLeft = (event) => {
		setSelectedGroupLeft(groupList[event.target.value])
		setSelectedGroupValueLeft(event.target.value)
	}
	const handleGroupChangeRight = (event) => {
		setSelectedGroupRight(groupList[event.target.value])
		setSelectedGroupValueRight(event.target.value)
	}

	// const handleMapChange = (event) => {
	//   const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
	//   if (mapByIndex) {
	//     console.log(mapByIndex)
	//     navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByIndex.globalid_map}`)
	//   }
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
				<FormControl
					sx={{
						mr: 2,
						mt: 1.5,
						width: 250,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Kairio sluoksnio grupė</InputLabel>
					<Select label="Grupe" value={selectedGroupValueLeft} onChange={handleGroupChangeLeft}>
						{groupList.map((group, index) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
								{group}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl
					sx={{
						ml: 2,
						mt: 1.5,
						width: 250,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Dešinio sluoksnio grupė</InputLabel>
					<Select label="Grupe" value={selectedGroupValueRight} onChange={handleGroupChangeRight}>
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
						mt: -7.5,
						mr: 2,
						width: 250,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Kairys sluoksnis</InputLabel>
					<Select value={selectedLeftMap} label="Sluoksnis" onChange={handleLeftSelect}>
						{mapsList.map(
							(object, index) =>
								index !== selectedRightMap &&
								object.group === selectedGroupLeft && (
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
						width: 250,
						backgroundColor: "white",
					}}
					variant="filled"
					size="small"
					id="swipe-select"
				>
					<InputLabel>Dešinys sluoksnis</InputLabel>
					<Select value={selectedRightMap} label="Sluoksnis" onChange={handleRightSelect}>
						{mapsList.map(
							(object, index) =>
								index !== selectedLeftMap &&
								object.group === selectedGroupRight && (
									<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
										{object.title}
									</MenuItem>
								)
						)}
					</Select>
				</FormControl>
			</Grid>
		</>
	)
}

export default CompareSwipe
