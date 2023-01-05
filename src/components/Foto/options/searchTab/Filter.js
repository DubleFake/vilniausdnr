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

const viewHandles = []

const Filter = (props) => {
	const { t, i18n } = useTranslation()

	const [showAlert, setShowAlert] = useState(false)
	const [extentCheck, setExtentCheck] = useState(false)
	const [sliderValue, setSliderValue] = useState([1800, 2020])
	const [sliderValueCommited, setSliderValueCommited] = useState([1800, 2020])
	const [marks, setMarks] = useState([
		{
			value: 1800,
			label: 1800,
		},
		{
			value: 2020,
			label: 2020,
		},
	])
	const [authors, setAuthors] = useState([])
	const [selectedAuthor, setSelectedAuthor] = useState("")
	const [showSlider, setShowSlider] = useState(true)

	const handleAuthorSelect = (event) => {
		setSelectedAuthor(event.target.value)
    
		let min_value = 3000
		let max_value = 1000
		setSliderValue([1000, 3000])

		let tempObjects

		if (event.target.value !== "") {
			tempObjects = props.objectsList.filter((obj) => {
				return obj.attributes.Autorius === authors[event.target.value]
			})
		} else {
			tempObjects = [...props.objectsList]
		}

		for (let obj of tempObjects) {
			if (obj.attributes.Datos_intervalo_pradzia && obj.attributes.Datos_intervalo_pradzia <= min_value) {
				min_value = obj.attributes.Datos_intervalo_pradzia
			}

			if (obj.attributes.Datos_intervalo_pabaiga && obj.attributes.Datos_intervalo_pabaiga >= max_value) {
				max_value = obj.attributes.Datos_intervalo_pabaiga
			}
		}

		if (max_value === 1000 || min_value === 3000) {
			setShowSlider(false)
		} else {
			setShowSlider(true)

			setSliderValue([min_value, max_value])
			// setSliderValueCommited([min_value, max_value])
			setMarks([
				{
					value: min_value,
					label: min_value,
				},
				{
					value: max_value,
					label: max_value,
				},
			])
		}
	}

	const handleClearFilters = () => {
		setSliderValue([marks[0].value, marks[1].value])
		setSliderValueCommited([marks[0].value, marks[1].value])
		setSelectedAuthor("")

		let min_value = 3000
		let max_value = 1000

		for (let obj of props.objectsList) {
			if (obj.attributes.Datos_intervalo_pradzia && obj.attributes.Datos_intervalo_pradzia <= min_value) {
				min_value = obj.attributes.Datos_intervalo_pradzia
			}

			if (obj.attributes.Datos_intervalo_pabaiga && obj.attributes.Datos_intervalo_pabaiga >= max_value) {
				max_value = obj.attributes.Datos_intervalo_pabaiga
			}
		}

		setSliderValue([min_value, max_value])
		// setSliderValueCommited([min_value, max_value])
		setMarks([
			{
				value: min_value,
				label: min_value,
			},
			{
				value: max_value,
				label: max_value,
			},
		])

		setShowSlider(true)

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
						outFields: ["*"],
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

	const handleSliderChangeCommitted = (event, newValue) => {
		setSliderValueCommited(newValue)
	}

	useEffect(() => {
		let min_value = 3000
		let max_value = 1000
		const authors = new Set()

		for (let obj of props.objectsList) {
			if (obj.attributes.Datos_intervalo_pradzia && obj.attributes.Datos_intervalo_pradzia <= min_value) {
				min_value = obj.attributes.Datos_intervalo_pradzia
			}

			if (obj.attributes.Datos_intervalo_pabaiga && obj.attributes.Datos_intervalo_pabaiga >= max_value) {
				max_value = obj.attributes.Datos_intervalo_pabaiga
			}

			if (obj.attributes.Autorius && obj.attributes.Autorius !== "-") authors.add(obj.attributes.Autorius)
		}
		const sortedAuthors = [...authors].sort((a, b) => a.localeCompare(b))
		setAuthors(sortedAuthors)

		setSliderValue([min_value, max_value])
		setSliderValueCommited([min_value, max_value])
		setMarks([
			{
				value: min_value,
				label: min_value,
			},
			{
				value: max_value,
				label: max_value,
			},
		])
	}, [])

	// useEffect(() => {
	// 	viewHandles.forEach((handle) => {
	// 		handle.remove()
	// 	})
	// 	viewHandles.length = 0

	// 	view.whenLayerView(objects).then((objectsView) => {
	// 		if (extentCheck) {
	// 			viewHandles.push(
	// 				objectsView.watch("updating", (updating) => {
	// 					if (!updating) {
	// 						objectsView
	// 							.queryFeatures({
	// 								outFields: ["*"],
	// 								where: objectsView.filter.where,
	// 								geometry: view.extent,
	// 								returnGeometry: false,
	// 							})
	// 							.then((response) => {
	// 								props.setSearchObjectsList(response.features)
	// 							})
	// 					}
	// 				})
	// 			)
	// 		} else {
	// 			objectsView
	// 				.queryFeatures({
	// 					outFields: ["*"],
	// 					where: objectsView.filter ? objectsView.filter.where : null,
	// 					geometry: null,
	// 					returnGeometry: false,
	// 				})
	// 				.then((response) => {
	// 					if (response.features.length) {
	// 						props.setSearchObjectsList(response.features)
	// 					}
	// 				})
	// 		}
	// 	})
	// }, [extentCheck])

	useEffect(() => {
		let query = `(Datos_intervalo_pradzia BETWEEN ${sliderValue[0]} AND ${sliderValue[1]} OR Datos_intervalo_pabaiga BETWEEN ${sliderValue[0]} AND ${sliderValue[1]})`

		if (typeof selectedAuthor !== "undefined" && selectedAuthor !== "") {
			query += ` AND Autorius = '${authors[selectedAuthor]}'`
		}

		view.whenLayerView(objects).then((objectsView) => {
			watchUtils.whenNotOnce(objectsView, "updating").then(() => {
				objectsView.filter = {
					//galima tiesiog nustatyti view filter kad pakeisti view, ir vietoj queryFeatures padaryti array.filter()
					//geometry: extentCheck ? view.extent : null,
					where: query,
				}

				objectsView
					.queryFeatures({
						outFields: ["*"],
						where: objectsView.filter.where,
						returnGeometry: false,
					})
					.then((response) => {
						if (response.features.length) {
							props.setSearchObjectsList(response.features)
						}
						// else {
						// 	setShowAlert(true)
						// 	handleClearFilters()
						// }
					})
			})
		})
	}, [sliderValueCommited, selectedAuthor])

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
					<InputLabel id="object-select-label">{"Autorius"}</InputLabel>
					<Select
						variant="outlined"
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={selectedAuthor}
						label={"Autorius"}
						onChange={handleAuthorSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{authors.map((object, index) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={index} value={index}>
								{object}
							</MenuItem>
						))}
					</Select>
				</FormControl>

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

				{showSlider && (
					<>
						<Grid container direction="row" justifyContent="center" alignItems="center">
							<Typography sx={{ mt: 3 }} variant="subtitle2">
								Metai
							</Typography>
						</Grid>
						<Slider
							sx={{ ml: "1%", width: "98%" }}
							value={sliderValue}
							min={marks[0].value}
							max={marks[1].value}
							size="small"
							valueLabelDisplay="auto"
							onChange={handleSliderChange}
							onChangeCommitted={handleSliderChangeCommitted}
							marks={marks}
						/>
					</>
				)}

				<FormGroup sx={{ mt: 1 }}>
					<FormControlLabel
						control={<Checkbox checked={extentCheck} onChange={handleExtent} />}
						label={t("plaques.options.extent")}
					/>
				</FormGroup>
			</Container>

			<Grid variant="result" container direction="row" justifyContent="space-between" alignItems="center">
				<Typography sx={{ mt: 1, fontWeight: "bold" }} variant="h5">
					Rezultatai
					<Count objectCount={props.objectCount}></Count>
				</Typography>

				{(sliderValueCommited[0] !== marks[0].value ||
					sliderValueCommited[1] !== marks[1].value ||
					(typeof selectedAuthor !== "undefined" && selectedAuthor !== "")) && (
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
