import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, maps } from "../../../utils/mapsArcgisItems"

import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"

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
							tempMapList.push(mapLayer)
						}
					}
				} else {
					const defaultMap = response.features.find(
						(map) => map.attributes.GlobalID_zemelapio === "42e1492a-d5ac-4d09-ac03-90a6efb54d6e"
					)
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
		const mapByGroup = mapList.find((map) => map.group === groupList[event.target.value])
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
						width: "auto",
						height: "45px",
						boxShadow: 0,
						mt: 2,
						ml: 2,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					<Select
						value={selectedGroupValue}
						onChange={handleGroupChange}
						renderValue={(value) => (
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Grupė: </Typography>
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
						mt: -8,
						backgroundColor: "white",
						width: "auto",
						height: "45px",
						boxShadow: 0,
						ml: 2,
					}}
					variant="outlined"
					size="small"
					id="swipe-select"
				>
					<Select
						value={selectedMapValue}
						onChange={handleMapChange}
						renderValue={(value) => (
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Žemėlapis: </Typography>
								{mapList[value].title}
							</Typography>
						)}
						MenuProps={{
							sx: { maxHeight: "50%" },
							anchorOrigin: {
								vertical: "top",
								horizontal: "left",
							},
							transformOrigin: {
								vertical: "bottom",
								horizontal: "left",
							},
						}}
					>
						{mapList.map((map, index) =>
							map.group === selectedGroup ? (
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
