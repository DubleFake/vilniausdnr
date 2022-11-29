import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { objects, view } from "../../../../utils/streetsArcgisItems"
import Count from "./Count"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const viewHandles = []

const Filter = (props) => {
	const { t, i18n } = useTranslation()

	const [showAlert, setShowAlert] = useState(false)
	const [extentCheck, setExtentCheck] = useState(false)
	const [selectedMemoryFilter, setSelectedMemoryFilter] = useState("")

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
		setSelectedMemoryFilter("")
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
						outFields: ["OBJECTID", "GAT_ID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
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

		if (props.selectedObjectFilter === "" && selectedMemoryFilter === "") {
			query = ""
		}

		view.whenLayerView(objects).then((objectsView) => {
			objectsView.filter = {
				//geometry: extentCheck ? view.extent : null,
				where: query,
			}

			watchUtils.whenNotOnce(objectsView, "updating").then(() => {
				if (!extentCheck) {
					objects //problema del extent su objectsView
						.queryFeatures({
							outFields: ["OBJECTID", "GAT_ID", "KATEGOR", "PAV", "Klasė", "Poklasis"],
							//outFields: objectsView.availableFields,
							where: objectsView.filter.where,
							geometry: null,
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
								setSelectedMemoryFilter("")
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
			<Container variant="filter">
				<FormControl variant="outlined" size="small">
					<InputLabel id="object-select-label">Objekto klasė</InputLabel>
					<Select
						variant="outlined"
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
				{props.selectedObjectFilter && (
					<FormControl variant="outlined" size="small">
						<InputLabel id="object-select-label">Objekto poklasė</InputLabel>
						<Select
							variant="outlined"
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
							{props.initialObjectsClasses[1].map(
								(object) =>
									props.selectedObjectFilter !== "" &&
									props.initialObjectsClasses[2][props.selectedObjectFilter - 1].includes(object.code) && (
										<MenuItem sx={{ whiteSpace: "unset" }} key={object.code} value={object.code}>
											{object.alias}
										</MenuItem>
									)
							)}
						</Select>
					</FormControl>
				)}

				{/* <FormGroup>
					<FormControlLabel
						control={<Checkbox checked={extentCheck} onChange={handleExtent} />}
						label={t("plaques.options.extent")}
					/>
				</FormGroup> */}
			</Container>

			<Grid variant="result" container direction="row" justifyContent="space-between" alignItems="center">
				<Typography sx={{ mt: 1, fontWeight: "bold" }} variant="h5">
					Rezultatai
					<Count objectCount={props.objectCount}></Count>
				</Typography>

				{(props.searchInputValue ||
					props.selectedObjectFilter ||
					props.selectedMemoryFilter ||
					props.selectedPeriodFilter) && (
					<Button
						color="secondary"
						disableElevation
						sx={{ width: "auto", borderRadius: "30px", backgroundColor: "white" }}
						onClick={handleClearFilters}
					>
						{t("plaques.options.clearFilters")}
					</Button>
				)}
			</Grid>
		</>
	)
}

export default Filter
