import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { persons } from "../../../../utils/personsArcgisItems"

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

	const handleProfessionSelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedObjectFilter(event.target.value)
	}

	const handlePeriodSelect = (event) => {
		props.setSelectedObject("")
		props.setSearchInputValue("")
		props.setSelectedMemoryFilter(event.target.value)
	}

	const handleClearFilters = () => {}

	useEffect(() => {
		props.setSearchObjectsList(props.objectsList)
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
			<Box sx={{ ml: 0.5, mr: 0.5 }}>
				{/* <FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">{t("persons.options.profession")}</InputLabel>
					<Select
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={props.selectedObjectFilter}
						label={t("persons.options.profession")}
						onChange={handleProfessionSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
					</Select>
				</FormControl>

				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="memory-select-label">{t("persons.options.period")}</InputLabel>
					<Select
						labelId="memory-select-label"
						name="memory-select"
						id="memory-select"
						value={props.selectedMemoryFilter}
						label={t("persons.options.period")}
						onChange={handlePeriodSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
					</Select>
				</FormControl>

				<Button
					variant="contained"
					color="secondary"
					disableElevation
					sx={{ mb: 1, mt: 1, width: "100%" }}
					onClick={handleClearFilters}
				>
					{t("plaques.options.clearFilters")}
				</Button> */}
			</Box>
		</>
	)
}

export default Filter
