import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
	persons,
	related_persons,
	related_org,
	related_person_sources,
	related_events,
} from "../../../utils/personsArcgisItems"
import { ReactComponent as random_ikona } from "../../../utils/icons/personIcons/random_ikona.svg"

import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import CircularProgress from "@mui/material/CircularProgress"
import SvgIcon from "@mui/material/SvgIcon"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

const PersonRelated = (props) => {
	const [relatedPersons, setRelatedPersons] = useState([])
	const [relatedOrg, setRelatedOrg] = useState([])
	const [relatedPersonSources, setRelatedPersonSources] = useState([])
	const [relatedObjects, setRelatedObjects] = useState([])
	const [relatedEvents, setRelatedEvents] = useState([])

	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		setRelatedObjects([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				persons
					.queryRelatedFeatures({
						outFields: ["OBJ_PAV", "GlobalID"],
						relationshipId: 1,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						setRelatedObjects(response_related[response.features[0].attributes.OBJECTID].features)
					})
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedPersons([])

		related_persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmuo = '{${props.globalID}}'`,
			})
			.then((response) => {
				const tempPersons = response.features
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
								where: `Asmenybes_ID = '${tempPersons[person].attributes.Susijes_asmuo_is_saraso}'`,
							})
							.then((response) => {
								tempPersons[
									person
								].attributes.Susijes_asmuo_irasant_tekstu = `${response.features[0].attributes.Vardas_lietuviskai} ${response.features[0].attributes.Pavarde_lietuviskai}`

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
	}, [props.globalID])

	useEffect(() => {
		setRelatedOrg([])

		related_org
			.queryFeatures({
				outFields: ["*"],
				where: `Asmuo = '{${props.globalID}}'`,
			})
			.then((response) => {
				setRelatedOrg(response.features)
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedPersonSources([])

		related_person_sources
			.queryFeatures({
				outFields: ["*"],
				where: `Susijes_asmuo_is_saraso = '{${props.globalID}}'`,
			})
			.then((response) => {
				setRelatedPersonSources(response.features)
			})
	}, [props.globalID])

	useEffect(() => {
		setRelatedEvents([])

		persons
			.queryFeatures({
				outFields: ["*"],
				where: `Asmenybes_ID = '{${props.globalID}}'`,
			})
			.then((response) => {
				persons
					.queryRelatedFeatures({
						outFields: ["*"],
						relationshipId: 5,
						returnGeometry: false,
						objectIds: response.features[0].attributes.OBJECTID,
					})
					.then((response_related) => {
						// console.log(response_related[response.features[0].attributes.OBJECTID].features)
						// setRelatedEvents(response_related[response.features[0].attributes.OBJECTID].features)

						const tempEvents = []
						let eventsCount = response_related[response.features[0].attributes.OBJECTID].features.length
						let queryCount = 0

						for (let feature in response_related[response.features[0].attributes.OBJECTID].features) {
							related_events
								.queryFeatures({
									outFields: ["*"],
									where: `Ivykio_ID = '${
										response_related[response.features[0].attributes.OBJECTID].features[feature].attributes
											.Ivykio_ID
									}'`,
								})
								.then((response_events) => {
									tempEvents.push(response_events.features[0])

									queryCount++
									if (queryCount === eventsCount) {
										setRelatedEvents(tempEvents)
									}
								})
						}
					})
			})
	}, [props.globalID])

	return (
		<Box sx={{ my: 1 }}>
			{/* <Grid container direction="column" justifyContent="flex-start" alignItems="center"> */}
			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
				<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
					Susiję įvykiai
				</Typography>
			</Grid>

			{relatedEvents.length > 0 ? (
				relatedEvents.map((event, i) => (
					<Link
						target="_blank"
						href={
							"https://zemelapiai.vplanas.lt" +
							`/vilniausdnr/${i18n.language}/events/${event.attributes.Ivykio_ID.replace(/[{}]/g, "")}`
						}
						rel="noopener"
						variant="body2"
						key={i}
					>
						{event.attributes.Istorinis_ivykis}
					</Link>
				))
			) : (
				<CircularProgress color="inherit" />
			)}

			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
				<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
					Susijusios asmenybės
				</Typography>
			</Grid>

			{relatedPersons.length > 0 ? (
				relatedPersons.map((person, i) =>
					person.attributes.Susijes_asmuo_is_saraso ? (
						<Link
							textAlign="center"
							component="button"
							variant="body2"
							onClick={() => {
								navigate(
									`/vilniausdnr/${i18n.language}/persons/${person.attributes.Susijes_asmuo_is_saraso.replace(
										/[{}]/g,
										""
									)}`
								)
							}}
							key={i}
						>
							{person.attributes.Susijes_asmuo_irasant_tekstu}
						</Link>
					) : (
						<Typography sx={{ mb: 0 }} variant="body2" gutterBottom key={i}>
							{person.attributes.Susijes_asmuo_irasant_tekstu}
						</Typography>
					)
				)
			) : (
				<CircularProgress color="inherit" />
			)}

			{/* <Typography sx={{ fontWeight: "bold" }} variant="subtitle1" gutterBottom>
				Objektai
			</Typography>
			{relatedObjects.length > 0 ? (
				relatedObjects.map((obj, i) => (
					<Link
						target="_blank"
						href={
							"https://zemelapiai.vplanas.lt" +
							`/vilniausdnr/${i18n.language}/plaques/object/${obj.attributes.GlobalID.replace(/[{}]/g, "")}`
						}
						rel="noopener"
						textAlign="center"
						variant="body2"
						key={i}
					>
						{obj.attributes.OBJ_PAV}
					</Link>
				))
			) : (
				<CircularProgress color="inherit" />
			)} */}

			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
				<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
					Susijusios organizacijos
				</Typography>
			</Grid>
			{relatedOrg.length > 0 ? (
				relatedOrg.map((org, i) => (
					<Typography sx={{ mb: 0 }} variant="body2" gutterBottom key={i}>
						{org.attributes.Organizacijos_pavadinimas}
					</Typography>
				))
			) : (
				<CircularProgress color="inherit" />
			)}

			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<SvgIcon sx={{ fontSize: 35 }} component={random_ikona} inheritViewBox />
				<Typography sx={{ m: 0 }} variant="h6" gutterBottom>
					Šaltiniai
				</Typography>
			</Grid>

			{relatedPersonSources.length > 0 ? (
				relatedPersonSources.map((source, i) => (
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
			{/* </Grid> */}
		</Box>
	)
}

export default PersonRelated
