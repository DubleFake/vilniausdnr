import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { map, map2, maps, view, view2 } from "../../../utils/mapsArcgisItems"
import DNRSpinner from "../../../utils/misc/DNRSpinner"

import MenuItem from "@mui/material/MenuItem"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import { NestedMenuItem } from "mui-nested-menu"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Backdrop from "@mui/material/Backdrop"
import useMediaQuery from "@mui/material/useMediaQuery"

import TileLayer from "@arcgis/core/layers/TileLayer"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils"

const CompareWindow = (props) => {
	const { globalIDLeft, globalIDRight } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [selectedLeftMap, setSelectedLeftMap] = useState(0)
	const [selectedRightMap, setSelectedRightMap] = useState(1)
	const [mapList, setMapList] = useState([])
	const [groupList, setGroupList] = useState([])
	const [selectedGroupValueLeft, setSelectedGroupValueLeft] = useState(3)
	const [selectedGroupValueRight, setSelectedGroupValueRight] = useState(3)

	const [anchorElLeft, setAnchorElLeft] = React.useState(null)
	const openLeft = Boolean(anchorElLeft)

	const handleClickLeft = (e) => setAnchorElLeft(e.currentTarget)

	const handleCloseLeft = () => setAnchorElLeft(null)

	const [anchorElRight, setAnchorElRight] = React.useState(null)
	const openRight = Boolean(anchorElRight)
	const [view1Updating, setView1Updating] = useState(true)
	const [view2Updating, setView2Updating] = useState(false)

	const isMobile = useMediaQuery("(min-width:600px)")

	const handleClickRight = (e) => setAnchorElRight(e.currentTarget)

	const handleCloseRight = () => setAnchorElRight(null)

	const handleLeftSelect = (event) => {
		handleCloseLeft()
		const mapByIndex = mapList[event.target.value]
		navigate(
			`/vilniausdnr/${i18n.language}/maps/compare/window/${mapByIndex.globalid_map}/${globalIDRight}`
		)

		map.remove(mapList[selectedLeftMap])
		map.add(mapList[event.target.value])

		setSelectedLeftMap(event.target.value)
	}

	const handleRightSelect = (event) => {
		handleCloseRight()
		const mapByIndex = mapList[event.target.value]
		navigate(
			`/vilniausdnr/${i18n.language}/maps/compare/window/${globalIDLeft}/${mapByIndex.globalid_map}`
		)

		map2.remove(mapList[selectedRightMap])
		map2.add(mapList[event.target.value])

		setSelectedRightMap(event.target.value)
	}

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

				tempMaps.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }))

				setGroupList([...mapGroupSet])
				setMapList(tempMaps)

				let tempGroupList = [...mapGroupSet]

				map.removeAll()
				map2.removeAll()
				tempMaps.find((mapByIndex, index) => {
					if (mapByIndex.globalid_map === globalIDLeft) {
						setSelectedLeftMap(index)
						tempGroupList.find((groupByName, groupIndex) => {
							if (groupByName === mapByIndex.group) {
								setSelectedGroupValueLeft(groupIndex)
							}
						})
						map.add(tempMaps[index])

						reactiveUtils
							.whenOnce(() => view.updating === false)
							.then(() => {
								setView1Updating(false)
							})
					} else if (mapByIndex.globalid_map === globalIDRight) {
						setSelectedRightMap(index)
						tempGroupList.find((groupByName, groupIndex) => {
							if (groupByName === mapByIndex.group) {
								setSelectedGroupValueRight(groupIndex)
							}
						})
						map2.add(tempMaps[index])

						reactiveUtils
							.whenOnce(() => view2.updating === false)
							.then(() => {
								setView2Updating(false)
							})
					}
				})

				props.setToggleCompareWindow(true)
			})
	}, [globalIDLeft, globalIDRight])

	useEffect(() => {
		console.log(view1Updating, view2Updating)
		if (!view1Updating && !view2Updating) {
			props.setInitialLoading(true)
		}
	}, [view1Updating, view2Updating])

	useEffect(() => {
		return () => {
			props.setToggleCompareWindow(false)

			map.removeAll()
			map2.removeAll()
		}
	}, [])

	return (
		<>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={view1Updating && view2Updating}
			>
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
				direction={isMobile ? "row" : "column"}
				justifyContent="center"
				alignItems={isMobile ? "flex-start" : "center"}
			>
				{mapList.length && (
					<>
						<Button
							sx={{
								bottom: 16,
								mt: isMobile ? -7.5 : -14,
								mr: isMobile ? 85 : 0,
								width: "auto",
								height: "45px",
								borderRadius: "30px",
								backgroundColor: "white",
								"&:hover": { backgroundColor: "white" },
								textTransform: "none",
								position: "relative",
								zIndex: 5,
							}}
							onClick={handleClickLeft}
							endIcon={<ArrowDropDownIcon />}
						>
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Kairys žemėlapis: </Typography>
								{mapList[selectedLeftMap].title}
							</Typography>
						</Button>
						<Menu
							anchorEl={anchorElLeft}
							open={openLeft}
							onClose={handleCloseLeft}
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
										color: groupIndex === selectedGroupValueLeft && "#D72E30",
										backgroundColor: groupIndex === selectedGroupValueLeft && "#F7D5D6",
									}}
									rightIcon={<ArrowDropDownIcon />}
									label={group}
									key={groupIndex}
									parentMenuOpen={openLeft}
								>
									{mapList.map((map, index) =>
										map.group === group && map.globalid_map !== globalIDRight ? (
											<MenuItem
												sx={{
													whiteSpace: "unset",
													color: map.globalid_map === globalIDLeft && "#D72E30",
													backgroundColor: map.globalid_map === globalIDLeft && "#F7D5D6",
													justifyContent: isMobile ? "center" : "flex-start",
												}}
												key={index}
												value={index}
												onClick={handleLeftSelect}
											>
												{map.title}
											</MenuItem>
										) : null
									)}
								</NestedMenuItem>
							))}
						</Menu>
					</>
				)}
				{mapList.length && (
					<>
						<Button
							sx={{
								bottom: 16,
								mt: isMobile ? -7.5 : 1,
								ml: isMobile ? 85 : 0,
								width: "auto",
								height: "45px",
								borderRadius: "30px",
								backgroundColor: "white",
								"&:hover": { backgroundColor: "white" },
								textTransform: "none",
								position: "relative",
								zIndex: 5,
							}}
							onClick={handleClickRight}
							endIcon={<ArrowDropDownIcon />}
						>
							<Typography sx={{ color: "#D72E30" }}>
								<Typography sx={{ color: "black", display: "inline" }}>Dešinys žemėlapis: </Typography>
								{mapList[selectedRightMap].title}
							</Typography>
						</Button>
						<Menu
							anchorEl={anchorElRight}
							open={openRight}
							onClose={handleCloseRight}
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
										color: groupIndex === selectedGroupValueRight && "#D72E30",
										backgroundColor: groupIndex === selectedGroupValueRight && "#F7D5D6",
									}}
									rightIcon={<ArrowDropDownIcon />}
									label={group}
									key={groupIndex}
									parentMenuOpen={openRight}
									MenuProps={{
										anchorOrigin: {
											vertical: "top",
											horizontal: "left",
										},
										transformOrigin: {
											vertical: "top",
											horizontal: "right",
										},
									}}
								>
									{mapList.map((map, index) =>
										map.group === group && map.globalid_map !== globalIDLeft ? (
											<MenuItem
												sx={{
													whiteSpace: "unset",
													color: map.globalid_map === globalIDRight && "#D72E30",
													backgroundColor: map.globalid_map === globalIDRight && "#F7D5D6",
													justifyContent: isMobile ? "center" : "flex-start",
												}}
												key={index}
												value={index}
												onClick={handleRightSelect}
											>
												{map.title}
											</MenuItem>
										) : null
									)}
								</NestedMenuItem>
							))}
						</Menu>
					</>
				)}
			</Grid>
		</>
	)
}

export default CompareWindow
