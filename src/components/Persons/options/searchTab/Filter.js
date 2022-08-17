import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as watchUtils from "@arcgis/core/core/watchUtils"

import { persons, classifications } from "../../../../utils/personsArcgisItems"

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
	const [selectedProfession, setSelectedProfession] = useState("")
	const [selectedProfessionDetail, setSelectedProfessionDetail] = useState("")
	const [professionCodes, setProfessionCodes] = useState([])
	const [professionDetailCodes, setProfessionDetailCodes] = useState([])

	const handleProfessionSelect = (event) => {
		// props.setSelectedObject("")
		props.setSearchInputValue("")
		setSelectedProfession(event.target.value)

		const selectedProfessionFind = professionCodes.find(
			(profession) => profession.Pagrindine_veikla === event.target.value
		)
		const filteredObjectsProfession = props.objectsList.filter((object) =>
			object.attributes.Pagrindine_veikla.split(",").includes(
				selectedProfessionFind.Pagrindines_veiklos_nr.toString()
			)
		)
		props.setSearchObjectsList(filteredObjectsProfession)
	}
	const handleProfessionDetailSelect = (event) => {
		// props.setSelectedObject("")
		props.setSearchInputValue("")
		setSelectedProfessionDetail(event.target.value)
	}
	const handleClearFilters = () => {
		props.setSearchInputValue("")
		setSelectedProfession("")
		setSelectedProfessionDetail("")
		props.setSearchObjectsList(props.objectsList)
	}

	useEffect(() => {
		props.setSearchObjectsList(props.objectsList)
	}, [])

	useEffect(() => {
		const tempProfession = []
		const tempProfessionDetail = []

		classifications
			.queryFeatures({
				outFields: ["*"],
				where: "1=1",
			})
			.then((response) => {
				for (let feature in response.features) {
					if (response.features[feature].attributes.Pagrindine_veikla) {
						tempProfession.push({
							Pagrindine_veikla: response.features[feature].attributes.Pagrindine_veikla,
							Pagrindines_veiklos_nr: response.features[feature].attributes.Pagrindines_veiklos_nr,
						})
					}
					if (response.features[feature].attributes.Veiklos_detalizavimas) {
						tempProfessionDetail.push({
							Veiklos_detalizavimas: response.features[feature].attributes.Veiklos_detalizavimas,
							Veiklos_detalizavimo_nr: response.features[feature].attributes.Veiklos_detalizavimo_nr,
						})
					}
				}
				setProfessionCodes(tempProfession)
				setProfessionDetailCodes(tempProfessionDetail)
			})
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
				<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
					<InputLabel id="object-select-label">{t("persons.options.profession")}</InputLabel>
					<Select
						labelId="object-select-label"
						name="object-select"
						id="object-select"
						value={selectedProfession}
						label={t("persons.options.profession")}
						onChange={handleProfessionSelect}
					>
						<MenuItem value="">
							<em>{t("plaques.options.all")}</em>
						</MenuItem>
						{professionCodes.map((profession) => (
							<MenuItem value={profession.Pagrindine_veikla} key={profession.Pagrindines_veiklos_nr}>
								<em>{profession.Pagrindine_veikla}</em>
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{selectedProfession && (
					<FormControl variant="standard" size="small" sx={{ mt: 1, width: "100%" }}>
						<InputLabel id="memory-select-label">{t("persons.options.profession_detail")}</InputLabel>
						<Select
							labelId="memory-select-label"
							name="memory-select"
							id="memory-select"
							value={selectedProfessionDetail}
							label={t("persons.options.profession_detail")}
							onChange={handleProfessionDetailSelect}
						>
							<MenuItem value="">
								<em>{t("plaques.options.all")}</em>
							</MenuItem>
							{professionDetailCodes.map((profession) => (
								<MenuItem value={profession.Veiklos_detalizavimas} key={profession.Veiklos_detalizavimo_nr}>
									<em>{profession.Veiklos_detalizavimas}</em>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				<Button
					variant="contained"
					color="secondary"
					disableElevation
					sx={{ mb: 1, mt: 1, width: "100%" }}
					onClick={handleClearFilters}
				>
					{t("plaques.options.clearFilters")}
				</Button>
			</Box>
		</>
	)
}

export default Filter
