import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { objects, view } from "../../../../utils/streetsArcgisItems"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const viewHandles = []

const Filter = (props) => {
	const { t, i18n } = useTranslation()

	const [showAlert, setShowAlert] = useState(false)
	const [extentCheck, setExtentCheck] = useState(true)
  const [selectedMemoryFilter, setSelectedMemoryFilter] = useState("")

	const objectFilter = [
		{
			alias: "D1",
			code: 0,
		},
		{
			alias: "D2",
			code: 1,
		},
		{
			alias: "D",
			code: 2,
		},
		{
			alias: "C2",
			code: 3,
		},
		{
			alias: "D3",
			code: 4,
		},
		{
			alias: "AS",
			code: 5,
		},
		{
			alias: "C1",
			code: 6,
		},
		{
			alias: "B1",
			code: 7,
		},
		{
			alias: "F1",
			code: 8,
		},
		{
			alias: "B2",
			code: 9,
		},
		{
			alias: "P",
			code: 10,
		},
		{
			alias: "E2",
			code: 11,
		},
		{
			alias: "S",
			code: 12,
		},
		{
			alias: "A2",
			code: 13,
		},
	]

	const handleObjectSelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter(event.target.value)
	}

  const handleMemorySelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		setSelectedMemoryFilter(event.target.value)
	}
  
	const handleClearFilters = () => {
    props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter("")
    setSelectedMemoryFilter(event.target.value)
		setExtentCheck(false)
		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0
		props.setSearchObjectsList(props.objectsList)
	}
	const handleExtent = () => {
		view.whenLayerView(objects).then((objectsView) => {
			if (!extentCheck) {
				objectsView
					.queryFeatures({
						outFields: ["OBJECTID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
						where: objectsView.filter.where,
						geometry: view.extent,
						returnGeometry: false,
					})
					.then((response) => {
						if (response.features.length) {
							props.setSearchObjectsList(response.features)
						}
					})
			}
		})

		setExtentCheck(!extentCheck)
	}

	useEffect(() => {
		let query

		if (props.selectedObjectFilter !== "" && selectedMemoryFilter === "") {
			query = `Klasė = ${props.selectedObjectFilter}`
		} else if (props.selectedObjectFilter === "" && selectedMemoryFilter !== "") {
			query = `Poklasis = ${selectedMemoryFilter}`
		} else if (props.selectedObjectFilter !== "" && selectedMemoryFilter !== "") {
			query = `Poklasis = ${selectedMemoryFilter} AND Klasė = ${props.selectedObjectFilter}`
		}

    if (
			props.selectedObjectFilter === "" &&
			selectedMemoryFilter === "" 
		) {
			query = ""
		}

		view.whenLayerView(objects).then((objectsView) => {
			objectsView.filter = {
				//geometry: extentCheck ? view.extent : null,
				where: query,
			}

			watchUtils.whenNotOnce(objectsView, "updating").then(() => {
				if (!extentCheck) {
					objectsView
						.queryFeatures({
							outFields: ["OBJECTID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
							//outFields: objectsView.availableFields,
							where: objectsView.filter.where,
							returnGeometry: false,
						})
						.then((response) => {
							const objectTypes = new Set()

							if (response.features.length) {
								props.setSearchObjectsList(response.features)
								if (query !== "") {
									for (let feature in response.features) {
										for (let attribute in response.features[feature].attributes) {
											if (attribute === "KATEGOR") {
												if (response.features[feature].attributes[attribute] !== null) {
													objectTypes.add(response.features[feature].attributes[attribute])
												}
											}
										}
									}
									props.setVisibleObjectIcons([...objectTypes])
								} else {
									props.setVisibleObjectIcons([])
								}
							} else {
								setShowAlert(true)
								props.setSelectedObjectFilter("")
							}
						})
				}
			})
		})
	}, [props.selectedObjectFilter, selectedMemoryFilter])

	useEffect(() => {
		viewHandles.forEach((handle) => {
			handle.remove()
		})
		viewHandles.length = 0

		view.whenLayerView(objects).then((objectsView) => {
			if (extentCheck) {
				viewHandles.push(
					objectsView.watch("updating", (updating) => {
						if (!updating) {
							objectsView
								.queryFeatures({
									outFields: ["OBJECTID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
									where: objectsView.filter.where,
									geometry: view.extent,
									returnGeometry: false,
								})
								.then((response) => {
									props.setSearchObjectsList(response.features)
								})
						}
					})
				)
			} else {
				watchUtils.whenNotOnce(objectsView, "updating").then(() => {
					objectsView
						.queryFeatures({
							outFields: ["OBJECTID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
							where: objectsView.filter.where,
							geometry: null,
							returnGeometry: false,
						})
						.then((response) => {
							if (response.features.length) {
								props.setSearchObjectsList(response.features)
							}
						})
				})
			}
		})
	}, [extentCheck])

	// useEffect(() => {
	// 	return () => {
	//     console.log("first")
	// 		viewHandles.forEach((handle) => {
	// 			handle.remove()
	// 		})
	// 		viewHandles.length = 0
	// 	}
	// }, [])

	return (
		<>
			<Snackbar open={showAlert} autoHideDuration={4000} onClose={() => setShowAlert(false)}>
				<Alert
					onClose={() => setShowAlert(false)}
					severity="info"
					sx={{ backgroundColor: "#D42323", width: "100%", zIndex: 3 }}
				>
					{t("plaques.options.notFound")}
				</Alert>
			</Snackbar>
			<Box sx={{ ml: 0.5, mr: 0.5 }}>
				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">Objekto klasė</InputLabel>
					<Select
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={props.selectedObjectFilter}
						label="Objekto klasė"
						onChange={handleObjectSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{props.initialObjectsClasses[0].map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">Objekto poklasė</InputLabel>
					<Select
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={selectedMemoryFilter}
						label="Objekto poklasė"
						onChange={handleMemorySelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{props.initialObjectsClasses[1].map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* <FormGroup>
					<FormControlLabel
						control={<Checkbox checked={extentCheck} onChange={handleExtent} />}
						label={t("plaques.options.extent")}
					/>
				</FormGroup> */}

				<Button
					variant="contained"
					color="secondary"
					disableElevation
					sx={{ mt: 1, mb: 1, width: "100%" }}
					onClick={handleClearFilters}
				>
					{t("plaques.options.clearFilters")}
				</Button>
			</Box>
		</>
	)
}

export default Filter
