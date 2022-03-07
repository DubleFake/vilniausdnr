import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { objects, view } from "../../../../utils/plaquesArcgisItems"

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
	const [extentCheck, setExtentCheck] = useState(false)

	const objectFilter = [
		{
			alias: t("plaques.options.objects.plaquePerson"),
			code: 1,
		},
		{
			alias: t("plaques.options.objects.sculpture"),
			code: 2,
		},
		{
			alias: t("plaques.options.objects.plaqueOther"),
			code: 3,
		},
		{
			alias: t("plaques.options.objects.mural"),
			code: 4,
		},
		{
			alias: t("plaques.options.objects.plaqueTitle"),
			code: 5,
		},
		{
			alias: t("plaques.options.objects.sign"),
			code: 6,
		},
		{
			alias: t("plaques.options.objects.marker"),
			code: 7,
		},
		{
			alias: t("plaques.options.objects.monument"),
			code: 8,
		},
	]

	const memoryFilter = [
		{
			alias: t("plaques.options.memories.person"),
			code: 1,
		},
		{
			alias: t("plaques.options.memories.group"),
			code: 2,
		},
		{
			alias: t("plaques.options.memories.abstract"),
			code: 3,
		},
		{
			alias: t("plaques.options.memories.organisation"),
			code: 4,
		},
		{
			alias: t("plaques.options.memories.event"),
			code: 5,
		},
		{
			alias: t("plaques.options.memories.burial"),
			code: 6,
		},
		{
			alias: t("plaques.options.memories.art"),
			code: 7,
		},
		{
			alias: t("plaques.options.memories.building"),
			code: 8,
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
		props.setSelectedMemoryFilter(event.target.value)
	}
	const handleClearFilters = () => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter("")
		props.setSelectedMemoryFilter("")
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

	useEffect(() => {
		let query

		if (props.selectedObjectFilter !== "" && props.selectedMemoryFilter === "") {
			query = `TIPAS = ${props.selectedObjectFilter}`
		} else if (props.selectedObjectFilter === "" && props.selectedMemoryFilter !== "") {
			query = `ATMINT_TIP = ${props.selectedMemoryFilter}`
		} else if (props.selectedObjectFilter !== "" && props.selectedMemoryFilter !== "") {
			query = `ATMINT_TIP = ${props.selectedMemoryFilter} AND TIPAS = ${props.selectedObjectFilter}`
		} else if (props.selectedObjectFilter === "" && props.selectedMemoryFilter === "") {
			query = ""
		}

		view.whenLayerView(objects).then((objectsView) => {
			objectsView.filter = {
				//geometry: extentCheck ? view.extent : null,
				where: query,
			}

			if (!extentCheck) {
				objectsView
					.queryFeatures({
						outFields: ["OBJ_PAV", "TIPAS", "ATMINT_TIP", "GlobalID"],
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
						}
					})
			}
		})
	}, [props.selectedObjectFilter, props.selectedMemoryFilter])

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
									outFields: ["OBJ_PAV", "TIPAS", "ATMINT_TIP", "GlobalID"],
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
						where: objectsView.filter.where,
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
			<Box sx={{ ml: 0.5, mr: 0.5 }}>
				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">{t("plaques.options.objectType")}</InputLabel>
					<Select
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
						{objectFilter.map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="memory-select-label">{t("plaques.options.memoryType")}</InputLabel>
					<Select
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
						{memoryFilter.map((object) => (
							<MenuItem key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormGroup>
					<FormControlLabel
						control={<Checkbox checked={extentCheck} onChange={handleExtent} />}
						label={t("plaques.options.extent")}
					/>
				</FormGroup>

				<Button
					variant="contained"
					color="secondary"
					disableElevation
					sx={{ mb: 1, width: "100%" }}
					onClick={handleClearFilters}
				>
					{t("plaques.options.clearFilters")}
				</Button>
			</Box>
		</>
	)
}

export default Filter
