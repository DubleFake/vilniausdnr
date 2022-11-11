import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { events, related_sources, persons } from "../../../utils/eventsArcgisItems"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Link from "@mui/material/Link"

const EventInfo = (props) => {
	const [eventFeatures, setEventFeatures] = useState([])
	const [relatedPersons, setRelatedPersons] = useState([])
	const [relatedSources, setRelatedSources] = useState([])

	const { globalID } = useParams()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		setEventFeatures([])
		props.setDisplayTooltip(false)

		events
			.queryFeatures({
				outFields: ["*"],
				where: `Ivykio_ID = '{${globalID}}'`,
			})
			.then((response) => {
				setEventFeatures(response.features)
			})
	}, [globalID])

	useEffect(() => {
		setRelatedPersons([])

		events
			.queryFeatures({
				outFields: ["OBJECTID"],
				where: `Ivykio_ID = '{${globalID}}'`,
			})
			.then((response) => {
				events
					.queryRelatedFeatures({
						outFields: ["*"],
						relationshipId: 21,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						const tempPersons = response_related[response.features[0].attributes.OBJECTID].features
						let personsCount = 0

						for (let person in tempPersons) {
							if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
								personsCount++
							}
						}

						let queryCount = 0
						for (let person in tempPersons) {
							if (!tempPersons[person].attributes.Susijes_asmuo_irasant_tekstu) {
								persons
									.queryFeatures({
										outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai"],
										where: `Asmenybes_ID = '{${tempPersons[person].attributes.Susijes_asmuo_is_saraso.replace(
											/[{}]/g,
											""
										)}}'`,
									})
									.then((response_person) => {
										tempPersons[
											person
										].attributes.Susijes_asmuo_irasant_tekstu = `${response_person.features[0].attributes.Vardas_lietuviskai} ${response_person.features[0].attributes.Pavarde_lietuviskai}`

										queryCount++
										if (queryCount === personsCount) {
											setRelatedPersons(tempPersons)
										}
									})
							}
						}

						if (queryCount === 0 && personsCount === 0) {
							setRelatedPersons(tempPersons)
						}
					})
			})
	}, [globalID])

	useEffect(() => {
		setRelatedSources([])

		related_sources
			.queryFeatures({
				outFields: ["*"],
				where: `Susijes_ivykis_is_saraso = '{${globalID}}'`,
			})
			.then((response) => {
				setRelatedSources(response.features)
				console.log(response.features)
			})
	}, [globalID])

	return (
		<Box
			sx={{
				maxHeight: window.innerHeight - 90,
				overflowY: "auto",
				width: "calc(100vw - 500px)",
			}}
		>
			{eventFeatures.length > 0 && (
				<Grid container direction="column" justifyContent="flex-start" alignItems="center">
					<Typography
						sx={{ fontWeight: "bold" }}
						variant="subtitle1"
						gutterBottom
						component="div"
						align="center"
					>
						Istorinis įvykis
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{eventFeatures[0].attributes.Istorinis_ivykis}
					</Typography>

					<Typography
						sx={{ fontWeight: "bold" }}
						variant="subtitle1"
						gutterBottom
						component="div"
						align="center"
					>
						Įvykio data
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{new Date(eventFeatures[0].attributes.Ivykio_data).toLocaleDateString("lt-LT")}
					</Typography>

					<Typography
						sx={{ fontWeight: "bold" }}
						variant="subtitle1"
						gutterBottom
						component="div"
						align="center"
					>
						Vieta
					</Typography>
					<Typography variant="body2" gutterBottom component="div" align="center">
						{eventFeatures[0].attributes.Vieta}
					</Typography>
					<Typography
						sx={{ fontWeight: "bold" }}
						variant="subtitle1"
						gutterBottom
						component="div"
						align="center"
					>
						Asmenybės
					</Typography>
					{relatedPersons.length > 0 ? (
						relatedPersons.map((person, i) =>
							person.attributes.Susijes_asmuo_is_saraso ? (
								<Link
									target="_blank"
									href={
										"https://zemelapiai.vplanas.lt" +
										`/vilniausdnr/${
											i18n.language
										}/persons/${person.attributes.Susijes_asmuo_is_saraso.replace(/[{}]/g, "")}`
									}
									rel="noopener"
									textAlign="center"
									variant="body2"
									key={i}
								>
									{person.attributes.Susijes_asmuo_irasant_tekstu}
								</Link>
							) : (
								<Typography
									sx={{ mb: 0 }}
									variant="body2"
									gutterBottom
									component="div"
									align="center"
									key={i}
								>
									{person.attributes.Susijes_asmuo_irasant_tekstu}
								</Typography>
							)
						)
					) : (
						<CircularProgress color="inherit" />
					)}

					<Typography
						sx={{ fontWeight: "bold" }}
						variant="subtitle1"
						gutterBottom
						component="div"
						align="center"
					>
						Šaltiniai
					</Typography>
					{relatedSources.length > 0 ? (
						relatedSources.map((source, i) => (
							<Link
								target="_blank"
								href={source.attributes.Saltinio_URL}
								rel="noopener"
								textAlign="center"
								variant="body2"
								key={i}
							>
								{source.attributes.Saltinio_pavadinimas}
							</Link>
						))
					) : (
						<CircularProgress color="inherit" />
					)}
				</Grid>
			)}
		</Box>
	)
}

export default EventInfo
