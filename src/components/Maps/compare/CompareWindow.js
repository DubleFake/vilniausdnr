import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, map2, maps } from "../../../utils/mapsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareWindow = (props) => {
	const { globalIDLeft, globalIDRight } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [selectedLeftMap, setSelectedLeftMap] = useState(8)
	const [selectedRightMap, setSelectedRightMap] = useState(7)
	const [mapList, setmapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroupLeft, setSelectedGroupLeft] = useState("")
	const [selectedGroupValueLeft, setSelectedGroupValueLeft] = useState("")
	const [selectedGroupRight, setSelectedGroupRight] = useState("")
	const [selectedGroupValueRight, setSelectedGroupValueRight] = useState("")

	useEffect(() => {
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

				setGroupList([...mapGroupSet])
				setmapList(tempMaps)

				const mapByIdLeft = tempMaps.find((map) => map.globalid_map === globalIDLeft)
				const mapByIdRight = tempMaps.find((map) => map.globalid_map === globalIDRight)

				setSelectedGroupLeft(mapByIdLeft.group)
				setSelectedGroupValueLeft([...mapGroupSet].indexOf(mapByIdLeft.group))
				setSelectedLeftMap(mapByIdLeft.index)
				setSelectedGroupRight(mapByIdRight.group)
				setSelectedGroupValueRight([...mapGroupSet].indexOf(mapByIdRight.group))
				setSelectedRightMap(mapByIdRight.index)
        
        map.removeAll()
        map2.removeAll()
				map.add(tempMaps[mapByIdLeft.index])
				map2.add(tempMaps[mapByIdRight.index])
				props.setToggleCompareWindow(true)
			})
	}, [globalIDLeft, globalIDRight])

	useEffect(() => {
		return () => {
			props.setToggleCompareWindow(false)

			map.removeAll()
			map2.removeAll()
		}
	}, [])

	const handleLeftSelect = (event) => {
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/window/${mapByIndex.globalid_map}/${globalIDRight}`)

		map.remove(mapList[selectedLeftMap])
		map.add(mapList[event.target.value])

		setSelectedLeftMap(event.target.value)
	}

	const handleRightSelect = (event) => {
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/window/${globalIDLeft}/${mapByIndex.globalid_map}`)

		map2.remove(mapList[selectedRightMap])
		map2.add(mapList[event.target.value])

		setSelectedRightMap(event.target.value)
	}

	const handleGroupChangeLeft = (event) => {
    const mapByGroup = mapList.find(map => map.group === groupList[event.target.value] && map.index !== String(selectedRightMap))
    navigate(`/vilniausdnr/${i18n.language}/maps/compare/window/${mapByGroup.globalid_map}/${globalIDRight}`)

		setSelectedGroupLeft(groupList[event.target.value])
		setSelectedGroupValueLeft(event.target.value)
	}
	const handleGroupChangeRight = (event) => {
    const mapByGroup = mapList.find(map => map.group === groupList[event.target.value] && map.index !== String(selectedLeftMap))
    navigate(`/vilniausdnr/${i18n.language}/maps/compare/window/${globalIDLeft}/${mapByGroup.globalid_map}`)

		setSelectedGroupRight(groupList[event.target.value])
		setSelectedGroupValueRight(event.target.value)
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
						{mapList.map(
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
						{mapList.map(
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

export default CompareWindow
