import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { matchSorter } from "match-sorter"

import { classifications, biography } from "../../../../utils/personsArcgisItems"
import Count from "../searchTab/Count"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Filter = (props) => {
	const { t, i18n } = useTranslation()

	const [showAlert, setShowAlert] = useState(false)
	const [selectedProfession, setSelectedProfession] = useState("")
	const [selectedProfessionDetail, setSelectedProfessionDetail] = useState("")
	const [professionCodes, setProfessionCodes] = useState([])
	const [professionInitialDetailCodes, setProfessionInitialDetailCodes] = useState([])
	const [professionDetailCodes, setProfessionDetailCodes] = useState([])
	const [filteredByProfession, setFilteredByProfession] = useState([])
	const [yearById, setYearById] = useState({})
	const [sliderValue, setSliderValue] = useState([1500, 2000])
	const [sliderMarks, setSliderMarks] = useState([
		{
			value: 1500,
			label: "1500",
		},
		{
			value: 2000,
			label: "2000",
		},
	])

	const handleProfessionSelect = (event) => {
		if (event.target.value) {
			// props.setSelectedObject("")
			props.setSearchInputValue("")
			setSelectedProfessionDetail("")
			setSelectedProfession(event.target.value)

			const selectedProfessionFind = professionCodes.find(
				(profession) => profession.Pagrindine_veikla === event.target.value
			)
			const filteredObjectsProfession = props.objectsList.filter((object) =>
				object.attributes.Pagrindine_veikla.split(",").includes(
					selectedProfessionFind.Pagrindines_veiklos_nr.toString()
				)
			)

			const professionDetailCodesSet = new Set()
			for (let obj in filteredObjectsProfession) {
				const tempCodesSplit = filteredObjectsProfession[obj].attributes.Veiklos_detalizavimas.split(",")
				for (let code in tempCodesSplit) {
					professionDetailCodesSet.add(tempCodesSplit[code])
				}
			}

			const professionDetailCodesArray = Array.from(professionDetailCodesSet)
			const professionDetailCodesFiltered = professionInitialDetailCodes.filter((code) => {
				return professionDetailCodesArray.some((el) => {
					return code.Veiklos_detalizavimo_nr === parseInt(el)
				})
			})

			const professionDetailCodesRegex = professionDetailCodesFiltered.filter((code) =>
				String(code.Veiklos_detalizavimo_nr).match(
					`^[${selectedProfessionFind.Pagrindines_veiklos_nr}][0-9]$`
				)
			)
			setProfessionDetailCodes(professionDetailCodesRegex)

			props.setSearchObjectsList(filteredObjectsProfession)
			setFilteredByProfession(filteredObjectsProfession)
		} else {
			// props.setSelectedObject("")
			props.setSearchInputValue("")
			setSelectedProfession("")
			props.setSearchObjectsList(props.objectsList)
		}
	}

	const handleProfessionDetailSelect = (event) => {
		if (event.target.value) {
			// props.setSelectedObject("")
			props.setSearchInputValue("")
			setSelectedProfessionDetail(event.target.value)

			const selectedProfessionDetailFind = professionDetailCodes.find(
				(profession) => profession.Veiklos_detalizavimas === event.target.value
			)
			const filteredObjectsProfessionDetail = filteredByProfession.filter((object) =>
				object.attributes.Veiklos_detalizavimas.split(",").includes(
					selectedProfessionDetailFind.Veiklos_detalizavimo_nr.toString()
				)
			)
			props.setSearchObjectsList(filteredObjectsProfessionDetail)
		} else {
			// props.setSelectedObject("")
			props.setSearchInputValue("")
			setSelectedProfessionDetail("")
			props.setSearchObjectsList(filteredByProfession)
		}
	}

	const handleClearFilters = () => {
		props.setSearchInputValue("")
		// props.setSelectedObject("")
		setSelectedProfession("")
		setSelectedProfessionDetail("")

		// console.log()
		// props.setTableObjectsList(
		// 	matchSorter(props.objectsList, "", {
		// 		keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
		// 		threshold: matchSorter.rankings.MATCHES,
		// 	})
		// )

		props.setSearchObjectsList(props.objectsList)
	}

	const handleSliderChange = (event, newValue) => {
		setSliderValue(newValue)
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
				setProfessionInitialDetailCodes(tempProfessionDetail)
			})

		const tempYearById = {}

		biography
			.queryFeatures({
				outFields: ["Fakto_data_rikiavimas", "Asmenybes_ID", "Fakto_tipas"],
				where: "1=1",
			})
			.then((response) => {
				let min = response.features[0].attributes.Fakto_data_rikiavimas
				let max = response.features[0].attributes.Fakto_data_rikiavimas

				for (let feature of response.features) {
					if (feature.attributes.Fakto_tipas === "gimė") {
						tempYearById[`${feature.attributes.Asmenybes_ID}`] = new Date(
							feature.attributes.Fakto_data_rikiavimas
						).getUTCFullYear()

						tempYearById[`${feature.attributes.Asmenybes_ID}`] = new Date(
							feature.attributes.Fakto_data_rikiavimas
						).getUTCFullYear()

						if (feature.attributes.Fakto_data_rikiavimas <= min) {
							min = feature.attributes.Fakto_data_rikiavimas
						}
						if (feature.attributes.Fakto_data_rikiavimas > max) {
							max = feature.attributes.Fakto_data_rikiavimas
						}
					}
				}

				console.log(tempYearById)

				const min_year = new Date(min).getUTCFullYear()
				const max_year = new Date(max).getUTCFullYear()

				setSliderValue([min_year, max_year])
				setSliderMarks([
					{
						value: min_year,
						label: min_year,
					},
					{
						value: max_year,
						label: max_year,
					},
				])
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
			<Container  variant="filter">
				<FormControl size="small" variant="outlined">
					<InputLabel id="object-select-label">{t("persons.options.profession")}</InputLabel>
					<Select
						variant="outlined"
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
					<FormControl size="small" variant="outlined">
						<InputLabel id="memory-select-label">{t("persons.options.profession_detail")}</InputLabel>
						<Select
							variant="outlined"
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

				{/* <Grid container direction="row" justifyContent="center" alignItems="center">
					<Typography sx={{ mt: 3 }} variant="subtitle2">
						Metai
					</Typography>
				</Grid>
				<Slider
					sx={{ ml: "1%", width: "98%" }}
					value={sliderValue}
					min={sliderMarks[0].value}
					max={sliderMarks[1].value}
					size="small"
					valueLabelDisplay="auto"
					onChange={handleSliderChange}
					marks={sliderMarks}
				/> */}
			</Container>

			<Grid variant="result" container direction="row" justifyContent="space-between" alignItems="center">
				<Typography sx={{ mt: 1, fontWeight: "bold" }} variant="h5">
					Rezultatai
					<Count objectCount={props.objectCount}></Count>
				</Typography>

				{(props.searchInputValue || selectedProfession) && (
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
