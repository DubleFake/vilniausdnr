import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { objects, view, objectRenderer, memoryRenderer } from "../../../../utils/fotoArcgisItems"
import Count from "../searchTab/Count"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Slider from "@mui/material/Slider"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const marks = [
	{
		value: 1200,
		label: "1200",
	},
	{
		value: 2020,
		label: "2020",
	},
]

const viewHandles = []

const Filter = (props) => {
	const { t, i18n } = useTranslation()

	const [showAlert, setShowAlert] = useState(false)
	const [extentCheck, setExtentCheck] = useState(false)
	const [sliderValue, setSliderValue] = useState([1300, 2020])

	const handleObjectSelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter(event.target.value)
	}
	const handleMemorySelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedMemoryFilter(event.target.value)
	}
	const handlePeriodSelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedPeriodFilter(event.target.value)
	}

	const handleClearFilters = () => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter("")
		props.setSelectedMemoryFilter("")
		props.setSelectedPeriodFilter("")

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
						outFields: ["OBJ_PAV", "TIPAS", "ATMINT_TIP", "GlobalID"],
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

	const handleSliderChange = (event, newValue) => {
		setSliderValue(newValue)
	}

	useEffect(() => {
		let query = ""

		if (props.selectedObjectFilter !== "" && props.selectedMemoryFilter === "") {
			query = `TIPAS = ${props.selectedObjectFilter}`
		} else if (props.selectedObjectFilter === "" && props.selectedMemoryFilter !== "") {
			query = `ATMINT_TIP = ${props.selectedMemoryFilter}`
		} else if (props.selectedObjectFilter !== "" && props.selectedMemoryFilter !== "") {
			query = `ATMINT_TIP = ${props.selectedMemoryFilter} AND TIPAS = ${props.selectedObjectFilter}`
		}

		if (
			props.selectedPeriodFilter !== "" &&
			props.selectedObjectFilter === "" &&
			props.selectedMemoryFilter === ""
		) {
			query = `OBJ_LAIK_TIP = ${props.selectedPeriodFilter}`
		} else if (
			props.selectedPeriodFilter !== "" &&
			(props.selectedObjectFilter !== "" || props.selectedMemoryFilter !== "")
		) {
			let add_period = query.concat(" ", `AND OBJ_LAIK_TIP = ${props.selectedPeriodFilter}`)
			query = add_period
		}

		if (
			props.selectedObjectFilter === "" &&
			props.selectedMemoryFilter === "" &&
			props.selectedPeriodFilter === ""
		) {
			query = ""
		}

		view.whenLayerView(objects).then((objectsView) => {
			watchUtils.whenNotOnce(objectsView, "updating").then(() => {
				objectsView.filter = {
					//geometry: extentCheck ? view.extent : null,
					where: query,
				}

				if (!extentCheck) {
					objectsView
						.queryFeatures({
							outFields: ["*"],
							where: objectsView.filter.where,
							returnGeometry: false,
						})
						.then((response) => {
							const objectTypes = new Set()
							const memoryTypes = new Set()

							if (response.features.length) {
								props.setSearchObjectsList(response.features)
								if (query !== "") {
									for (let feature in response.features) {
										for (let attribute in response.features[feature].attributes) {
											if (attribute === "TIPAS") {
												if (response.features[feature].attributes[attribute] !== null) {
													objectTypes.add(response.features[feature].attributes[attribute])
												}
											} else if (attribute === "ATMINT_TIP") {
												if (response.features[feature].attributes[attribute] !== null) {
													memoryTypes.add(response.features[feature].attributes[attribute])
												}
											}
										}
									}
									props.setVisibleObjectIcons([...objectTypes])
									props.setVisibleMemoryIcons([...memoryTypes])
								} else {
									props.setVisibleObjectIcons([])
									props.setVisibleMemoryIcons([])
								}
							} else {
								setShowAlert(true)
								props.setSelectedObjectFilter("")
								props.setSelectedMemoryFilter("")
								props.setSelectedPeriodFilter("")
							}
						})
				}
			})
		})
	}, [props.selectedObjectFilter, props.selectedMemoryFilter, props.selectedPeriodFilter])

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
									outFields: ["*"],
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
				objectsView
					.queryFeatures({
						outFields: ["OBJ_PAV", "TIPAS", "ATMINT_TIP", "GlobalID"],
						where: objectsView.filter ? objectsView.filter.where : null,
						geometry: null,
						returnGeometry: false,
					})
					.then((response) => {
						if (response.features.length) {
							props.setSearchObjectsList(response.features)
						}
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
				{/* <FormControl variant="outlined" size="small">
					<InputLabel id="object-select-label">{t("plaques.options.objectType")}</InputLabel>
					<Select
						variant="outlined"
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={props.selectedObjectFilter}
						label={t("plaques.options.objectType")}
						onChange={handleObjectSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{objectRenderer.uniqueValueInfos.map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.value} value={object.value}>
								{t(`plaques.options.objects.${object.value}`)}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" size="small">
					<InputLabel id="memory-select-label">{t("plaques.options.memoryType")}</InputLabel>
					<Select
						variant="outlined"
						labelId="memory-select-label"
						name="memory-select"
						id="memory-select"
						value={props.selectedMemoryFilter}
						label={t("plaques.options.memoryType")}
						onChange={handleMemorySelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{memoryRenderer.uniqueValueInfos.map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.value} value={object.value}>
								{t(`plaques.options.memories.${object.value}`)}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" size="small">
					<InputLabel id="period-label">{t("plaques.options.period")}</InputLabel>
					<Select
						sx={{ borderRadius: "30px", height: "50px", backgroundColor: "white" }}
						labelId="period-label"
						name="period"
						id="period"
						value={props.selectedPeriodFilter}
						label={t("plaques.options.period")}
						onChange={handlePeriodSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						<MenuItem sx={{ whiteSpace: "unset" }} key={1} value={1}>
							{t(`plaques.options.periods.${1}`)}
						</MenuItem>
						<MenuItem sx={{ whiteSpace: "unset" }} key={2} value={2}>
							{t(`plaques.options.periods.${2}`)}
						</MenuItem>
						<MenuItem sx={{ whiteSpace: "unset" }} key={3} value={3}>
							{t(`plaques.options.periods.${3}`)}
						</MenuItem>
						<MenuItem sx={{ whiteSpace: "unset" }} key={4} value={4}>
							{t(`plaques.options.periods.${4}`)}
						</MenuItem>
						<MenuItem sx={{ whiteSpace: "unset" }} key={5} value={5}>
							{t(`plaques.options.periods.${5}`)}
						</MenuItem>
					</Select>
				</FormControl> */}

				{/* <Grid container direction="row" justifyContent="center" alignItems="center">
					<Typography sx={{ mt: 3 }} variant="subtitle2">
						Metai
					</Typography>
				</Grid>
				<Slider
					sx={{ ml: "1%", width: "98%" }}
					value={sliderValue}
					max={2022}
					min={1200}
					size="small"
					valueLabelDisplay="auto"
					onChange={handleSliderChange}
					marks={marks}
				/> */}

				{/* <FormGroup sx={{ mt: 1 }}>
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
