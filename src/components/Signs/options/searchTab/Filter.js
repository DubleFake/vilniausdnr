import React, { useEffect, useState } from "react"
import { objects, view } from "../../../../utils/signsArcgisItems"

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
	const [objectAlias, setObjectAlias] = useState([])
	const [memoryAlias, setMemoryAlias] = useState([])
	const [showAlert, setShowAlert] = useState(false)
	const [extentCheck, setExtentCheck] = useState(false)

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
		let tempObjectAlias = []
		let tempMemoryAlias = []
		props.setSearchObjectsList(props.objectsList)

		for (let field in props.objectsList[0].layer.fields) {
			if (props.objectsList[0].layer.fields[field].name === "TIPAS") {
				for (let code in props.objectsList[0].layer.fields[field].domain.codedValues) {
					const objCodeAlias = {}
					objCodeAlias.alias = props.objectsList[0].layer.fields[field].domain.codedValues[code].name
					objCodeAlias.code = props.objectsList[0].layer.fields[field].domain.codedValues[code].code
					tempObjectAlias.push(objCodeAlias)
				}
				setObjectAlias(tempObjectAlias)
			} else if (props.objectsList[0].layer.fields[field].name === "ATMINT_TIP") {
				for (let code in props.objectsList[0].layer.fields[field].domain.codedValues) {
					const memCodeAlias = {}
					memCodeAlias.alias = props.objectsList[0].layer.fields[field].domain.codedValues[code].name
					memCodeAlias.code = props.objectsList[0].layer.fields[field].domain.codedValues[code].code
					tempMemoryAlias.push(memCodeAlias)
				}
				setMemoryAlias(tempMemoryAlias)
			}
		}
	}, [])

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
			props.setCurrentFilter(query)

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
						if (response.features.length) {
							props.setSearchObjectsList(response.features)
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
				<Alert onClose={() => setShowAlert(false)} severity="info" sx={{ width: "100%", zIndex: 3 }}>
					Objektų nerasta. Filtrai išvalyti.
				</Alert>
			</Snackbar>
			<Box sx={{ ml: 0.5, mr: 0.5 }}>
				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">Objekto tipas</InputLabel>
					<Select
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={props.selectedObjectFilter}
						label="Objekto tipas"
						onChange={handleObjectSelect}
					>
						<MenuItem value="">
							<em>Visi</em>
						</MenuItem>
						{objectAlias.map((object) => (
							<MenuItem sx={{ whiteSpace: "unset" }} key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="memory-select-label">Atminimo tipas</InputLabel>
					<Select
						labelId="memory-select-label"
						name="memory-select"
						id="memory-select"
						value={props.selectedMemoryFilter}
						label="Atminimo tipas"
						onChange={handleMemorySelect}
					>
						<MenuItem value="">
							<em>Visi</em>
						</MenuItem>
						{memoryAlias.map((object) => (
							<MenuItem key={object.code} value={object.code}>
								{object.alias}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormGroup>
					<FormControlLabel
						control={<Checkbox checked={extentCheck} onChange={handleExtent} />}
						label="Rodyti tik matomus objektus"
					/>
				</FormGroup>

				<Button
					variant="contained"
					disableElevation
					sx={{ mb: 1, width: "100%" }}
					onClick={handleClearFilters}
				>
					Išvalyti filtrus
				</Button>
			</Box>
		</>
	)
}

export default Filter
