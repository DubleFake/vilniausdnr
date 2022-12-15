import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, view, maps } from "../../../utils/mapsArcgisItems"

import Swipe from "@arcgis/core/widgets/Swipe"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"

const CompareSwipe = () => {
	const { globalIDLeft, globalIDRight } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [selectedLeftMap, setSelectedLeftMap] = useState(8)
	const [selectedRightMap, setSelectedRightMap] = useState(7)
	const [mapList, setmapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroupLeft, setSelectedGroupLeft] = useState("1")
	const [selectedGroupValueLeft, setSelectedGroupValueLeft] = useState("1")
	const [selectedGroupRight, setSelectedGroupRight] = useState("2")
	const [selectedGroupValueRight, setSelectedGroupValueRight] = useState("2")

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
							let subLayer
							let urlNew

							if (response.features[feature].attributes.Nuoroda) {
								const urlSplit = response.features[feature].attributes.Nuoroda.split("/")
								subLayer = parseInt(urlSplit.slice(-1))
								urlNew = urlSplit.slice(0, -1).join("/")
							}

							const mapLayer = new MapImageLayer({
								url: isNaN(subLayer) ? response.features[feature].attributes.Nuoroda : urlNew,
								sublayers: isNaN(subLayer) ? [{}] : [{ id: subLayer }],
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
						(map) => map.attributes.GlobalID_zemelapio === "42e1492a-d5ac-4d09-ac03-90a6efb54d6e"
					)
					const defaultMapRight = response.features.find(
						(map) => map.attributes.GlobalID_zemelapio === "c0b7610e-3e12-4e03-a915-9673d1906502"
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

				const swipeWidgetFind = view.ui.find("swipe-layers")
				if (swipeWidgetFind !== null) {
					view.ui.remove(swipeWidgetFind)
					swipeWidgetFind.destroy()
				}

				map.removeAll()
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
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${mapByIndex.globalid_map}/${globalIDRight}`)

		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(mapList[selectedLeftMap])
		map.add(mapList[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [mapList[event.target.value]],
			trailingLayers: [mapList[selectedRightMap]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedLeftMap(event.target.value)
	}

	const handleRightSelect = (event) => {
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${globalIDLeft}/${mapByIndex.globalid_map}`)

		const swipeWidgetFind = view.ui.find("swipe-layers")
		if (swipeWidgetFind !== null) {
			view.ui.remove(swipeWidgetFind)
			swipeWidgetFind.destroy()
		}

		map.remove(mapList[selectedRightMap])
		map.add(mapList[event.target.value])

		const swipe = new Swipe({
			view: view,
			leadingLayers: [mapList[selectedLeftMap]],
			trailingLayers: [mapList[event.target.value]],
			direction: "horizontal",
			position: 50,
			id: "swipe-layers",
		})
		view.ui.add(swipe)

		setSelectedRightMap(event.target.value)
	}

	const handleGroupChangeLeft = (event) => {
		const mapByGroup = mapList.find(
			(map) => map.group === groupList[event.target.value] && map.index !== String(selectedRightMap)
		)
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${mapByGroup.globalid_map}/${globalIDRight}`)

		setSelectedGroupLeft(groupList[event.target.value])
		setSelectedGroupValueLeft(event.target.value)
	}
	const handleGroupChangeRight = (event) => {
		const mapByGroup = mapList.find(
			(map) => map.group === groupList[event.target.value] && map.index !== String(selectedLeftMap)
		)
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/swipe/${globalIDLeft}/${mapByGroup.globalid_map}`)

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
						mt: 1.5,
						mr: 85,
						width: "auto",
						height: "45px",
						backgroundColor: "white",
						boxShadow: 0,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					<Select
						value={selectedGroupValueLeft}
						onChange={handleGroupChangeLeft}
						renderValue={(value) => (
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Kairė grupė: </Typography>
								{groupList[value]}
							</Typography>
						)}
					>
						{groupList.map((group, index) => (
							<MenuItem
								sx={{
									whiteSpace: "unset",
									"&.Mui-selected": {
										color: "#D72E30",
									},
									justifyContent: "center",
								}}
								key={index}
								value={index}
							>
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
						ml: 85,
						width: "auto",
						height: "45px",
						backgroundColor: "white",
						boxShadow: 0,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					<Select
						value={selectedGroupValueRight}
						onChange={handleGroupChangeRight}
						renderValue={(value) => (
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Dešinė grupė: </Typography>
								{groupList[value]}
							</Typography>
						)}
					>
						{groupList.map((group, index) => (
							<MenuItem
								sx={{
									whiteSpace: "unset",
									"&.Mui-selected": {
										color: "#D72E30",
									},
									justifyContent: "center",
								}}
								key={index}
								value={index}
							>
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
						mr: 85,
						width: "auto",
						height: "45px",
						backgroundColor: "white",
						boxShadow: 0,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					{mapList.length && (
						<Select
							value={selectedLeftMap}
							onChange={handleLeftSelect}
							renderValue={(value) => (
								<Typography sx={{ color: "#D72E30" }}>
									<Typography sx={{ color: "black", display: "inline" }}>Kairys žemėlapis: </Typography>
									{mapList[value].title}
								</Typography>
							)}
							MenuProps={{
								sx: { maxHeight: "50%" },
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                transformOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
							}}
						>
							{mapList.map(
								(object, index) =>
									object.globalid_map !== mapList[selectedRightMap].globalid_map &&
									object.group === selectedGroupLeft && (
										<MenuItem
											sx={{
												whiteSpace: "unset",
												"&.Mui-selected": {
													color: "#D72E30",
												},
												justifyContent: "center",
											}}
											key={index}
											value={index}
										>
											{object.title}
										</MenuItem>
									)
							)}
						</Select>
					)}
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
						ml: 85,
						width: "auto",
						height: "45px",
						backgroundColor: "white",
						boxShadow: 0,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					{mapList.length && (
						<Select
							value={selectedRightMap}
							onChange={handleRightSelect}
							renderValue={(value) => (
								<Typography sx={{ color: "#D72E30" }}>
									<Typography sx={{ color: "black", display: "inline" }}>Dešinys žemėlapis: </Typography>
									{mapList[value].title}
								</Typography>
							)}
							MenuProps={{
								sx: { maxHeight: "50%" },
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                transformOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
							}}
						>
							{mapList.map(
								(object, index) =>
									object.globalid_map !== mapList[selectedLeftMap].globalid_map &&
									object.group === selectedGroupRight && (
										<MenuItem
											sx={{
												whiteSpace: "unset",
												"&.Mui-selected": {
													color: "#D72E30",
												},
												justifyContent: "center",
											}}
											key={index}
											value={index}
										>
											{object.title}
										</MenuItem>
									)
							)}
						</Select>
					)}
				</FormControl>
			</Grid>
		</>
	)
}

export default CompareSwipe
