import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { HashScroll } from "react-hash-scroll"

import { events, related_sources, persons } from "../../../utils/eventsArcgisItems"

import Grid from "@mui/material/Grid"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import TimelineDot from "@mui/lab/TimelineDot"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

const EventTimeline = (props) => {
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const [expandedList, setExpandedList] = useState([])
	const [relations, setRelations] = useState({})

	useEffect(() => {
		const tempArray = []

		for (let obj in props.eventsFiltered) {
			tempArray.push(false)
		}

		setExpandedList(tempArray)
	}, [props.eventsFiltered])

	const eventClickHandler = (event, eventIndex) => {
		const tempExpandedList = [...expandedList]

		tempExpandedList[eventIndex] = !tempExpandedList[eventIndex]
		setExpandedList(tempExpandedList)

		const tempRelations = { ...relations } //copy state kad nereiktu is naujo tu paciu query? kiekvienam relate atskirai po if?

		if (!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]) {
			tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")] = {}

			if (
				!tempRelations[props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")]
					.related_persons
			) {
				events
					.queryRelatedFeatures({
						outFields: ["Susijes_asmuo_is_saraso"],
						relationshipId: 27,
						returnGeometry: false,
						objectIds: props.eventsFiltered[eventIndex].attributes.OBJECTID,
					})
					.then((response) => {
						let personQueryWhere = ""
						let i = 1
						for (let person of response[props.eventsFiltered[eventIndex].attributes.OBJECTID].features) {
							if (i === 1) {
								personQueryWhere += `Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
									/[{}]/g,
									""
								)}'`
							} else {
								personQueryWhere += ` OR Asmenybes_ID = '${person.attributes.Susijes_asmuo_is_saraso.replace(
									/[{}]/g,
									""
								)}'`
							}
							i++
						}

						persons
							.queryFeatures({
								outFields: ["Vardas_lietuviskai", "Pavarde_lietuviskai", "Asmenybes_ID"],
								where: personQueryWhere,
							})
							.then((response_persons) => {
								tempRelations[
									props.eventsFiltered[eventIndex].attributes.Ivykio_ID.replace(/[{}]/g, "")
								].related_persons = response_persons.features
								setRelations(tempRelations)
							})
					})
			}
		}
	}

	return (
		<Grid sx={{ backgroundColor: "#707070" }} container spacing={0} variant="main">
			{props.eventsFiltered.length > 0 && (
				<Timeline position="alternate">
					{props.eventsFiltered.map((event, index) => (
						<HashScroll hash={event.attributes.Ivykio_ID.replace(/[{}]/g, "")} position="center" key={index}>
							<TimelineItem sx={{ mt: index === 0 ? 0 : "-12%" }}>
								<TimelineSeparator>
									<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
									<TimelineDot sx={{ backgroundColor: "white", m: 0, borderWidth: "1px" }} />
									<TimelineConnector sx={{ backgroundColor: "white", width: "1px" }} />
								</TimelineSeparator>
								<TimelineContent>
									<Box
										sx={{
											width: "100%",
											backgroundColor: "white",
											position: "relative",
											zIndex: 1,
											cursor: "pointer",
											textAlign: "left",
										}}
										component="div"
										onClick={(evt) => {
											eventClickHandler(evt, index)
										}}
									>
										<Box
											sx={{ width: "100%" }}
											component="img"
											src={
												event.attributes.Nuotrauka
													? event.attributes.Nuotrauka
													: "https://elibrary.mab.lt/bitstream/handle/1/527/223316.jpg?sequence=30&isAllowed=y"
											}
										/>

										{expandedList[index] && event.attributes.Nuotraukos_aprasymas && (
											<Typography
												sx={{
													mx: 2,
													pb: 1,
													color: "gray",
													fontWeight: 400,
													fontSize: "14px",
													fontStyle: "italic",
													textAlign: "center",
												}}
												variant="body2"
												component="div"
											>
												{event.attributes.Nuotraukos_aprasymas}
											</Typography>
										)}

										<Typography
											sx={{ mx: 2, fontWeight: 500, fontSize: "18px", maxWidth: "inherit" }}
											variant="h6"
										>
											{event.attributes.Istorinis_ivykis}
										</Typography>

										<Typography
											sx={{ mx: 2, pb: 1, color: "gray", fontWeight: 400, fontSize: "14px" }}
											variant="body2"
											component="div"
										>
											{new Date(event.attributes.Ivykio_data).toLocaleDateString("lt-LT")}
										</Typography>

										{expandedList[index] &&
											relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")] &&
											relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_persons && (
												<>
													<Typography
														sx={{ mx: 2, fontWeight: 400, fontSize: "16px", maxWidth: "inherit" }}
														variant="h6"
													>
														Susiję asmenys
													</Typography>
													{relations[event.attributes.Ivykio_ID.replace(/[{}]/g, "")].related_persons.map(
														(person, index) => (
															<div key={index}>
																<Link
																	sx={{ mt: 0.5, width: "100%", ml: 2, position: "relative" }}
																	target="_blank"
																	href={
																		"https://zemelapiai.vplanas.lt" +
																		`/vilniausdnr/${
																			i18n.language
																		}/persons/${person.attributes.Asmenybes_ID.replace(/[{}]/g, "")}`
																	}
																	rel="noopener"
																	textAlign="left"
																	variant="body2"
																	onClick={(evt) => evt.stopPropagation()}
																>
																	{`${person.attributes.Vardas_lietuviskai} ${person.attributes.Pavarde_lietuviskai}`}
																</Link>
															</div>
														)
													)}
												</>
											)}

										<Typography
											sx={{ mx: 2, pb: 1, mt: 1, color: "#D72E30", fontWeight: 400, fontSize: "14px" }}
											variant="body2"
											component="div"
										>
											{expandedList[index] ? "Suskleisti" : "Plačiau..."}
										</Typography>
									</Box>
								</TimelineContent>
							</TimelineItem>
						</HashScroll>
					))}
				</Timeline>
			)}
		</Grid>
	)
}

export default EventTimeline
