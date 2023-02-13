import React, { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, maps, view } from "../../../utils/mapsArcgisItems"
import DNRSpinner from "../../../utils/misc/DNRSpinner"

import MenuItem from "@mui/material/MenuItem"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { NestedMenuItem } from "mui-nested-menu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Backdrop from "@mui/material/Backdrop"
import useMediaQuery from "@mui/material/useMediaQuery"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils"
import Point from "@arcgis/core/geometry/Point"

const viewHandles = []

const CompareReview = (props) => {
	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const location = useLocation()

	// const searchParams = new URLSearchParams(location.search)
	// const x = searchParams.get("x")
	// const y = searchParams.get("y")
	// const zoom = searchParams.get("zoom")

	// if (x && y && zoom) {
	// 	view.center = {
	// 		x: x,
	// 		y: y,
	// 		spatialReference: {
	// 			wkid: 2600,
	// 		},
	// 	}
	// 	view.zoom = zoom
	// } else {
	// }

	const [mapList, setMapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroupValue, setSelectedGroupValue] = useState(3)
	const [selectedMapValue, setSelectedMapValue] = useState(0)

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const [sliderValue, setSliderValue] = useState(100)
	const [viewUpdating, setViewUpdating] = useState(false)

	const isMobile = useMediaQuery("(min-width:600px)")

	const handleSliderChange = (event, newValue) => {
		map.layers.items[0].opacity = newValue / 100
		setSliderValue(newValue)
	}

	const handleClick = (e) => setAnchorEl(e.currentTarget)

	const handleClose = () => setAnchorEl(null)

	const handleMapChange = (event) => {
		handleClose()
		const mapByIndex = mapList[event.target.value]
		navigate(`/vilniausdnr/${i18n.language}/maps/compare/review/${mapByIndex.globalid_map}`)
	}

	useEffect(() => {
		setViewUpdating(true)

		view.when(() => {
			viewHandles.forEach((handle) => {
				handle.remove()
			})
			viewHandles.length = 0

			viewHandles.push(
				reactiveUtils.when(
					() => !view.interacting,
					() => {
						const searchParams = new URLSearchParams()
						searchParams.set("x", view.center.x)
						searchParams.set("y", view.center.y)
						searchParams.set("zoom", view.zoom)

						navigate(`${location.pathname}?${searchParams.toString()}`)
					}
				)
			)
		})

		maps
			.queryFeatures({
				where: "1=1",
				outFields: ["*"],
			})
			.then((response) => {
				const tempMapList = []
				const mapGroupSet = new Set()

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
						})
						tempMapList.push(mapLayer)
					}
				}

				tempMapList.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }))

				setGroupList([...mapGroupSet])
				setMapList(tempMapList)

				map.removeAll()
				const tempGroupList = [...mapGroupSet]
				tempMapList.find((mapByIndex, index) => {
					if (mapByIndex.globalid_map === globalID) {
						setSelectedMapValue(index)
						tempGroupList.find((groupByName, groupIndex) => {
							if (groupByName === mapByIndex.group) {
								setSelectedGroupValue(groupIndex)
							}
						})

						map.add(tempMapList[index])
						reactiveUtils
							.whenOnce(() => view.updating === false)
							.then(() => {
								if (window.location.search) {
									const search = window.location.search.substring(1)
									const x = search.split("&")[0].split("=")[1]
									const y = search.split("&")[1].split("=")[1]
									const zoom = search.split("&")[2].split("=")[1]

									const pt = new Point({
										x: x,
										y: y,
										spatialReference: {
											wkid: 2600,
										},
									})

									view.goTo({
										target: pt,
										zoom: zoom,
									})
								} else {
									const searchParams = new URLSearchParams()
									searchParams.set("x", view.center.x)
									searchParams.set("y", view.center.y)
									searchParams.set("zoom", view.zoom)

									navigate(`${location.pathname}?${searchParams.toString()}`)
								}
								props.setInitialLoading(true)
								setViewUpdating(false)
							})
					}
				})
			})
	}, [globalID])

	useEffect(() => {
		return () => {
			viewHandles.forEach((handle) => {
				handle.remove()
			})
			viewHandles.length = 0
		}
	}, [])

	return (
		<>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={viewUpdating}>
				<DNRSpinner />
			</Backdrop>
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
						{mapList.length > 0 && mapList[selectedMapValue].title}
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
								backgroundColor: groupIndex === selectedGroupValue && "#F7D5D6",
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
			<Grid
				sx={{ ml: isMobile ? "inherit" : -2.25 }}
				variant="compareType"
				container
				direction="row"
				justifyContent={isMobile ? "left" : "center"}
				alignItems="flex-start"
			>
				<Box sx={{ mt: 9, ml: 2, width: 177, height: 45, borderRadius: 10, backgroundColor: "white" }}>
					<Grid container direction="row" justifyContent="center" alignItems="center">
						<Typography sx={{ mt: 0.4, mb: -1.4 }}>Permatomumas</Typography>
					</Grid>
					<Slider
						sx={{ ml: "10%", width: "80%", "& .MuiSlider-markLabel": { top: "-10px" } }}
						value={sliderValue}
						min={0}
						max={100}
						size="small"
						valueLabelDisplay="auto"
						onChange={handleSliderChange}
					/>
				</Box>
			</Grid>
		</>
	)
}

export default CompareReview
