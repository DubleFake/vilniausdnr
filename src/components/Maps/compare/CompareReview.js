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
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import { NestedMenuItem } from "mui-nested-menu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

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

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (e) => setAnchorEl(e.currentTarget)

	const handleClose = () => setAnchorEl(null)

	const handleGroupChange = (event) => {
		const mapByGroup = mapList.find((map) => map.group === groupList[event.target.value])
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByGroup.globalid_map}`)

		setSelectedGroup(groupList[event.target.value])
		setSelectedGroupValue(event.target.value)
	}
	const handleMapChange = (event) => {
		handleClose()
		const mapByIndex = mapList.find((map) => map.index === String(event.target.value))
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByIndex.globalid_map}`)
	}

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

	return (
		<>
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
				<Button
					sx={{
						mt: -10,
						borderRadius: "30px",
						height: "45px",
						backgroundColor: "white",
						"&:hover": { backgroundColor: "white" },
						textTransform: "none",
					}}
					onClick={handleClick}
					endIcon={<ArrowDropDownIcon />}
				>
					<Typography sx={{ color: "#D72E30" }}>
						<Typography sx={{ color: "black", display: "inline" }}>Žemėlapis: </Typography>
						{selectedMapValue && mapList[selectedMapValue].title}
					</Typography>
				</Button>

				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
				>
					{groupList.map((group, groupIndex) => (
						<NestedMenuItem
							sx={{
								color: groupIndex === selectedGroupValue && "#D72E30",
								backgroundColor: map.globalid_map === globalID && "#F7D5D6",
							}}
							rightIcon={<ArrowDropDownIcon />}
							label={group}
							key={groupIndex}
							parentMenuOpen={open}
						>
							{mapList.map((map, index) =>
								map.group === group ? (
									<MenuItem
										sx={{
											whiteSpace: "unset",
											color: map.globalid_map === globalID && "#D72E30",
											backgroundColor: map.globalid_map === globalID && "#F7D5D6",
											justifyContent: "center",
										}}
										key={index}
										value={index}
										onClick={handleMapChange}
									>
										{map.title}
									</MenuItem>
								) : null
							)}
						</NestedMenuItem>
					))}
				</Menu>
			</Grid>
		</>
	)
}

export default CompareReview
